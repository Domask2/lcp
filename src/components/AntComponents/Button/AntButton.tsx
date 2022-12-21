import React, {useEffect, useState} from "react";
import Editor from "../Editor/Editor";
import Mapped from "../Mapped";
import {useAction, useActions, useTypedSelector} from "../../../hooks";

import {getDataSourceLs, getDataSourcesAll, getMappedText} from "../../../redux/ds/ds.selector";

import {Button, Typography} from "antd";
import {RootState} from "../../../redux/redux.store";
import {IActionsType, IButton} from "../Page/templates";
import ScrollableAnchor from "react-scrollable-anchor";
import {getSettings} from "../../../redux/app/app.selector";
import {downloadData} from "../../../services/apiAction";

const {Link} = Typography;

/**
 * Кнопка Button
 * @param cmp
 * @param editor - используется в таблице, отключаем эдитор
 * @item
 */

type antButtonType = {
    cmp: IButton
    editor?: boolean
    item?: any
}

const AntButton = ({cmp, editor = true}: antButtonType) => {
    const {setLsVars} = useActions()
    let cmp_details = {...cmp}
    const mappedCaption = useTypedSelector((state: RootState) => getMappedText(state, cmp_details?.caption))
    const action = useAction(cmp.actions as Array<IActionsType>, cmp_details.ds?.key ? cmp_details.ds?.key : cmp_details?.ds)
    const ls: { [key: string]: any } = useTypedSelector((state: RootState) => getDataSourceLs(state))
    const dsArr = useTypedSelector((state: RootState) => getDataSourcesAll(state));
    const settings = useTypedSelector((state: RootState) => getSettings(state));
    const [disabled, setDisabled] = useState<boolean>()

    useEffect(() => {
        setDisabled(false)
        cmp.reduxElement?.forEach((item: string) => {
            if (ls.requiredVars[item] === false) {
                setDisabled(true)
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cmp])

    let href: string | number = '';
    let arrayParams: string[] = []

    const handleClick = () => {
        cmp.adKey && cmp.closeModal && setLsVars(cmp.adKey, false);
        cmp.resetInputs && cmp.reduxElement?.length && cmp.reduxElement.forEach((item: string) => {
            if (item.includes('prefix')) {
                setLsVars(item, '=')
            } else {
                setLsVars(item, undefined)
            }
        });
    }

    const handleResetHrefInput = () => {
        setTimeout(() => {
            cmp.resetInputs && cmp?.getUrl?.params && cmp?.getUrl?.params.length && cmp?.getUrl?.params.forEach((item: {}) => {
                Object.values(item).forEach((param: any) => {
                    let preDs = param.name.split(':')[0]
                    if (preDs === 'fly') {
                        if (ls.vars) {
                            let lsKey = param.name.split(':')[1]
                            if (param.hasOwnProperty('clear')) {
                                if (param.clear) {
                                    setLsVars(lsKey, undefined)
                                }
                            }

                            Object.keys(ls.vars).forEach((item: any) => {
                                if (item.includes('prefix') && item.replace('prefix_', '') === lsKey) {
                                    setLsVars(item, "=")
                                }
                            })
                        }
                    }
                })
            })
        }, 500)
    }

    const actionButton = () => {
        if (cmp.procedure !== '' && cmp.reduxElement && cmp.reduxElement.length === 0) {
            if (ls.pp[cmp.procedure!]) {
                action.onClick(undefined, undefined, ls.pp[cmp.procedure!])
                handleClick();
            }
        } else if (cmp.reduxElement && cmp.reduxElement.length !== 0) {
            let reduxElementObj: { [key: string]: string | number | undefined | null } | undefined = {}

            cmp.reduxElement.forEach((item: string) => {
                if (ls.requiredVars[item] === false) {
                    reduxElementObj = undefined
                    setDisabled(true)
                }
                if (reduxElementObj && ls.vars && ls.vars.hasOwnProperty(item)) {
                    if (ls.vars[item] && ls.vars[item] !== '__no_name__') {
                        reduxElementObj[item.split('__')[0]] = ls.vars[item]
                    }
                }
            })

            if (cmp.hiddenElement && Object.keys(cmp.hiddenElement).length) {
                Object.keys(cmp.hiddenElement).forEach((element: any) => {
                    if (reduxElementObj) {
                        if (cmp.hiddenElement[element].includes('*')) {
                            reduxElementObj[element] = Number(cmp.hiddenElement[element].slice(1))
                        }
                        reduxElementObj[element] = cmp.hiddenElement[element]
                    }
                })
            }

            if (reduxElementObj) {
                setDisabled(false)
                action.onClick(undefined, undefined, reduxElementObj)
                handleClick();
            }
        } else {
            action.onClick();
            handleClick();
        }
    }

    // GET URL
    // получаем href ссылку из следующих параметров:
    // ds - данные из возможных ds
    // fly - данные из ds.vars.ls (fly input)
    // param - пользовательские значения или значение из последнего query страницы
    // random - рандомное число
    if (dsArr && ls && cmp && settings) {
        if (cmp.getUrl && Object.keys(cmp.getUrl).length !== 0) {
            Object.values(cmp?.getUrl?.params).forEach((param: { [key: string]: any }) => {
                // получим тип параметра: value, fly, ds, sys_vars
                let preDs = Object.values(param)[0].type ? Object.values(param)[0].type : ''
                // let preDs = Object.values(param).toString().split(':')[0]

                if (preDs === 'ds') {
                    let dsKey = Object.values(param)[0]?.name.toString().split(':')[1]
                    let dsValue = Object.values(param)[0]?.name.toString().split(':')[2]
                    if (dsArr[dsKey]?.items) {
                        dsArr[dsKey]?.items.forEach((d) => {
                            arrayParams.push(`${Object.keys(param)}=${d[dsValue]}`)
                        })
                    }
                }

                if (preDs === 'fly') {
                    if (ls.vars) {
                        let lsKey = Object.values(param)[0]?.name.toString().split(':')[1]

                        if (ls.vars['prefix_' + lsKey]) {
                            if (ls?.vars[lsKey] && ls?.vars[lsKey] !== 'Invalid date' && ls?.vars[lsKey] !== '__no_name__') {
                                arrayParams.push(`${Object.keys(param)}${ls.vars['prefix_' + lsKey]}${ls.vars[lsKey]}`)
                            }
                        } else {
                            if (ls?.vars[lsKey] && ls?.vars[lsKey] !== 'Invalid date' && ls?.vars[lsKey] !== '__no_name__') {
                                arrayParams.push(`${Object.keys(param)}=${ls?.vars[lsKey]}`)
                            }
                        }
                    }
                }

                if (preDs === 'sys_vars') {
                    let sysVars = param && Object.values(param)[0].name.toString()?.split('=')[0]?.split(':')[1]

                    if (settings) {
                        settings[0]?.sys_vars && Object.keys(settings[0].sys_vars).forEach((_: any) => {
                            arrayParams.push(`${Object.keys(param).toString()}=${settings[0].sys_vars[sysVars]}`)
                        })
                    }
                }

                if (preDs !== 'ds' && preDs !== 'fly' && preDs !== 'sys_vars') {
                    arrayParams.push(`${Object.keys(param)}=${Object.values(param)[0].name}`)
                }
            })

            let randomKey = cmp && cmp?.getUrl?.random ? `&${Math.random().toString()}` : ''

            if (cmp?.getUrl?.baseUrl) {
                href = cmp?.getUrl?.baseUrl + '?' + arrayParams.join('&') + randomKey
            }
        }
    }


    if ((cmp.props?.type === 'link'))
        return <>
            {cmp.anchor && <ScrollableAnchor id={`${cmp.anchor}`}>
                <span>''</span>
            </ScrollableAnchor>}

            {editor && <Editor cmp={cmp}/>}
            {
                href ? (
                    cmp?.getUrl?.download ? (
                        // @ts-ignore
                        <Link
                            style={cmp.style}
                            {...cmp.props}
                            href={href}
                            onClick={(e) => {
                                e.preventDefault();
                                downloadData(href.toString())
                                handleResetHrefInput()
                            }}

                        >
                            <Mapped text={mappedCaption}/>
                        </Link>
                        // @ts-ignore
                    ) : (<Link
                        style={cmp.style}
                        {...cmp.props}
                        onClick={handleResetHrefInput}
                        href={href}
                        rel={'noopener'}
                        target={"_blank"}
                    >
                        <Mapped text={mappedCaption}/>
                    </Link>)


                ) : (
                    // @ts-ignore
                    <Link
                        style={cmp.style}
                        {...cmp.props}
                        onClick={() => {
                            action.onClick()
                        }}><Mapped text={mappedCaption}/></Link>
                )
            }
        </>
    else
        return <>
            {cmp.anchor && <ScrollableAnchor id={`${cmp.anchor}`}>
                <span>''</span>
            </ScrollableAnchor>}

            {editor && <Editor cmp={cmp}/>}
            <Button
                style={cmp.style}
                onClick={actionButton}
                {...cmp.props}
                className={cmp.className}
                disabled={disabled}
            ><Mapped text={mappedCaption}/>
            </Button>&nbsp;
        </>
}

export default AntButton
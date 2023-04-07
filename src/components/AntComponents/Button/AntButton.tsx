import React, {useEffect, useState} from "react";
import Editor from "../Editor/Editor";
import {useAction, useActions, useTypedSelector} from "../../../hooks";
import {getDataSourceLs, getDataSourcesAll, getLsRequiredVarsByArrObj, getMappedText} from "../../../redux/ds/ds.selector";
import {RootState} from "../../../redux/redux.store";
import {IActionsType, IButton} from "../Page/templates";
import ScrollableAnchor from "react-scrollable-anchor";
import {getEditMode, getSettings} from "../../../redux/app/app.selector";
import {downloadData} from "../../../services/apiAction";
import AntButtonWrapper from "./AntButtonWrapper";

/**
 * Кнопка Button
 * @param cmp
 * @param editor - используется в таблице, отключаем эдитор
 * @item
 */

type IButtonType = {
    cmp: IButton
    editor?: boolean
    item?: any
}

const AntButton = ({cmp, editor = true}: IButtonType) => {
    const {setLsVars, response} = useActions()
    let cmp_details = {...cmp}
    const mappedCaption = useTypedSelector((state: RootState) => getMappedText(state, cmp_details?.caption))
    const action = useAction(cmp.actions as Array<IActionsType>, cmp_details.ds?.key ? cmp_details.ds?.key : cmp_details?.ds)
    const ls: {[key: string]: any} = useTypedSelector((state: RootState) => getDataSourceLs(state))
    const requiredVars: {[key: string]: any} = useTypedSelector((state: RootState) => getLsRequiredVarsByArrObj(state, cmp.reduxElement))

    const dsArr = useTypedSelector((state: RootState) => getDataSourcesAll(state));
    const settings = useTypedSelector((state: RootState) => getSettings(state));
    const [disabled, setDisabled] = useState<boolean>(false)
    const editMode = useTypedSelector((state: RootState) => getEditMode(state));

    useEffect(() => {
        setDisabled(false)
        cmp.reduxElement?.forEach((item: string) => {
            if (requiredVars[item] === false) {
                setDisabled(true)
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [requiredVars])

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
            let reduxElementObj: {[key: string]: string | number | undefined | null} | undefined = {}

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
                //executeDbProcedure('demo_geo/lcp_add_subtype', {obj: reduxElementObj}, [{key:'demo_geo/v_item_subtypes', filter: '__cur_page=1&__per_page=5&__filter=it_id=:1'}])
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
            Object.values(cmp?.getUrl?.params).forEach((param: {[key: string]: any}) => {
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

    let link = <></>

    if (cmp.onGetUrlFunc) {
        // link = <Button
        //     danger={cmp.danger}
        //     style={cmp.style}
        //     {...cmp.props}
        //     onClick={handleResetHrefInput}
        //     // href={href}
        //     // rel={'noopener'}
        //     // target={"_blank"}
        // >
        //     <Mapped text={mappedCaption} />
        // </Button>
        link = <AntButtonWrapper
            cmp={cmp}
            action={handleResetHrefInput}
            disabled={disabled}
            mappedText={mappedCaption}
        />


        if (cmp?.getUrl?.download && cmp?.getUrl?.random) {
            // link = <Button
            //     danger={cmp.danger}
            //     style={cmp.style}
            //     {...cmp.props}
            //     // href={href}
            //     onClick={(e) => {
            //         e.preventDefault();
            //         const link = document.createElement('a');
            //         link.href = href.toString();
            //         link.setAttribute('download', 'true'); //or any other extension
            //         link.setAttribute('target', '_blank'); //or any other extension
            //         document.body.appendChild(link);
            //         link.click();
            //         link.remove();
            //     }}
            // >
            //     <Mapped text={mappedCaption} />
            // </Button>
            link = <AntButtonWrapper
                cmp={cmp}
                action={(e) => {
                    e.preventDefault();
                    const link = document.createElement('a');
                    link.href = href.toString();
                    link.setAttribute('download', 'true'); //or any other extension
                    link.setAttribute('target', '_blank'); //or any other extension
                    document.body.appendChild(link);
                    link.click();
                    link.remove();
                }}
                disabled={disabled}
                mappedText={mappedCaption}
            />
        }

        if (cmp?.getUrl?.download) {
            // link = <Button
            //     danger={cmp.danger}
            //     style={cmp.style}
            //     {...cmp.props}
            //     // href={href}
            //     onClick={(e) => {
            //         e.preventDefault();
            //         downloadData(href.toString(), cmp?.getUrl?.params)
            //         handleResetHrefInput()
            //     }}
            // >
            //     <Mapped text={mappedCaption} />
            // </Button>
            link = <AntButtonWrapper
                cmp={cmp}
                action={(e) => {
                    e.preventDefault();
                    downloadData(href.toString(), cmp?.getUrl?.params)
                    handleResetHrefInput()
                }}
                disabled={disabled}
                mappedText={mappedCaption}
            />
        }

        if (cmp?.getUrl?.ajax) {
            // link = <Button
            //     danger={cmp.danger}
            //     style={cmp.style}
            //     {...cmp.props}
            //     href={href}
            //     onClick={(e) => {
            //         e.preventDefault();
            //         let ds = cmp?.getUrl?.baseUrl ?? 'ds'
            //         response(href.toString(), ds);
            //         handleResetHrefInput()
            //     }}
            // >
            //     <Mapped text={mappedCaption} />
            // </Button>
            link = <AntButtonWrapper
                cmp={cmp}
                action={(e: any) => {
                    e.preventDefault();
                    let ds = cmp?.getUrl?.baseUrl ?? 'ds'
                    response(href.toString(), ds);
                    handleResetHrefInput()
                }}
                disabled={disabled}
                mappedText={mappedCaption}
            />
        }
    }

    if ((cmp.onGetUrlFunc))
        return <div style={editMode ? {position: 'relative',  display:'inline-flex'}: {}}>
            {cmp.anchor && <ScrollableAnchor id={`${cmp.anchor}`}>
                <span />
            </ScrollableAnchor>}

            {editor && <Editor cmp={cmp} testEditorStyle={true}/>}

            {
                href && link
                // href ? (
                //     cmp?.getUrl?.download ? (
                //         // @ts-ignore
                //         <Link
                //             style={cmp.style}
                //             {...cmp.props}
                //             href={href}
                //             onClick={(e) => {
                //                 e.preventDefault();
                //                 downloadData(href.toString(), cmp?.getUrl?.params)
                //                 handleResetHrefInput()
                //             }}
                //         >
                //             <Mapped text={mappedCaption}/>
                //         </Link>
                //         // @ts-ignore
                //     ) : (<Link
                //         style={cmp.style}
                //         {...cmp.props}
                //         onClick={handleResetHrefInput}
                //         href={href}
                //         rel={'noopener'}
                //         target={"_blank"}
                //     >
                //         <Mapped text={mappedCaption}/>
                //     </Link>)
                //
                //
                // ) : (
                //     // @ts-ignore
                //     <Link
                //         style={cmp.style}
                //         {...cmp.props}
                //         onClick={() => {
                //             action.onClick()
                //         }}><Mapped text={mappedCaption}/></Link>
                // )
            }
        </div>
    else {
        return <div style={editMode ? {position: 'relative',  display:'inline-flex'}: {}}>
            {cmp.anchor && <ScrollableAnchor id={`${cmp.anchor}`}>
                <span />
            </ScrollableAnchor>}

            {editor && <Editor cmp={cmp} testEditorStyle={true}  />}
            <AntButtonWrapper
                cmp={cmp}
                action={actionButton}
                disabled={disabled}
                mappedText={mappedCaption}
            />
            {/* <Button
                {...cmp.props}
                danger={cmp.danger}
                style={cmp.style}
                onClick={actionButton}
                className={cmp.className}
                disabled={disabled}
            ><Mapped text={mappedCaption} />
            </Button>&nbsp; */}
        </div>
    }
}

export default AntButton
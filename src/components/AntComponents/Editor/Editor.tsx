import React, {CSSProperties, FC, useState} from "react";
import {templates} from "../Page/templates"
import {
    EditOutlined,
    DeleteOutlined,
    PlusCircleOutlined,
    ArrowUpOutlined,
    ArrowDownOutlined,
    StopOutlined,
    SettingOutlined,
    CopyOutlined,
    ScissorOutlined,
    FileDoneOutlined,
    FunctionOutlined,
    LockOutlined,
    LinkOutlined,
    ExclamationCircleOutlined
} from '@ant-design/icons';
import {Dropdown, Menu, MenuProps, Modal} from "antd";
import {ComponentInterface} from "../Page/templates";
import {useActions} from "../../../hooks/useActions";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {RootState} from "../../../redux/redux.store";
import {getEditMode} from "../../../redux/app/app.selector";
import EditorModal from "./EditorModal";
import {getCurrentCmp, getCurrentPage, getCurrentProject, getCutCmp} from "../../../redux/project/project.selector";
import {checkRequiredFields, DelClick} from "../../../utils";
import AntPopover from "../Popover/AntPopover";
import {IPage} from "../../../redux/project/project.initial";

type MenuItem = Required<MenuProps>['items'][number];

type EditorType = {
    cmp: ComponentInterface
    inputType?: string
    style?: any
    onMouseOver?: () => void
    onMouseOut?: () => void
    oldComponent?: boolean
    testEditorStyle?: boolean
    height? : string
    direction?: string
    left?: string
    rowStyle?: CSSProperties
}

const Editor: FC<EditorType> = (
    {
        cmp,
        inputType,
        style,
        onMouseOver = () => {
        },
        onMouseOut = () => {
        },
        oldComponent = false,
        testEditorStyle = false,
        height = '100%',
        direction= 'right',
        left= '0',
        rowStyle
    }) => {

    const [visible, setVisible] = useState(false);
    const {cmpMove, cmpDelete, cmpAdd, cmpAddToFooter, setCurrentCmp, setCutCmp} = useActions();
    const editMode = useTypedSelector((state: RootState) => getEditMode(state));
    const currentCmp = useTypedSelector((state: RootState) => getCurrentCmp(state));
    const cutOut = useTypedSelector((state: RootState) => getCutCmp(state));
    const currentPage = useTypedSelector((state: RootState) => getCurrentPage(state))
    const currentProject = useTypedSelector((state: RootState) => getCurrentProject(state))

    let addictions = currentProject?.addictions
    let addictionsObj: any = {}
    addictions?.forEach(item => {
        addictionsObj[item.id] = item
    })
    let isAcl = !!(cmp.acl && cmp.acl.length > 0)

    const confirmDelete = () => {
        Modal.confirm({
            title: 'Внимание!',
            icon: <StopOutlined/>,
            content: 'Вы действительно хотите удалить элемент?',
            okText: 'Да',
            cancelText: 'Нет',
            onOk: () => {
                currentPage && cmpDelete(cmp, currentPage);
            }
        });
    }

    const stylesPaste = {
        backgroundColor: 'lightgreen',
    };

    let editorStyle: React.CSSProperties = oldComponent ? {
        margin: '0 0 0 3px',
        padding: '0 4px 1px',
        cursor: 'pointer',
        color: 'red',
        boxShadow: '0 0 3px rgba(0, 0, 0, 0.3)',
        borderRadius: '5px',
        fontSize: '13px',
    } : {
        margin: '0 0 0 3px',
        padding: '0 4px 1px',
        cursor: 'pointer',
        color: 'green',
        boxShadow: '0 0 3px rgba(0, 0, 0, 0.3)',
        borderRadius: '5px',
        fontSize: '13px',
    }

    if (testEditorStyle) {
        editorStyle = {
            ...editorStyle,
            position: 'absolute',
            top: '0',
            height: height,
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'white',
            justifyContent: 'center',
            zIndex: 8,
        }
    }

    if(direction === 'left') {
        editorStyle = {
            ...editorStyle,
            left: left
        }
    } else {
        editorStyle = {
            ...editorStyle,
            right: '0px'
        }
    }

    if(rowStyle) {
        editorStyle = {
            ...editorStyle,
            ...rowStyle
        }
    }

    const onAddCmp = (templateCmp: ComponentInterface) => {
        let newCmp = JSON.parse(JSON.stringify(templateCmp))
        delete newCmp.editor
        setRandomKey(newCmp, cmp.page_key)
        currentPage && cmpAdd(cmp, newCmp, currentPage)
    }

    const onAddToFooterCmp = (templateCmp: ComponentInterface) => {
        let newCmp = JSON.parse(JSON.stringify(templateCmp))
        delete newCmp.editor
        setRandomKey(newCmp, cmp.page_key)
        currentPage && cmpAddToFooter(cmp, newCmp, currentPage)
    }

    const addCopiedCmp = (cmp: ComponentInterface) => {
        let newCmp = JSON.parse(JSON.stringify(currentCmp));
        changeRandomKey(newCmp);
        currentPage && cmpAdd(cmp, newCmp, currentPage);
        if (cutOut) {
            currentPage && cmpDelete(currentCmp, currentPage);
        }
    }

    const setRandomKey = (newCmp: any, page_key: any) => {
        newCmp.key = newCmp.type + '_' + Math.floor(Math.random() * 1000000);
        newCmp.page_key = page_key

        newCmp.children?.forEach((item: any) => {

            item.key = item.type + '_' + Math.floor(Math.random() * 1000000);
            item.page_key = page_key

            item.children?.forEach((child_item: any) => {
                setRandomKey(child_item, page_key)
            })
        })
        newCmp.footerChildren?.forEach((item: any) => {

            item.key = item.type + '_' + Math.floor(Math.random() * 1000000);
            item.page_key = page_key

            item.children?.forEach((child_item: any) => {
                setRandomKey(child_item, page_key)
            })
        })
    }

    const checkAddiction = () => {
        if (Array.isArray(cmp.addiction)) {
            return !!cmp.addiction.length
        } else {
            return !!cmp.addiction
        }
    }

    const changeRandomKey = (newCmp: any) => {
        newCmp.key = newCmp.type + '_' + Math.floor(Math.random() * 1000000000);

        newCmp.children?.forEach((item: any) => {
            item.key = item.type + '_' + Math.floor(Math.random() * 1000000000);

            item.children?.forEach((child_item: any) => {
                changeRandomKey(child_item)
            })
            item.footerChildren?.forEach((child_item: any) => {
                changeRandomKey(child_item)
            })
        })

        return newCmp
    }

    const onKeyDown = (evt: any) => {
        evt.preventDefault();
        if (evt.ctrlKey) {
            switch (evt.keyCode) {
                case 67:
                    setCurrentCmp(cmp);
                    setCutCmp(false);
                    break;
                case 88:
                    setCurrentCmp(cmp);
                    setCutCmp(true);
                    break;
                case 86:
                    addCopiedCmp(cmp)
                    break;
                default:
                    break;
            }
        }

        DelClick(evt.keyCode) && confirmDelete();
    }

    const getItems = () => {
        let itemsArr: MenuItem[] = [];

        oldComponent && itemsArr.push({
            label: (
                <div onClick={() => setVisible(true)}>
                    Устаревший компонент
                    {cmp.type === 'Form' ? <span>,<br/>испльзуйте FlyInputs</span> : <></>}
                </div>
            ),
            key: 'danger',
            icon: <ExclamationCircleOutlined/>,
            danger: true
        });
        itemsArr.push({
            label: (
                <div onClick={() => setVisible(true)}>
                    Редактировать
                </div>
            ),
            key: 'edit',
            icon: <EditOutlined/>,
        });
        itemsArr.push({
            label: (
                <div onClick={() => cmpMove(cmp, "up")}>
                    Поднять
                </div>
            ),
            key: 'up',
            icon: <ArrowUpOutlined/>,
        });
        itemsArr.push({
            label: (
                <div onClick={() => cmpMove(cmp, "down")}>
                    Опустить
                </div>
            ),
            key: 'down',
            icon: <ArrowDownOutlined/>,
        });
        itemsArr.push({
            label: (
                <div onClick={() => {
                    setCurrentCmp(cmp);
                    setCutCmp(false);
                }}>
                    Копировать <span style={{fontSize: '9px'}}>{cmp.key}</span>
                </div>
            ),
            key: 'copy',
            icon: <CopyOutlined/>,
        });
        itemsArr.push({
            label: (
                <div onClick={() => {
                    setCurrentCmp(cmp);
                    setCutCmp(true)
                }}>
                    Вырезать <span style={{fontSize: '9px'}}>{cmp.key}</span>
                </div>
            ),
            key: 'cut',
            icon: <ScissorOutlined/>,
        });
        currentCmp && cmp?.children && itemsArr.push({
            label: (
                <div onClick={() => addCopiedCmp(cmp)}>
                    Вставить <span style={{fontSize: '9px'}}>{currentCmp.key}
                    <u>{cutOut && '(будет удален из места копирования)'}</u> </span>
                </div>
            ),
            key: 'paste',
            icon: <FileDoneOutlined/>,
            style: stylesPaste
        });
        templates[cmp.type]?.children !== undefined && itemsArr.push({
            label: (
                <span onClick={() => console.log("Добавить")}>
                    Добавить дочерний
                </span>
            ),
            key: `${cmp.key}_children`,
            icon: <PlusCircleOutlined/>,
            children: [
                ...Object.keys(templates).sort().map((key: string, index: number) => {
                        return {
                            label: (
                                <div
                                    onClick={() => onAddCmp(templates[key])}>{templates[key].type}</div>
                            ),
                            key: `${cmp.key}-${key}-${index}`,
                        }
                    }
                )
            ],
            popupClassName: 'new_menu_tested_className',
        });
        templates[cmp.type]?.footerChildren !== undefined && itemsArr.push({
            label: (
                <span onClick={() => console.log("Добавить")}>
                    Добавить в футер
                </span>
            ),
            key: `${cmp.key}_footerchildren`,
            icon: <PlusCircleOutlined/>,
            children: [
                ...Object.keys(templates).sort().map((key: string, index: number) => {
                        return {
                            label: (
                                <div
                                    onClick={() => onAddToFooterCmp(templates[key])}>{templates[key].type}</div>
                            ),
                            key: `${cmp.key}-${key}-${index}`,
                        }
                    }
                )
            ],
            popupClassName: 'new_menu_tested_className',
        });
        itemsArr.push({
            label: (
                <div onClick={confirmDelete}>
                    Удалить
                </div>
            ),
            key: 'delete',
            icon: <DeleteOutlined/>,
            danger: true,
        });
        checkAddiction() && itemsArr.push({
            label: (
                <div>
                    {Array.isArray(cmp.addiction) ? cmp.addiction.map((addict) => addictionsObj[addict]?.title).join(', ') : addictionsObj[cmp.addiction]?.title}
                </div>
            ),
            key: 'fx',
            icon: <FunctionOutlined/>,
            style: {
                color: '#0072ff',
                fontStyle: 'italic',
            },
        });
        !!cmp.acl?.length && itemsArr.push({
            label: (
                <div>
                    {cmp.acl.map((role: string) => role).join(', ')}
                </div>
            ),
            key: 'acl',
            icon: <LockOutlined/>,
            style: {
                color: 'tomato',
                fontStyle: 'italic',
            },
        });

        return itemsArr
    }
    // const {SubMenu} = Menu;
    const menu = editMode ? (
        <Menu
            items={getItems()}
        />

        // <Menu>
        //     {oldComponent &&
        //         <Menu.Item danger icon={<ExclamationCircleOutlined />} key={'danger'} onClick={() => setVisible(true)}>
        //             Устаревший компонент
        //             {cmp.type === 'Form' ? <span>,<br />испльзуйте FlyInputs</span> : <></>}
        //         </Menu.Item>
        //     }
        //     <Menu.Item icon={<EditOutlined />} key={'edit'} onClick={() => setVisible(true)}>
        //         Редактировать
        //     </Menu.Item>
        //     <Menu.Item icon={<ArrowUpOutlined />} key={'up'} onClick={() => {
        //         cmpMove(cmp, "up")
        //     }}>
        //         Поднять
        //     </Menu.Item>
        //     <Menu.Item icon={<ArrowDownOutlined />} key={'down'} onClick={() => {
        //         cmpMove(cmp, "down")
        //     }}>
        //         Опустить
        //     </Menu.Item>

        //     <Menu.Item icon={<CopyOutlined />} key={'copy'} onClick={() => {
        //         setCurrentCmp(cmp);
        //         setCutCmp(false);
        //     }}>
        //         Копировать <span style={{fontSize: '9px'}}>{cmp.key}</span>
        //     </Menu.Item>

        //     <Menu.Item icon={<ScissorOutlined />} key={'cut'} onClick={() => {
        //         setCurrentCmp(cmp);
        //         setCutCmp(true)
        //     }}>
        //         Вырезать <span style={{fontSize: '9px'}}>{cmp.key}</span>
        //     </Menu.Item>

        //     {currentCmp && cmp?.children && <Menu.Item style={stylesPaste} icon={<FileDoneOutlined />} key={'past'} onClick={() => {
        //         addCopiedCmp(cmp);
        //     }}>
        //         Вставить <span style={{fontSize: '9px'}}>{currentCmp.key} <u>{cutOut && '(будет удален из места копирования)'}</u> </span>
        //     </Menu.Item>}

        //     {templates[cmp.type]?.children !== undefined &&
        //         <SubMenu key={cmp.key} title="Добавить дочерний" icon={<PlusCircleOutlined />}>
        //             <div style={{maxHeight: '500px', overflowY: 'scroll'}}>
        //                 {Object.keys(templates).sort().map((key: string, index: number) =>
        //                     <Menu.Item key={cmp.key + "-" + key + "-" + index}
        //                         onClick={() => onAddCmp(templates[key])}>{templates[key].type}</Menu.Item>)}
        //             </div>
        //         </SubMenu>
        //     }

        //     <Menu.Item icon={<DeleteOutlined />} key={'delete'} danger onClick={confirmDelete}>
        //         Удалить
        //     </Menu.Item>

        //     {checkAddiction() && <Menu.Item icon={<FunctionOutlined />} key={'fx'} style={{color: '#0072ff', fontStyle: 'italic'}}>
        //         {Array.isArray(cmp.addiction) ? cmp.addiction.map((addict) => addictionsObj[addict]?.title).join(', ') : addictionsObj[cmp.addiction]?.title}
        //     </Menu.Item>}

        //     {cmp.acl?.length ? <Menu.Item icon={<LockOutlined />} key={'acl'} style={{color: 'red', fontStyle: 'italic'}}>
        //         {cmp.acl.map((role: string) => role).join(', ')}
        //     </Menu.Item> : <></>}
        // </Menu>
    ) : (
        <>
        </>
    );

    return <>
        {editMode && !cmp.ext && <>
            {/*<br/>*/}
            <Dropdown overlay={menu}
                      arrow
                      trigger={['click']}
            >
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a href="#"
                   onMouseOut={onMouseOut}
                   onMouseOver={onMouseOver}
                   onClick={(e) => {
                       e.stopPropagation();
                   }}
                   onKeyDown={(evt) => onKeyDown(evt)}
                    // onKeyPress={(evt) => onKeyDown(evt)}
                   style={editorStyle}>
                    {/*<SettingOutlined style={style}/>&nbsp;*/}

                    { rowStyle || inputType ? inputType : cmp.type}

                    {testEditorStyle && !!cmp.addiction?.length && <span style={{color: '#0072ff'}}><FunctionOutlined/></span>}
                    {testEditorStyle && isAcl && <span style={{color: 'red'}}><LockOutlined/></span>}
                    {testEditorStyle && cmp.anchor && <span style={{color: 'black'}}><LinkOutlined/></span>}

                    {!testEditorStyle && <>&nbsp;<span>
                        &nbsp;
                        {!!cmp.addiction?.length && <span style={{color: '#0072ff'}}><FunctionOutlined/></span>}
                        {isAcl && <span style={{color: 'red'}}><LockOutlined/></span>}
                        {cmp.anchor && <span style={{color: 'black'}}><LinkOutlined/></span>}
                        {!checkRequiredFields(cmp).reply && <AntPopover
                            title={
                                <span style={{color: 'tomato'}}><ExclamationCircleOutlined/></span>
                            }
                            hoverText={<b style={{color: 'tomato'}}>{checkRequiredFields(cmp).message}</b>}
                            underline={false}
                        />}
                    </span></>}
                </a>
            </Dropdown>
            {/*<br/>*/}
        </>}
        {visible && <EditorModal cmp={cmp} setVisible={setVisible}/>}
    </>
}

export default Editor

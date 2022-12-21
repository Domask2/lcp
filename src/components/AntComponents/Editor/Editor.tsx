import React, {FC, useState} from "react";
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
import {Dropdown, Menu, Modal} from "antd";
import {ComponentInterface} from "../Page/templates";
import {useActions} from "../../../hooks/useActions";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {RootState} from "../../../redux/redux.store";
import {getEditMode} from "../../../redux/app/app.selector";
import EditorModal from "./EditorModal";
import {getCurrentCmp, getCurrentPage, getCurrentProject, getCutCmp} from "../../../redux/project/project.selector";
import {checkRequiredFields, DelClick} from "../../../utils";
import AntPopover from "../Popover/AntPopover";

type EditorType = {
    cmp: ComponentInterface
    inputType?: string
    style?: any
    onMouseOver?: () => void
    onMouseOut?: () => void
}
const Editor: FC<EditorType> = (
    {
        cmp,
        inputType,
        style,
        onMouseOver = () => { },
        onMouseOut = () => { },
    }) => {
    const [visible, setVisible] = useState(false);
    const {cmpMove, cmpDelete, cmpAdd, setCurrentCmp, setCutCmp} = useActions();
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
            icon: <StopOutlined />,
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

    const onAddCmp = (templateCmp: ComponentInterface) => {
        let newCmp = JSON.parse(JSON.stringify(templateCmp))
        delete newCmp.editor
        setRandomKey(newCmp, cmp.page_key)
        currentPage && cmpAdd(cmp, newCmp, currentPage)
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
        })

        return newCmp
    }

    const {SubMenu} = Menu;
    const menu = editMode ? (
        <Menu>
            <Menu.Item icon={<EditOutlined />} key={'edit'} onClick={() => setVisible(true)}>
                Редактировать
            </Menu.Item>
            <Menu.Item icon={<ArrowUpOutlined />} key={'up'} onClick={() => {
                cmpMove(cmp, "up")
            }}>
                Поднять
            </Menu.Item>
            <Menu.Item icon={<ArrowDownOutlined />} key={'down'} onClick={() => {
                cmpMove(cmp, "down")
            }}>
                Опустить
            </Menu.Item>

            <Menu.Item icon={<CopyOutlined />} key={'copy'} onClick={() => {
                setCurrentCmp(cmp);
                setCutCmp(false);
            }}>
                Копировать <span style={{fontSize: '9px'}}>{cmp.key}</span>
            </Menu.Item>

            <Menu.Item icon={<ScissorOutlined />} key={'cut'} onClick={() => {
                setCurrentCmp(cmp);
                setCutCmp(true)
            }}>
                Вырезать <span style={{fontSize: '9px'}}>{cmp.key}</span>
            </Menu.Item>

            {currentCmp && cmp?.children && <Menu.Item style={stylesPaste} icon={<FileDoneOutlined />} key={'past'} onClick={() => {
                addCopiedCmp(cmp);
            }}>
                Вставить <span style={{fontSize: '9px'}}>{currentCmp.key} <u>{cutOut && '(будет удален из места копирования)'}</u> </span>
            </Menu.Item>}

            {templates[cmp.type].children !== undefined &&
                <SubMenu key={cmp.key} title="Добавить дочерний" icon={<PlusCircleOutlined />}>
                    <div style={{maxHeight: '500px', overflowY: 'scroll'}}>
                        {Object.keys(templates).map((key: string, index: number) =>
                            <Menu.Item key={cmp.key + "-" + key + "-" + index}
                                onClick={() => onAddCmp(templates[key])}>{templates[key].type}</Menu.Item>)}
                    </div>
                </SubMenu>}
            <Menu.Item icon={<DeleteOutlined />} key={'delete'} danger onClick={confirmDelete}>
                Удалить
            </Menu.Item>

            {checkAddiction() && <Menu.Item icon={<FunctionOutlined />} key={'fx'} style={{color: '#0072ff', fontStyle: 'italic'}}>
                {Array.isArray(cmp.addiction) ? cmp.addiction.map((addict) => addictionsObj[addict]?.title).join(', ') : addictionsObj[cmp.addiction]?.title}
            </Menu.Item>}
            {cmp.acl?.length ? <Menu.Item icon={<LockOutlined />} key={'acl'} style={{color: 'red', fontStyle: 'italic'}}>
                {cmp.acl.map((role: string) => role).join(', ')}
            </Menu.Item> : <></>}

        </Menu>
    ) : (
        <></>
    );

    return <>
        {editMode && !cmp.ext && <>
            <br />
            <Dropdown overlay={menu} arrow trigger={['click']}>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a href="#"
                    onMouseOut={onMouseOut}
                    onMouseOver={onMouseOver}
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                    onKeyDown={(evt) => {
                        DelClick(evt.code) && confirmDelete();
                    }}
                    style={{
                        margin: '0 0 0 3px',
                        padding: '0 4px 1px',
                        cursor: 'pointer',
                        color: 'green',
                        boxShadow: '0 0 3px rgba(0, 0, 0, 0.3)',
                        borderRadius: '5px',
                        fontSize: '13px'
                    }}>
                    <SettingOutlined style={style} />&nbsp;<span>
                        {inputType ? inputType : cmp.type}
                        &nbsp;
                        {!!cmp.addiction?.length && <span style={{color: '#0072ff'}}><FunctionOutlined /></span>}
                        {isAcl && <span style={{color: 'red'}}><LockOutlined /></span>}
                        {cmp.anchor && <span style={{color: 'black'}}><LinkOutlined /></span>}
                        {!checkRequiredFields(cmp).reply && <AntPopover
                            title={
                                <span style={{color: 'tomato'}}><ExclamationCircleOutlined /></span>
                            }
                            hoverText={<b style={{color: 'tomato'}}>{checkRequiredFields(cmp).message}</b>}
                            underline={false}
                        />}
                    </span>
                </a>
            </Dropdown>
            <br />
        </>}
        {visible && <EditorModal cmp={cmp} setVisible={setVisible} />}
    </>
}

export default Editor
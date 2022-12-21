import React, {useState} from 'react';
import {useTypedSelector} from '../../../../hooks';
import AddictionContainer from '../../../addiction/AddictionContainer';
import ActionsConstructor from '../../../actions/ActionsConstructor';

import {FunctionForm} from "../../Page/FunctionForm";
import {getCurrentProject} from '../../../../redux/project/project.selector';
import {searchRoles} from '../../../../utils';

import {Button, Card, Checkbox, Input, Modal, Popconfirm, Select} from "antd";
import {DeleteOutlined, MoreOutlined, PlusCircleOutlined} from '@ant-design/icons';
import {templates} from "../../Page/templates";
import {RootState} from '../../../../redux/redux.store';

/**
 * Компонент для редактирования массива объектов
 * [
 *  {
 *      route: 'route 1',
 *      title: 'title 1'
 *  },
 *  {
 *      route: 'route 2',
 *      title: 'title 2'
 *  }
 * ]
 *
 * Компонента принимает:
 *  - list - сам массив объектов
 *  - setList - callback функция принимающая новый массив для обновления в системе
 *  - template - шаблон объекта в массиве, на случай если массив пуст
 */
type ArrayObjectsEditorType = {
    list: Array<any>
    setList: (v: Array<any>) => void
    template: {[v: string]: any}
    cmp?: any
}

const ArrayObjectsEditor: React.FC<ArrayObjectsEditorType> = ({list, setList, template, cmp}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [newItem, setNewItem] = useState<any>(template)
    const [currentAction, setCurrentAction] = useState<any>(template)
    const [clean, setClean] = useState<boolean>(false);

    const showModal = (item: any) => {
        setCurrentAction(item);
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
        setClean(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setClean(false);
    };

    const deleteItem = (index: number) => {
        let newList: Array<any> = []
        list.forEach((item, ind) => {
            if (ind !== index)
                newList.push(item)
        })
        setList(newList)
    }

    const addItem = () => {
        let newList: any = []
        if (list !== undefined)
            newList = [...list]

        newList.push({...newItem})
        setList(newList)
        // Object.keys(template).forEach(key => newItem[key] = '')
        setNewItem(template)
    }

    const onChangeNewItem = (e: React.ChangeEvent<HTMLInputElement>) => {
        newItem[e.currentTarget.name] = e.currentTarget.value
        setNewItem({...newItem})
    }

    const changeItem = (e: React.ChangeEvent<HTMLInputElement>) => {
        const arr = e.currentTarget.name.split('_')
        const key = arr[0]
        const ind: any = arr[1]

        list[ind][key] = e.currentTarget.value
        setList([...list])
    }

    const openNewAction = (e: any) => {
        setCurrentAction({})
        setClean(true);
        setIsModalVisible(true);
    }

    const changeItemAction = (action: any) => {
        if (clean) {
            newItem.actions = [action]
            setNewItem({...newItem});
            handleOk();
        } else {
            const index = list.findIndex((item: any) => item.title === currentAction.title);
            list[index].actions = [action];
            setList([...list])
            handleOk();
        }
    }

    const currentProject = useTypedSelector((state: RootState) => getCurrentProject(state))?.navigation;
    const pathName = document.location.pathname
    let arr = pathName.split('/');
    arr.splice(0, 2);
    let projectRoles = searchRoles(currentProject, arr, 0) ? searchRoles(currentProject, arr, 0) : [];

    function renderInputSwitch(key: string, item: any, index: number, addNew: boolean = false) {

        const handleAclAdd = (value: any) => {
            if (addNew) {
                newItem.acl = value
                setNewItem({...newItem});
            } else {
                const index = list.findIndex((el: any) => el.title === item.title);
                list[index].acl = value;
                setList([...list])
            }
        }

        const handleVisibleAdd = (value: any) => {
            if (addNew) {
                newItem.visible = Boolean(value)
                setNewItem({...newItem});
            } else {
                const index = list.findIndex((el: any) => el.title === item.title);
                list[index].visible = Boolean(value);
                setList([...list])
            }

        }

        const handleAddictionAdd = (value: any) => {
            if (addNew) {
                newItem.addiction = value
                setNewItem({...newItem});
            } else {
                const index = list.findIndex((el: any) => el.title === item.title);
                list[index].addiction = value;
                setList([...list])
            }
        }

        const handleConfirm = (evt: any) => {
            if (addNew) {
                newItem.confirm = evt.target.checked
                setNewItem({...newItem});
            } else {
                const index = list.findIndex((el: any) => el.title === item.title);
                list[index].confirm = evt.target.checked;
                setList([...list])
            }
        }

        const handleModal = (evt: any) => {
            if (addNew) {
                // newItem.modal = {isModal: evt.target.checked}

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

                let newCmp = JSON.parse(JSON.stringify(templates.Modal))
                delete newCmp.editor
                setRandomKey(newCmp, cmp.page_key)

                newItem.modal = {cmpModal: newCmp, isModal: evt.target.checked}
                setNewItem({...newItem});
            } else {
                const index = list.findIndex((el: any) => el.title === item.title);
                list[index].modal = evt.target.checked;
                setList([...list])
            }
        }


        switch (key) {
            case 'actions':
                return (
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '8px'
                    }}>
                        {addNew ? (
                            <>
                                <Input style={{borderBottom: 'none', fontSize: '12px'}} value={newItem.actions[0]?.actionName} className="lcEditorInput"
                                    name={key + '_' + 1} />
                                <Button style={{height: '26px', fontSize: '12px'}} type='link'
                                    onClick={(e) => openNewAction(e)}>
                                    <MoreOutlined />
                                </Button>
                            </>
                        ) : (
                            <>
                                <Input style={{borderBottom: 'none', fontSize: '12px'}} value={item.actions && item.actions.length && item.actions[0]?.actionName ? item.actions[0].actionName : item[key]} className="lcEditorInput"
                                    name={key + '_' + index} onChange={changeItem} />
                                <Button style={{height: '26px', fontSize: '12px'}} type='link'
                                    onClick={() => showModal(item)}>
                                    <MoreOutlined />
                                </Button>
                            </>
                        )}
                    </div>
                );
            case 'acl':
                return (
                    <div style={{
                        width: '100%',
                        minWidth: '200px',
                        display: 'flex',
                        alignItems: 'center',
                        padding: '5px 0'
                    }}>

                        {addNew ? (
                            <Select
                                mode='multiple'
                                showSearch
                                placeholder="Inserted are removed"
                                value={newItem.acl}
                                onChange={(e) => handleAclAdd(e)}
                                style={{width: '100%', fontSize: '12px'}}
                            >
                                {projectRoles.map((role: any) => (
                                    <Select.Option key={role} value={role} >
                                        {role}
                                    </Select.Option>
                                ))}
                            </Select>
                        ) : (
                            <Select
                                mode='multiple'
                                showSearch
                                placeholder="Inserted are removed"
                                value={item.acl ? item.acl : []}
                                onChange={(e) => handleAclAdd(e)}
                                style={{width: '100%', fontSize: '12px'}}
                            >
                                {projectRoles.map((role: any) => (
                                    <Select.Option key={`${item.title}_${role}`} value={role} >
                                        {role}
                                    </Select.Option>
                                ))}
                            </Select>
                        )}
                    </div>
                );
            case 'visible':
                return (
                    <div style={{
                        width: '100%',
                        minWidth: '80px',
                        display: 'flex',
                        alignItems: 'center',
                        padding: '5px 0'
                    }}>
                        {addNew ? (
                            <Select
                                value={newItem.visible !== false ? 'True' : 'False'}
                                onChange={handleVisibleAdd}
                                style={{width: '100%', fontSize: '12px'}}
                            >
                                <Select.Option value={1}>True</Select.Option>
                                <Select.Option value={0}>False</Select.Option>
                            </Select>
                        ) : (
                            <Select
                                showSearch
                                value={item.visible !== false ? 'True' : 'False'}
                                onChange={handleVisibleAdd}
                                style={{width: '100%', fontSize: '12px'}}
                            >
                                <Select.Option value={1}>True</Select.Option>
                                <Select.Option value={0}>False</Select.Option>
                            </Select>
                        )}
                    </div>
                );
            case 'addiction':
                return <div style={{
                    width: '100%',
                    minWidth: '240px',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '5px 0'
                }}>
                    <AddictionContainer setState={handleAddictionAdd} cmp={cmp} addictionId={item.addiction} title={false} />
                </div>

            case 'confirm':
                return <Checkbox style={{width: '100%', display: 'flex', justifyContent: 'center'}} onChange={handleConfirm} defaultChecked={item.confirm} />

            case 'modal':
                return <Checkbox style={{width: '100%', display: 'flex', justifyContent: 'center'}} onChange={handleModal} defaultChecked={item?.modal?.isModal} />

            case 'actionsDetails':
                break;

            default:
                return addNew ? (
                    <Input value={newItem[key]}
                        name={key}
                        className="lcEditorInput"
                        style={{borderBottom: 'none', padding: '10px 5px', fontSize: '12px'}}
                        onChange={onChangeNewItem} />
                ) : (
                    <Input style={{borderBottom: 'none', padding: '10px 5px', fontSize: '12px'}} value={item[key]} className="lcEditorInput"
                        name={key + '_' + index} onChange={changeItem} />
                )

        }

    }

    return <Card size="small">
        <table className="tableList">
            <thead>
                <tr>
                    <th>#</th>
                    {Object.keys(template).map(key => <th key={'th_' + key}>{key}</th>)}
                    <th>&nbsp;</th>
                </tr>
            </thead>
            <tbody>
                {
                    list?.map((item: any, index: number) => <tr style={{borderBottom: '1px solid #eee'}} key={'key_' + index}>
                        <td style={{padding: '11px 5px', fontSize: '12px'}} width={30} className="edit-list-td-first">{index + 1}</td>
                        {Object.keys(template).map(key => <td key={'td_input_' + key} >

                            {renderInputSwitch(key, item, index)}

                        </td>)}
                        <td width={30} className="edit-list-td-last" align="center">
                            <Popconfirm placement="right" title='Точно удалить?' onConfirm={() => deleteItem(index)}
                                okText="Yes" cancelText="No">
                                <Button type="link" danger
                                    icon={<DeleteOutlined />} />
                            </Popconfirm>
                        </td>


                    </tr>)
                }
                <tr style={{borderBottom: '1px solid #eee'}}>
                    <td className="edit-list-td-first">&nbsp;</td>
                    {Object.keys(template).map(key => <td key={'new_item_' + key}>

                        {renderInputSwitch(key, 0, 0, true)}

                    </td>)}
                    <td className="edit-list-td-last" align="center">
                        <Button type="link"
                            onClick={addItem}
                            icon={<PlusCircleOutlined />} />
                    </td>
                </tr>
            </tbody>
        </table>
        {isModalVisible ? <Modal
            width={1000}
            style={{top: 0}}
            bodyStyle={{border: '5px solid #ba5fff', borderWidth: '7px 0 0 0'}}
            open={true}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={false}
        >
            <h3>Настройка Actions</h3>

            <FunctionForm cmp={cmp} handleCancel={handleCancel} />

            <ActionsConstructor currentComponent={cmp} currentAction={currentAction?.actions ? currentAction.actions[0] : currentAction.actions} setAction={changeItemAction} />

        </Modal> : ''}
    </Card>
};

export default ArrayObjectsEditor;
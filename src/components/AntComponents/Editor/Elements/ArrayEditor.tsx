import React, {useState} from 'react';
import {useActions} from "../../../../hooks/useActions";
import {FunctionForm} from '../../Page/FunctionForm';
import ActionsConstructor from '../../../actions/ActionsConstructor';
import {actionTemplate} from '../../../../utils';

import {Button, Col, Input, Modal, Popconfirm, Row, Select} from "antd";
import {DeleteOutlined, ControlOutlined, PlusCircleOutlined, MoreOutlined} from '@ant-design/icons';

import {IAction} from '../../../../redux/project/project.initial';
const {Option} = Select;
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
    cmp?: any,
    list: Array<any>
    setList: (v: Array<any>) => void
    selectList?: Array<string>
}

const ArrayEditor: React.FC<ArrayObjectsEditorType> = ({cmp, list, setList, selectList}) => {
    const {cmpUpdate} = useActions();

    const [currentAction, setCurrentAction] = useState<IAction>();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [clean, setClean] = useState<boolean>(false);
    const firstSel = selectList?.length ? selectList[0] : '';
    const [newItem, setNewItem] = useState<any>();
    const [curSel, setCurSel] = useState<string>(firstSel);

    const deleteItem = (index: number) => {
        let newList: Array<any> = [];
        list.forEach((item, ind) => {
            if (ind !== index)
                newList.push(item);
        })

        setList(newList)
    }

    const showModal = (item: any) => {
        setCurrentAction(item);
        setIsModalVisible(true);
    };

    const setNewItemFormModal = (event: any) => {
        if (clean) {
            setNewItem(event);
            handleOk();
        } else {

            let newModal = {...cmp};

            // edit form modal
            if (cmp.hasOwnProperty('submit')) {

                if (newModal.submit.typeSubmit === 'action') {
                    let indexEl = newModal.submit.actionsSubmit.findIndex((act: any) => act.actionName === currentAction?.actionName);
                    if (indexEl !== undefined) {
                        newModal.submit.actionsSubmit[indexEl] = event;
                    }
                } else {
                    let indexEl = newModal.submit.actionsSubmitFilter.findIndex((act: any) => act.actionName === currentAction?.actionName);
                    if (indexEl !== undefined) {
                        newModal.submit.actionsSubmitFilter[indexEl] = event;
                    }
                }

            } else {
                let indexEl = newModal.actions.findIndex((act: any) => act.actionName === currentAction?.actionName);
                if (indexEl !== undefined) {
                    newModal.actions[indexEl] = event;
                }
            }

            cmpUpdate(newModal);
            handleOk();
        }
    }

    const addItem = () => {
        let newList: any = [];
        if (list) {
            newList = [...list];
        }
        newList.push(newItem);
        setList(newList);
        setNewItem('');
    }

    const handleOk = () => {
        setIsModalVisible(false);
        setClean(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setClean(false);
    };

    const openNewAction = () => {
        setCurrentAction(actionTemplate);
        setClean(true);
        setIsModalVisible(true);
    }

    return <>
        {/*отобразим массив элементов в Input вместе с кнопкой редактировать и удалить*/}
        {
            list?.length ? (list?.map((val, index) => <Row key={index}>
                <Col flex="auto">
                    <Input value={typeof (val) === 'string' ? val : val.actionName}
                        style={{borderLeft: '1px dashed #ddd'}} className="lcEditorInput"
                        onChange={() => null}
                    />
                </Col>
                <Col flex='20px'>
                    <Button
                        size='small'
                        icon={<MoreOutlined />}
                        style={{width: '100%', border: 'none'}}
                        onClick={() => {
                            showModal(val)
                        }}
                    />
                </Col>
                <Col flex="20px">
                    <Popconfirm placement="right" title='Точно удалить?' onConfirm={() => deleteItem(index)}
                        okText="Yes" cancelText="No">
                        <Button
                            type="link"
                            style={{width: '100%', height: 1, lineHeight: 1}}
                            danger
                            icon={<DeleteOutlined />}
                        />
                    </Popconfirm>
                </Col>
            </Row>
            )) : null
        }

        {/*добавление нового значения в массив, вызов модального окна с констурктор action*/}
        <Row>
            <Col flex="auto">
                {
                    selectList?.length &&
                    <Input.Group compact>
                        <Select size="small"
                            defaultValue={curSel}
                            style={{
                                width: '20%',
                                borderBottom: '1px solid #eee',
                                backgroundColor: '#fff'
                            }}
                            onChange={(v: string) => {
                                setCurSel(v)
                            }}
                        >
                            {
                                selectList.map((item: string, index: number) =>
                                    <Option key={index} value={item}>{item}</Option>)
                            }
                        </Select>
                        <Input value={newItem.actionName}
                            className="lcEditorInput"
                            style={{
                                borderBottom: '1px dashed #ddd',
                                borderLeft: '1px dashed #ddd',
                                width: '80%',
                                height: '20px',
                            }}
                        // onChange={(e) => setNewItem(e.currentTarget.value)}
                        />
                    </Input.Group>
                }

                {
                    !selectList?.length && (
                        <Input value={newItem ? newItem.actionName : ''}
                            className="lcEditorInput"
                            placeholder='action'
                            size='small'
                            style={{width: '100%', borderLeft: '1px solid #eee'}}
                        // onChange={(e) => {setNewItem(e.currentTarget.value)}}
                        />
                    )
                }
            </Col>
            <Col flex="20px">
                <Button
                    size='small'
                    style={{width: '100%', border: 'none'}}
                    icon={<ControlOutlined />}
                    onClick={openNewAction}
                />
            </Col>
            <Col flex="20px">
                <Button
                    type="link"
                    size='small'
                    style={{width: '100%', border: 'none'}}
                    onClick={() => {
                        if (newItem) {
                            addItem()
                        }
                    }}
                    icon={<PlusCircleOutlined />}
                />
            </Col>
        </Row>

        {isModalVisible && <Modal
            width={1000}
            style={{top: 0}}
            bodyStyle={{border: '5px solid #ba5fff', borderWidth: '7px 0 0 0'}}
            open={true}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={false}
        >
            <h3>Настройка Actions</h3>

            <FunctionForm
                cmp={cmp}
                handleCancel={handleCancel}
                editing={false}
            />

            <ActionsConstructor
                currentComponent={cmp}
                currentAction={currentAction}
                setAction={setNewItemFormModal}
            />

        </Modal>}
    </>
};

export default ArrayEditor;
import React, {useState} from "react";
import moment from 'moment'
import {Button, DatePicker, Form, Input, Modal} from "antd";
import {PlusOutlined, EditOutlined} from '@ant-design/icons';
import {IColumn, IDataSource} from "../../../redux/ds/ds.initial";
import {useActions} from "../../../hooks/useActions";

interface AddRecordInterface {
    ds: IDataSource
    action: "add" | "edit"
    item?: any,
    disable: boolean
}

const AddRecord = ({ds, action, item, disable}: AddRecordInterface) => {
    const {createRecord, editRecord} = useActions()

    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [form] = Form.useForm();

    const showModal = () => {
        setIsModalVisible(true);
    };

    const showModalEdit = () => {
        ds.columns.forEach((col) => {
            let fld: any = {}
            if (col.type === 'date')
                fld[col.key] = moment(item[col.key])
            else
                fld[col.key] = item[col.key]

            form.setFieldsValue(fld)
        })
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const onFinish = (values: any) => {
        if (action === 'add')
            createRecord(ds.key, values, "force")
        else if (action === 'edit') {
            type pkType = {[key: string]: any}
            let primaries: Array<pkType> = []
            ds.columns.filter(item => item.pk).forEach(pk => {
                let pkElem: pkType = {}
                pkElem[pk.key] = item[pk.key]
                primaries.push(pkElem)
            })
            editRecord(ds.key, values, primaries, "force")
        }

        form.resetFields();
        setIsModalVisible(false)
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    let btn, title
    if (action === "add") {
        btn = <Button size='small' type='link' style={{padding: "0 3px"}} onClick={showModal} disabled={disable}><PlusOutlined /> Добавить новую запись</Button>
        title = "Добавление записи"
    } else if (action === "edit") {
        btn = <Button size='small' type='link' style={{padding: "0 3px"}} onClick={showModalEdit} disabled={disable} ><EditOutlined /></Button>
        title = "Редактирование записи"
    }


    return <>
        {btn}

        <Modal title={title} open={isModalVisible} footer={false} onOk={handleOk}
            onCancel={handleCancel}>
            <Form
                form={form}
                name="basic"
                labelCol={{span: 8}}
                wrapperCol={{span: 16}}
                initialValues={{}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                {
                    ds.columns.map((column: any) => <ItemForm key={column.key} column={column} />)
                }
                <Form.Item wrapperCol={{offset: 8, span: 16}}>
                    <Button type="primary" htmlType="submit">
                        Сохранить
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    </>
}

interface IItemForm {
    column: IColumn
}

const ItemForm = ({column}: IItemForm) => {

    let input: any = ''
    switch (column.type) {
        case 'date':
            input = <DatePicker />
            break;
        case 'character varying':
        default:
            input = <Input />
            break;
    }
    if (column.pk)
        input = <Input disabled={true} />

    return <Form.Item
        label={column.title}
        name={column.key}
    >
        {input}
    </Form.Item>
}


export default AddRecord
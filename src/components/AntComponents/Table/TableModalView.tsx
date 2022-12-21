import {Button, Modal, Table} from "antd";
import React, {useState} from "react";
import {EyeOutlined} from '@ant-design/icons';
import serviceTable from "../../../services/serviceTable";

const TableModalView = ({value, entity}: any) => {
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const columns = [
        {
            'title': 'Колонка',
            'key': 'column',
            'dataIndex': 'column',
        }, {
            'title': 'Значение',
            'key': 'value',
            'dataIndex': 'value',
        }
    ]

    const getFields = (entity: any) => {
        let result: any = []
        entity.columns.forEach((item: any) => {
            if (item.visible)
                result.push({column: serviceTable.withOutNumber(item.title), value: entity.row[item.key], key: item.key})
        })

        return result
    }

    return <>
        <Button type="link" onClick={showModal}><EyeOutlined /> {value}</Button>

        <Modal title="Basic Modal" open={isModalVisible} onOk={handleOk}
            onCancel={handleCancel}>
            <Table size="small" dataSource={getFields(entity)}
                columns={columns} />
        </Modal>
    </>
}

export default TableModalView

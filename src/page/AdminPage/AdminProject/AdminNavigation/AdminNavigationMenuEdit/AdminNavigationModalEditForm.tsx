import React, {useState} from 'react';
import {Modal, Button} from 'antd';
import {AdminNavigationForm} from "../AdminNavigationForm/AdminNavigationForm";

export const AdminNavigationModalEditForm = ({
    projectKey,
    project,
    keyItem,
    editForm,
    typeBtn = 'text',
    nameForm = 'Редактировать страницу',
    iconForm,
    style,
    setActiveCollapse,
    id
}: any) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <div style={style}>
            <Button style={{width: '100%'}} type={typeBtn} onClick={showModal}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: ' center'}}>
                    <span>{nameForm}</span> {iconForm}
                </div>
            </Button>
            <Modal title={nameForm} open={isModalVisible} footer={null} onCancel={handleCancel}>
                <AdminNavigationForm
                    handleOk={handleOk}
                    handleCancel={handleCancel}
                    editForm={editForm}
                    project={project}
                    projectKey={projectKey}
                    keyItem={keyItem}
                    id={id}
                    setActiveCollapse={setActiveCollapse}
                />
            </Modal>
        </div>
    );
}

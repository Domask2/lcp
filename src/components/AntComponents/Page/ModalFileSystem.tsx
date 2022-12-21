import React, {FC, useState} from 'react';
import {FileSystemTable} from "../../DownLoad/FileSystemTable";
import {useLocation} from "react-router-dom";
import {getCurrentPage, getCurrentProject} from "../../../redux/project/project.selector";
import {Button, Card, Form, Input, Modal, Select, Upload} from "antd";
import {UploadOutlined} from "@ant-design/icons";
import {ApiDownload} from "../../../saga/api/api.download";
import {useTypedSelector} from "../../../hooks";
import {RootState} from "../../../redux/redux.store";
import {IFormValues} from "../DownLoad/type";

interface ModalFileSystemType {
    page: any,
    isModalOpen: any,
    setIsModalOpen: any
}

const ModalFileSystem: FC<ModalFileSystemType> = ({page, isModalOpen, setIsModalOpen}) => {
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState<any>();
    const currentProject = useTypedSelector((state: RootState) => getCurrentProject(state));
    const currentPage = useTypedSelector((state: RootState) => getCurrentPage(state));

    const normFile = (e: any) => {
        setFileList(e?.fileList)
    };

    const onFinish = (values: IFormValues) => {
        if (currentPage && currentProject && location) {
            const formData = new FormData();
            formData.append('url', 'project' + location.pathname);
            formData.append('title', values.title ?? '');
            formData.append('description', values.description ?? '');
            formData.append('visible', values.visible);
            formData.append('project', currentProject?.key ?? '');
            formData.append('pages', location.pathname.slice(1) ?? '');
            formData.append('number', fileList.length);

            fileList.forEach((file: any, index: number) => {
                formData.append(`file${index + 1}`, file.originFileObj);
            })

            ApiDownload.downloadStore(formData)
                .then((res:any) => {
                    setLoading(true)
            });
            setFileList(null);
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.error('Failed:', errorInfo);
    };

    return (
        <Modal width={'1000px'} title="File Modal" destroyOnClose open={isModalOpen}
               onOk={() => {
                   setIsModalOpen(false)
                   setLoading(true)
               }}
               onCancel={() => {
                   setIsModalOpen(false)
                   setLoading(true)
               }}>

            <Card>
                <Form
                    size={'small'}
                    preserve={false}
                    style={{margin: '8px'}}
                    form={form}
                    name="adminDownload"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    labelCol={{span: 3}}
                    wrapperCol={{span: 21}}
                >
                    <Form.Item label="File" valuePropName="fileList">
                        <div style={{display: 'flex'}}>
                            <Upload onChange={normFile}
                                    fileList={fileList}
                                    beforeUpload={() => false}
                                    name={'file'}
                                    maxCount={10}
                                    multiple
                            >
                                <Button style={{width: '120px'}} icon={<UploadOutlined/>}>Выбрать</Button>
                            </Upload>

                            <Button
                                type={fileList && 'primary'}
                                style={{width: '120px'}}
                                onClick={() => onFinish(form.getFieldsValue())}>
                                Сохранить
                            </Button>
                        </div>
                    </Form.Item>

                    <Form.Item label={'Title'} name={'title'}>
                        <Input/>
                    </Form.Item>

                    <Form.Item label={'Description'} name={'description'}>
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        initialValue={'true'}
                        label={'Visible'}
                        name={'visible'}
                    >
                        <Select>
                            <Select.Option key={'true'} value={'true'}>true</Select.Option>
                            <Select.Option key={'false'} value={'false'}>false</Select.Option>
                        </Select>
                    </Form.Item>
                </Form>

                <FileSystemTable loading={loading} setLoading={setLoading} page={page} modeLocation={true}/>
            </Card>

        </Modal>
    );
}

export default ModalFileSystem;
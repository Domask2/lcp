import React, {FC, useState} from "react";
import {FileSystemTable} from "./FileSystemTable";
import {Card, Col, Row, Form, Input, Button, Select, Upload} from "antd";
import {UploadOutlined} from '@ant-design/icons';
import {ApiDownload} from "../../saga/api/api.download";

interface AdminDownloadType {
    url: string, // стркоа url - адрес папок дял хаписи в хранилище
    project: string, // тип проекта поле в БД (lcp / users/ project)
    page?: string // тип страницы поле в БД (users/ project)
    strPage?: string // от куда читать проекты
}

const DownLoad: FC<AdminDownloadType> = ({url, project, page, strPage}) => {
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState<any>();
    const [loading, setLoading] = useState(true);

    const normFile = (e: any) => {
        setFileList(e?.fileList)
    };

    const onFinish = (values: any) => {
        const formData = new FormData();
        formData.append('url', url);
        formData.append('title', values.title ?? '');
        formData.append('description', values.description ?? '');
        formData.append('visible', values.visible);
        formData.append('project', project);
        page && formData.append('pages', page ?? '');
        formData.append('number', fileList.length);

        fileList.forEach((file: any, index: number) => {
            formData.append(`file${index + 1}`, file.originFileObj);
        })

        ApiDownload.downloadStore(formData).then((res: any) => {
            setLoading(true);
        });
        setFileList(null);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.error('Failed:', errorInfo);
    };

    return (
        <Row gutter={[16, 16]}>
            <Col span={24}>
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

                    <FileSystemTable strPage={strPage} loading={loading} setLoading={setLoading} modeLocation={false}/>
                </Card>
            </Col>
        </Row>
    )
}

export default DownLoad;
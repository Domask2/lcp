import React, {FC, useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {Avatar, Button, Form, Input, Modal, Popconfirm, Select, Table} from "antd";
import {baseUrl} from "../../saga/api/api";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {ApiDownload} from "../../saga/api/api.download";
import {IDownLoads, IFormValues} from "../AntComponents/DownLoad/type";

interface FileSystemTableType {
    page?: any //передать страницу проекта
    modeLocation?: boolean //использовать адрес строки в для url адреса
    loading: boolean,
    strPage?: string, //от куда читать поле page в БД
    setLoading: (b: boolean) => void
}

export const FileSystemTable: FC<FileSystemTableType> = ({page, strPage, modeLocation, loading, setLoading}) => {
    const [form] = Form.useForm();
    const location = useLocation();
    const [downloads, setDownloads] = useState<IDownLoads[] | []>([]);
    const [currentFile, setCurrentFile] = useState<IDownLoads | undefined>();
    const [isModalFileOpen, setIsModalFileOpen] = useState(false);

    let project = page ? page?.key?.split('/')[1] : strPage;
    let strLocationPath = modeLocation ? location.pathname.slice(1).split('/').join('=') : '';

    useEffect(() => {
        if (location) {
            ApiDownload.downloadShow('project', project, strLocationPath)
                .then((res: any) => {
                    setDownloads(res.downloads);
                    setLoading(false);
                })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, location, loading]);

    const onFinish = (values: IFormValues) => {
        if (currentFile) {

            let objValues: any = values
            objValues['id'] = currentFile?.id
            console.log(objValues);

            ApiDownload.downloadEdit(currentFile.id, values)
                .then((res: any) => {
                    console.log(res);
                })
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.error('Failed:', errorInfo);
    };

    const columnsTableFileSystem = [
        {
            title: 'file',
            dataIndex: 'file',
            key: 'file',
            width: '20%',
            render: (r: any, row: any) => {
                let image = null
                if (row.url.includes('jpg') || row.url.includes('png')) {
                    image = <Avatar shape="square" size="large" src={`${baseUrl}/${row.url}`} />
                }
                return (
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <span style={{marginRight: '20px'}}>{r}</span>
                        {image}
                    </div>
                )
            }
        },
        {
            title: 'url',
            dataIndex: 'url',
            key: 'url',
            width: '30%',
            render: (r: any, row: any) => <div
                style={{cursor: 'copy', display: 'flex', alignItems: 'center'}}
                onClick={() => navigator.clipboard.writeText(`${baseUrl}/${row.url}`)}>{`${baseUrl}/${row.url}`}</div>
        },
        {
            title: 'title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'edit',
            dataIndex: 'edit',
            key: 'edit',
            width: '2%',
            render: (r: any, row: any) => <Button type={'text'} onClick={() => {
                setCurrentFile(row);
                setIsModalFileOpen(true);
            }} icon={<EditOutlined />} />
        },
        {
            title: 'delete',
            dataIndex: 'delete',
            key: 'delete',
            width: '2%',
            render: (r: any, row: any) => {
                return <Popconfirm key={'popconfirm'} placement="left" title={'Подтвердите действие'}
                    onConfirm={() => {
                        ApiDownload.downloadDelete(row.id)
                            .then((res: any) => {
                                console.log(res);
                            })
                        setLoading(true);
                    }
                    } okText="Да" cancelText="Нет">

                    <Button type={'text'} danger icon={<DeleteOutlined />} />
                </Popconfirm>
            }
        },
    ];

    return <>
        <h4>Файлы - {modeLocation ? location.pathname.slice(1) : 'LCP'}:</h4>
        <Table loading={loading} size={'small'} dataSource={downloads} columns={columnsTableFileSystem} />
        <Modal title="File Edit Modal" destroyOnClose open={isModalFileOpen} onOk={() => {
            onFinish(form.getFieldsValue());
            setIsModalFileOpen(false);
            setLoading(true);
        }}
            onCancel={() => setIsModalFileOpen(false)}>
            <h4>Редактирование {currentFile?.file}:</h4>
            <br />
            <Form
                size={'small'}
                preserve={false}
                form={form}
                name="adminDownload"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                labelCol={{span: 7}}
                wrapperCol={{span: 17}}
            >
                <Form.Item initialValue={currentFile?.title} style={{margin: '8px'}}
                    label={'Title'} name={'title'}>
                    <Input />
                </Form.Item>

                <Form.Item initialValue={currentFile?.description}
                    style={{margin: '8px'}} label={'Description'}
                    name={'description'}>
                    <Input />
                </Form.Item>

                <Form.Item
                    initialValue={currentFile?.visible ? 'true' : 'false'}
                    style={{margin: '8px'}}
                    label={'Visible'}
                    name={'visible'}
                >
                    <Select>
                        <Select.Option key={'true'} value={'true'}>true</Select.Option>
                        <Select.Option key={'false'} value={'false'}>false</Select.Option>
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    </>
}
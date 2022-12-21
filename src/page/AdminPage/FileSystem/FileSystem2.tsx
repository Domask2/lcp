import React, {useEffect, useState} from 'react';
import {ApiDownload} from "../../../saga/api/api.download";
import {Button, Form, Input, Modal, Popconfirm, Select, Tree} from "antd";
import {DeleteOutlined, EditOutlined, FileOutlined} from '@ant-design/icons';
import {IDownLoads, IFormValues} from "../../../components/AntComponents/DownLoad/type";

const FileSystem2 = () => {
    const [downloads, setDownloads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalFileOpen, setIsModalFileOpen] = useState(false);
    const [currentFile, setCurrentFile] = useState<IDownLoads | undefined>();
    const [form] = Form.useForm();

    useEffect(() => {
        ApiDownload.downloadUniqueProject().then((res: any) => {
            let newDownloads: any = {};
            let indexNum = 0;
            res.forEach((r: any, index: number) => {
                if (r.project === 'lcp') {
                    newDownloads['lcp'] = {title: `lcp`, count: r.count, key: 'lcp'}
                } else if (r.project === 'users') {
                    newDownloads['users'] = {title: `users`, count: r.count, key: 'users'}
                } else {
                    indexNum++
                    newDownloads['project'] = {title: `project`, count: indexNum, key: 'project'}
                }
            })

            setDownloads(Object.values(newDownloads));
            setLoading(false);
        });
    }, [loading])

    const onFinish = (values: IFormValues) => {
        if (currentFile) {
            let objValues: any = values;
            objValues['id'] = currentFile?.id;

            ApiDownload.downloadEdit(currentFile.id, values)
                .then((res: any) => {
                    const editDownload = (arr: any) => {
                        return arr.map((item: any) => {
                            if (item?.id === currentFile.id) {
                                item.title = res.title
                                item.description = res.description
                                item.visible = res.visible
                            }

                            if (item.children) {
                                editDownload(item.children)
                            }
                            return item
                        })
                    }

                    setDownloads(editDownload(downloads))
                })
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.error('Failed:', errorInfo);
    };

    const updateTreeData = (list: any, key: React.Key, children: any): any => {
        return list.map((node: any) => {
            if (node.key === key) {
                return {
                    ...node,
                    children,
                };
            }
            if (node.children) {
                return {
                    ...node,
                    children: updateTreeData(node.children, key, children),
                };
            }
            return node;
        })
    };

    const onLoadData = ({key, children}: any) =>
        new Promise<void>(resolve => {
            if (children) {
                resolve();
                return;
            }

            downloads.forEach((item: any) => {
                if (item.title === key) {
                    ApiDownload.downloadUniquePage(key).then((res: any) => {
                        setDownloads((origin: any) => {
                            if (key === 'lcp') {
                                res.forEach((r: any) => {
                                    r.isLeaf = true
                                    r.switcherIcon = <FileOutlined />
                                })
                            }
                            return updateTreeData(origin, key, res)
                        }
                        );
                        resolve();
                    })
                }

                if (item.children) {
                    item.children.forEach((it: any) => {

                        if (it.children) {
                            it.children.forEach((i: any) => {
                                if (item.key === 'project' && i.title === key) {
                                    console.log(i, key)
                                    ApiDownload.downloadUniquePageElementItem(key.split('/').join('=')).then((res: any) => {
                                        setDownloads((origin: any) => {
                                            res.forEach((r: any) => {
                                                r.isLeaf = true
                                                r.switcherIcon = <FileOutlined />
                                            })
                                            return updateTreeData(origin, key, res)
                                        }
                                        );
                                        resolve();
                                    })
                                }
                            })
                        }


                        if (item.key === 'users' && it.title === key) {
                            ApiDownload.downloadUniqueUserElement(key).then((res: any) => {
                                setDownloads((origin: any) => {
                                    res.forEach((r: any) => {
                                        r.isLeaf = true;
                                        r.switcherIcon = <FileOutlined />;
                                    })
                                    return updateTreeData(origin, key, res)
                                }
                                );
                                resolve();
                            })
                        } else if (item.key === 'project' && it.title === key) {
                            ApiDownload.downloadUniquePageElement(key).then((res: any) => {
                                setDownloads((origin: any) => {
                                    return updateTreeData(origin, key, res)
                                }
                                );
                                resolve();
                            })
                        }
                    })
                }
            })
        });

    return (
        <>
            {!loading ? <Tree titleRender={(treeNode: any) => {
                return (
                    <div style={{display: 'flex', width: '350px'}} className="title">
                        <div style={{display: 'flex', width: '80%'}}>
                            <div style={{marginRight: '10px'}} className="text">{treeNode.title}</div>
                            <div style={{marginRight: '10px'}} className="text">{treeNode.count}</div>
                            <div style={{marginRight: '10px'}} className="text">{treeNode?.url}</div>
                        </div>
                        {treeNode?.url && <div style={{display: 'flex', width: '20%'}}>
                            <Button type={'text'} icon={<EditOutlined />} style={{marginLeft: '20px'}} onClick={(e) => {
                                e.preventDefault();
                                setCurrentFile(treeNode);
                                setIsModalFileOpen(true);
                            }} />
                            <Popconfirm key={'popconfirm'} placement="left" title={'Подтвердите действие'}
                                onConfirm={() => {
                                    ApiDownload.downloadDelete(treeNode.id)
                                        .then((res: any) => {
                                            // const editDownload = (arr: any) => {
                                            //     arr.forEach((item: any, index:number) => {
                                            //         if (item?.id === treeNode.id) {
                                            //             arr.splice(index, 1)
                                            //         }
                                            //
                                            //         if (item.children) {
                                            //             editDownload(item.children)
                                            //         }
                                            //     })
                                            //
                                            //     return arr
                                            // }
                                            // setDownloads(editDownload(downloads))
                                            setLoading(true);
                                        })
                                }
                                } okText="Да" cancelText="Нет">

                                <Button type={'text'} danger icon={<DeleteOutlined />} />
                            </Popconfirm>
                        </div>}
                    </div>
                )
            }}
                selectable={false}
                loadData={(key: any) => onLoadData(key)}
                treeData={downloads}
                showLine

            /> : 'загружаем дерево)'}

            <Modal title="File Edit Modal" destroyOnClose open={isModalFileOpen} onOk={() => {
                onFinish(form.getFieldsValue());
                setIsModalFileOpen(false);
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

    )

}

export default FileSystem2;
import React, {FC, useState} from 'react';
import {useLocation} from "react-router-dom";
import {useActions, useTypedSelector} from "../../../hooks";
import {getCurrentPage, getCurrentProject} from "../../../redux/project/project.selector";
import Editor from "../Editor/Editor";
import {Button, Form, Input, Select, Upload} from "antd";
import {ApiDownload} from "../../../saga/api/api.download";
import {UploadOutlined} from "@ant-design/icons";
import {RootState} from "../../../redux/redux.store";
import {AntDownloadType, IFormValues} from "./type";

const AntDownLoad: FC<AntDownloadType> = ({cmp}) => {
    const location = useLocation();
    const {loadDataSource} = useActions();
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState<any>();

    const currentProject = useTypedSelector((state: RootState) => getCurrentProject(state));
    const currentPage = useTypedSelector((state: RootState) => getCurrentPage(state));

    const arr = location.pathname.split('/');
    const arrLength = arr.length;
    arr.splice(arrLength - 1);

    const locationStr = cmp.modeDownload.slug ? location.pathname : arr.join('/');
    const folderStr = cmp.folder !== '' && cmp.folder ? `/${cmp.folder}` : '';
    const url = `project${locationStr}${folderStr}`;

    const normFile = (e: any) => {
        if (cmp.modeDownload.singleFile) {
            let newFileList = [...e.fileList];
            newFileList = newFileList.slice(-1);
            setFileList(newFileList);
        } else {
            setFileList(e?.fileList)
        }
    };



    const onFinish = (values: IFormValues) => {
        if (currentPage && currentProject && location) {
            let object_id = location?.pathname?.slice(-1) ?? '';

            const formData = new FormData();
            formData.append('url', url ?? '');
            formData.append('title', values.title ?? '');
            formData.append('description', values.description ?? '');
            formData.append('visible', values.visible ?? '');
            formData.append('project', currentProject?.key ?? '');
            formData.append('pages', location.pathname.slice(1) ?? '');
            formData.append('number', fileList.length);

            formData.append('db_key', cmp.dateBase.dbRemote ?? '');
            formData.append('object_id', object_id ?? '');
            formData.append('album_id', cmp?.sortFiles?.album?.toString() ?? '');

            fileList.forEach((file: any, index: number) => {
                formData.append(`file${index + 1}`, file.originFileObj);
            })

            ApiDownload.downloadStoreInProject(formData)
                .then((res: any) => {
                    if (res) {
                        form.resetFields();
                        if (cmp.dateBase.reloadDS) {
                            let filter = currentPage?.datasources?.[cmp.dateBase.reloadDS]?.filter?.split(':')[0] + object_id
                            loadDataSource(cmp.dateBase.reloadDS, filter);
                        }
                    }
                })

            setFileList(null);
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.error('Failed:', errorInfo);
    };

    return (<>
            <Editor cmp={cmp}/>

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
                <Form.Item hidden={!cmp.modeDownload.download}
                           label="File"
                           valuePropName="fileList">
                    <div style={{display: 'flex'}}>
                        <Upload onChange={normFile}
                                fileList={fileList}
                                beforeUpload={() => false}
                                name={'file'}
                                maxCount={cmp.modeDownload.singleFile ? 1 : 10}
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

                <Form.Item initialValue={cmp.defaultMode.title}
                           hidden={!cmp.modeDownload.title}
                           label={'Title'} name={'title'}>
                    <Input/>
                </Form.Item>

                <Form.Item initialValue={cmp.defaultMode.description}
                           hidden={!cmp.modeDownload.description}
                           label={'Description'}
                           name={'description'}>
                    <Input/>
                </Form.Item>

                <Form.Item
                    hidden={!cmp.modeDownload.visible}
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
        </>
    )
}

export default AntDownLoad;

import React, {useEffect, useState} from 'react';
import {useActions, useTypedSelector} from "../../../hooks";
import {getSettings} from "../../../redux/app/app.selector";
import ObjectEditor from "../../../components/AntComponents/Editor/Elements/ObjectEditor";
import {Button, Card, Col, Input, Row, Upload, Image, Popconfirm, Skeleton} from "antd";
import {baseUrl} from "../../../saga/api/api";
import {RootState} from "../../../redux/redux.store";
import {IAppSetting} from "../../../redux/app/app.initial";

interface AdminLcpType {
    settings: IAppSetting
}

const AdminLcp:React.FC<AdminLcpType> = ({settings}) => {
    const {updateSettings} = useActions()
    let model = {...settings}

    const setting = useTypedSelector((state: RootState) => getSettings(state));
    const [file, setFile] = useState(model.logo);
    const [fileList, setFileList] = useState<any>([]);
    const [title, setTitle] = useState(model.title);
    const [projectKey, setProjectKey] = useState(model.project_key);
    const [sysVars, setSysVars] = useState({...model.sys_vars});
    const [headStyles, setHeadStyles] = useState({...model.head_styles});

    useEffect(() => {
        if (setting.loading) {
            setFileList(null);
        }
    }, [setting.loading])

    const normFile = (e: any) => {
        let newFileList = [...e.fileList];
        newFileList = newFileList.slice(-1);
        setFile(e.file)
        setFileList(newFileList)
    };

    const onFinish = (deleteImg:boolean) => {
        const formData = new FormData();
        formData.append('head_styles', JSON.stringify(headStyles));
        formData.append('sys_vars', JSON.stringify(sysVars));
        title && formData.append('title', title);
        projectKey && formData.append('project_key', projectKey);

        if(deleteImg) {
            formData.append('logo', 'delete');
        } else {
            if (typeof file !== 'string') {
                file && formData.append('logo', file);
            }
        }

        updateSettings(formData)
    }

    return <Row>
        <Col xs={24} sm={24} md={20} lg={20} xl={12}>
            <Button style={{width: '160px', marginBottom: '20px'}} type="primary" htmlType="submit"
                    onClick={() => onFinish(false)}>
                Сохранить
            </Button>

            <Card style={{marginBottom: '15px'}}>
                <div style={{display: 'flex', alignItems: 'center', marginBottom: '20px'}}>
                    {
                        !setting.loading ? (<Skeleton.Avatar active={true} size={180}/>) :
                            setting.logo ?
                                (<Image
                                    preview={false}
                                    src={`${baseUrl}/${setting.logo}?${new Date().getTime()}`}
                                    width={180}
                                    height={180}
                                    alt={'logo'}
                                />) :
                                (<img src={'/noLogo.png'} width={180} height={180} alt={'logo'}/>)
                    }

                    <div style={{marginLeft: '20px', fontSize: '20px'}}>{title}</div>
                </div>
                <div style={{width: '180px'}}>
                    <div style={{width: '180px', display: 'flex', alignItems: 'flex-start'}}>
                        <div className={'adminLcpLogoList'} style={{width: '50%'}}>
                            <Upload
                                name="logo"
                                listType="picture"
                                beforeUpload={() => false}
                                onPreview={() => false}
                                fileList={fileList}
                                onChange={normFile}>
                                <Button>Загрузить</Button>
                            </Upload>
                        </div>
                        <Popconfirm
                            placement="left"
                            title={'Вы точно хотите удалить логотип?'}
                            okText="Да"
                            cancelText="Нет"
                            onConfirm={() => onFinish(true)}
                        >
                            <Button danger style={{width: '50%'}}>Удалить</Button>
                        </Popconfirm>
                    </div>
                </div>
            </Card>

            <Card size="small" className="cardEdit">
                <h3>Title</h3>
                <Input value={title} className="lcEditorInput" onChange={(e) => {
                    setTitle(e.currentTarget.value)
                }}/>
            </Card>

            <Card size="small" className="cardEdit">
                <h3>ProjectKey</h3>
                <Input value={projectKey} className="lcEditorInput" onChange={(e) => {
                    setProjectKey(e.currentTarget.value)
                }}/>
            </Card>

            <Card size="small" className="cardEdit">
                <h3>Style</h3>
                <ObjectEditor object={headStyles} setObject={setHeadStyles}/>
            </Card>

            <Card size="small" className="cardEdit">
                <h3>Переменные</h3>
                <ObjectEditor object={sysVars} setObject={setSysVars}/>
            </Card>
        </Col>
    </Row>
};

export default AdminLcp;
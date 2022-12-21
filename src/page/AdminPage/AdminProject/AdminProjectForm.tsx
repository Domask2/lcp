import React, {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import {useTypedSelector, useActions} from "../../../hooks";
import {getPagesKeys} from "../../../redux/project/project.selector";
import {AdminProjectRoles} from "./AdminProjectRoles";
import {Button, Card, Form, Image, Input, List, Popconfirm, Select, Skeleton, Upload} from "antd";
import {DeleteOutlined} from '@ant-design/icons';
import {INavigation, IProject} from "../../../redux/project/project.initial";
import {RootState} from "../../../redux/redux.store";
import {baseUrl} from "../../../saga/api/api";
const layout = {labelCol: {span: 6}, wrapperCol: {span: 18},};

export const AdminProjectForm = ({project}: { project: IProject }) => {
    const {loadProject, saveProjectFormData, deleteProject} = useActions();
    const pages = useTypedSelector((state: RootState) => getPagesKeys(state, project))

    const [roleUser, setRoleUser] = useState([]);
    const [isPublished, setIsPublished] = useState(true);
    const [isOpen, setIsOpen] = useState(true);
    const [startpage, setStartpage] = useState(project.startpage);
    const [deleteImg, setDeleteImg] = useState(false);

    const [file, setFile] = useState<any>(project.logo);
    const [fileList, setFileList] = useState<any>([]);
    const [title, setTitle] = useState(project.banner);

    useEffect(() => {
        if (!project.loading) {
            setFileList(null);
            setDeleteImg(false);
        }
    }, [project.loading])

    const normFile = (e: any) => {
        let newFileList = [...e.fileList];
        newFileList = newFileList.slice(-1);
        setFile(e.file)
        setFileList(newFileList)
    };

    const loadPages = () => {
        loadProject(project.id)
    }

    const onFinish = (values: any) => {
        let data = project
        data.title = values.project.title
        data.key = values.project.key
        data.is_published = isPublished
        data.is_open = isOpen
        data.description = values.project.description
        data.project_roles = roleUser
        data.startpage = startpage

        const formData = new FormData();
        formData.append('id', JSON.stringify(data.id));
        formData.append('user_id', JSON.stringify(data.user_id));
        formData.append('title', JSON.stringify(values.project.title));
        formData.append('key', JSON.stringify(values.project.key));
        formData.append('description', JSON.stringify(values.project.description));
        formData.append('is_published', JSON.stringify(isPublished));
        formData.append('navigation', JSON.stringify(data.navigation));
        formData.append('project_roles', JSON.stringify(roleUser));
        formData.append('is_open', JSON.stringify(isOpen));
        formData.append('startpage', JSON.stringify(startpage));
        formData.append('addictions', JSON.stringify(data.addictions));
        formData.append('banner', JSON.stringify(values.project.banner));
        if(deleteImg) {
            formData.append('logo', 'delete');
        } else {
            if (typeof file !== 'string') {
                formData.append('logo', file);
            }
        }

        saveProjectFormData(formData, data);
    };

    const deleteConfirm = () => {
        deleteProject(project.key)
    }

    const setNavigation = (items: INavigation[], project?: IProject) => {
        let arrNav: string[] = [];
        items.forEach((item: INavigation) => {
            let url1 = `/${project?.key}/${item?.key}`;
            let url2 = `/${project?.key}`;
            if (item.active_page) {
                arrNav.push(url1)
                arrNav.push(url2)
            }

            if (item.children && item.children?.length) {
                item.children?.forEach((it: INavigation) => {
                    if (it.active_page) {
                        let url2 = `${url1}/${it.key}`;
                        arrNav.push(url2)
                    }
                })
            }
        })

        return arrNav;
    }

    let arrayNav = setNavigation(project.navigation, project)

    return (
        <>
            <Form {...layout} name="nest-messages" onFinish={onFinish} initialValues={{project}}>
                <Form.Item>
                    <Button style={{width: '160px', marginBottom: '20px'}} type="primary" htmlType="submit">
                        Сохранить
                    </Button>
                </Form.Item>

                <Form.Item name={['project', 'title']} label="Название проекта">
                    <Input/>
                </Form.Item>

                <Form.Item name={['project', 'key']} label="Ключ">
                    <Input/>
                </Form.Item>

                <Form.Item label="Опубликованный">
                    <Select defaultValue={project.is_published === null ? 'true' : String(project.is_published)}
                            onChange={(e) => setIsPublished(JSON.parse(e))}>
                        <Select.Option value={'true'}>true</Select.Option>
                        <Select.Option value={'false'}>false</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item label="Открытый/Закрытый">
                    <Select defaultValue={project.is_open === null ? 'true' : String(project.is_open)}
                            onChange={(e) => setIsOpen(JSON.parse(e))}>
                        <Select.Option value={'true'}>true</Select.Option>
                        <Select.Option value={'false'}>false</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item label="Стартовая страница">
                    <Select defaultValue={project.startpage === '' ? '--не выбрано--' : project.startpage}
                            onChange={(e) => setStartpage(e)}>

                        <Select.Option key={'01010101'} value={''}>
                            {'--не выбрано--'}
                        </Select.Option>

                        {arrayNav && arrayNav.length && arrayNav.map((item, index) =>
                            <Select.Option key={index} value={item}>
                                {item}
                            </Select.Option>
                        )}
                    </Select>
                </Form.Item>

                <Form.Item name={['project', 'description']} label="Краткое описание">
                    <Input.TextArea/>
                </Form.Item>

                <Form.Item name={['project', 'banner']} label="Заголовок">
                    <Input value={title} onChange={(e) => {
                        setTitle(e.currentTarget.value)
                    }}/>
                </Form.Item>

                <Card style={{marginBottom: '15px'}}>
                    <div style={{display: 'flex', alignItems: 'center', marginBottom: '20px'}}>
                        {
                            project.loading ? (<Skeleton.Avatar active={true} size={180}/>) :
                                project.logo ?
                                    deleteImg ? (<img src={'/noLogo.png'} width={180} height={180} alt={'logo'}/>) :
                                        (<Image
                                        preview={false}
                                        src={`${baseUrl}/${project.logo}?${new Date().getTime()}`}
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
                                onConfirm={(values) => setDeleteImg(true)}
                            >
                                <Button danger style={{width: '50%'}}>Удалить</Button>
                            </Popconfirm>
                        </div>
                    </div>
                </Card>

                <AdminProjectRoles project={project} roleUser={roleUser} setRoleUser={setRoleUser}/>

                <List
                    size="small"
                    header={<Button size="small" type="link" onClick={loadPages}>загрузить / обновить</Button>}
                    bordered
                    style={{backgroundColor: 'white'}}
                    dataSource={pages}
                    renderItem={(item: any) => <List.Item>
                        <NavLink to={item}>{item}</NavLink>
                    </List.Item>}
                />
                <Form.Item>
                    <br/>
                    <Popconfirm
                        title="Вы действительно хотите удалить проект?"
                        onConfirm={deleteConfirm}
                        onCancel={() => {
                        }}
                        okText="Да"
                        cancelText="Нет"
                    >
                        <Button type="link" danger htmlType="submit">
                            <DeleteOutlined/> Удалить проект
                        </Button>
                    </Popconfirm>
                </Form.Item>
            </Form>
        </>
    );
};

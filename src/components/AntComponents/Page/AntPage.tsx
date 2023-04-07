import React, {useEffect, useState, Suspense} from "react";
import {useTypedSelector, useActions} from "../../../hooks";
import useBasePath from '../../../hooks/useBasePath'

import {
    getCurrentPage,
    getCurrentProject,
    getPage,
    getProjectByPageKey,
    getUpload
} from "../../../redux/project/project.selector";
import {getEditMode} from "../../../redux/app/app.selector";

import HelpPage from "./HelpPage";
import PageSettings from "./PageSettings";
import ContentPage from "./ContentPage";
import LoaderDataSources from "./LoaderDataSources";
import ModalFileSystem from "./ModalFileSystem";

import {superFunc} from "../../../utils";
import {setRandomKey} from "../../../services/setRandomKey";

import Text from "antd/es/typography/Text";
import {FileTextOutlined, SaveOutlined} from '@ant-design/icons';
import {Button, Card, Tabs} from "antd";

import {ComponentInterface, templates} from "./templates";
import {RootState} from "../../../redux/redux.store";
import {IPage} from "../../../redux/project/project.initial";
import DefaultTamplates from "../../../saga/api/data/default_values";
import Toolbar from "./Toolbar";

const LazyJsonPage = React.lazy(() => import("./JsonPage"))
const {TabPane} = Tabs;

const AntPage = (props: any) => {
    const {
        loadProject,
        savePage,
        saveProject,
        createPageTamplates,
        setCurrentPage,
        cmpAddRow,
        initLsPP,
        initLsInputs
    } = useActions()
    const pathName = useBasePath();
    // const auth = useTypedSelector((state: RootState) => getAuth(state))
    const page = useTypedSelector((state: RootState) => getPage(state, pathName))
    const uploadStatus = useTypedSelector((state: RootState) => getUpload(state))
    const project = useTypedSelector((state: RootState) => getProjectByPageKey(state, pathName))
    const curPage = useTypedSelector((state: RootState) => getCurrentPage(state))
    const [isModalOpen, setIsModalOpen] = useState(false);
    const currentProject = useTypedSelector((state: RootState) => getCurrentProject(state));

    const funcArr = curPage?.fnc?.filter((item: any) => item.type === 'ExecProc');
    // const funcArr = curPage?.fnc?.filter((item: any) => item.type === 'ExecProc') ? curPage?.fnc?.filter((item: any) => item.type === 'ExecProc') : [];

    // если есть на странице процедуры, запускаем инициализацию pp в ls
    // передем в initLsPP результат работы функции с говорящим названием superFunc (по заветам Николая Владимировича)
    const editMode = useTypedSelector((state: RootState) => getEditMode(state))

    const [myJson, setMyJson] = useState<IPage>(page)
    const [isChangedJSON, setIsChangedJSON] = useState<boolean>(false)

    useEffect(() => {
        if (funcArr?.length) {
            initLsPP(superFunc(funcArr));
            initLsInputs(superFunc(funcArr));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [funcArr])

    useEffect(() => {
        if (page) {
            setCurrentPage(page)
            // ApiDownload.downloadProjectFileSystem(project.key)
            //     .then((res: any) => console.log(res))
        }

        if (page === undefined && project !== undefined) {
            loadProject(project.id)

        } else {
            setMyJson(page)
        }
        setIsChangedJSON(true)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page])

    let content
    if (page) {
        content = <ContentPage page={page} props={props}/>
    } else
        content = <div style={{"color": "black"}}>---</div>

    /** ----------------- Edit Mode -------------------- */
    const onSave = () => {
        savePage(myJson)
        currentProject && saveProject(currentProject)
        setIsChangedJSON(false)
    }

    const onBlurJson = (e: any) => {
        if (e.error === false) {
            setMyJson(e.jsObject)
            setIsChangedJSON(true)
        }
    }

    const onEdit = (e: any) => {
        if (!isChangedJSON && e.existing_value !== e.new_value)
            setIsChangedJSON(true)
        setMyJson(e.updated_src)
    }

    const onAddCmp = (templateCmp: ComponentInterface) => {
        let newCmp = JSON.parse(JSON.stringify(templateCmp))
        delete newCmp.editor

        setRandomKey(newCmp, page.key)
        if (page) {
            cmpAddRow(page, newCmp)
        }
    }

    const tabActionsSave = {
        right: <>
            <Button type="text" onClick={() => setIsModalOpen(true)} icon={<FileTextOutlined/>}>Список файлов</Button>
            {page && <PageSettings page={page}/>}
            <Button type="text" onClick={onSave} icon={<SaveOutlined/>}>Сохранить изменения</Button>
        </>
    }

    const items = [
        {
            label: 'Вид',
            key: '1',
            children: <div style={{padding: '5px'}}>
                <Toolbar
                    page={page}
                    openModalFileSystem={() => setIsModalOpen(true)}
                    onSave={onSave}
                />
                {page && <ContentPage page={page} props={props}/>}
            </div>
        },
        {
            label: 'Код JSON',
            key: '2',
            children: <Suspense fallback={<></>}>
                <LazyJsonPage myJson={myJson} onBlurJson={onBlurJson} onEdit={onEdit}/>
            </Suspense>
        },
        {
            label: 'Подсказки',
            key: '3',
            children: <HelpPage part="page"/>
        },
    ];

    if (editMode) content = <>
        <Tabs
            tabBarStyle={{
                background: '#fff9b560',
                paddingLeft: '15px',
                borderRadius: 4,
                borderTop: '1px solid #fffef4',
                borderRight: '1px solid #e1ddc2',
                borderBottom: '1px solid #e1ddc2',
                borderLeft: '1px solid #fbf9e9',
                position: 'inherit',
                zIndex: 9,
                left: '200px', //
                backdropFilter: 'blur(2px)',
                margin:'0'
            }}
            defaultActiveKey="1"
            tabBarExtraContent={tabActionsSave}
            items={items}
        />

    </>
    /** ----------------- Edit Mode -------------------- */

    /** ----------------- Если такой страницы нет, то покажем кнопку создать -------------------- */
    let arr = pathName.split('/');
    arr.splice(0, 2);
    let pathNameNew = arr.join('/').trim()

    const createNewPage = (tamplateKey: string) => {
        /** в качестве ключа передадим только ключ страницы, без ключа проекта. **/
        createPageTamplates(project, pathNameNew, tamplateKey);
    }

    if (uploadStatus) {
        if (page === undefined) {
            if (editMode) {
                return <>
                    {Object.keys(DefaultTamplates).map((item: string) => {
                        return <Button style={{marginBottom: '10px'}} className="lcButtonLc"
                                       onClick={() => createNewPage(item)}>Создать
                            страницу. {DefaultTamplates[item].title}.</Button>
                    })}</>
            } else {
                return <Card><Text>Такой страницы еще нет.</Text></Card>
            }
        }
    }
    // else {
    //     return <Skeleton />
    // }
    /** ----------------- Если такой страницы нет, то покажем кнопку создать -------------------- */

    /**
     * ----------------- Если страница есть то загрузим данные для нее --------------------
     *                 Подключим загрузчик данных и исполнитель процедур.
     * ------------------------------------------------------------------------------------
     */

    return <>
        {page && <LoaderDataSources page={page} props={props}/>}
        {content}
        {/*<>*/}
        {/*    <Toolbar*/}
        {/*        page={page}*/}
        {/*        openModalFileSystem={() => setIsModalOpen(true)}*/}
        {/*        onSave={onSave}*/}
        {/*    />*/}
        {/*    {page && <ContentPage page={page} props={props}/>}*/}
        {/*</>*/}
        {editMode && page && page.components.length === 0 &&
            <Button onClick={() => onAddCmp(templates['Row'])}>Добавить Row</Button>}
        <ModalFileSystem page={page} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
    </>
}

export default AntPage


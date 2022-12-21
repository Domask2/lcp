import React, {useEffect, useState} from 'react';
import {Card, Col, Row, Tabs} from "antd";
import {useActions} from "../../../hooks/useActions";
import ButtonBlock from "../Editor/ButtonBlock";
import {useTypedSelector} from '../../../hooks';
import {RootState} from '../../../redux/redux.store';
import {getCurrentProject} from '../../../redux/project/project.selector';
import EditorInputsSwitch from './EditorInputsSwitch';
import EditorMaster from '../EditorMaster';
import {ComponentsSettingsTemplate} from '../../../editorUtils/componentsSettingsTemplate';
import {getDataSourceLs, getDataSourcesAll} from '../../../redux/ds/ds.selector';
import TableColumnsEdit from '../Table/TableColumnsEdit';
import ArrayObjectsEditor from '../Editor/Elements/ArrayObjectsEditor';
import {ComponentsType, ListKeys, SettingKeys, SettingsType} from '../../../editorUtils/editorDictionaries';

const {TabPane} = Tabs;

const containerStyle = {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
};

type MainEditType = {
    cmp: any,
    setVisible?: (v: boolean) => void
}
const MainEdit: React.FC<MainEditType> = ({
    cmp, setVisible = () => {
    }
}) => {

    // const {saveProject} = useActions();

    const currentComponentSettingsArray = ComponentsSettingsTemplate[cmp.type]
    const currentProject = useTypedSelector((state: RootState) => getCurrentProject(state));

    const pathName = document.location.pathname
    let arr = pathName.split('/');
    arr.splice(0, 2);

    let projectRoles = currentProject?.project_roles ? currentProject?.project_roles : []
    const {cmpUpdate} = useActions();

    const allDs = useTypedSelector((state: RootState) =>
        getDataSourcesAll(state)
    );
    const ls: any = useTypedSelector((state: RootState) => getDataSourceLs(state));

    const [model, setModel] = useState<any>({...cmp});
    const [tabsKey, setTabsKey] = useState('1');

    useEffect(() => {
        let dataSource: any;
        if (model.ds?.key) {
            dataSource = allDs[model.ds.key];
            setModel((prev: any) => {
                return {
                    ...prev,
                    per_page: dataSource?.filter?.split('__per_page=')[1]?.split('&')[0]
                }
            })

        } else if (model.ds) {
            dataSource = allDs[model.ds];
            setModel((prev: any) => {
                return {
                    ...prev,
                    per_page: dataSource?.filter?.split('__per_page=')[1]?.split('&')[0]
                }
            })
        } else {
            setModel((prev: any) => {
                return {
                    ...prev,
                    per_page: ''
                }
            })

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [model.ds])

    const createList = (itemKey: string) => {

        let list: Array<any> = []
        switch (itemKey) {
            case SettingKeys.Standart.ACL:
                list = projectRoles
                break;
            case SettingKeys.Standart.ADDICTION:
                list = model.addiction
                break;
            case SettingKeys.Ds.DS:
                list = Object.keys(allDs)
                break;
            case SettingKeys.Ds.SEARCH_OBJ:
                list = Object.keys(allDs)
                break;
            case SettingKeys.Ds.PROCEDURE:
                list = Object.keys(ls.pp)
                break;
            case SettingKeys.Ds.REDUX_ELEMENT:
                list = Object.keys(ls.vars)
                break;
            case SettingKeys.Ds.SHOW:
                list = allDs[model.ds.key]?.items[0] && Object.keys(allDs[model.ds.key].items[0])
                break;
            case SettingKeys.Ds.HIDE:
                list = allDs[model.ds.key]?.items[0] && Object.keys(allDs[model.ds.key].items[0])
                break;
            case ListKeys.KEYS:
                if (model?.ds?.key) {
                    list = allDs[model.ds.key] && allDs[model.ds.key].items[0] && Object.keys(allDs[model.ds.key].items[0])
                } else {
                    list = allDs[model?.ds] && allDs[model.ds].items[0] && Object.keys(allDs[model.ds].items[0])
                }
                break;

            default:
                break;
        }
        return list
    }

    const updateModel = (val: any, key: string) => {
        setModel((prev: any) => {
            return {
                ...prev,
                [key]: val
            }
        })
    }

    const onClose = () => {
        setVisible(false)
    }

    const onApply = () => {
        // currentProject && saveProject(currentProject)
        cmpUpdate(model)
        setVisible(false)
    }

    const onChange = (key: string) => {
        setTabsKey(key);
    };

    const renderSettingsList = (obj: any) => {
        return obj?.Card ? (obj?.Arr?.map((item: any) => {

            if (item.inputsType.type === SettingsType.BR) return <></>
            if (model.inputsType && item.inputsType.condition && !item.inputsType.condition.includes(model.inputsType)) return <></>

            return <Card size="small" className="cardEdit">
                <EditorInputsSwitch
                    props={{
                        ...item,
                        setValue: setModel,
                        value: model,
                        containerStyle: containerStyle,
                        list: createList(item.inputsType.arrKey ? item.inputsType.arrKey : item.key),
                    }}
                />
            </Card>
        })
        ) : (
            <Card size="small" className="cardEdit">
                {obj?.Arr?.map((item: any) => {

                    if (model.inputsType && item.inputsType.condition && !item.inputsType.condition.includes(model.inputsType)) return <></>

                    return <EditorInputsSwitch
                        props={{
                            ...item,
                            setValue: setModel,
                            cmp: cmp,
                            value: model,
                            containerStyle: containerStyle,
                            list: createList(item.inputsType.arrKey ? item.inputsType.arrKey : item.key),
                        }}
                    />
                })}
            </Card>
        )
    }

    const renderTabs = () => {
        switch (model.type) {

            case ComponentsType.TABLE:
                return (
                    <>
                        <Tabs.TabPane tab="Настройка колонок" key="4">
                            <TableColumnsEdit
                                tableColumns={model.columns}
                                setTableColumns={(e) => updateModel(e, 'columns')}
                                cmp={model}
                            />
                        </Tabs.TabPane>

                        <Tabs.TabPane tab="Настройка меню" key="5">
                            <Card size="small" className="cardEdit">
                                <ArrayObjectsEditor
                                    cmp={model}
                                    list={model.menu}
                                    setList={(e) => updateModel(e, 'menu')}
                                    template={{
                                        title: "",
                                        actions: "",
                                        acl: [],
                                        addiction: '',
                                        visible: "",
                                        confirm: false,
                                        modal: false,
                                    }}
                                />
                            </Card>
                        </Tabs.TabPane>
                    </>
                )
            case ComponentsType.DESCRIPTIONS:
                return (
                    <Tabs.TabPane tab="Настройка колонок" key="4">
                        <TableColumnsEdit
                            tableColumns={model.columns}
                            setTableColumns={(e) => updateModel(e, 'columns')}
                            cmp={model}
                        />
                    </Tabs.TabPane>
                )
            default:
                break;
        }

    }

    const memoStyleSettingsList = React.useMemo(() => renderSettingsList(currentComponentSettingsArray?.StyleSettings),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []);

    console.log('mainEditor:', model);

    return <>
        <h3>Редактирование: {cmp.type} - {cmp.key}</h3>
        <br />
        <Tabs defaultActiveKey="1" onChange={onChange}>
            <TabPane tab="Общие настройки" key="1">
                <Row gutter={[16, 16]}>
                    {currentComponentSettingsArray?.StandartSettingsRow && <Col span={24}>
                        {renderSettingsList(currentComponentSettingsArray?.StandartSettingsRow)}
                    </Col>}
                    <Col span={12}>
                        {renderSettingsList(currentComponentSettingsArray?.StandartSettings)}
                    </Col>
                    <Col span={12}>
                        {currentComponentSettingsArray?.StandartSettingsColTwo && renderSettingsList(currentComponentSettingsArray?.StandartSettingsColTwo)}
                    </Col>
                </Row>
            </TabPane>

            {currentComponentSettingsArray?.StyleSettings?.Arr.length && <TabPane tab="Stylization" key="2">
                <Row gutter={[16, 16]}>
                    {currentComponentSettingsArray?.UniqSettings && <Col span={24}>
                        {renderSettingsList(currentComponentSettingsArray?.UniqSettings)}
                    </Col>}
                    <Col span={12}>
                        {currentComponentSettingsArray?.Preview?.Arr && renderSettingsList(currentComponentSettingsArray?.Preview)}
                    </Col>
                    <Col span={12}>
                        {currentComponentSettingsArray.StyleSettings?.Arr.length && memoStyleSettingsList}
                    </Col>
                </Row>
            </TabPane>}

            {currentComponentSettingsArray?.DsSettings?.Arr?.length && <TabPane tab="Настройка работы с DS" key="3">
                <Row gutter={[16, 16]}>
                    <Col span={12}>
                        {renderSettingsList(currentComponentSettingsArray?.DsSettings)}
                    </Col>
                    <Col span={12}>
                        {renderSettingsList(currentComponentSettingsArray?.ComplexInteractionSettings)}
                    </Col>
                    {currentComponentSettingsArray?.DsSettingsBottomRow && <Col span={24}>
                        {renderSettingsList(currentComponentSettingsArray?.DsSettingsBottomRow)}
                    </Col>}
                </Row>
            </TabPane>}

            {renderTabs()}

            <TabPane tab="Старый формат" key="6">
                <EditorMaster cmp={cmp} setVisible={setVisible} />
            </TabPane>

        </Tabs>
        {+tabsKey === 6 ? <></> : <ButtonBlock onApply={onApply} onClose={onClose} />}
    </>
};

export default MainEdit;
import React, {useEffect, useState} from "react";
import {useTo, useActions, useAction, useLoadDataSource, useTypedSelector} from "../../../hooks"

import ru_RU from "antd/es/locale/ru_RU";
import moment from "moment";
import 'moment/locale/ru';

import {getDataSourceAll} from "../../../redux/ds/ds.selector";
import {getFncAll} from "../../../redux/fnc/fnc.selector";

import AntFormButtons from "./AntFormButtons";
import AntFormBlock from "./AntFormBlock";
import Editor from "../Editor/Editor";
import {GetBlocks, getDsStrFilter, getStrFilter} from "./GetElement";
import {getFormDate} from "../../../services/antformUtils";

import ScrollableAnchor from "react-scrollable-anchor";

import {ConfigProvider, Form, message} from "antd";
import {RootState} from "../../../redux/redux.store";
import {FormItemsInterfaces, IActionsType, IForm} from "../Page/templates";
import {useNavigate} from "react-router-dom";
import NotificationManager from "../../../notification/NotificationManager";
import {getSettings} from "../../../redux/app/app.selector";

/**
 * Форма ничего не знает о своем локальном стейте (ls.<form.key>)
 * Она просто передает в него данные по сабмиту.
 * Если есть истчник данных который зависит от этой формы (filter)
 * то компонента перезагрузки (ReloaderDs) должна отработать и перезагрузить его.
 *
 * @param cmp
 * @param props
 * @constructor
 */

type AntFormType = {
    cmp: IForm
    props?: any
}

const AntForm = ({cmp, props}: AntFormType) => {
    const {setLsVars} = useActions()
    const [form] = Form.useForm();
    const [disableSubmit, setDisableSubmit] = useState<boolean>(false);
    const fncAll = useTypedSelector((state: RootState) => getFncAll(state));
    const dataSources = useTypedSelector(state => getDataSourceAll(state));
    const settings = useTypedSelector((state: RootState) => getSettings(state));


    const navigate = useNavigate();
    const {to} = useTo();
    const [loadDataSourceWithCache] = useLoadDataSource();
    const {loadDataSource, executeDbProcedure, clearSelect} = useActions();
    const actionsHooks = {to, loadDataSourceWithCache, executeDbProcedure, loadDataSource, clearSelect};
    const ObjectFncDsHooksAll = {fncAll, dataSources, actionsHooks, navigate}

    /** ------- Смотрим что за форма и получаем данные о форме ------- */
    let getFormConnect = getFormDate(cmp)
    const [form_type, ds_key, actions] = getFormConnect !== undefined ? getFormConnect : ['', '', []];
    const actionForm = useAction(actions as Array<IActionsType>, ds_key, undefined)

    /** ------- Смотрим что за форма и к чему подключена ------- */
    let formProps = {...cmp.props}
    const items = [...cmp.items]

    useEffect(() => {
        if (props) {
            if (props.row) {
                form.setFieldsValue(props.row)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    /**
     * При изменении ds нужно проверить не надо ли установить инициализационные значения.
     */
    let initialValues: any = []
    useEffect(() => {
        if (cmp.submit.typeSubmit !== 'filter') {
            for (const dataSourceKey in dataSources) {
                if (dataSourceKey === ds_key)
                    setDisableSubmit(dataSources[dataSourceKey].loading)
                /** если значения для нашей формы нужно брать из ds */
                if (cmp.source !== undefined && cmp.source !== null) { //&& cmp.source.split(':')[0] === 'ds') {
                    // let arrSource = cmp.source.split(':')
                    if (cmp.source === dataSourceKey) {
                        cmp?.items.forEach((item) => {
                            // if(cmp.props.initialValues && cmp.props.initialValues.length >0) {
                            if (!(cmp.props.initialValues && cmp.props.initialValues[item.props.name])) {
                                switch (item.type) {
                                    case 'DatePicker':
                                    case 'RangePicker':
                                        let date = new Date(dataSources[dataSourceKey].items[0][item.props.name])
                                        initialValues[item.props.name] = moment(date)
                                        break
                                    default:
                                        cmp?.props?.initialValues && Object.keys(cmp?.props?.initialValues).forEach((initVal: any) => {
                                            if (cmp?.props?.initialValues) {
                                                let [typeDs, ds, dsKey] = cmp?.props?.initialValues[initVal].split(':');
                                                if (typeDs === 'ds') {
                                                    if (dataSources && dataSources[ds] && dataSources[ds]?.items[0][dsKey]) {
                                                        initialValues[initVal] = dataSources[ds]?.items[0][dsKey]
                                                    }
                                                }

                                                if (typeDs === 'sys_vars') {
                                                    if (settings && settings[0].sys_vars) {
                                                        initialValues[initVal] = settings[0].sys_vars[ds]
                                                    }
                                                }
                                            }
                                        })
                                        initialValues[item.props?.name] = dataSources[dataSourceKey].items[0][item.props?.name] ? dataSources[dataSourceKey].items[0][item.props?.name] : ''
                                }
                            }
                            // }
                        })
                        form.setFieldsValue(initialValues)
                    }
                }
            }
        }

        if (form_type === 'local')
            form.submit()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataSources])

    useEffect(() => {
        cmp.adKey && cmp.submit.closeModal && setLsVars(cmp.adKey, cmp.submit.closeModal)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onChange = (e: any) => {
        if (cmp.submit.auto) {
            form.submit()
            onClickForm(e)
        }
    }

    const onReset = () => {
        form.resetFields()
    }

    const onFinishFailed = (errorInfo: any) => {
        // console.log('Failed:', errorInfo);
    };

    let onClickFormFilter = (e: any) => {
        if (form_type === 'filter' && actions.length !== 0) {
            let values = form.getFieldsValue();

            // добавить в value инициализированные данные из ds или setting.sys_vars
            Object.keys(values).forEach((val: any) => {

                if (values[val] && values[val] !== undefined && typeof values[val] === 'string') {
                    let [typeDs, ds, dsKey] = values[val].split(':')

                    if (values[val] && typeDs === 'sys_vars') {
                        if (settings && settings[0].sys_vars) {
                            values[val] = settings[0].sys_vars[ds] ? settings[0].sys_vars[ds] : ''
                        }
                    }

                    if (values[val] && typeDs === 'ds') {
                        if (dataSources && dataSources[ds] && dataSources[ds]?.items[0][dsKey]) {
                            values[val] = dataSources[ds]?.items[0][dsKey] ? dataSources[ds]?.items[0][dsKey] : ''
                        }
                    }
                }
            })

            let str_filter = getStrFilter(values, items)
            if (!str_filter) str_filter = 'null'
            actionForm.onClick(undefined, str_filter)
        }
    }

    let onClickForm = (values: any) => {
        // cmp.adKey && cmp.submit.closeModal && setLsVars(cmp.adKey, false);
        switch (form_type) {
            case 'filter':
                form.submit()
                if (dataSources[ds_key]) {
                    let str_filter = getStrFilter(form.getFieldsValue(), items)
                    let ds_filter_str = getDsStrFilter(dataSources[ds_key], str_filter)
                    loadDataSource(ds_key, ds_filter_str, true)
                }
                break
            case 'action':
                let values = form.getFieldsValue()

                Object.keys(values).forEach((item: any) => {
                    if (values[item] === null) delete values[item]
                    if (values[item] === '-не указано-') delete values[item]
                })

                form.submit()
                form.validateFields()
                    .then(values => {
                        cmp.adKey && cmp.submit.closeModal && setLsVars(cmp.adKey, false);
                        cmp.items.forEach((item: FormItemsInterfaces) => {
                            if (item.numeric)
                                values[item.props.name] = values[item.props.name] * 1
                        })

                        actionForm.onClick(undefined, values)
                        form.resetFields();
                    })
                    .catch(errorInfo => {
                        console.log(errorInfo.errorFields)
                    });

                if (cmp.notify && cmp.notify.id !== null && cmp.notify.id !== '') {
                    message.success('This is a success message');
                    NotificationManager.add(cmp.notify)
                }
                break
        }
    }

    //установим размер from и растягивание по ширине - colspan
    const size = cmp.size !== undefined && cmp.size !== null ? cmp.size : 'middle'
    const colSpan = cmp.colSpan === undefined ? 24 : cmp.colSpan
    // получаем блоки для отрисовки на странице
    const blocks = GetBlocks(items, cmp, form, form_type, ObjectFncDsHooksAll, onChange);

    return <>
        <Editor cmp={cmp} oldComponent={true} />

        {cmp.anchor && <ScrollableAnchor id={`${cmp.anchor}`}>
            <span></span>
        </ScrollableAnchor>}

        <ConfigProvider locale={ru_RU}>
            <Form
                {...formProps}
                form={form}
                size={size}
                className={cmp.className}
                onChange={onChange}
                onFinishFailed={onFinishFailed}
            >

                <AntFormBlock colSpan={colSpan} cmp={cmp} form_type={form_type} blocks={blocks} />

                <AntFormButtons cmp={cmp}
                    onClickForm={onClickForm}
                    onClickFormFilter={onClickFormFilter}
                    onReset={onReset}
                    disableSubmit={disableSubmit} />
            </Form>
        </ConfigProvider>
    </>
}

export default AntForm
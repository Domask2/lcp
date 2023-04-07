import React, {FC, useState} from "react";
import {useLocation} from "react-router-dom";
import {useTypedSelector, useActions} from "../../../hooks";
import {getPage} from "../../../redux/project/project.selector";
import {FunctionPage} from "./FunctionPage";
import {Button, Form} from "antd";
import {RootState} from "../../../redux/redux.store";

const layout = {
    labelCol: {span: 4},
    wrapperCol: {span: 24},
};

const tailLayout = {
    wrapperCol: {offset: 4, span: 18},
};

interface IFunctionForm {
    cmp: any
    handleCancel?: any
    editing?: boolean
}

export const FunctionForm: FC<IFunctionForm> = ({cmp, handleCancel, editing = true}) => {
    const {savePage} = useActions();
    const {pathname} = useLocation();
    const [form] = Form.useForm();

    const pathName = pathname;
    let path = pathName.split('/').filter((name: string) => (!Number(name))).join('/')

    const page = useTypedSelector((state: RootState) => getPage(state, path));
    let pageFnc = page?.fnc !== undefined && page?.fnc !== null ? [...page.fnc] : [];

    const [initialValues, setInitialValues] = useState<any>({
        fnc: pageFnc
    })

    const onFinish = () => {
        let jsonPage = {...page}
        jsonPage.fnc = initialValues.fnc
        savePage(jsonPage)
        // handleCancel();
    };

    return (
        <Form {...layout} form={form} name="control-hooks" onFinish={onFinish} initialValues={initialValues}>
            <FunctionPage cmp={cmp} initialValues={initialValues} setInitialValues={setInitialValues} editing={false} />

            {editing && <Form.Item {...tailLayout} style={{marginTop: '-20px'}}>
                <Button type="primary" htmlType="submit">
                    Сохранить глобальные функций
                </Button>
            </Form.Item>}

        </Form>
    )
}
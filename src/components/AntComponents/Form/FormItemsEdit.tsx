import React, {FC} from 'react';
import FormItemEdit from "./FormItemEdit";
import AntFormEditDescription from "./AntFormEditDescription";

import {Button, Col, Row} from "antd";
import {PlusOutlined} from '@ant-design/icons';

import {IForm} from "../Page/templates";

/**
 * Режим полей формы
 *
 *
 */

type FormItemsEditType = {
    formItems: Array<any>
    cmp: IForm
    setFormItems: (p: Array<any>) => void
}

const FormItemsEdit: FC<FormItemsEditType> = ({
                                                  formItems, cmp, setFormItems = () => {
    }
                                              }) => {
    return <>
        <Row gutter={[16, 16]}>
            <Col span={8}>

                {formItems.map((item, index) => {
                    if (index % 3 === 0)
                        return <FormItemEdit key={index}
                                             item={item}
                                             setItem={(v) => {
                                                 formItems.forEach((i, ind) => {
                                                     if (index === ind)
                                                         formItems[index] = {...v}
                                                 })
                                                 setFormItems(formItems)
                                             }}
                                             cmp={cmp}/>
                    return false
                })
                }
            </Col>
            <Col span={8}>
                {formItems.map((item, index) => {
                    if ((index + 2) % 3 === 0)
                        return <FormItemEdit key={index}
                                             item={item}
                                             setItem={(v) => {
                                                 formItems.forEach((i, ind) => {
                                                     if (index === ind)
                                                         formItems[index] = {...v}
                                                 })
                                                 setFormItems(formItems)

                                             }}
                                             cmp={cmp}/>
                    return false
                })
                }
            </Col>
            <Col span={8}>
                {formItems.map((item, index) => {
                    if ((index + 1) % 3 === 0)
                        return <FormItemEdit key={index}
                                             item={item}
                                             setItem={(v) => {
                                                 formItems.forEach((i, ind) => {
                                                     if (index === ind)
                                                         formItems[index] = {...v}
                                                 })
                                                 setFormItems(formItems)
                                             }}
                                             cmp={cmp}/>
                    return false
                })
                }
            </Col>
        </Row>
        <Row gutter={[16, 16]}>
            <Col span={8}>
                <Button type="text" icon={<PlusOutlined/>} onClick={() => {
                    let its = [...formItems]
                    its.push({type: 'Input'})
                    setFormItems(its)
                }}>добавить поле</Button>

                <AntFormEditDescription cmp={cmp}/>

            </Col>
        </Row>
    </>
};

export default FormItemsEdit;
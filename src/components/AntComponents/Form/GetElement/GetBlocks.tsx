import React from "react";
import DetailsPicker from "../DetailsPicker";
import {GetOptions, InputElement, SelectElement, RangeInputElement} from './index'

import {Checkbox, Col, DatePicker, Form, FormInstance, Input, Select} from "antd";
import {FormItemsInterfaces, IForm} from "../../Page/templates";
import {IDataSourceAll} from "../../../../redux/ds/ds.initial";
import {IFnc} from "../../../../redux/fnc/fnc.initial";
// import IMask from "imask";
// import moment from "moment";

const {RangePicker} = DatePicker;

export interface ObjFncDsHooksType {
    fncAll: IFnc[]
    dataSources: IDataSourceAll
    actionsHooks: any
    navigate: any
}

const DATE_FORMAT = 'DD.MM.YYYY'
// const MASKED = IMask.createMask({
//     blocks: {
//         DD: {from: 1, mask: IMask.MaskedRange, to: 31},
//         MM: {from: 1, mask: IMask.MaskedRange, to: 12},
//         YYYY: {from: 1900, mask: IMask.MaskedRange, to: Number.MAX_VALUE},
//     },
//     format: (date: Date) => moment(date).format(DATE_FORMAT),
//     mask: Date,
//     parse: (date: string) => moment(date, DATE_FORMAT),
//     pattern: DATE_FORMAT,
// })

export const GetBlocks = (items: FormItemsInterfaces[], cmp: IForm, form: FormInstance, form_type: string, ObjectFncDsHooksAll: ObjFncDsHooksType, onChange: (e: any) => void) => {
    const {dataSources, navigate} = ObjectFncDsHooksAll

    // составляем массив элементов, разделяем по блокам
    let blocks: any = {}
    let blockId: any = ''

    items.forEach((item: any) => {
        if (item.del)
            return false

        let valuePropName: any = ''
        let input

        switch (item.type) {
            case 'Input':
                input = InputElement(item, cmp, form_type, dataSources, navigate)
                break
            case 'Hidden':
                input = <Input hidden={true} />
                break
            case 'DatePicker':
                input = <DatePicker
                    format={[DATE_FORMAT, 'DD,MM,YYYY', 'DD/MM/YYYY']}
                    disabled={item.disabled}
                    style={{width: '100%'}}
                />
                break
            case 'RangePicker':
                input =
                    <RangePicker
                        format={[DATE_FORMAT, 'DD,MM,YYYY', 'DD/MM/YYYY']}
                        picker={item.props.picker}
                    />
                break
            case 'Select':
                input = SelectElement(item, cmp, ObjectFncDsHooksAll, onChange)
                break
            case 'SelectMulti':
                input = <Select
                    mode="multiple" showSearch onChange={(e) => onChange(e)}
                    filterOption={(input, option: any) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }>
                    {GetOptions(item, cmp, dataSources)}
                </Select>
                break
            case 'RangeInput':
                input = RangeInputElement(item)
                break
            case 'Checkbox':
                input = <Checkbox />
                valuePropName = {valuePropName: "checked"}
                break
            case 'DetailsPicker':
                input = <DetailsPicker form={form} item={item} cmp={cmp} />
                break
        }

        // записываем элементы разделенные по группам в block
        // block будем отрисовывать на странице
        blockId = item.block !== undefined ? item.block : 'default'
        if (blocks[blockId] === undefined)
            blocks[blockId] = []

        switch (item.type) {
            case 'Hidden':
                blocks[blockId].push(<Form.Item {...item.props} key={item.props.name} {...valuePropName}>
                    {input}
                </Form.Item>)
                break
            case 'RangeInput':
                blocks[blockId].push(input)
                break
            default:
                let rulesArray: any = [];

                if (item.required) {
                    rulesArray.push({
                        required: true,
                        message: 'Поле обязательное для заполнения',
                    })
                }

                if (item.regExp) {
                    rulesArray.push({
                        pattern: item.regExp.slice(1, -1),
                        message: item.messErr ? item.messErr : 'Регулярное выражение!!',
                    })
                }

                if (item.numeric && item.max !== 'null' && item.min !== 'null') {
                    rulesArray.push(
                        () => ({
                            validator(_: any, value: any) {
                                if (value <= +item.max && value >= +item.min) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error(`допустимые значения от ${item.min} до ${item.max}`));
                            },
                        })
                    )
                }

                if (item.maxLen) {
                    rulesArray.push(
                        () => ({
                            validator(_: any, value: any) {
                                if (value.includes('.') || value.includes(',')) {
                                    if (Math.floor(Number(value)).toString().length <= item.maxLen) {
                                        return Promise.resolve();
                                    }
                                } else {
                                    if (value.replace('.', "").length <= item.maxLen) {
                                        return Promise.resolve();
                                    }
                                }

                                return Promise.reject(new Error(`превышена длина строки (${item.maxLen} зн.)`));
                            },
                        })
                    )
                }

                if (item.decimal) {
                    rulesArray.push(
                        () => ({
                            validator(_: any, value: any) {
                                if (Number.isInteger(+value)) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error(`введите целое число`));
                            },
                        })
                    )
                }

                blocks[blockId].push(<Col span={24} key={"col-" + item.props.name}>
                    <Form.Item {...item.props}
                        key={item.props.name}
                        {...valuePropName}
                        rules={rulesArray}
                    >
                        {input}
                    </Form.Item>
                </Col>)
                break
        }
    }
    )

    return blocks
}
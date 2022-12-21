import React from "react";
import Editor from "../Editor/Editor";
// import IMask from 'imask'
import ScrollableAnchor from "react-scrollable-anchor";
import moment from "moment";
import 'moment/locale/ru';

import {ConfigProvider} from "antd";
import ru_RU from "antd/lib/locale/ru_RU";

import {Col, DatePicker, Row} from 'antd';
import {IInputs} from "../Page/templates";
import {formatDate} from "../../../utils";

type AntDatePickerType = {
    cmp: IInputs
    props: any
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

const AntDatePicker: React.FC<AntDatePickerType> = ({cmp, props}) => {
    return (
        <ConfigProvider locale={ru_RU}>
            {cmp.anchor && <ScrollableAnchor id={`${cmp.anchor}`}>
                <span>''</span>
            </ScrollableAnchor>}

            <Editor cmp={cmp} inputType={cmp.inputsType} />
            <Row style={{alignItems: 'center', marginBottom: '10px', ...cmp?.style}}>
                <Col span={cmp.inputWidth ? 24 - cmp.inputWidth : 10}
                    style={{textAlign: 'right', paddingRight: '10px'}}>
                    {(cmp.inputDescription || (cmp.helpMessage && !props.validate)) &&
                        <div style={{height: '20px', }}>''</div>}
                    {`${cmp.caption}: `}
                </Col>
                <Col span={cmp.inputWidth ? cmp.inputWidth : 14}>
                    <div style={{color: 'gray', fontSize: '12px', paddingLeft: '11px'}}>{cmp.inputDescription}</div>
                    <div style={{position: 'relative'}}>
                        {props.renderHelpMessage()}

                        {props.value && <DatePicker
                            // value={props.value ? moment(props.value, 'YYYY-MM-DD') : moment(props.initValue, 'YYYY-MM-DD')}
                            defaultValue={moment(formatDate(props.value), DATE_FORMAT)}
                            format={[DATE_FORMAT, 'DD,MM,YYYY', 'DD/MM/YYYY']}
                            style={{minWidth: '100%', ...cmp.inputsStyle, ...props.walidationBorderStyle}}
                            onChange={e => {
                                props.onChange(moment(e).format(DATE_FORMAT))
                            }}

                            // onKeyDown={(e) => {
                            //     const input = e.target as HTMLInputElement
                            //     input.value = MASKED.resolve(input.value)
                            // }}

                            disabledDate={(current) => {
                                let flg: boolean = false
                                if (cmp.dateConditionArray) {
                                    cmp.dateConditionArray.forEach(function (date) {
                                        if (date.condition === 'c')
                                            if (current > moment().add(date.count, date.date))
                                                flg = true
                                        if (date.condition === 'po')
                                            if (current < moment().add(date.count, date.date))
                                                flg = true
                                    })
                                    // return current < moment().add(-10, "day")
                                }
                                return flg
                            }}
                        />}
                        {!props.value && <DatePicker
                            // value={props.value ? moment(props.value, 'YYYY-MM-DD') : moment(props.initValue, 'YYYY-MM-DD')}
                            // defaultValue={cmp.dateConditionArray?.length ? moment().add('-15', 'month') : date ? moment(date, 'YYYY-MM-DD') : undefined}
                            format={[DATE_FORMAT, 'DD,MM,YYYY', 'DD/MM/YYYY']}
                            style={{minWidth: '100%', ...cmp.inputsStyle, ...props.walidationBorderStyle}}
                            onChange={(e) => {
                                props.onChange(moment(e).format(DATE_FORMAT))
                            }}

                            // onKeyDown={(e) => {
                            //     const input = e.target as HTMLInputElement
                            //     input.value = MASKED.resolve(input.value)
                            // }}

                            disabledDate={(current) => {
                                let flg: boolean = false
                                if (cmp.dateConditionArray) {
                                    cmp.dateConditionArray.forEach(function (date) {
                                        if (date.condition === 'c')
                                            if (current > moment().add(date.count, date.date))
                                                flg = true
                                        if (date.condition === 'po')
                                            if (current < moment().add(date.count, date.date))
                                                flg = true
                                    })
                                    // return current < moment().add(-10, "day")
                                }
                                return flg
                            }}
                        />}

                    </div>
                </Col>
            </Row>
        </ConfigProvider>
    );
};

export default AntDatePicker;

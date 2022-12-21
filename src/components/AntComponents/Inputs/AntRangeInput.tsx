import React, {useEffect, useState} from "react";
import Editor from "../Editor/Editor";
import ScrollableAnchor from "react-scrollable-anchor";
import {Col, Input, Row, Select} from 'antd';
import {IInputs} from "../Page/templates";

type AntRangeInputType = {
    cmp: IInputs
    props: any
}

const AntRangeInput: React.FC<AntRangeInputType> = ({cmp, props}) => {
    const [minValue, setMinValue] = useState('');
    const [maxValue, setMaxValue] = useState('');
    const [minPrefix, setMinPrefix] = useState<any>('>');
    const [maxPrefix, setMaxPrefix] = useState<any>('<');

    useEffect(() => {
        if (minValue && maxValue) {
            if (+minValue < +maxValue) {
                props.onChange(`${minPrefix}${minValue},${maxPrefix}${maxValue}`)
            } else {
                props.onChange('')
            }
        } else if (!minValue || !maxValue) {
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [minValue, maxValue, minPrefix, maxPrefix])

    return <>
        {cmp.anchor && <ScrollableAnchor id={`${cmp.anchor}`}>
            <span>''</span>
        </ScrollableAnchor>}

        <Editor cmp={cmp} inputType={cmp.inputsType} />
        <Row style={{alignItems: 'center', marginBottom: '10px', ...cmp?.style}}>
            <Col span={10} style={{textAlign: 'right', paddingRight: '10px', ...cmp.bodyStyle}}>
                {cmp.caption}
            </Col>
            <Col span={10} style={{textAlign: 'right', paddingRight: '10px'}}>

                <div style={{position: 'relative'}}>
                    {props.renderHelpMessage()}
                    <Col span={24} style={{padding: '0px'}}>
                        <Col span={24}>
                            <Input
                                style={{...props.walidationBorderStyle, ...cmp.inputsStyle}}
                                onChange={e => setMinValue(e.target.value)}
                                placeholder={'от'}
                                addonBefore={
                                    <Select style={{width: '61.5px', ...cmp.inputsStyle}} defaultValue=">" onChange={(e: any) => setMinPrefix(e)} className="select-range-input">
                                        <Select.Option value=">">{'>'}</Select.Option>
                                        <Select.Option value=">=">{'>='}</Select.Option>
                                    </Select>
                                }
                            />
                        </Col>
                        <Col span={24}>
                            <Input
                                style={props.walidationBorderStyle}
                                onChange={e => setMaxValue(e.target.value)}
                                placeholder={'до'}
                                addonBefore={
                                    <Select style={{width: '61.5px', ...cmp.inputsStyle}} defaultValue="<" onChange={(e: any) => setMaxPrefix(e)} className="select-range-input">
                                        <Select.Option value="<">{'<'}</Select.Option>
                                        <Select.Option value="<=">{'<='}</Select.Option>
                                    </Select>
                                }
                            />
                        </Col>
                    </Col>
                </div>
            </Col>

        </Row>
    </>
}

export default AntRangeInput
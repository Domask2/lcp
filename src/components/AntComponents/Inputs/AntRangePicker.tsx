import React from "react";
import {Col, DatePicker, Row} from 'antd';
import {IInputs} from "../Page/templates";
import Editor from "../Editor/Editor";
import ScrollableAnchor from "react-scrollable-anchor";

const {RangePicker} = DatePicker;

type AntRangePickerType = {
    cmp: IInputs
    props: any
}
const AntRangePicker: React.FC<AntRangePickerType> = ({cmp, props}) => {

    return <>
        {cmp.anchor && <ScrollableAnchor id={`${cmp.anchor}`}>
            <span></span>
        </ScrollableAnchor>}

        <Editor cmp={cmp} inputType={cmp.inputsType} />
        <Row style={{alignItems: 'center', marginBottom: '10px', ...cmp?.style}}>

            <Col span={10} style={{textAlign: 'right', paddingRight: '10px', ...cmp.bodyStyle}}>
                {cmp.caption}
            </Col>

            <Col span={10} style={{textAlign: 'right', paddingRight: '10px'}}>
                <div style={{position: 'relative'}}>
                    {props.renderHelpMessage()}
                    <RangePicker style={{...cmp.inputsStyle, ...props.walidationBorderStyle}} onChange={props.onChange} />
                </div>
            </Col>

        </Row>
    </>
}

export default AntRangePicker
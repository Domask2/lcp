import React from "react";
import {Checkbox, Col, Row} from 'antd';
import {IInputs} from "../Page/templates";
import Editor from "../Editor/Editor";
import ScrollableAnchor from "react-scrollable-anchor";

type AntCheckboxType = {
    cmp: IInputs
    props: any
}
const AntCheckbox: React.FC<AntCheckboxType> = ({cmp, props}) => {

    return <>
        {cmp.anchor && <ScrollableAnchor id={`${cmp.anchor}`}>
            <span></span>
        </ScrollableAnchor>}

        <Editor cmp={cmp} inputType={cmp.inputsType} />
        <Row style={cmp?.style}>
            <Col span={10} style={{textAlign: 'right', paddingRight: '10px'}}>
                {cmp.inputDescription && <div style={{height: '20px', }}></div>}
            </Col>
            <Col span={cmp.inputWidth ? cmp.inputWidth : 14}>
                <div style={{color: 'gray', fontSize: '12px', paddingLeft: '11px'}}>{cmp.inputDescription}</div>
                <div style={{position: 'relative'}}>
                    {props.renderHelpMessage()}
                    <Checkbox onChange={e => props.onChange(e.target.checked)} checked={props && !!props.value} >
                        {cmp.caption}
                    </Checkbox>
                </div>
            </Col>
        </Row>
    </>
}

export default AntCheckbox
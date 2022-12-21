import React from "react";
import {Col, Radio, Row, Space} from 'antd';
import {IInputs} from "../Page/templates";
import Editor from "../Editor/Editor";
import ScrollableAnchor from "react-scrollable-anchor";
import {useTypedSelector} from "../../../hooks";
import {RootState} from "../../../redux/redux.store";
import {getDataSource} from "../../../redux/ds/ds.selector";

type AntRadioBtnType = {
    cmp: IInputs
    props: any
}
const AntRadioBtn: React.FC<AntRadioBtnType> = ({cmp, props}) => {

    const ds = useTypedSelector((state: RootState) => getDataSource(state, cmp.initDs))
    const dsArr = ds && ds.items

    return <>
        {cmp.anchor && <ScrollableAnchor id={`${cmp.anchor}`}>
            <span></span>
        </ScrollableAnchor>}

        <Editor cmp={cmp} inputType={cmp.inputsType} />
        <Row style={{alignItems: 'center', marginBottom: '10px', ...cmp?.style}}>
            <Col span={10} style={{textAlign: 'right', paddingRight: '10px'}}>
                {cmp.inputDescription && <div style={{height: '20px', }}></div>}
                {`${cmp.caption}: `}
            </Col>
            <Col span={cmp.inputWidth ? cmp.inputWidth : 14}>
                <div style={{color: 'gray', fontSize: '12px', paddingLeft: '11px'}}>{cmp.inputDescription}</div>
                <Radio.Group onChange={(e) => props.onChange(e.target.value)} defaultValue={props && props.value}>
                    <Space direction={cmp.direction}>
                        {dsArr && dsArr.map((item: any, index: number) => {
                            return (
                                <Radio key={`${index}_${cmp.key}`} value={cmp.initDsKey && String(item[cmp.initDsKey])}>
                                    {typeof cmp.dictionaryDsKey === 'string' && item[cmp.dictionaryDsKey]}
                                </Radio>
                            )
                        })}
                    </Space>
                </Radio.Group>
            </Col>
        </Row>
    </>
}

export default AntRadioBtn


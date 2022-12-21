import React from "react";
import {Line} from "@ant-design/charts";
import {IChartBar} from "../Page/templates";
import {getDataSource} from "../../../redux/ds/ds.selector";
import {RootState} from "../../../redux/redux.store";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import Editor from "../Editor/Editor";
import ScrollableAnchor from "react-scrollable-anchor";


type AntChartBarType = {
    cmp: IChartBar
}
const AntChartLine = ({cmp}: AntChartBarType) => {

    const ds = useTypedSelector((state: RootState) => getDataSource(state, cmp.ds.key))

    let data: Array<any> = []
    data = ds === undefined ? data : ds.items !== undefined ? ds.items : data

    const xField = cmp.props.xField ? cmp.props.xField : 'x'
    const yField = cmp.props.yField ? cmp.props.yField : 'y'

    if (cmp.initDictionary && (Object.keys(cmp.initDictionary).length || cmp.initDictionary?.length)) {


        let dataArr: any = []
        Object.keys(cmp.initDictionary).forEach((key) => {
            dataArr.push({
                [xField]: key,
                [yField]: +cmp.initDictionary[key],
            })
        })
        data = dataArr
    }

    const config = {
        data: data,
        xField: xField,
        yField: yField,
        xAxis: {
            tickInterval: 1,
        },
        smooth: cmp.smooth,
    };

    return <>
        {cmp.anchor && <ScrollableAnchor id={`${cmp.anchor}`}>
            <span></span>
        </ScrollableAnchor>}
        <Editor cmp={cmp} />
        <br />
        <div style={cmp.style}>
            <h3 style={cmp.titleStyle}>{cmp.caption}</h3>
            <Line {...config} />
        </div>
    </>
}

export default AntChartLine

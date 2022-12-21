import React from "react";
import {Line} from "@ant-design/charts";
import {IChartBar} from "../Page/templates";
import {getDataSource} from "../../../redux/ds/ds.selector";
import {RootState} from "../../../redux/redux.store";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import Editor from "../Editor/Editor";
import ScrollableAnchor from "react-scrollable-anchor";
import {datas} from "./datas";


type AntChartBarType = {
    cmp: IChartBar
}
const AntChartMultiLine = ({cmp}: AntChartBarType) => {

    const ds = useTypedSelector((state: RootState) => getDataSource(state, cmp.ds.key))

    let data: Array<any> = []
    data = ds === undefined ? datas : ds.items !== undefined ? ds.items : datas
    data.sort((a: any, b: any) => +a.date_rogd - +b.date_rogd);
    const xField = cmp.props?.xField ? cmp.props.xField : 'year'
    const yField = cmp.props?.yField ? cmp.props.yField : 'value'
    const seriesField = cmp.props?.seriesField ? cmp.props.seriesField : 'category'
    data.forEach((item: any) => {
        item[xField] = cmp.xFieldNumeric ? +item[xField] : item[xField];
        item[yField] = cmp.yFieldNumeric ? +item[yField] : item[yField];
    })

    const config: any = {
        data: data,
        xField: xField,
        yField: yField,
        seriesField: seriesField,
        tooltip: {
            fields: cmp.tooltipFields,
        },
        yAxis: {
            min: cmp.yAxisMin && +cmp.yAxisMin,
        },
        xAxis: {
            min: cmp.xAxisMin && +cmp.xAxisMin,
        },
        smooth: cmp.smooth,
        legend: {
            layout: "horizontal",
            position: 'top',
            flipPage: false,
        }
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

export default AntChartMultiLine

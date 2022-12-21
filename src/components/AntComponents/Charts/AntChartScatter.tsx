import React from "react";
import {Scatter} from "@ant-design/charts";
import {IChartBar} from "../Page/templates";
import {getDataSource} from "../../../redux/ds/ds.selector";
import {RootState} from "../../../redux/redux.store";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import Editor from "../Editor/Editor";
import ScrollableAnchor from "react-scrollable-anchor";
import {datas2} from "./datas";

type AntChartBarType = {
    cmp: IChartBar
}
const AntChartScatter = ({cmp}: AntChartBarType) => {

    const ds = useTypedSelector((state: RootState) => getDataSource(state, cmp.ds.key))

    let data: Array<any> = []
    data = ds === undefined ? datas2 : ds.items !== undefined ? ds.items : datas2

    const xField = cmp.props?.xField ? cmp.props.xField : 'Revenue'
    const yField = cmp.props?.yField ? cmp.props.yField : 'Rating'
    const colorField = cmp.props?.colorField ? cmp.props.colorField : 'Genre'

    data.forEach((item: any) => {
        item[xField] = cmp.xFieldNumeric ? +item[xField] : item[xField];
        item[yField] = cmp.yFieldNumeric ? +item[yField] : item[yField];
    })

    const config = {
        appendPadding: 10,
        data,
        xField: xField,
        yField: yField,
        colorField: colorField,
        shape: 'circle',
        size: 5,
        tooltip: {
            fields: cmp.tooltipFields,
        },
        yAxis: {
            min: cmp.yAxisMin && +cmp.yAxisMin,
            // nice: true,
            line: {
                style: {
                    stroke: '#aaa',
                },
            },
        },
        xAxis: {
            min: cmp.xAxisMin && +cmp.xAxisMin,
            grid: {
                line: {
                    style: {
                        stroke: '#eee',
                    },
                },
            },
            line: {
                style: {
                    stroke: '#aaa',
                },
            },
        },
    };

    return <>
        {cmp.anchor && <ScrollableAnchor id={`${cmp.anchor}`}>
            <span></span>
        </ScrollableAnchor>}
        <Editor cmp={cmp} />
        <br />
        <div style={cmp.style}>
            <Scatter {...config} />
        </div>
    </>
}

export default AntChartScatter

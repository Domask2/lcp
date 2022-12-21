import React from "react";
import {Radar} from "@ant-design/charts";
import {IChartBar} from "../Page/templates";
import {getDataSource} from "../../../redux/ds/ds.selector";
import {RootState} from "../../../redux/redux.store";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import Editor from "../Editor/Editor";
import ScrollableAnchor from "react-scrollable-anchor";

const datas = [
    {
        name: 'G2',
        star: 10371,
    },
    {
        name: 'G6',
        star: 7380,
    },
    {
        name: 'F2',
        star: 7414,
    },
    {
        name: 'L7',
        star: 2140,
    },
    {
        name: 'X6',
        star: 660,
    },
    {
        name: 'AVA',
        star: 885,
    },
    {
        name: 'G2Plot',
        star: 1626,
    },
];

type AntChartBarType = {
    cmp: IChartBar
}
const AntChartRadarPlot = ({cmp}: AntChartBarType) => {

    const ds = useTypedSelector((state: RootState) => getDataSource(state, cmp.ds.key))

    let data: Array<any> = []
    data = ds === undefined ? datas : ds.items !== undefined ? ds.items : datas

    const xField = cmp.props?.xField ? cmp.props.xField : 'name'
    const yField = cmp.props?.yField ? cmp.props.yField : 'star'
    // const seriesField = cmp.props?.seriesField ? cmp.props.seriesField : 'im_por'

    if (cmp.initDictionary && Object.keys(cmp.initDictionary)?.length) {

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
        appendPadding: [0, 10, 0, 10],
        // seriesField: seriesField,
        meta: {
            star: {
                alias: 'star',
                min: 0,
                nice: true,
                formatter: (v: any) => Number(v).toFixed(2),
            },
        },
        xAxis: {
            tickLine: null,
        },
        yAxis: {
            label: false,
            grid: {
                alternateColor: 'rgba(0, 0, 0, 0.04)',
            },
        },
        point: {
            size: 2,
        },
        area: {},
    };

    return <>
        {cmp.anchor && <ScrollableAnchor id={`${cmp.anchor}`}>
            <span></span>
        </ScrollableAnchor>}
        <Editor cmp={cmp} />
        <br />
        <div style={cmp.style}>
            <h3 style={cmp.titleStyle}>{cmp.caption}</h3>
            <Radar {...config} />
        </div>
    </>
}

export default AntChartRadarPlot

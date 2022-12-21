import React from "react";
import {Column} from "@ant-design/charts";
import {IChartColumn} from "../Page/templates";
import {getDataSource} from "../../../redux/ds/ds.selector";
import {Skeleton} from "antd";
import {RootState} from "../../../redux/redux.store";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import Editor from "../Editor/Editor";
import ScrollableAnchor from "react-scrollable-anchor";


type AntChartPieType = {
    cmp: IChartColumn
}
const AntChartColumn = ({cmp}: AntChartPieType) => {

    const ds = useTypedSelector((state: RootState) => getDataSource(state, cmp.ds.key))

    let data: Array<any> = []
    data = ds === undefined ? data : ds.items !== undefined ? ds.items : data

    const xField = cmp.props.xField ? cmp.props.xField : 'x_key'
    const yField = cmp.props.yField ? cmp.props.yField : 'y_key'

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

    var config: any = {
        data: data,
        label: {
            yAxis: {
                reversed: true
            },
            position: 'middle',
            style: {
                fill: '#FFFFFF',
                opacity: 0.6,
            },
        },
        yField: yField,
        xField: xField,
        yAxis: {
            reversed: true,
            label: {
                autoHide: true,
                autoRotate: false,
            },
        },
        color: function color(type: any) {

            const value = Object.keys(type).length ? data.filter((item: any) => type[xField] === item[xField])[0][yField] : 0

            return value > 0 ? cmp?.barColor?.plus : cmp?.barColor?.minus;
        },
    };

    if (!Object.keys(data).length)
        return <>
            {cmp.anchor && <ScrollableAnchor id={`${cmp.anchor}`}>
                <span></span>
            </ScrollableAnchor>}
            <Editor cmp={cmp} />
            <br />
            <Skeleton active paragraph={{rows: 5}} />
        </>
    else
        return <>
            {cmp.anchor && <ScrollableAnchor id={`${cmp.anchor}`}>
                <span></span>
            </ScrollableAnchor>}
            <Editor cmp={cmp} />
            <br />
            <div style={cmp.style}>
                <h3 style={cmp.titleStyle}>{cmp.caption}</h3>
                <Column {...cmp.props} {...config} />
            </div>
        </>
}

export default AntChartColumn

import React from "react";
import {Pie} from "@ant-design/charts";
import {IChartPie} from "../Page/templates";
import {getDataSource} from "../../../redux/ds/ds.selector";
import {Skeleton} from "antd";
import {RootState} from "../../../redux/redux.store";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import Editor from "../Editor/Editor";
import ScrollableAnchor from "react-scrollable-anchor";


type AntChartPieType = {
    cmp: IChartPie
}
const AntChartPie = ({cmp}: AntChartPieType) => {

    const ds = useTypedSelector((state: RootState) => getDataSource(state, cmp.ds.key))

    const colorField = cmp.props.colorField ? cmp.props.colorField : 'x_key'
    const angleField = cmp.props.angleField ? cmp.props.angleField : 'y_key'


    let data: Array<any> = []
    data = ds === undefined ? data : ds.items !== undefined ? ds.items : data

    if (cmp.initDictionary || cmp.initDictionary?.length) {

        let dataArr: any = []
        Object.keys(cmp.initDictionary).forEach((key) => {
            dataArr.push({
                [colorField]: key,
                [angleField]: +cmp.initDictionary[key],
            })
        })
        data = dataArr
    }

    let config: any = {
        appendPadding: 10,
        data: data,
        legend: {
            reversed: true
        },
        colorField: colorField,
        angleField: angleField,
        label: {
            type: 'inner',
            offset: '-30%',
            content: function content(ref: any) {
                var percent = ref.percent;
                return `${(percent * 100).toFixed(0)} %`;
            },
            style: {
                fontSize: 14,
                textAlign: 'center',
            }
        },
        interactions: [{type: 'element-active'}],
        innerRadius: 0.5,
        statistic: {
            title: false,
            content: {
                style: {
                    overflow: 'hidden',
                    whiteSpace: 'pre-wrap',
                    textOverflow: 'ellipsis',
                    fontSize: 18,
                },
                content: cmp.text !== 'default' ? cmp.text : ds === undefined ? '' : ds.title !== undefined ? ds.title : ''
            }
        },
    };

    if (ds === undefined)
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
                <Pie {...cmp.props} {...config} />
            </div>
        </>
}

export default AntChartPie

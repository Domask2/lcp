import React from "react";
import {Bar} from "@ant-design/charts";
import {IChartBar} from "../Page/templates";
import {getDataSource} from "../../../redux/ds/ds.selector";
import {Empty, Skeleton} from "antd";
import {RootState} from "../../../redux/redux.store";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import Editor from "../Editor/Editor";


type AntChartBarType = {
    cmp: IChartBar
}
const AntChartBar = ({cmp}: AntChartBarType) => {

    const ds = useTypedSelector((state: RootState) => getDataSource(state, cmp.ds.key))
    let data: Array<any> = []

    /**
     * Данные могут быть в разных форматах.
     * Несколько строк из таблицы иди одна строка но много полей со значениями.
     * Для первого случая устанавливаем format "rows" для второго "line"
     */
    if (cmp.format === "rows")
        data = ds === undefined ? data : ds.items !== undefined ? ds.items : data

    let colorArr: Array<any> = [];
    if (cmp.format === "line") {
        if (ds !== undefined && ds.items !== undefined && ds.items.length > 0)
            ds.columns.forEach((col: any) => {
                let title = col.title.split(']').length === 1 ? col.title.split(']')[0] : col.title.split(']')[1]
                if (col.visible) {
                    colorArr[title] = ''
                    if (cmp.barColor !== undefined && cmp.barColor.plus !== undefined && cmp.barColor.minus !== undefined)
                        colorArr[title] = ds.items[0][col.key] * 1 > 0 ? cmp.barColor.plus : cmp.barColor.minus

                    let a: {[key: string]: string} = {a: 'b'}
                    let y = 'im'
                    a[y] = title
                    data.push({
                        im: title,
                        count: ds.items[0][col.key] * 1,
                    })
                }
            })

    }

    const xField = cmp.props.xField ? cmp.props.xField : 'x_key'
    const yField = cmp.props.yField ? cmp.props.yField : 'y_key'

    if (cmp.initDictionary && Object.keys(cmp.initDictionary)?.length) {

        let dataArr: any = []
        Object.keys(cmp.initDictionary).forEach((key) => {
            dataArr.push({
                [yField]: key,
                [xField]: +cmp.initDictionary[key],
            })
        })
        data = dataArr
    }


    var config: any = {
        data: data,
        label: {
            position: 'middle',
            style: {
                fill: '#FFFFFF',
                opacity: 0.6,
            },
        },
        yField: yField,
        xField: xField,
        yAxis: {
            label: {
                autoHide: true,
                autoRotate: false,
            },
        },
        // colorField: yField,
        color: function color(type: any) {

            const value = Object.keys(type).length ? data.filter((item: any) => type[yField] === item[yField])[0][xField] : 0

            return value > 0 ? cmp?.barColor?.plus : cmp?.barColor?.minus;
        },
        // color: function color(ref: any) {
        //     return colorArr[ref.im]
        // },
    };

    if (ds === undefined && cmp.initDictionary && !Object.keys(cmp.initDictionary)?.length)
        return <>
            <Editor cmp={cmp} />
            <Skeleton active paragraph={{rows: 5}} />
        </>
    else if (data.length > 0)
        return <>
            <Editor cmp={cmp} />
            <div style={cmp.style}>
                <h3 style={cmp.titleStyle}>{cmp.caption}</h3>
                <Bar {...cmp.props} {...config} style={cmp.style} />
            </div>
        </>
    else
        return <>
            <Editor cmp={cmp} /><Empty description="Нет данных" />
        </>

}

export default AntChartBar

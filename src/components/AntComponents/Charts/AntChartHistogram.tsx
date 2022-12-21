import React, {useState} from "react";
import {Histogram} from "@ant-design/charts";
import {IChartBar} from "../Page/templates";
import {getDataSource} from "../../../redux/ds/ds.selector";
import {RootState} from "../../../redux/redux.store";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import Editor from "../Editor/Editor";
import ScrollableAnchor from "react-scrollable-anchor";
import ChartInputsElement from "./ChartInputsElement";
import {Row} from "antd";


type AntChartBarType = {
    cmp: IChartBar
}
const AntChartHistogram = ({cmp}: AntChartBarType) => {

    const [key, setKey] = useState(cmp.binFieldForUsers ? cmp.binFieldForUsers[0] : '')
    const [bin, setBin] = useState(cmp.binWidth ? cmp.binWidth : 1)

    const ds = useTypedSelector((state: RootState) => getDataSource(state, cmp.ds.key))

    let data: Array<any> = []
    data = ds === undefined ? data : ds.items !== undefined ? ds.items : data

    const binField = cmp.binField ? cmp.binField : 'x'
    const binWidth = cmp.binWidth ? cmp.binWidth : 1

    if (cmp.initDictionary && (Object.keys(cmp.initDictionary).length || cmp.initDictionary?.length)) {

        let dataArr: any = []
        Object.keys(cmp.initDictionary).forEach((key) => {
            dataArr.push({
                [binField]: +cmp.initDictionary[key],
            })
        })
        data = dataArr
    }

    if (cmp.xFieldNumeric) {
        const newArr = data.map((item: any) => {
            if (typeof item[binField] === 'string') {
                item[binField] = item[binField].split('.').length ? +item[binField].split('.')[2] : +item[binField];
            }
            return item
        })
        data = newArr
    }

    const config = {
        data,
        binField: key ? key : binField,
        binWidth: +bin ? +bin : binWidth,
        xAxis: {
            min: cmp.xAxisMin && +cmp.xAxisMin,
        },

    };

    return <>
        {cmp.anchor && <ScrollableAnchor id={`${cmp.anchor}`}>
            <span></span>
        </ScrollableAnchor>}
        <Editor cmp={cmp} />
        <br />
        <div style={cmp.style}>
            <h3 style={cmp.titleStyle}>{cmp.caption}</h3>
            {cmp.binFieldForUsers?.length ? <Row>
                <ChartInputsElement
                    ds={ds?.columns}
                    setValue={setKey}
                    value={key}
                    list={cmp.binFieldForUsers}
                    title='Выбор данных'
                />
                <ChartInputsElement
                    setValue={setBin}
                    value={bin}
                    title='Объединить ячеек'
                />

            </Row> : ''}
            <Histogram {...config} />
        </div>
    </>
}

export default AntChartHistogram

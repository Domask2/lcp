import React, {FC} from 'react';
import {BidirectionalBar} from "@ant-design/charts";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {RootState} from "../../../redux/redux.store";
import {getDataSource} from "../../../redux/ds/ds.selector";
import Editor from "../Editor/Editor";

type AntBidirectionalBarType = {
    cmp: any
}
const AntBidirectionalBar: FC<AntBidirectionalBarType> = ({cmp}) => {

    const ds = useTypedSelector((state: RootState) => getDataSource(state, cmp.ds.key))

    type DataType = {
        label: string,
        val1: number,
        val2: number
    }
    let data: Array<DataType> = []

    if (ds?.items !== undefined && ds.items.length > 0) {
        ds.columns.forEach((col: any) => {
            let val1 = 0, val2 = 0
            if (ds.items[0][col.key] * 1 >= 0)
                val1 = ds.items[0][col.key] * 1

            if (ds.items[0][col.key] * 1 < 0)
                val2 = ds.items[0][col.key] * -1

            let title = col.title.split(']').length === 1 ? col.title.split(']')[0] : col.title.split(']')[1]

            if (col.visible) {
                data.push({
                    label: title,
                    val1: val1,
                    val2: val2
                })
            }
        })
    }

    return <>
        <Editor cmp={cmp} />
        <BidirectionalBar data={data}
            xField='label'
            xAxis={{position: 'bottom'}}

            interactions={[{type: 'active-region'}]}
            yField={['val1', 'val2']}
            style={cmp.style}
            {...cmp.props}
            tooltip={{
                shared: true,
                showMarkers: false,
            }}
        />
    </>
};

export default AntBidirectionalBar;
import React from "react";
import {getLsByKey} from "../../../redux/ds/ds.selector";
import {Skeleton, Table} from "antd";
import serviceTable from "../../../services/serviceTable";
import {IDetails} from "../Page/templates";
import {RootState} from "../../../redux/redux.store";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import Editor from "../Editor/Editor";
import ScrollableAnchor from "react-scrollable-anchor";


/**
 * Для работы компоненты необходимы параметры в url
 * @param props
 * @param cmp
 * @constructor
 */
type AntDetailsType = {
    cmp: IDetails
    props: any
}
const AntDetails = ({props, cmp}: AntDetailsType) => {
    const entity = useTypedSelector((state: RootState) => getLsByKey(state, cmp.ls.key))
    const columns = [
        {
            'title': 'Колонка',
            'key': 'column',
            'dataIndex': 'column',
        }, {
            'title': 'Значение',
            'key': 'value',
            'dataIndex': 'value',
        }
    ]

    const getFields = (entity: any) => {
        if (entity.row === undefined)
            return []

        let result: any = []
        entity.columns.forEach((item: any) => {
            if (item.visible)
                result.push({
                    column: serviceTable.withOutNumber(item.title),
                    value: entity.row[item.key],
                    key: item.key
                })
        })

        return result
    }

    if (entity.columns === undefined || entity.columns.length === 0)
        return <>
            {cmp.anchor && <ScrollableAnchor id={`${cmp.anchor}`}>
                <span></span>
            </ScrollableAnchor>}
            <Editor cmp={cmp} />
            <Skeleton active paragraph={{rows: 5}} avatar />
        </>

    return <>
        {cmp.anchor && <ScrollableAnchor id={`${cmp.anchor}`}>
            <span></span>
        </ScrollableAnchor>}
        <Editor cmp={cmp} oldComponent={true} />
        <Table size="small" dataSource={getFields(entity)}
            columns={columns} />
    </>
}

export default AntDetails
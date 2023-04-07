import React, {FC} from 'react';
import Editor from "../Editor/Editor";
import ScrollableAnchor from 'react-scrollable-anchor';

import {Button, Descriptions, Empty} from "antd";
import serviceTable from "../../../services/serviceTable";
import {IDescriptions} from "../Page/templates";
import {IColumn} from "../../../redux/ds/ds.initial";

type AntDescriptionsType = {
    cmp: IDescriptions
    props: {[p: string]: any}
}
const AntDescriptions: FC<AntDescriptionsType> = ({cmp, props}) => {

    const arrShow: any = Array.isArray(cmp.show) ? cmp.show.join().split(',') : cmp.show?.split(',')
    const arrHide = Array.isArray(cmp.hide) ? cmp.hide.join().split(',') : cmp.hide?.split(',');

    let list: Array<any> = []
    if (props.dataSource !== undefined && props.dataSource?.items.length > 0)
        props.dataSource.columns.forEach((item: IColumn) => {
            let flg = true
            if (item.visible || true) {
                if (arrShow)
                    flg = !!(arrShow.indexOf(item.key) + 1);

                if (arrHide && flg)
                    if (arrHide.indexOf(item.key) + 1)
                        flg = false

                /**
                 * Вот это все вынести куда-то
                 * Будет переиспользоваться
                 */
                let fStyle: any = {}
                fStyle = cmp.columns !== undefined
                    ? cmp.columns[item.key] !== undefined
                        ? cmp.columns[item.key].style !== undefined
                            ? cmp.columns[item.key].style
                            : {}
                        : {}
                    : {}

                let fClass: any = ''
                fClass = cmp.columns !== undefined
                    ? cmp.columns[item.key] !== undefined
                        ? cmp.columns[item.key].className !== undefined
                            ? cmp.columns[item.key].className
                            : ''
                        : ''
                    : ''

                let fTitle: any = ''
                fTitle = cmp.columns !== undefined
                    ? cmp.columns[item.key] !== undefined
                        ? cmp.columns[item.key].title !== undefined
                            ? cmp.columns[item.key].title
                            : item.title
                        : item.title
                    : item.title

                if (flg) {
                    let text = fTitle.split(']').length === 2 ? item.title.split(']')[1] : fTitle
                    let value = props.dataSource?.items[props.index] ? props.dataSource?.items[props.index][item.key] : null
                    value = value ? value : '- не указано -'

                    let val = serviceTable.mutateValue(value, item.key, cmp.columns, props.ds_mutators, {
                        row: props.dataSource?.items[props.index],
                        columns: props.dataSource.columns
                    })

                    if (typeof value !== 'object' || value === null)
                        list.push({
                            title: text,
                            value: <span style={{...fStyle}} className={fClass}>{val}</span>,
                            key: item.key
                        })

                }
            }
        })

    if (props.dataSource === undefined || props.dataSource?.items.length === 0)
        return <>
            <Editor cmp={cmp} />
            {/*<Skeleton active paragraph={{rows: 5}}/>*/}
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={'Нет данных'} />
        </>

    return <>
        {cmp.anchor && <ScrollableAnchor id={`${cmp.anchor}`}>
            <span></span>
        </ScrollableAnchor>}
        <Editor cmp={cmp} />
        <Descriptions style={cmp.style} labelStyle={cmp.labelStyle} contentStyle={cmp.contentStyle} {...cmp?.props}>
            {list.map(item => <Descriptions.Item key={item.key} label={item.title}>{item.value}</Descriptions.Item>)}
        </Descriptions>
        {
            cmp?.isBtnAction && <Button onClick={() => {
                // console.log(list)
            }
            } type='link' >{cmp.btnTitle}</Button>
        }
    </>
};

export default AntDescriptions;
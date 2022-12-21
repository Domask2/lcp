import React from 'react';
import {useTypedSelector} from "../../../hooks";
import useLoadDataSource from "../../../hooks/useLoadDataSource";
import {getDataSource} from "../../../redux/ds/ds.selector";
import Editor from "../Editor/Editor";
import {Pagination} from "antd";
import {IPagination} from "../Page/templates";
import {RootState} from "../../../redux/redux.store";

type AntPaginationType = {
    cmp: IPagination
}

const AntPagination: React.FC<AntPaginationType> = ({cmp}) => {
    const [loadDataSourceWithCache] = useLoadDataSource()
    const dataSource = useTypedSelector((state: RootState) => getDataSource(state, cmp.ds.key));
    const currentPageNumber = dataSource?.filter ? +dataSource?.filter?.split('__cur_page=')[1]?.split('&')[0] : undefined;

    let onChange = (page: number) => {
        cmp.cur_page = page

        let ds_filter_arr = dataSource.filter.split('&')
        let filter_ds_filter_arr = []
        let search_ds_filter_arr = []
        let orderby_ds_filter_arr = []

        filter_ds_filter_arr = ds_filter_arr.filter((item) => {
            return item.indexOf('__filter') !== -1
        })
        search_ds_filter_arr = ds_filter_arr.filter((item) => {
            return item.indexOf('__search') !== -1
        })
        orderby_ds_filter_arr = ds_filter_arr.filter((item) => {
            return item.indexOf('__order_by') !== -1
        })

        let new_ds_filter_arr = [...filter_ds_filter_arr, ...search_ds_filter_arr, ...orderby_ds_filter_arr]

        new_ds_filter_arr.push('__cur_page=' + cmp.cur_page)
        new_ds_filter_arr.push('__per_page=' + cmp.per_page)
        let ds_filter_str = new_ds_filter_arr.join('&')

        loadDataSourceWithCache(cmp.ds.key, ds_filter_str, true, '')
    }

    let count = dataSource?.count !== undefined ? dataSource.count : 1

    return (
        <>
            <Editor cmp={cmp} />

            <Pagination
                size="small"
                style={cmp.style}
                total={count}
                showSizeChanger={false}
                pageSize={cmp.per_page ? cmp.per_page : 10}
                current={currentPageNumber}
                onChange={onChange}
            />
        </>
    )
};

export default AntPagination;
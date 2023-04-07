import React from 'react';
import useLoadDataSource from "../../../hooks/useLoadDataSource";
import Editor from "../Editor/Editor";
import {Pagination} from "antd";
import {IPagination} from "../Page/templates";
import useDataSourceFiltred from '../../../hooks/useDataSourceFilter';
import {useActions} from '../../../hooks';

type AntPaginationType = {
    cmp: IPagination
    props?: any
}

const AntPagination: React.FC<AntPaginationType> = ({cmp, props}) => {

    const {getCurPage, getPerPage, addCurPage, getDataSourceCount} = useDataSourceFiltred(cmp.ds?.key, cmp)
    const [loadDataSourceWithCache] = useLoadDataSource()
    const {loadDataSource} = useActions();

    let onChange = (page: number) => {
        loadDataSourceWithCache(props.dsKey, addCurPage(page), true, '')
    }

    return (
        <div style={{position:'relative'}}>
            <Editor cmp={cmp} direction='left' testEditorStyle={true} height='25px'/>

            <Pagination
                size="small"
                style={cmp.style}
                total={getDataSourceCount()}
                showSizeChanger={false}
                pageSize={getPerPage()}
                current={getCurPage()}
                onChange={onChange}
            />
        </div>
    )
};

export default AntPagination;
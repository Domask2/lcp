import React, {FC, useEffect, useState} from 'react';
import {useTypedSelector, useActions} from '../../../hooks';
import Editor from '../Editor/Editor';

import {getDataSource, getMappedText} from "../../../redux/ds/ds.selector";

import Mapped from "../Mapped";
import {Button, Input} from "antd";
import {SearchOutlined, ClearOutlined} from '@ant-design/icons';
import {EnterClick, INIT_VALUES} from '../../../utils';

import {RootState} from "../../../redux/redux.store";
import {ISearchComponent} from '../Page/templates';
import ScrollableAnchor from 'react-scrollable-anchor';
import {IColumn} from "../../../redux/ds/ds.initial";

type SearchType = {
    cmp: ISearchComponent
}

const Search: FC<SearchType> = ({cmp}) => {
    const mappedCaption = useTypedSelector((state: RootState) => getMappedText(state, cmp.caption ? cmp.caption : ''))
    const {loadDataSource} = useActions();
    const [searchValue, setSearchValue] = useState('');

    // сохраняем ключ ds в зависимости от наличия префикса
    const ds = cmp.searchObj.prefix ? `${cmp.searchObj.prefix}-${cmp.searchObj.ds}` : cmp.searchObj.ds;
    const dataSource = useTypedSelector((state: RootState) => getDataSource(state, ds));

    // поиск в ds-ке поля, по которым возможен поиск - search: true и приводим к массиву удобочитаемых значений
    const searchColumns: any = dataSource?.columns.filter((item: IColumn) => item.search);
    const searchKeys: any = searchColumns?.map((item: IColumn) => item.title.split(']')[1]);

    // из строики вида __cur_page=1&__per_page=10& выделяем значение per_page
    const dsFilter = useTypedSelector((state: RootState) => getDataSource(state, cmp.searchObj.ds))?.filter;
    const perPageValues = dsFilter && dsFilter.split("__per_page=")[1]?.split("&")[0] ? dsFilter.split("__per_page=")[1]?.split("&")[0] : 10;

    // если в настройках задан префикс запускаем loadDataSource для сознания в redux новой ds-ки с префиксом
    useEffect(() => {
        if (cmp.searchObj.prefix) {
            loadDataSource(ds, `${INIT_VALUES.RESET_VALUE}=${perPageValues}`, false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cmp.searchObj.prefix])

    const handleSearch = () => {
        // формирование строки фильтрации и поиска для запроса на сервер
        let filter_arr = dataSource.filter.split('&');
        let filter_ds_filter_arr = []
        let search_ds_filter_arr = []

        filter_ds_filter_arr = filter_arr.filter((item) => {
            return item.indexOf(INIT_VALUES.CURRENT_PAGE) !== -1
        })
        search_ds_filter_arr = filter_arr.filter((item) => {
            return item.indexOf(INIT_VALUES.PER_PAGE) !== -1
        })
        let new_ds_filter_arr = [...filter_ds_filter_arr, ...search_ds_filter_arr]
        new_ds_filter_arr.push(`${INIT_VALUES.SEARCH}=${searchValue}`)

        loadDataSource(ds, new_ds_filter_arr.join('&'), false)
    }

    const handleReset = () => {
        setSearchValue('')
        // перезаписываем ds-ку в начальное состояние
        loadDataSource(ds, `${INIT_VALUES.RESET_VALUE}=${perPageValues}`, false)
    }

    return <div style={cmp.style}>

        {cmp.anchor && <ScrollableAnchor id={`${cmp.anchor}`}>
            <span></span>
        </ScrollableAnchor>}

        <Editor cmp={cmp} />
        <h3>{<Mapped text={mappedCaption} />}</h3>
        <div style={{display: 'flex', alignItems: 'center'}}>
            <Input style={cmp.inputsStyle ? cmp.inputsStyle : {}} onKeyDown={(evt) => {
                EnterClick(evt.code) && handleSearch()
            }} onChange={(e) => setSearchValue(e.currentTarget.value)} value={searchValue}
                placeholder={`Поиск по: ${searchKeys && searchKeys.join(', ')}`} />
            <Button style={{margin: '-1px 5px 0 -33px'}} type='link' size='small'
                onClick={handleSearch}><SearchOutlined /></Button>
            <Button style={{marginTop: '-1px'}} type='link' size='small' onClick={handleReset}><ClearOutlined /></Button>
        </div>
        <div>
            <span style={{fontSize: '12px'}}>Всего записей: {dataSource?.count}</span>
        </div>
    </div>
};

export default Search;

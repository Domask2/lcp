import React, {FC, useEffect, useState} from 'react';
import {useTypedSelector, useActions} from '../../../hooks';
import Editor from '../Editor/Editor';

import {getMappedText} from "../../../redux/ds/ds.selector";

import Mapped from "../Mapped";
import {Button, Input} from "antd";
import {SearchOutlined, ClearOutlined} from '@ant-design/icons';
import {EnterClick} from '../../../utils';

import {RootState} from "../../../redux/redux.store";
import {ISearchComponent} from '../Page/templates';
import ScrollableAnchor from 'react-scrollable-anchor';
import {IColumn} from "../../../redux/ds/ds.initial";
import useDataSourceFiltred from '../../../hooks/useDataSourceFilter';
import {getEditMode} from "../../../redux/app/app.selector";

type SearchType = {
    cmp: ISearchComponent,
    props?: any
}

const Search: FC<SearchType> = ({cmp, props}) => {
    const editMode = useTypedSelector((state: RootState) => getEditMode(state));
    const {dataSource} = props;

    // console.log(cmp.key);

    const mappedCaption = useTypedSelector((state: RootState) => getMappedText(state, cmp.caption ? cmp.caption : ''))
    const {loadDataSource} = useActions();

    const dsKey = cmp.searchObj.prefix ? `${cmp.searchObj.prefix}-${props.dsKey}` : dataSource?.key
    const {getDataSourceCount, resetFilters, addSearch} = useDataSourceFiltred(dsKey, cmp);

    const [searchValue, setSearchValue] = useState('');

    // поиск в ds-ке поля, по которым возможен поиск - search: true и приводим к массиву удобочитаемых значений
    const searchColumns: any = dataSource?.columns.filter((item: IColumn) => item.search);
    const searchKeys: any = searchColumns?.map((item: IColumn) => item.title.split(']')[1]);

    // если в настройках задан префикс запускаем loadDataSource для сознания в redux новой ds-ки с префиксом
    useEffect(() => {
        if (cmp.searchObj?.prefix) {
            loadDataSource(dsKey, resetFilters(), false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cmp.searchObj?.prefix])

    const handleSearch = () => {
        loadDataSource(dsKey, addSearch(searchValue), false)
    }

    const handleReset = () => {
        setSearchValue('')
        // перезаписываем ds-ку в начальное состояние
        loadDataSource(dsKey, addSearch(''), false)
    }

    return <div style={editMode ? {position: 'relative'}: cmp.style }>

        {cmp.anchor && <ScrollableAnchor id={`${cmp.anchor}`}>
            <span></span>
        </ScrollableAnchor>}

        <Editor cmp={cmp} direction='left' testEditorStyle={true} height='30px'/>
        <h3>{<Mapped text={mappedCaption} />}</h3>
        <div style={{display: 'flex', alignItems: 'center'}}>
            <Input
                style={cmp.inputsStyle ? cmp.inputsStyle : {}}
                onKeyDown={(evt) => {
                    EnterClick(evt.code) && handleSearch()
                }}
                onChange={(e) => setSearchValue(e.currentTarget.value)}
                value={searchValue}
                placeholder={`Поиск по: ${searchKeys && searchKeys.join(', ')}`}
            />
            <Button
                style={{margin: '-1px 5px 0 -33px'}}
                type='link'
                size='small'
                onClick={handleSearch}
            >
                <SearchOutlined />
            </Button>
            <Button
                style={{marginTop: '-1px'}}
                type='link' size='small'
                onClick={handleReset}
            >
                <ClearOutlined />
            </Button>
        </div>
        <div>
            <span style={{fontSize: '12px'}}>{+getDataSourceCount() ? `Всего записей: ${getDataSourceCount()}` : 'Ничего не найдено'}</span>
        </div>
    </div>
};

export default Search;

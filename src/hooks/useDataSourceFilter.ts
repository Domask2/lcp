import {useTypedSelector} from "./useTypedSelector";
import {getDataSource} from "../redux/ds/ds.selector";
import {RootState} from "../redux/redux.store";
import useBasePath from "./useBasePath";
import {getPageDsByKey} from "../redux/project/project.selector";

const useDataSourceFiltred = (dsKey: string = '', cmp: any = {}) => {

    const pathName = useBasePath();

    const trimDsKey = dsKey?.split('-').length > 1 ? dsKey?.split('-')[1] : dsKey?.split('-')[0]
    const initDataSourceFilter = useTypedSelector((state: RootState) => getPageDsByKey(state, pathName, trimDsKey))?.filter;
    const dataSource = useTypedSelector((state: RootState) => getDataSource(state, dsKey));
    const dataSourceFilter = dataSource?.filter;

    const castToSting = (str: string) => {
        if (dataSourceFilter?.split(str)[1]?.split('&')[0]) {
            return `&__${str}${dataSourceFilter.split(str)[1].split('&')[0]}`
        } else {
            return castToStingInit(str)
        };
    };

    const castToStingInit = (str: string) => {
        if (initDataSourceFilter?.split(str)[1]?.split('&')[0]) {
            return `&__${str}${initDataSourceFilter.split(str)[1].split('&')[0]}`
        } else {
            return ''
        };
    };

    const filterObj = {
        curPage: castToSting('cur_page='),
        perPage: castToSting('per_page='),
        filter: castToSting('filter='),
        search: castToSting('search='),
        orderBy: castToSting('order_by='),
    };

    // console.log(initDataSource, cmp.key);
    // console.log(dataSource, cmp.key);
    // console.log('init: ', initDataSourceFilter?.split('per_page=')[1]?.split('&')[0]);
    // console.log('prefix: ', dataSourceFilter?.split('per_page=')[1]?.split('&')[0]);
    // console.log('cmp.key: ', cmp.key);
    // console.log(filterObj);
    // console.log(dataSourceFilter);

    const getDSAvailablity = () => {
        console.log('cmp.key: ', 'getDSAvailablity', cmp.key);

        return (dataSourceFilter || initDataSourceFilter) && true;
    }

    const _resetCurPage = () => {
        filterObj.curPage = castToStingInit('cur_page=');
    };
    const _resetPerPage = () => {
        filterObj.perPage = castToStingInit('per_page=');
    };
    const _resetFilter = () => {
        filterObj.filter = castToStingInit('filter=');
    };
    const _resetSearch = () => {
        filterObj.search = castToStingInit('search=');
    };
    const _resetOrderBy = () => {
        filterObj.orderBy = castToStingInit('order_by=');
    };

    const addCurPage = (value: string | number) => {
        // console.log('cmp.key: ', 'addCurPage', cmp.key);
        filterObj.curPage = `__cur_page=${value}`;
        return getFilterString()
    };

    const getCurPage = () => {
        // console.log('cmp.key: ', 'getCurPage', cmp.key);
        return dataSourceFilter?.split('cur_page=')[1]?.split('&')[0] ? +dataSourceFilter.split('cur_page=')[1]?.split('&')[0] : 1;
    };
    const getPerPage = () => {
        // console.log('cmp.key: ', 'getPerPage', cmp.key);
        return dataSourceFilter?.split('per_page=')[1]?.split('&')[0] ? +dataSourceFilter.split('per_page=')[1]?.split('&')[0] : 10;
    }

    const addFilter = (key: string, value: string | string[]) => {
        // console.log('cmp.key: ', 'addFilter', cmp.key);
        let valStr = Array.isArray(value) ? value.join('|') : value;

        if (valStr) { // есть ли значение для фильтрации
            if (filterObj.filter) { // применяется ли уже какая-то фильтрация
                const initKey = filterObj.filter.split('filter=')[1].split('=')[0];
                const initValue = filterObj.filter.split('filter=')[1].split('=')[1].split(',')[0];
                if (initKey === key) { // если совпадают ключи то просто заменяем фильтрацию
                    filterObj.filter = `&__filter=${key}=${valStr}` //
                } else { // если не совпадают ключи фильтрации - добавляем параметр к существующей фильтрации
                    filterObj.filter = `&__filter=${initKey}=${initValue},${key}=${valStr}`
                }
            } else {
                filterObj.filter = `&__filter=${key}=${valStr}`
            }
        } else {
            if (filterObj.filter) {
                const oldKey = filterObj.filter.split('filter=')[1].split('=')[0];
                if (oldKey === key) {
                    filterObj.filter = `` //
                } else {
                    filterObj.filter = filterObj.filter.split(`,${key}`)[0] // 
                }
            }
        };
        _resetCurPage();
        return getFilterString()
    };
    const getFilter = () => {
        // console.log('cmp.key: ', 'getFilter', cmp.key);
        return filterObj.filter
    }

    const addSearch = (value: string) => {
        // console.log('cmp.key: ', 'addSearch', cmp.key);
        value ? filterObj.search = `&__search=${value}` : filterObj.search = ``;
        _resetCurPage();
        return getFilterString()
    };

    const addOrderBy = (value: string) => {

    };

    const resetFilters = () => {
        // console.log('cmp.key: ', 'resetFilters', cmp.key);
        _resetCurPage();
        _resetPerPage();
        _resetFilter();
        _resetSearch();
        _resetOrderBy();
        return getFilterString()
    };

    const getFilterString = () => {
        return `${filterObj.curPage}${filterObj.perPage}${filterObj.filter}${filterObj.search}${filterObj.orderBy}`
    };

    const getDataSourceCount = () => {
        return dataSource?.count
    };

    return {
        addCurPage,
        getCurPage,
        getPerPage,
        addFilter,
        getFilter,
        addSearch,
        addOrderBy,
        resetFilters,
        getFilterString,
        getDSAvailablity,
        getDataSourceCount,
    }
}

export default useDataSourceFiltred
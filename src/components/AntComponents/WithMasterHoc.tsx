import React, {useEffect} from "react";
import {useActions, useTypedSelector} from "../../hooks";
import {getDataSource, getDataSourceFilter, getMutators} from "../../redux/ds/ds.selector";
import {RootState} from "../../redux/redux.store";

type IteratorHOCType = {
    WrappedComponent: any,
    cmp: any,
    props: any
};


const WithMaster = ({WrappedComponent, cmp, props}: IteratorHOCType) => {

    const {loadDataSource} = useActions();

    let cmpDs: string = '';
    if (cmp.searchObj?.ds) {
        cmpDs = cmp.searchObj?.ds;
    } else if (cmp.ds?.key) {
        cmpDs = cmp.ds?.key;
    } else if (cmp.ds) {
        cmpDs = cmp.ds;
    }
    // console.log(cmp.key);

    let index = props.index ? props.index : 0
    // const cmpDs = cmp.searchObj?.ds ? cmp.searchObj?.ds : cmp.ds?.key;
    const dsKey = cmp.filtredKey ? `${index}_iterator-${cmpDs}` : cmpDs;
    const dataSource = useTypedSelector((state: RootState) => getDataSource(state, dsKey));
    const dataSource1 = useTypedSelector((state: RootState) => getDataSource(state, cmp.ds1));

    const dsFilter = useTypedSelector((state: RootState) => getDataSourceFilter(state, cmpDs));
    const filterString = (cmp.filtredKey && props.item) ? `${dsFilter ? `${dsFilter}` : ''}&__filter=${cmp.filtredKey}=${props?.item[cmp.filtredKey]}` : `${dsFilter ? dsFilter?.split('&__search')[0] : ''}`;

    index = dataSource?.items?.length === 1 ? 0 : +index.toString().split('').join('')[0]

    useEffect(() => {
        if (cmp.filtredKey) {
            loadDataSource(dsKey, filterString, false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props?.item])

    const propsObj: any = {
        dataSource,
        dataSource1,
        index,
        dsKey,
        filterString,
    }

    return <WrappedComponent key={`${cmp.key}`} cmp={cmp} props={propsObj} />;
};

export default WithMaster
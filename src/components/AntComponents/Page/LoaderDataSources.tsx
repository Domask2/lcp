import React, {useEffect, useState} from "react";
import {useParams, useSearchParams} from "react-router-dom";

import {useActions, useTypedSelector, useLoadDataSource} from "../../../hooks";
import {getDataSourcesAll, getDataSourcesKeys} from "../../../redux/ds/ds.selector";
import {getUpload} from "../../../redux/project/project.selector";

import {ILocalStorage, IPage} from "../../../redux/project/project.initial";
import {RootState} from "../../../redux/redux.store";
import {IDataSource} from "../../../redux/ds/ds.initial";

/**
 * Компонента загружает источники данных указанные на данной странице
 */
type LoaderDataSourceType = {
    page: IPage,
    props: any
}
const LoaderDataSources: React.FC<LoaderDataSourceType> = ({page, props}) => {
    const params = useParams<any>()
    const [searchParams] = useSearchParams();
    const dataSourcesKeys = useTypedSelector((state: RootState) => getDataSourcesKeys(state));
    const dataSources = useTypedSelector((state: RootState) => getDataSourcesAll(state));
    const [arrDs, setArrDs]: any = useState<IDataSource[]>([])
    const uploadStatus = useTypedSelector((state: RootState) => getUpload(state))

    const {setLsBy, registerFnc, uploadDone} = useActions()
    const [loadDataSourceWithCache] = useLoadDataSource()
    /** arrDs нужен чтобы отмечать те ds что уже загружаются и не пытаться их загрузить снова */
    useEffect(() => {
        /** загрузим все DS этой страницы */
        if (page) {
            loadAllDs()
        }
        /** загрузим все DS этой страницы */
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props, uploadStatus])

    const loadAllDs = () => {
        if (page)
            if (page.datasources !== undefined && page.datasources !== null) /** если у СТРАНИЦЫ есть ds */
            Object.keys(page.datasources).forEach((key: string) => {
                let obj = {...page.datasources[key]}
                /**
                 * ============= тут какая то магия ================
                 * если ключ очередного ds содержит ":" значит нужно посмотреть в параметры переданные в url
                 * источник данных грузится сразу если установлено поле фильтр и фильтр отличается от того что есть
                 */
                if (obj.key !== null && obj.key !== undefined) {
                    let arrKey = obj.key.split(':')    //тут мы можем пеердавать значение ds в параметре.
                    let obj_key = ''
                    if (arrKey.length === 2)
                        obj_key = arrKey[0] + props.match.params[arrKey[1]]
                    else
                        obj_key = obj.key

                    /** || obj.filter - проверяем, нет ли фильтрации на этот DS если есть, то грузим его. */
                    if ((!(dataSourcesKeys.indexOf(obj_key) + 1) && !(arrDs.indexOf(obj_key) + 1)) || obj.filter) {
                        setArrDs(arrDs)
                        if (key[0] !== '<') {
                            let filter = page.datasources[key].filter
                            let newFilter = ''

                            newFilter = filter !== null ? filter : ''
                            for (key in params)
                                newFilter = newFilter?.replace(':' + key, params[key] as string)

                            /** проверим не загружен ли уже такой источник с таким же filterPerm */
                            if (dataSources[obj.key]?.filter !== newFilter) {
                                // loadDataSourceWithCache(
                                loadDataSourceWithCache(
                                    obj_key,
                                    newFilter,
                                    // obj.cache
                                    false
                                )
                            } else {
                                uploadDone(true)
                                // console.log('взяли готовое')
                            }
                        }
                    }
                }
                /** ============= тут какая то магия ================ */
            })
    }

    /** при изменении списка DS нжуно проверить не нужно ли получить детали для этой страницы ls */
    useEffect(() => {
        if (uploadStatus) {
            if (page) {
                if (page.ls !== undefined && page.ls !== null) {
                    page.ls.forEach(ls => {
                        /**
                         * засетить значение в ls из ds по ds_key, column, value
                         * если value = __params - взять его из параметров по ключу column
                         */
                        let ls_data: ILocalStorage = {...ls}
                        if (dataSourcesKeys.indexOf(ls.ds_key) + 1) {
                            if (ls.value === "__params")
                                ls_data.value = searchParams.get(ls.column) ?? "";

                            setLsBy(ls_data)
                        }
                    })
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataSourcesKeys, page, uploadStatus])

    /** проверим на наличие fnc и зарегистрируем их */
    useEffect(() => {
            if (page) {
                if (page.fnc !== undefined) {
                    page.fnc?.forEach(fnc => {
                        registerFnc(fnc)
                    })
                }
            }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, uploadStatus])

    return <></>
}

export default LoaderDataSources
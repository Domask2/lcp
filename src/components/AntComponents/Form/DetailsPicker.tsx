import React, {FC, useEffect, useState} from 'react';
import {useTypedSelector, useActions} from "../../../hooks";

import AntPagination from "../Pagination/AntPagination";
import Ext from '../Ext/Ext';

import {EnterClick, INIT_VALUES} from '../../../utils';
import {getDataSource} from "../../../redux/ds/ds.selector";
import serviceTable from "../../../services/serviceTable";

import {Button, Divider, Input, Modal, Table} from "antd";
import {SearchOutlined, ClearOutlined} from '@ant-design/icons';
import {RootState} from "../../../redux/redux.store";
import {IForm} from '../Page/templates';

type DetailsPickerType = {
    item: any
    form: any
    cmp: IForm
}
const DetailsPicker: FC<DetailsPickerType> = ({item, form, cmp}) => {

    // ds к которой подключена форма, нужна для автозаполнения
    const initialDataSource = useTypedSelector((state: RootState) => getDataSource(state, cmp?.source));

    const {loadDataSource} = useActions();

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [value, setValue] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [row, setRow] = useState<any>('');
    // const [antNativeEventElements, setAntNativeEventElements] = useState<any>('');
    // const [antNativeEventElementIndex, setAntNativeEventElementIndex] = useState<any>('');

    const styleInput = {color: 'black', width: '100%', borderRadius: '5px', maxWidth: '400px'}
    const ds = `detailsPickerDs-${item?.source}`;
    const dataSource = useTypedSelector((state: RootState) => getDataSource(state, ds));

    // поиск в ds-ке поля, по которым возможен поиск - search: true и приводим к массиву удобочитаемых значений
    const searchColumns: any = dataSource?.columns.filter((item) => item.search);
    const searchKeys: any = searchColumns?.map((item: any) => item.title.split(']')[1]);

    // из строики вида /__cur_page=1&__per_page=10&/ выделяем значение per_page
    const dsFilter = useTypedSelector((state: RootState) => getDataSource(state, item?.source))?.filter
    const perPageValues = dsFilter ? +dsFilter.split('__per_page=')[1]?.split('&')[0] : 10

    useEffect(() => {
        // инициализация поля при загрузке формы, разные данные для отображения в инпуте и для отправки в форме, если не было редактирования
        if (initialDataSource && item.actualKey) {
            // сохрание исходных данных в форму по ключу из item и значению из ds формы
            form.setFieldsValue({[item.props.name]: initialDataSource.items[0][item.actualKey]});
            let initValue: string = ''
            // проверка на array - в ранней версии было одно значение типа строка
            if (Array.isArray(item.initialKey)) {
                // формирование строки инициализационного значения по выбранным ключам
                item.initialKey?.forEach((item: any) => {
                    // конкатенация нового значения на каждой итерации
                    initValue = initValue ?
                        `${initValue}${initialDataSource?.items[0][item] ?
                            `_${initialDataSource?.items[0][item]}`
                            :
                            ''}`
                        :
                        initialDataSource?.items[0][item]
                })
            } else {
                let arrInitKey = [item.initialKey];
                arrInitKey?.forEach((item: any) => {
                    initValue = initValue ? `${initValue}${initialDataSource?.items[0][item] ? `_${initialDataSource?.items[0][item]}` : ''}` : initialDataSource?.items[0][item]
                })
            }
            setValue(initValue)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialDataSource]);

    useEffect(() => {
        // создание новой ds с префиксом /detailsPickerDs/
        if (perPageValues) {
            loadDataSource(ds, `${INIT_VALUES.RESET_VALUE}=${perPageValues}&`, false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [perPageValues])

    // useEffect(() => {
    //     // создание новой ds с префиксом /detailsPickerDs/
    //     if (isModalVisible && antNativeEventElements.length) {
    //         antNativeEventElements[antNativeEventElementIndex].classList.remove('ant-table-row')
    //         antNativeEventElements[antNativeEventElementIndex].style = 'background-color: red'
    //     }
    // }, [isModalVisible])

    useEffect(() => {
        // установка в поисковой строке значения по клику на строку таблицы
        let name: string = ''
        item.keys.forEach((item: any) => {
            name = name ? `${name}${row[item] ? `_${row[item]}` : ''}` : row[item]
        })
        setSearchValue(name)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [row])

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setValue(searchValue)
        // добавление в форму значения по ключу инпута из выбранной строки
        form.setFieldsValue({[item.props.name]: row[item.actualKey]});
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

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
        loadDataSource(ds, `${INIT_VALUES.RESET_VALUE}=${perPageValues}`, false)
    }

    const hadleRowClick = (row: any) => {
        setRow(row);
        // if (antNativeEventElements.length) {
        //     antNativeEventElements[antNativeEventElementIndex].classList.add('ant-table-row');
        //     antNativeEventElements[antNativeEventElementIndex].style = ''
        // }
        // setAntNativeEventElements(evt.nativeEvent.path[2].querySelectorAll('tr'))
        // setAntNativeEventElementIndex(index)
        // evt.nativeEvent.path[2].querySelectorAll('tr')[index].classList.remove('ant-table-row')
        // evt.nativeEvent.path[2].querySelectorAll('tr')[index].style = 'background-color: red'
        // console.log(evt.nativeEvent.path[2].querySelectorAll('tr'));
        // console.log(evt.nativeEvent.path[2], evt, index);
    }

    // формирование данных для прередачи в таблицу
    let tableData = []
    let tableColumns: any = [];
    if (dataSource) {
        tableData = dataSource.items?.map((i) => {
            if (i.children !== undefined && typeof i.children !== "object")
                i.children = JSON.parse(i.children);
            return i;
        });

        let column: any;
        if (dataSource.columns !== undefined)
            dataSource.columns.forEach(function (item: any) {
                if (!item.visible) return;

                column = {
                    title: serviceTable.withOutNumber(item.title),
                    dataIndex: item.dataIndex,
                    key: item.key,
                    render: (t: any, r: any) => {
                        let style = {}
                        if (r.key === row.key)
                            style = {color: 'tomato'}
                        return <span style={style}>{t}</span>
                    }
                };
                tableColumns.push(column);
            });
    }

    return <>
        <Input onClick={showModal} value={value} />

        {isModalVisible &&
            <Modal title={item.header && `${item.header}:`}
                open={true}
                onOk={handleOk}
                onCancel={handleCancel}
                width={1000}
                footer={[
                    <Button key="cancel" onClick={handleCancel}>
                        Отменить
                    </Button>,
                    <Button key="ok" type="primary" onClick={handleOk}>
                        Выбрать
                    </Button>
                ]}
            >
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <Input
                        style={styleInput}
                        onKeyDown={(evt) => {
                            EnterClick(evt.code) && handleSearch()
                        }}
                        onChange={(e) => setSearchValue(e.currentTarget.value)}
                        value={searchValue}
                        placeholder={`Поиск по: ${searchKeys && searchKeys.join(', ')}`} />
                    <Button style={{margin: '0px 5px 0 -33px'}} type='link' size='small'
                        onClick={handleSearch}><SearchOutlined /></Button>
                    <Button type='link' size='small' onClick={handleReset}><ClearOutlined /></Button>
                    {item.ext && <Ext cmp={{key: item.props.name, type: 'Ext', cmp_key: item.ext}} props={{}} />}
                </div>
                <div>
                    <span style={{fontSize: '12px'}}>Всего записей: {dataSource?.count}</span>
                </div>
                <Divider />
                <AntPagination cmp={{
                    key: "pagination-" + dataSource?.key,
                    type: 'Pagination',
                    ds: {key: dataSource?.key},
                    cur_page: 1,
                    per_page: perPageValues
                }} />
                <Table
                    size={'small'}
                    pagination={false}
                    dataSource={tableData}
                    columns={tableColumns}
                    loading={dataSource?.loading}
                    onRow={(record) => {
                        return {
                            onClick: () => hadleRowClick(record), // click row
                        };
                    }}
                />
            </Modal>
        }
    </>
};

export default DetailsPicker;

import React, {useEffect, useMemo, useState} from "react";
import Editor from "../Editor/Editor";
import ScrollableAnchor from "react-scrollable-anchor";
import {Button, Col, Input, Pagination, Popover, Row, Space} from 'antd';
import {ICascade} from "../Page/templates";
import {useActions, useTypedSelector} from "../../../hooks";
import {RootState} from "../../../redux/redux.store";
import {getDataSource} from "../../../redux/ds/ds.selector";
import {FolderOpenOutlined, SearchOutlined} from "@ant-design/icons";
import {IColumn} from "../../../redux/ds/ds.initial";
import {EnterClick} from "../../../utils";
import {useNavigate} from "react-router-dom";
import AntCascadeTable from "./AntCascadeTable";
import useDataSourceFiltred from "../../../hooks/useDataSourceFilter";

type CascadeType = {
    cmp: ICascade;
    props: any
};


const AntCascade: React.FC<CascadeType> = ({cmp}: any) => {

    const template = {
        [cmp.ds1]: {
            ds: cmp.ds1,
            dsKey: cmp.dsKey1,
            index: 0,
            step: 1,
            searchValue: '',
            breadcrumbsValue: '',
            chooseValue: '',
            filterValue: '',
        },
        [cmp.ds2]: {
            ds: cmp.ds2,
            dsKey: cmp.dsKey2,
            index: 1,
            step: 2,
            searchValue: '',
            breadcrumbsValue: '',
            chooseValue: '',
            filterValue: '',
        },
        [cmp.ds3]: {
            ds: cmp.ds3,
            dsKey: cmp.dsKey3,
            index: 2,
            step: 3,
            searchValue: '',
            breadcrumbsValue: '',
            chooseValue: '',
            filterValue: '',
        },
        [cmp.ds4]: {
            ds: cmp.ds4,
            dsKey: cmp.dsKey4,
            index: 3,
            step: 4,
            searchValue: '',
            breadcrumbsValue: '',
            chooseValue: '',
            filterValue: '',
        },
        [cmp.ds5]: {
            ds: cmp.ds5,
            dsKey: cmp.dsKey5,
            index: 4,
            step: 5,
            searchValue: '',
            breadcrumbsValue: '',
            chooseValue: '',
            filterValue: '',
        },
    }

    const {loadDataSource, setLsVars} = useActions();

    const navigate = useNavigate();

    const [dataSource, setDataSource] = useState<any>();
    const [filtredDS, setFiltredDs] = useState<any>();
    const [step, setStep] = useState<number>(1);
    const [chooseDs, setChooseDs] = useState<string>(cmp.ds1);
    const [itemsObj, setItemsObj] = useState<any>(template);
    const {getDataSourceCount, addFilter, addSearch, resetFilters, getCurPage, getPerPage, addCurPage} = useDataSourceFiltred(dataSource?.key)

    const [visible, setVisible] = useState<any>(cmp.visibleTable);
    const [open, setOpen] = useState(false);
    // const [timerId, setTimerId] = useState(0);

    const dataSource1 = useTypedSelector((state: RootState) => getDataSource(state, cmp.ds1));
    const dataSource2 = useTypedSelector((state: RootState) => getDataSource(state, cmp.ds2));
    const dataSource3 = useTypedSelector((state: RootState) => getDataSource(state, cmp.ds3));
    const dataSource4 = useTypedSelector((state: RootState) => getDataSource(state, cmp.ds4));
    const dataSource5 = useTypedSelector((state: RootState) => getDataSource(state, cmp.ds5));

    // const dsFilter = dataSource1?.filter;
    // const perPageValues = dsFilter && dsFilter.split("__per_page=")[1]?.split("&")[0] ? +dsFilter.split("__per_page=")[1]?.split("&")[0] : 10;
    // const currentPageNumber = dataSource?.filter ? +dataSource?.filter?.split('__cur_page=')[1]?.split('&')[0] : 1;
    const dsArray = [dataSource1, dataSource2, dataSource3, dataSource4, dataSource5];
    const searchColumns: any = dataSource?.columns?.filter((item: IColumn) => item.search);
    const searchKeys: any = searchColumns?.map((item: IColumn) => item.title.split(']')[1]);

    const dsKey = `dsKey${step}`;
    const dsKeyValues = `dsKeyValues${step}`;
    const nextDs = `ds${step + 1}`;
    const varsKey = `${cmp.varsKey}__${cmp.key}`;
    const varsValue = `${cmp.varsValue}__${cmp.key}`;

    const count = getDataSourceCount();

    useEffect(() => {
        setLsVars(varsKey, itemsObj[chooseDs].filterValue);
        setLsVars(varsValue, itemsObj[chooseDs].chooseValue);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useMemo(() => {
        if (step === 1) {
            setFiltredDs(dataSource1);
        }
    }, [dataSource1, step]);
    useMemo(() => {
        if (step === 2) {
            setFiltredDs(dataSource2);
        }
    }, [dataSource2, step]);
    useMemo(() => {
        if (step === 3) {
            setFiltredDs(dataSource3);
        }
    }, [dataSource3, step]);
    useMemo(() => {
        if (step === 4) {
            setFiltredDs(dataSource4);
        }
    }, [dataSource4, step]);
    useMemo(() => {
        if (step === 5) {
            setFiltredDs(dataSource5);
        }
    }, [dataSource5, step]);

    useEffect(() => {
        setDataSource(filtredDS);
        setStep(itemsObj[filtredDS?.key]?.step ? itemsObj[filtredDS?.key]?.step : 1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filtredDS])

    const tableRowHeight = () => {
        const sizes = {
            rowHeight: 25.42,
            extraSize: 130
        };
        switch (cmp.tableSize) {
            case 'default':
                sizes.rowHeight = 55
                sizes.extraSize = 170
                break
            case 'middle':
                sizes.rowHeight = 47
                sizes.extraSize = 155
                break
            default:
                break
        }
        return sizes
    }

    const minHeight = {
        minHeight: `${(+getPerPage() * tableRowHeight().rowHeight) + tableRowHeight().extraSize}px`
    }

    const onChange = (page: number) => {

        // let ds_filter_arr = dataSource.filter.split('&');
        // let filter_ds_filter_arr = [];
        // let search_ds_filter_arr = [];
        // let orderby_ds_filter_arr = [];

        // filter_ds_filter_arr = ds_filter_arr.filter((item: any) => {
        //     return item.indexOf('__filter') !== -1
        // })
        // search_ds_filter_arr = ds_filter_arr.filter((item: any) => {
        //     return item.indexOf('__search') !== -1
        // })
        // orderby_ds_filter_arr = ds_filter_arr.filter((item: any) => {
        //     return item.indexOf('__order_by') !== -1
        // })

        // let new_ds_filter_arr = [...filter_ds_filter_arr, ...search_ds_filter_arr, ...orderby_ds_filter_arr];

        // new_ds_filter_arr.push('__cur_page=' + page);
        // new_ds_filter_arr.push('__per_page=' + perPageValues);
        // let ds_filter_str = new_ds_filter_arr.join('&');

        loadDataSource(dataSource.key, addCurPage(page), true, '');
    };

    const setValueInLsVars = () => {
        if (varsKey && varsValue) {
            setLsVars(varsKey, itemsObj[chooseDs].filterValue);
            setLsVars(varsValue, itemsObj[chooseDs].chooseValue);
        }
    };

    const concatBreadcrumbs = () => {
        let tempArr: Array<string> = [];
        Object.keys(itemsObj).forEach((item: any) => {
            if (itemsObj[item].breadcrumbsValue) {
                tempArr[itemsObj[item].index] = itemsObj[item].breadcrumbsValue
            };
        });

        const breadcrumbs: Array<string> = []
        tempArr.forEach((item: string) => {
            if (item) {
                breadcrumbs.push(item)
            }
        })
        return breadcrumbs.join(' - ')
    };

    const setDS = (dsNum: number) => {
        switch (dsNum) {
            case 1:
                setFiltredDs(dataSource1);
                break;
            case 2:
                setFiltredDs(dataSource2);
                break;
            case 3:
                setFiltredDs(dataSource3);
                break;
            case 4:
                setFiltredDs(dataSource4);
                break;
            case 5:
                setFiltredDs(dataSource5);
                break;
            default:
                break;
        };
        setStep(dsNum)
    };


    const changeDs = (row: any, oneClick: boolean) => {
        // const filter = `${dsFilter.split('&__search')[0]}&__filter=${`${cmp[dsKey]}`}=${row[cmp[dsKey]]}`;
        if (oneClick) {
            if (itemsObj[dataSource.key].filterValue !== row[cmp[dsKey]]) {
                // const timer: any = setTimeout(() => {
                dsArray.map((item: any, index: number) => (index + 1 > step) && item && loadDataSource(item.key, addFilter(cmp[dsKey], row[cmp[dsKey]]), false));
                // }, 1)
                // setTimerId(timer)
                // clearTimeout(timerId);
                // console.log(timerId);
            }
        } else {
            // dsArray.map((item: any, index: number) => (index + 1 > step) && item && loadDataSource(item.key, filter, false));
            setDS(step + 1);
        }
    }


    const setSearchValue = (evt: any) => {
        const value = evt?.target?.value;
        setItemsObj((prev: any) => {
            return {
                ...prev,
                [dataSource.key]: {
                    ...prev[dataSource.key],
                    searchValue: value,
                }
            }
        })
    }

    const handleClick = (row: any) => {
        changeDs(row, true);

        setItemsObj((prev: any) => {
            return {
                ...prev,
                [dataSource.key]: {
                    ...prev[dataSource.key],
                    filterValue: row[cmp[dsKey]],
                    breadcrumbsValue: row[cmp[dsKeyValues][0]],
                    chooseValue: cmp[dsKeyValues]?.map((i: string) => row[i]).join(' - '),
                }
            }
        });
        setChooseDs(dataSource.key);
        Object.keys(itemsObj).forEach((key: any) => {
            if (+itemsObj[key].index + 1 > +step) {
                setItemsObj((prev: any) => {
                    return {
                        ...prev,
                        [key]: {
                            ...prev[key],
                            filterValue: '',
                            breadcrumbsValue: '',
                            chooseValue: '',
                            searchValue: '',
                        }
                    }
                })
            }
        });
    };

    const handleButtonClick = (index: any) => {
        setDS(index + 1)
    };
    const handleDoubleClick = async (row: any) => {
        // clearTimeout(timerId);
        if (!cmp[nextDs]) {
            const url = cmp.url ? `${cmp.url}${row[cmp[dsKey]]}` : '';
            url ? navigate(url) : handleChoose();
        } else {
            changeDs(row, false)
        };
    };
    const handleSearch = () => {
        loadDataSource(dataSource.key, addSearch(itemsObj[dataSource.key]?.searchValue), false);
    };
    const handleReset = () => {
        dsArray.map((item: any) => item && loadDataSource(item.key, resetFilters(), false));
        setItemsObj(template)
        setLsVars(varsKey, '');
        setLsVars(varsValue, '');
        setStep(1);
        setChooseDs(cmp.ds1)
    };
    const handleChoose = () => {
        chooseDs && setValueInLsVars();
        cmp.buttonVisible && setVisible(false);
        cmp.popover && setOpen(false)
    };

    const content = <div style={{...minHeight, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', backgroundColor: '#ffffff', padding: '5px 10px'}}>
        <div>
            <div style={{minHeight: '30px'}}>{concatBreadcrumbs()}</div>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <div>
                    {dsArray.map((item: any, index: number) => {
                        return item && <Button
                            key={item.title}
                            size={cmp.buttonSize}
                            type={index + 1 === step ? 'primary' : 'default'}
                            style={{marginRight: '10px', minWidth: '80px', ...cmp.buttonStyle}}
                            onClick={() => handleButtonClick(index)}
                        >{item.title}</Button>
                    })}
                </div>
                <div style={{display: 'flex', alignItems: 'center', flexGrow: 1}}>
                    <Input
                        size={cmp.buttonSize}
                        style={{width: '100%'}}
                        onKeyDown={(evt) => {
                            EnterClick(evt.code) && handleSearch()
                        }}
                        onChange={(e) => setSearchValue(e)}
                        value={itemsObj[dataSource?.key]?.searchValue ? itemsObj[dataSource?.key].searchValue : undefined}
                        placeholder={`Поиск по: ${searchKeys && searchKeys.join(', ')}`}
                    />
                    <Button
                        style={{marginLeft: '-2px'}}
                        type='default'
                        size={cmp.buttonSize}
                        onClick={handleSearch}
                    ><SearchOutlined /></Button>
                    <Button
                        style={{marginLeft: '10px', ...cmp.buttonStyle}}
                        type='primary'
                        size={cmp.buttonSize}
                        onClick={handleChoose}
                        disabled={!chooseDs}
                    >Выбрать</Button>
                    <Button
                        style={{marginLeft: '10px', ...cmp.buttonStyle}}
                        danger
                        type='ghost'
                        size={cmp.buttonSize}
                        onClick={handleReset}
                    >Сбросить</Button>

                </div>
            </div>
            <AntCascadeTable props={{
                handleDoubleClick,
                handleClick,
                dataSource,
                tableSize: cmp.tableSize,
                key: cmp[dsKey],
                value: itemsObj[dataSource?.key]?.filterValue,
            }} />
        </div>

        <Row justify="space-between" align="middle">
            <Col>
                <Pagination
                    size={cmp.buttonSize}
                    total={count}
                    showSizeChanger={false}
                    pageSize={getPerPage()}
                    current={getCurPage()}
                    onChange={onChange}
                />
            </Col>
            <Col>
                <Space>{count ? `Всего записей: ${count}` : 'Ничего не найдено'}</Space>
            </Col>
        </Row>
    </div>

    return <>
        {cmp.anchor && <ScrollableAnchor id={`${cmp.anchor}`}>
            <span></span>
        </ScrollableAnchor>}
        <Editor cmp={cmp} />

        {cmp.popover ? (
            <Popover
                placement="right"
                trigger="click"
                content={content}
                open={open}
                onOpenChange={setOpen}
            >
                <Button
                    style={{...cmp.buttonStyle}}
                    type='default'
                    size={cmp.buttonSize}
                // onClick={() => setVisible(!visible)}
                >{cmp.caption ? cmp.caption : <FolderOpenOutlined />}</Button>
            </Popover>
        ) : (
            <>
                {cmp.buttonVisible && <Button
                    style={{minWidth: '100px', marginBottom: '10px', ...cmp.buttonStyle}}
                    type='default'
                    size={cmp.buttonSize}
                    onClick={() => setVisible(!visible)}
                >{cmp.caption ? cmp.caption : 'Каскад'}</Button>}
                {visible && content}
            </>
        )}
    </>
};

export default AntCascade

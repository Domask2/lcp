import {DescriptionsProps, DrawerProps} from "antd";
import {IProps as IQRProps} from 'react-qrcode-logo';
import React, {CSSProperties} from "react";
// import {MapProps, YMapsProps} from "@pbe/react-yandex-maps";
import {NotificationType} from "../../../notification/types";

export type AndEditType = {
    cmp: any,
    setVisible?: (v: boolean) => void
}

export interface BaseComponentInterface {
    key: string
    type: string
    page_key?: string
    path?: string
    style?: React.CSSProperties
    titleStyle?: React.CSSProperties
    className?: string
    props?: any
    children?: Array<ComponentInterface> | Array<{
        key: string
        title: string
        children: Array<ComponentInterface>
    }>
    footerChildren?: Array<ComponentInterface> | Array<{
        key: string
        title: string
        children: Array<ComponentInterface>
    }>
    acl?: string[]
    visible?: boolean
    addiction?: any
    addictionStyleArray? : { id: number, style: CSSProperties }[]
    anchor?: string
    ext?: string | boolean
    caption?: string
}

export interface RowPropsInterface {
    gutter: [number, number]
}

export interface IColProps {
    span: number
    xs?: number
    sm?: number
    md?: number
    lg?: number
    xl?: number

}

export interface CardPropsInterface {
    size: "small" | "default"
}

type ButtonTypes = "primary" | "ghost" | "dashed" | "link" | "text" | "default"

export interface ButtonPropsInterface {
    type: ButtonTypes
    className?: string
}

interface TableScrollInterface {
    scrollToFirstRowOnChange?: boolean
    x?: string | number | true
    y?: string | number
}

interface TablePaginationInterface {
    pageSize: number
}

interface CmpIDataSource {
    key: string
}

interface ICmpDsTable extends CmpIDataSource {
    dependency?: string
}

export interface IRow extends BaseComponentInterface {
    props: RowPropsInterface
    children: Array<ComponentInterface>
    flexGrow?: boolean
}

export interface ICol extends BaseComponentInterface {
    props: IColProps
    children: Array<ComponentInterface>
    height100?: boolean
}

export interface ICard extends BaseComponentInterface {
    footerStyle?: CSSProperties | undefined;
    caption?: string;
    bodyStyle?: {[p: string]: string}
    headStyle?: {[p: string]: string}
    title?: string
    props: CardPropsInterface
    children: Array<ComponentInterface>
    height100?: boolean
    footerChildren: Array<ComponentInterface>;
    addictionStyleArray?: any
}

export interface IDivider extends BaseComponentInterface {
    text?: string
}

export interface IButton extends BaseComponentInterface {
    props: ButtonPropsInterface
    hiddenElement?: any
    resetInputs?: boolean
    closeModal?: boolean
    adKey?: string
    param?: string
    checked?: boolean
    actionsDetails?: any
    caption: string
    procedure?: string | undefined
    reduxElement?: string[]
    ds?: string | any
    className?: string
    actions?: Array<IActionsType> | any
    getUrl?: {baseUrl: string, params: {[key: string]: {name: string, type: string}}[], random: boolean, download: boolean, ajax: boolean}
    acl?: any
    // addiction?: any
    anchor?: any
    onGetUrlFunc?: boolean
    danger?: boolean
    confirm?: boolean
    confirmStyle?: React.CSSProperties
    tooltip?: boolean
    tooltipColor?: string
    tooltipPlacement?: 'top' | 'left' | 'right' | 'bottom' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom'
    tooltipTitle?: string
    tooltipOverlayInnerStyle?: React.CSSProperties
}

export interface ITableColumns {
    [key: string]: {
        addictions?: any;
        href?: string;
        modal?: "this" | "mutate"
        mutate?: string
        link?: string
        url?: string
        empty_value?: string
        type?: string
        fnc?: any
        proc?: any
        actions?: any
        actionsDetails?: any
        title?: string
        style?: {[p: string]: string}
        className?: string
        multiple?: {
            key?: string
            style?: {[p: string]: string}
            className?: string
            mutate?: string
        }
        groupColumn?: string
    }
}

export interface ITableRow {
    string: string | number | null
}

export interface IActionParams {
    actionName: string
    actionParams: Array<string>
    actions: string
    params: Array<{string: string}>
    source: string
    type: string
}

export interface IActionsType {
    actionName: string
    actionParams: Array<string>
    actions: any
    ds_table: Array<string>
    params: Array<{string: string | number}>
    reloadDS: Array<string>
    source: string
    type: string
    reduxElement?: any
}

export interface ITableMenuItem {
    cmpModal?: any;
    addiction: any;
    acl: Array<string>
    title: string,
    actions: Array<IActionsType> | string,
    visible: boolean
    actionParams?: IActionParams
    confirm: boolean
    modal: {isModal: boolean, cmpModal: IModal}
}

export interface ITableSelect {
    selectable: boolean
    type: "checkbox" | "radio"
}

export interface ITable extends BaseComponentInterface {
    props: {
        size: "default" | "middle" | "small"
        scroll: TableScrollInterface
        pagination: TablePaginationInterface
    }
    select?: ITableSelect
    selectable: boolean
    actions: {
        add: boolean
        edit: boolean
        delete: boolean
    }
    ds: ICmpDsTable,
    columns: ITableColumns,
    menu: Array<ITableMenuItem>,
    title: string,
    filtredKey?: string
}

export interface ITableTree extends BaseComponentInterface {
    ds: ICmpDsTable,
    columns?: ITableColumns,
    hide?: Array<string | undefined>
}

export interface IText extends BaseComponentInterface {
    text: string
    cover?: "span" | "div"
}

export interface INavLink extends BaseComponentInterface {
    url: string
    text: string
    target: boolean
    lineBreak: boolean
}

export interface IModal extends BaseComponentInterface {
    button: {
        type: ButtonTypes
        title: string
        className?: string
    }
    adKey?: string
    bodyStyle?: React.CSSProperties
    maskStyle?: React.CSSProperties
    buttonStyle?: React.CSSProperties
    caption: string
    children: Array<IRow | ICol | ICard | IDivider | IButton | ITable | IText | IModal | ITabs |
        IDetails | IBreadcrumb | IForm | INavLink>
    danger?: boolean
    tooltip?: boolean
    tooltipColor?: string
    tooltipPlacement?: 'top' | 'left' | 'right' | 'bottom' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom'
    tooltipTitle?: string
    tooltipOverlayInnerStyle?: React.CSSProperties
}

export interface ITabs extends BaseComponentInterface {
    children: Array<{
        key: string
        title: string
        type?: "tab"
        children: Array<ComponentInterface>
    }>
}

export interface ITags extends BaseComponentInterface {
    adKey?: string;
    title: any;
    ds?: string
    list?: string
    listValues?: string
    iterations?: boolean
    listTitle?: string
    titleStyle?: React.CSSProperties
    labelStyle?: React.CSSProperties
    contentStyle?: React.CSSProperties
    highLevelKey?: string
}
export interface IFilterTags extends BaseComponentInterface {
    adKey?: string
    title: any
    ds1?: string
    dsKey?: any;
    dsKey1?: string
    dsKeyValues1?: string
    button: any
    buttonVisible: boolean
    list?: string
    listValues?: string
    iterations?: boolean
    listTitle?: string
    titleStyle?: React.CSSProperties
    labelStyle?: React.CSSProperties
    contentStyle?: React.CSSProperties
    buttonSize?: any;
    buttonStyle?: React.CSSProperties
    highLevelKey?: string
}

export interface IDetails extends BaseComponentInterface {
    ds: {
        key: string
        item: string
    },
    ls: {
        key: string
    }
}

export interface IBreadcrumb extends BaseComponentInterface {
    contentStyle?: React.CSSProperties;
    items: Array<{
        route: string,
        title: string
    }>
    title: string
}

/** ---------- Form ---------- */
export interface IFrmProps {
    name: string
    labelCol: IColProps
    wrapperCol: IColProps
    initialValues?: {[key: string]: string}
}

export interface IForm extends BaseComponentInterface {
    props: IFrmProps
    size?: "large" | "middle" | "small" | any | undefined
    items: Array<FormItemsInterfaces>
    colSpan?: number
    source: string
    checked?: boolean
    notify?: NotificationType
    adKey?: string
    submit: {
        type: ButtonTypes
        title: string
        actions?: any
        actionsSubmit?: Array<IActionsType>
        actionsSubmitFilter?: Array<IActionsType>
        auto?: boolean
        visible?: boolean
        className?: string
        typeSubmit: string
        isBtnFilter?: boolean
        titleBtnFilter: string
        closeModal?: boolean
    }
    reset: {
        type: ButtonTypes,
        title: string,
        visible?: boolean
    }
}

interface BaseFormItemInterface {
    type: string
    items?: any
    props: {
        name: string,
        label?: string
        picker?: "week" | "month" | "year"
    }
    del?: boolean
    primaries?: boolean     //поле используется для фильтрации при update
    numeric?: boolean
    disabled?: boolean
    block?: string          //какому блоку принадлежит поле, для визуализации
    formula?: string
    defaultValue?: string//для вычисляемых полей
    link?: string //для link внутри input
    min?: number
    max?: number
    maxLen?: any
    decimal?: any
}

interface FormInputInterface extends BaseFormItemInterface {
    actions?: any;
    required?: boolean
    regExp?: string
    messErr?: string
}

interface FormDatePickerInterface extends BaseFormItemInterface {
    actions?: any;
    items?: any;
}

interface FormRangePickerInterface extends BaseFormItemInterface {
    actions?: any;
}

interface FormSelectInterface extends BaseFormItemInterface {
    ds: CmpIDataSource
    actions?: any
    filter?: string
    value?: string
    obj?: string
}

interface FormCheckboxInterface extends BaseFormItemInterface {
    actions?: any;
}

export type FormItemsInterfaces = FormInputInterface | FormDatePickerInterface | FormRangePickerInterface |
    FormSelectInterface | FormCheckboxInterface

/** ---------- Form ---------- */

export interface IImgProps {
    width?: number
    height?: number
    src: string
}

export interface IImage extends BaseComponentInterface {
    props: IImgProps
    ds?: string
    imageKey?: string
    baseUrl?: string
    imageStyle?: React.CSSProperties
}

export interface dateConditionType {
    condition: 'c' | 'po',
    count: number,
    date: 'month' | 'day' | 'year'
}

export interface IInputs extends BaseComponentInterface {
    bodyStyle?: any;
    defaultSelect?: string;
    preservedKey?: string
    userFilter?: string
    actions?: any
    numeric?: any
    extComponent?: any // BaseComponentInterface
    filtredValue?: any
    filterKey?: any
    filtredDsKey?: any
    filtredDs?: any
    helpMessage?: any
    regexp?: any
    required?: boolean
    initDictionary?: any
    prefix?: boolean
    direction?: "horizontal" | "vertical" | undefined
    dictionaryDs?: string
    dictionaryDsKey?: string | []
    adKey?: string
    adKeyTwo?: string
    listKeyTwo: string
    initKeyTwo: string
    caption?: any
    procName?: any
    procKey?: any
    add?: any
    ds?: any
    initValue?: string
    initValueKey?: string
    initKey?: any
    initTextKeys?: any
    initDs?: string
    listDs?: any
    listKey?: string
    listTextKeys?: any
    initDsKey?: string
    inputsType: string
    link?: string
    disabled?: boolean
    dateConditionArray?: dateConditionType[]
    menu: any
    inputWidth: number
    inputsStyle: React.CSSProperties
    zeroOption: boolean
    maxValue?: string
    minValue?: string
    inputDescription?: string
    initVarsValue?: string
}

export interface IChartProps {
    seriesField?: any;
    angleField?: string
    colorField?: string
    meta?: any
    xField?: string
    yField?: string
    legend?: boolean
}

export interface IBidirectionalBarProps {
    legend?: boolean | any
}

export interface IChartPie extends BaseComponentInterface {
    text?: any;
    initDictionary?: any;
    ds: CmpIDataSource,
    props: IChartProps
}

export interface IChartBar extends BaseComponentInterface {
    binFieldForUsers?: string[];
    binWidth?: any;
    binField?: any;
    xAxisMin?: number;
    yAxisMin?: number;
    tooltipFields?: Array<string>;
    xFieldNumeric?: boolean;
    yFieldNumeric?: boolean;
    smooth?: boolean;
    initDictionary?: any;
    ds: CmpIDataSource
    props: IChartProps
    barColor?: {plus: string, minus: string}
    format?: "rows" | "line"
}

export interface IChartColumn extends BaseComponentInterface {
    initDictionary?: any;
    ds: CmpIDataSource
    props: IChartProps
    barColor?: {plus: string, minus: string}
    format?: "rows" | "line"
}

export interface IDrawer extends BaseComponentInterface {
    props: DrawerProps
    bodyStyle?: React.CSSProperties
    headStyle?: React.CSSProperties
    children: Array<ComponentInterface>
    button: {
        type: ButtonTypes
        title: string
        className?: string
    }
}

export interface IDescriptions extends BaseComponentInterface {
    show?: any
    hide?: string
    labelStyle?: React.CSSProperties
    contentStyle?: React.CSSProperties
    props: DescriptionsProps
    ds: CmpIDataSource
    columns?: ITableColumns,
    titleStyle?: React.CSSProperties,
    isBtnAction?: boolean
    actions?: any
    btnTitle: string
    iteratorDs?: string
    filtredKey?: string
}

export interface IBidirectionalBar extends BaseComponentInterface {
    ds: CmpIDataSource
    props: IChartProps
    barColor?: {plus: string, minus: string}
    format?: "rows" | "line"
}

export interface IDropdown extends BaseComponentInterface {
    ds: CmpIDataSource
    actions?: Array<IActionsType>
    item: {
        key: string,
        val: string,
        actions?: string
        newActions?: Array<IActionsType>
    }
}

export interface ISelect extends IDropdown {
    isClear: boolean
    textClear: {key: string}
}

export interface ISearchObj {
    searchValue: string;
    ds: string;
    prefix: string;
}

export interface IBarCodeOptions {
    format?: string;
    width?: number;
    height?: number;
    displayValue?: boolean;
    text?: string;
    fontOptions?: string;
    font?: string;
    textAlign?: string;
    textPosition?: string;
    textMargin?: number;
    fontSize?: number;
    background?: string;
    lineColor?: string;
    margin?: number;
    marginTop?: number;
    marginBottom?: number;
    marginLeft?: number;
    marginRight?: number;
    flat?: boolean;
    valid?: (valid: boolean) => void;
}

export interface IBarCode extends BaseComponentInterface {
    value: string,
    options: IBarCodeOptions
}

export interface IQRCode extends BaseComponentInterface {
    qrProps: IQRProps
}

export interface ISearchComponent extends BaseComponentInterface {
    caption: string
    searchObj: ISearchObj
    inputsStyle?: React.CSSProperties
}


export interface IYaMaps extends BaseComponentInterface {
    // YMapsProps?: YMapsProps
    // MapProps?: MapProps
    apiKey: string
    mapCenterGeo: Array<Number>
    mapCenterGeoAddress: string
    mapCenterLatitude: Number
    mapCenterLongitude: Number
    placemarkGeo: Array<Number>
    placemarkGeoAddress: string
    placemarkLatitude: Number
    placemarkLongitude: Number
    placemarkColor: string
    placemarkIcon: string
    placemarkType: string
    zoom: number
    scrollZoom: boolean
    text?: string
}

export interface ISlider extends BaseComponentInterface {
    arrows: boolean
    autoplay: boolean
    autoplaySpeed: number
    effect: string
    dots: boolean
    timeMode: boolean
}

export interface IIterator extends BaseComponentInterface {
    iteratorDs: any
    children: Array<ComponentInterface>
}

export interface ICascade extends BaseComponentInterface {
    ds1?: string
    ds2?: string
    ds3?: string
    ds4?: string
    ds5?: string
    dsKey1?: string
    dsKey2?: string
    dsKey3?: string
    dsKey4?: string
    dsKey5?: string
    dsKeyValues1?: Array<string>
    dsKeyValues2?: Array<string>
    dsKeyValues3?: Array<string>
    dsKeyValues4?: Array<string>
    dsKeyValues5?: Array<string>
    url?: string
    varsKey?: string
    varsValue?: string
    tableSize: string
    buttonSize: string
    visible: boolean
    button: boolean
    popover: boolean
}

export interface IMenu extends BaseComponentInterface {
    ds: any
    listTitle?: string
    listValues?: string
    url?: string
}

export interface IPagination extends BaseComponentInterface {
    ds?: CmpIDataSource
    cur_page?: number
    per_page?: number
    filtredKey?: string
}

export interface IExt extends BaseComponentInterface {
    cmp_key: string
}

export interface IModeDownLoad {
    key: string
    page: string
    project: string
    type: string
    url: string
    user: string
}

export interface IDownLoad extends BaseComponentInterface {
    modeDownload: {download: boolean, title: boolean, description: boolean, visible: boolean, singleFile: boolean, slug: boolean}
    defaultMode: {title: string, description: string}
    folder: string
    sortFiles: {album?: number | null, objectType?: string, category?: number | null}
    dateBase: {dbRemote: string, reloadDS: string}
    dsKey: {dsKeyObjectType: string, dsKeyCategories: string, dsKeyAlbums: string}
}

export type ComponentInterface = IRow | ICol | ICard | IDivider | IButton | ITable | IText | IModal | ITabs |
    IDetails | IBreadcrumb | IForm | IImage | IChartPie | IChartBar | IChartColumn | IDrawer | IDescriptions | IBidirectionalBar | IDropdown | INavLink | IBarCode | IQRCode | IYaMaps | IPagination |
    ISearchComponent | IExt | IInputs | IDownLoad | ISlider | IIterator | IMenu | ICascade

type TemplatesType = {
    Row: IRow
    Col: ICol
    Card: ICard
    Divider: IDivider
    Button: IButton
    Table: ITable
    Text: IText
    Modal: IModal
    Tabs: ITabs
    Breadcrumb: IBreadcrumb
    Form: IForm
    Image: IImage
    ChartBar: IChartBar
    ChartPie: IChartPie
    ChartColumn: IChartColumn
    Drawer: IDrawer
    Descriptions: IDescriptions
    BidirectionalBar: IBidirectionalBar
    NavLink: INavLink
    [p: string]: ComponentInterface
    BarCode: IBarCode
    QRCode: IQRCode
    YaMaps: IYaMaps
    Pagination: IPagination
    Search: ISearchComponent
    Ext: IExt
    DownLoad: IDownLoad
    Slider: ISlider
    Iterator: IIterator
    Menu: IMenu
    Cascade: ICascade
    // Dropdown: IDropdown
    // Select: ISelect
    // Details: IDetails
    // TableTree: ITableTree
}

export const templates: TemplatesType = {
    Row: {
        "key": "row_01",
        "type": "Row",
        "props": {
            "gutter": [16, 16]
        },
        style: {
            justifyContent: 'center',
            padding: '16px',
            marginRight: '0px',
            marginLeft: '0px',
        },
        children: []
    },
    Col: {
        "key": "col_01",
        "type": "Col",
        "props": {
            "span": 12
        },
        children: []
    },
    Card: {
        "key": "card_01",
        "type": "Card",
        "props": {
            "size": "small"
        },
        bodyStyle: {
            padding: '12px'
        },
        children: [],
        footerChildren: [],
    },
    Divider: {
        key: "divider_01",
        type: "Divider",
        style: {
            marginBottom: '16px'
        }
    },
    Button: {
        "key": "button_01",
        "type": "Button",
        "checked": false,
        "ds": "",
        "props": {
            "type": "default",
            "className": "p-button-sm"
        },
        "hiddenElement": {},
        "procedure": '',
        "reduxElement": [],
        "style": {"marginLeft": "10px"},
        "actions": [],
        "caption": "Button 01",
        "getUrl": {baseUrl: '', params: [], random: false, download: false, ajax: false}
    },
    Table: {
        "key": "table_01",
        "type": "Table",
        "props": {
            "size": "small",
            "scroll": {
                "x": 1500
            },
            "pagination": {pageSize: 50}
        },
        "selectable": false,
        "actions": {
            "add": false,
            "edit": false,
            "delete": false
        },
        "ds": {
            "key": "key_data_source",
            "dependency": "<ds.key>:<colunm_name_this>:<column_name_that>",
        },
        "columns": {
            "<col_name>": {
                "modal": "this",    //this - окно с записью из таблицы. mutate - окно с записью мутатора
                "mutate": "<ds_key>:<col_compare_name>:<col_val_name>",
                "link": "<page_key>:<param_field>", //param_field - поле, значение которого попадет в параметр страницы
                "fnc": 'вызов функции',
                "multiple": {
                    "key": "<col_key>",
                    "style": {}
                },
                "groupColumn": ''
            },
        },
        "menu": [
            {
                title: 'Пример',
                actions: 'fnc:load_v_razvitie,fnc:load_v_bull_genealogy3',
                acl: ['admin'],
                visible: true,
                addiction: '',
                confirm: false,
                modal: {
                    isModal: false, cmpModal: {
                        key: "modal_",
                        type: "Modal",
                        button: {
                            "type": "link",
                            "title": "Модальное окно",
                        },
                        caption: "Мое модальное окошко",
                        children: [
                            {
                                "key": "text_modal_01",
                                "type": "Text",
                                "text": "Какой-то текст",
                                "style": {
                                    "color": "grey",
                                    "fontSize": "15px"
                                }
                            }
                        ],
                    }
                }
            }
        ],
        "title": "default"
    },
    // TableTree: {
    //     ds: {
    //         key: 'bulls/v_bull_genealogy3'
    //     },
    //     key: 'table_tree_rod',
    //     type: 'TableTree',
    //     hide: []
    // },
    Text: {
        "type": "Text",
        "key": "text_01",
        "text": "Какой-то текст",
        "style": {
            "color": "grey",
            "fontSize": "15px"
        }
    },
    Modal: {
        key: "modal_",
        type: "Modal",
        button: {
            "type": "link",
            "title": "Модальное окно",
        },
        caption: "Мое модальное окошко",
        children: [
            {
                "key": "row_01_01",
                "type": "Row",
                "props": {
                    "gutter": [16, 16]
                },
                children: [
                    {
                        "key": "col_01_01",
                        "type": "Col",
                        "props": {
                            "span": 12
                        },
                        children: []
                    }
                ]
            }
        ],
    },
    Tabs: {
        "key": "tabs_01",
        "type": "Tabs",
        children: [
            {
                "key": "tabs_page_01",
                "type": "tab",
                "title": "Закладка 1",
                "children": [
                    {
                        "key": "row_01_01",
                        "type": "Row",
                        "props": {
                            "gutter": [16, 16]
                        },
                        children: [
                            {
                                "key": "col_01_01",
                                "type": "Col",
                                "props": {
                                    "span": 12
                                },
                                children: []
                            }
                        ]
                    }
                ]
            },
            {
                "key": "tabs_page_02",
                "title": "Закладка 2",
                "type": "tab",
                "children": [
                    {
                        "key": "row_01_02",
                        "type": "Row",
                        "props": {
                            "gutter": [16, 16]
                        },
                        children: [
                            {
                                "key": "col_01_02",
                                "type": "Col",
                                "props": {
                                    "span": 12
                                },
                                children: []
                            }
                        ]
                    }
                ]
            }
        ],
    },
    Slider: {
        key: "tabs_01",
        type: "Slider",
        children: [],
        arrows: true,
        autoplay: false,
        autoplaySpeed: 3000,
        effect: 'scrollx',
        dots: true,
        timeMode: false,
    },
    Tags: {
        key: "tags_01",
        type: "Tags",
    },
    FilterTags: {
        key: "filter_tags_01",
        type: "FilterTags",
        button: true,
    },
    Breadcrumb: {
        "key": "breadcrumb_01",
        "type": "Breadcrumb",
        "items": [
            {
                "route": "/psprv/home",
                "title": "Главная страница"
            }
        ],
        "title": "справочник :table_name"
    },
    Form: {
        "key": "form1",
        "type": "Form",
        "colSpan": 12,
        "source": 'ds:v_bull_details:first',
        "checked": false,
        "notify": {id: '', text: '', type: '', timeout: 0},
        "props": {
            "name": "form1",
            "labelCol": {
                "span": 8
            },
            "wrapperCol": {
                "span": 16
            },
            "initialValues": {
                "fld_name": "test",
                "any_field": "[[ls_key:column_key]]"
            },
        },
        "items": [
            {
                "type": "Input",
                "props": {
                    "name": "fld_name",
                    "label": "Название"
                },
                "required": false,
                "regExp": "",
                "messErr": '',
            },
            {
                "type": "DatePicker",
                "props": {
                    "name": "date_rogd",
                    "label": "Дата рождения"
                }
            },
            {
                "type": "RangePicker",
                "props": {
                    "name": "date_reg",
                    "label": "Дата регистрации",
                    "picker": "year",
                }
            },
            {
                "ds": {
                    "key": "reg_key/spol:npol:im"
                },
                "type": "Select",
                "actions": [],
                "props": {
                    "name": "npol",
                    "label": "Пол"
                },
                "filter": "",
                "value": "defaultValue",
                "obj": "txt: text, pdf: PDF"
            },
            {
                "type": "Checkbox",
                "props": {
                    "name": "potomok",
                    "label": "Потомок"
                }
            },
            {
                "type": "Hidden",
                "props": {
                    "name": "hidden_field",
                }
            }
        ],
        "submit": {
            "type": "primary",
            "title": "Фильтровать",
            "actions": [],
            "actionsSubmit": [],
            "actionsSubmitFilter": [],
            "auto": false,
            "visible": true,
            "typeSubmit": "filter",
            "isBtnFilter": false,
            "titleBtnFilter": "скачать"
        },
        "reset": {
            "type": "link",
            "visible": true,
            "title": "Очистить"
        }
    },
    // Select: {
    //     key: "select-01",
    //     type: "Select",
    //     ds: {key: "ds_key"},
    //     isClear: false,
    //     textClear: {key: 'clear'},
    //     item: {
    //         key: "string",
    //         val: "string",
    //         actions: ''
    //     }
    // },
    Image: {
        key: "image1",
        type: "Image",
        props: {
            width: 200,
            height: 200,
            src: 'https://sun9-65.userapi.com/impg/978ANC_TUt3csnqzsjgDwvEwYokPkOFI3aGUbA/wM_vC2wog9Y.jpg?size=720x894&quality=96&sign=310b483e47a8f8cfe45da437f4299dbb&type=album'
        }
    },
    ImageGallery: {
        key: "imageGallery",
        type: "ImageGallery",
        props: {
            width: 200,
            height: 200,
            src: 'https://sun9-65.userapi.com/impg/978ANC_TUt3csnqzsjgDwvEwYokPkOFI3aGUbA/wM_vC2wog9Y.jpg?size=720x894&quality=96&sign=310b483e47a8f8cfe45da437f4299dbb&type=album'
        }
    },
    ChartBar: {
        ds: {
            key: 'reg_key/count_pol'
        },
        key: 'chart_bar_01',
        type: 'ChartBar',
        format: 'rows',
        style: {
            height: '550px'
        },
        barColor: {
            plus: '#60daab',
            minus: '#ea6868'
        },
        props: {
            angleField: "string",
            colorField: "string",
            meta: {
                im: {
                    alias: 'Название'
                },
                count: {
                    alias: 'Количество'
                }
            },
            xField: 'count',
            yField: 'im'
        }
    },
    ChartLine: {
        iteratorDs: {
            key: 'ds'
        },
        key: 'chart_line_01',
        type: 'ChartLine',
        barColor: {
            plus: '#60daab',
            minus: '#ea6868'
        },
        props: {
            xField: 'x',
            yField: 'y'
        },
        smooth: true,
        initDictionary: {0: '1', 1: '5', 2: '6', 3: '5', 4: '2', 5: '5', 6: '6', 7: '5', 8: '1'}
    },
    ChartMultiLine: {
        iteratorDs: {
            key: 'выбрать DS'
        },
        key: 'chart_multi_line_01',
        type: 'ChartMultiLine',
        barColor: {
            plus: '#60daab',
            minus: '#ea6868'
        },
        xFieldNumeric: false,
        yFieldNumeric: false,
    },
    ChartScatter: {
        iteratorDs: {
            key: 'выбрать DS'
        },
        key: 'chart_scatter_01',
        type: 'ChartScatter',
        xFieldNumeric: false,
        yFieldNumeric: false,
    },
    ChartRadarPlot: {
        iteratorDs: {
            key: 'ds'
        },
        key: 'chart_radar_plot_01',
        type: 'ChartRadarPlot',
    },
    ChartHistogram: {
        iteratorDs: {
            key: 'ds'
        },
        key: 'chart_histogram_01',
        type: 'ChartHistogram',
    },
    ChartPie: {
        ds: {
            key: 'reg_key/count_pol'
        },
        key: 'chart_pie_03',
        path: '0-0-1-1',
        type: 'ChartPie',
        props: {
            angleField: 'count',
            colorField: 'im'
        },
        caption: 'Заголовок'
    },
    ChartColumn: {
        ds: {
            key: 'reg_key/count_pol'
        },
        key: 'chart_column_01',
        type: 'ChartColumn',
        barColor: {
            plus: '#60daab',
            minus: '#ea6868'
        },
        props: {
            angleField: "string",
            colorField: "string",
            meta: {
                im: {
                    alias: 'Название'
                },
                count: {
                    alias: 'Количество'
                }
            },
            xField: 'count',
            yField: 'im'
        }
    },
    Drawer: {
        key: 'drawer-01',
        type: 'Drawer',
        props: {
            title: 'Фильтр',
            width: 700
        },
        button: {
            type: 'default',
            title: 'Показать фильтр'
        },
        children: [
            {
                "key": "row_01_01",
                "type": "Row",
                "props": {
                    "gutter": [16, 16]
                },
                children: [
                    {
                        "key": "col_01_01",
                        "type": "Col",
                        "props": {
                            "span": 12
                        },
                        children: []
                    }
                ]
            }
        ]
    },
    Descriptions: {
        ds: {
            key: 'bull_details'
        },
        key: 'desc_01',
        type: 'Descriptions',
        props: {
            size: 'small',
            title: 'Общие сведения',
            column: {
                md: 3,
                sm: 2,
                xs: 1
            },
            bordered: true
        },
        isBtnAction: false,
        actions: [],
        btnTitle: 'сохранить'
    },
    BidirectionalBar: {
        ds: {
            key: 'bulls/v_ocenka_bulls'
        },
        key: 'bidirbar',
        type: 'BidirectionalBar',
        props: {
            legend: false
        },
        style: {
            height: '500px'
        }
    },
    // Dropdown: {
    //     ds: {
    //         key: 'bulls/v_razvitie'
    //     },
    //     key: 'dropdown_1',
    //     type: 'Dropdown',
    //     style: {float: 'right'},
    //     actions: [],
    //     item: {
    //         key: 'id',
    //         val: 'im',
    //         actions: 'fnc:load_clones_razvitie'
    //     }
    // },
    NavLink: {
        type: 'NavLink',
        key: 'link_01',
        target: false,
        lineBreak: false,
        url: '/bulls/bull/[[ds:bulls/v_bull_details:first:id]]',
        text: 'перейти',
        style: {}
    },
    BarCode: {
        type: 'BarCode',
        key: 'barcode_01',
        options: {
            // format: 'EAN',
            displayValue: true,
            width: 2,
            height: 30,
            textMargin: 0,
            fontSize: 15,
            margin: 0,
            lineColor: 'black',
            textAlign: 'center',
            textPosition: 'bottom',
        },
        value: 'Данные!'
    },
    QRCode: {
        type: 'QRCode',
        key: 'qrcode_01',
        qrProps: {
            value: '[[url]]',
            size: 150,
            ecLevel: 'L',
            enableCORS: false,
            quietZone: undefined,
            bgColor: 'transparent',
            fgColor: 'tomato',
            logoImage: '',
            logoWidth: undefined,
            logoHeight: undefined,
            logoOpacity: undefined,
            eyeRadius: undefined,
            qrStyle: 'squares',
            style: {},
        }
    },
    YaMaps: {
        type: 'YaMaps',
        key: 'yamaps_01',
        zoom: 10,
        scrollZoom: true,
        apiKey: '5fcad956-3d28-4b70-b26c-796973d8976f',
        mapCenterGeoAddress: '',
        mapCenterGeo: [59.944307, 30.33935],
        mapCenterLatitude: 59.944307,
        mapCenterLongitude: 30.33935,
        placemarkGeoAddress: '',
        placemarkGeo: [59.884307, 30.38935],
        placemarkLatitude: 59.884307,
        placemarkLongitude: 30.38935,
        placemarkColor: 'blue',
        placemarkIcon: '',
        placemarkType: 'Icon',
        // YMapsProps: {
        //     query: {
        //         apikey: '5fcad956-3d28-4b70-b26c-796973d8976f',
        //         lang: "ru_RU",
        //     }
        // },
        // MapProps: {
        //     state: {
        //         zoom: 8,
        //         center: [59.711770, 30.441685],
        //     }
        // }
        style: {
            width: '100%',
            height: '300px'
        }

    },
    Pagination: {
        type: 'Pagination',
        key: 'paginate_01',
        ds: {
            key: 'bulls/v_razvitie'
        },
        cur_page: 1,
        // per_page: 10,
    },
    Search: {
        type: 'Search',
        key: 'search_01',
        caption: 'Поиск',
        searchObj: {
            searchValue: '',
            ds: '',
            prefix: '',
        },
    },
    Input: {
        inputsType: 'Input',
        type: 'Input',
        key: 'Input_01',
        caption: 'Поле ввода',
        link: '',
        disabled: false,
        inputWidth: 14,
        zeroOption: true,
    },
    Ext: {
        type: 'Ext',
        key: 'ext_01',
        cmp_key: ''
    },
    DownLoad: {
        type: 'DownLoad',
        key: 'DownLoad',
        modeDownload: {download: true, title: true, description: true, visible: true, singleFile: true, slug: true},
        defaultMode: {title: '', description: ''},
        folder: '',
        sortFiles: {album: null, objectType: '', category: null},
        dsKey: {dsKeyObjectType: '/', dsKeyCategories: '/', dsKeyAlbums: '/'},
        dateBase: {reloadDS: '/', dbRemote: ''}

    },
    Iterator: {
        type: 'Iterator',
        key: 'iterator_01',
        iteratorDs: '',
        children: [],
    },
    Menu: {
        type: 'Menu',
        key: 'menu_01',
        ds: '',
    },
    Cascade: {
        type: 'Cascade',
        key: 'cascade_01',
        tableSize: 'small',
        buttonSize: 'small',
        visible: true,
        button: true,
        popover: false,
    },
}
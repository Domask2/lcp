import {formItems, InputsType} from "../utils"

export const SettingsType = {
    BR: 'Br',
    INPUT: 'input',
    SELECT: 'select',
    ADDICTION: 'addiction',
    GET_URL: 'getUrl',
    ACTIONS: 'actions',
    STYLE: 'style',
    PREVIEW: 'preview',
    CHECKBOX: 'checkbox',
    CHECKBOX_TWO_VALUES: 'checkboxTwoValues',
    CHECKBOX_INPUT: 'checkboxInput',
    CHECKBOX_TWO_INPUTS: 'checkboxTwoInputs',
    RADIO: 'radio',
    UNIQ: 'uniq',
    DS: 'ds',
    TABLE_DS: 'tableDs',
    OBJ_INPUTS: 'objInputs',
    INPUTS_TYPE: 'inputsType',
    INPUTS_VALIDATION: 'inputsValidation',
    INPUTS_CONDITION: 'inputsCondition',
    INPUTS_INIT_DICTIONARY: 'inputsInitDictionary',
    INPUTS_DETAILS_PICKER_MENU: 'inputsDetailPickerMenu',
    INPUTS_DS_SETTINGS: 'inputsDSsETTINGS',
}
export const SelectMode = {
    MULTI: 'multiple',
    TAGS: 'tags'
}

const InputsTypeStyle = {
    inputsType: {
        type: SettingsType.STYLE,
    }
}

const BAR_CODE_PROPS = ['width', 'height', 'textMargin', 'fontSize', 'lineColor', 'fontOptions', 'font', 'background', 'marginTop', 'marginBottom', 'marginLeft', 'marginRight']

const QR_CODE_PROPS = ['value', 'size', 'quietZone', 'bgColor', 'fgColor', 'logoImage', 'logoWidth', 'logoHeight', 'logoOpacity']

const Sizes = {
    DEFAULT: 'default',
    SMALL: 'small',
}

const SelectType = {
    CHECKBOX: 'checkbox',
    RADIO: 'radio',
}

export const ListKeys = {
    KEYS: 'keys',
    ALL_DS: 'allDs',
}

// const InputType = {
//     NUMBER: 'number',
//     TEXT: 'text',
// }

export const ComponentsType = {
    ROW: 'Row',
    COL: 'Col',
    CARD: 'Card',
    DIVIDER: 'Divider',
    DRAWER: 'Drawer',
    BUTTON: 'Button',
    INPUT: 'Input',
    MODAL: 'Modal',
    TEXT: 'Text',
    TABLE: 'Table',
    TABS: 'Tabs',
    BREADCRUMB: 'Breadcrumb',
    IMAGE: 'Image',
    IMAGE_GALLERY: 'ImageGallery',
    NAV_LINK: 'NavLink',
    BAR_CODE: 'BarCode',
    QR_CODE: 'QRCode',
    DESCRIPTIONS: 'Descriptions',
}

export const SettingKeys = {
    Standart: {
        ANCHOR: 'anchor',
        ACL: 'acl',
        CAPTION: 'caption',
        ADDICTION: 'addiction',
        TEXT: 'text',
        BUTTON: 'button',
        CHILDREN: 'children',
        ITEMS: 'items',
        URL: 'url',
        BASE_URL: 'baseUrl',
        VALUE: 'value',
        PER_PAGE: 'per_page',
        CUR_PAGE: 'cur_page',
        INPUT_DESCRIPTION: 'inputDescription',
        LINK: 'link',
        DISABLED: 'disabled',
        DIRECTION: 'direction',
        EXT_COMPONENT: 'extComponent',
        EXT: 'ext',
        FORMAT: 'format',
        TARGET: 'target',
        LINE_BREAK: 'lineBreak',
    },
    Props: {
        PROPS: 'props',
        TYPE: 'type',
        SIZE: 'size',
        SCROLL: 'scroll',
        X_SCROLL: 'x',
        PAGINATION: 'pagination',
        PAGE_SIZE: 'pageSize',
        SELECTABLE: 'selectable',
        SELECT: 'select',
        TITLE: 'title',
        SRC: 'src',
        WIDTH: 'width',
        HEIGHT: 'height',
        BORDERED: 'bordered',
        COLUMN: 'column',
        OPTIONS: 'options',
        TEXT_ALIGN: 'textAlign',
        TEXT_POSITION: 'textPosition',
        FLAT: 'flat',
        DISPLAY_VALUE: 'displayValue',
        QR_PROPS: 'qrProps',
        QR_EC_LEVEL: 'ecLevel',
        QR_STYLE: 'qrStyle',
        QR_ENABLE_CORS: 'enableCORS',
        BAR_COLOR: 'barColor',
        BAR_COLOR_PLUS: 'plus',
        BAR_COLOR_MINUS: 'minus',
        X_FIELD: 'xField',
        BIN_FIELD: 'binField',
        BIN_FIELD_FOR_USERS: 'binFieldForUsers',
        BIN_WIDTH: 'binWidth',
        X_FIELD_NUMERIC: 'xFieldNumeric',
        Y_FIELD: 'yField',
        Y_FIELD_NUMERIC: 'yFieldNumeric',
        X_AXIS_MIN: 'xAxisMin',
        Y_AXIS_MIN: 'yAxisMin',
        SERIES_FIELD: 'seriesField',
        ANGLE_FIELD: 'angleField',
        COLOR_FIELD: 'colorField',
        TOOLTIP_FIELDS: 'tooltipFields',
        SMOOTH: 'smooth',

    },
    Ds: {
        DS: 'ds',
        KEY: 'key',
        IMAGE_KEY: 'imageKey',
        LIST: 'list',
        LIST_VALUES: 'listValues',
        LIST_TITLE: 'listTitle',
        ITERATIONS: 'iterations',
        DEPENDENCY: 'dependency',
        RESET_INPUTS: 'resetInputs',
        CLOSE_MODAL: 'closeModal',
        AD_KEY: 'adKey',
        HIGH_LEVEL_KEY: 'highLevelKey',
        ACTIONS: 'actions',
        CHECKED: 'checked',
        PROCEDURE: 'procedure',
        REDUX_ELEMENT: 'reduxElement',
        GET_URL: 'getUrl',
        IS_BUTTON_ACTION: 'isBtnAction',
        BUTTON_TITLE: 'btnTitle',
        SEARCH_OBJ: 'searchObj',
        PREFIX: 'prefix',
        SHOW: 'show',
        HIDE: 'hide',
        INPUTS_TYPE: 'inputsType',
        NUMERIC: 'numeric',
    },
    Styles: {
        GUTTER: 'gutter',
        CLASS_NAME: 'className',
        SPAN: 'span',
        PREVIEW: 'preview',
        STYLE: 'style',
        BODY_STYLE: 'bodyStyle',
        HEAD_STYLE: 'headStyle',
        INPUTS_STYLE: 'inputsStyle',
        IMAGE_STYLE: 'imageStyle',
        INPUT_WIDTH: 'inputWidth',
        MASK_STYLE: 'maskStyle',
        LABEL_STYLE: 'labelStyle',
        CONTENT_STYLE: 'contentStyle',
        TITLE_STYLE: 'titleStyle',
        MAX_VALUE: 'maxValue',
        MIN_VALUE: 'minValue',
        WRAPPER: 'wrapper',
        FLEX_GROW: 'flexGrow',
        HEIGHT_100: 'height100'
    }
}

export const StandartSettings = {
    Addiction: {
        key: SettingKeys.Standart.ADDICTION,
        startValue: [],
        inputsType: {
            type: SettingsType.ADDICTION,
        },
    },
    Br: {
        inputsType: {
            type: SettingsType.BR,
        },
    },
    Anchor: {
        title: '?????????????? ????????????',
        hoverText: "?????????????? ????????????",
        key: SettingKeys.Standart.ANCHOR,
        startValue: '',
        inputsType: {
            type: SettingsType.INPUT,
        }
    },
    Acl: {
        title: '?????????????????????? ???? ??????????',
        hoverText: "???????? ??????????????????????????, ?????????????? ?????????? ??????????????????.",
        key: SettingKeys.Standart.ACL,
        startValue: [],
        inputsType: {
            type: SettingsType.SELECT,
            mode: SelectMode.MULTI
        }
    },
}


export const UniqSettings = {
    Row: {
        key: SettingKeys.Props.PROPS,
        keyTwoLevel: SettingKeys.Styles.GUTTER,
        inputsType: {
            type: SettingsType.UNIQ,
        },
    },
    Col: {
        key: SettingKeys.Props.PROPS,
        inputsType: {
            type: SettingsType.UNIQ,
        },
    },
    Text: {
        key: SettingKeys.Standart.TEXT,
        inputsType: {
            type: SettingsType.UNIQ,
        },
    },
    Tabs: {
        key: SettingKeys.Standart.CHILDREN,
        inputsType: {
            type: SettingsType.UNIQ,
        },
    },
    Breadcrumb: {
        key: SettingKeys.Standart.ITEMS,
        inputsType: {
            type: SettingsType.UNIQ,
        },
    }
}

export const PreviewSettings = {
    Preview: {
        // key: SettingKeys.Styles.PREVIEW,
        inputsType: {
            type: SettingsType.PREVIEW,
        },
    },
    Size: {
        title: '????????????',
        valuesOne: Sizes.DEFAULT,
        valuesTwo: Sizes.SMALL,
        key: SettingKeys.Props.PROPS,
        keyTwoLevel: SettingKeys.Props.SIZE,
        inputsType: {
            type: SettingsType.CHECKBOX_TWO_VALUES,
        },
    },
    Caption: {
        title: '??????????????????',
        key: SettingKeys.Standart.CAPTION,
        startValue: '',
        inputsType: {
            type: SettingsType.INPUT,
        }
    },
    ChartCaption: {
        title: '?????????????????? ??????????????????',
        key: SettingKeys.Standart.TEXT,
        startValue: '',
        inputsType: {
            type: SettingsType.INPUT,
        }
    },
    InputDescription: {
        title: 'Description',
        hoverText: "?????????????????? ?????????????????? ?????? ?????????? ??????????",
        key: SettingKeys.Standart.INPUT_DESCRIPTION,
        startValue: '',
        inputsType: {
            type: SettingsType.INPUT,
        }
    },
    Title: {
        title: '??????????????????',
        description: (
            `?? ?????????????????? ?????????? ???????????????????????? ???????????????? ???? ?????????????????? ????????????.
?????????????????? ?????? ???????????? ???????????????? ?? ???????????????????? ????????????.
[[ds:<ds_key>:selectedRow||first:<column>]]
ds - ?????????????????? ???? ????????????.
selectedRow - ?????????????????? ???? ?????????????????? ????????????.
first - ?????????????????? ???? ???????????? ????????????.
column - ???????????????? ?????????????? ???? ?????????????? ?????????? ????????????????.`
        ),
        key: SettingKeys.Props.TITLE,
        startValue: '',
        inputsType: {
            type: SettingsType.INPUT,
        }
    },
    ButtonTitle: {
        title: 'Button title',
        key: SettingKeys.Standart.BUTTON,
        keyTwoLevel: SettingKeys.Props.TITLE,
        startValue: '',
        inputsType: {
            type: SettingsType.INPUT,
        }
    },
    ClassName: {
        title: 'ClassName',
        key: SettingKeys.Props.PROPS,
        keyTwoLevel: SettingKeys.Styles.CLASS_NAME,
        startValue: '',
        inputsType: {
            type: SettingsType.INPUT,
        }
    },
    ButtonClassName: {
        title: 'Button ClassName',
        key: SettingKeys.Standart.BUTTON,
        keyTwoLevel: SettingKeys.Styles.CLASS_NAME,
        startValue: '',
        inputsType: {
            type: SettingsType.INPUT,
        }
    },
    PropsType: {
        title: 'Type',
        key: SettingKeys.Props.PROPS,
        keyTwoLevel: SettingKeys.Props.TYPE,
        startValue: [],
        inputsType: {
            type: SettingsType.SELECT,
            arr: ['primary', 'ghost', 'dashed', 'link', 'text', 'default'],
        },
    },
    SelectType: {
        title: 'Type',
        key: SettingKeys.Props.SELECT,
        keyTwoLevel: SettingKeys.Props.TYPE,
        valuesOne: SelectType.CHECKBOX,
        valuesTwo: SelectType.RADIO,
        inputsType: {
            type: SettingsType.CHECKBOX_TWO_VALUES,
        },
    },
    ButtonType: {
        title: 'Button Type',
        key: SettingKeys.Standart.BUTTON,
        keyTwoLevel: SettingKeys.Props.TYPE,
        startValue: [],
        inputsType: {
            type: SettingsType.SELECT,
            arr: ['primary', 'ghost', 'dashed', 'link', 'text', 'default'],
        }
    },
    Selectable: {
        title: 'Selectable',
        key: SettingKeys.Props.SELECT,
        keyTwoLevel: SettingKeys.Props.SELECTABLE,
        inputsType: {
            type: SettingsType.CHECKBOX,
        },
    },
    Text: {
        title: 'Text',
        key: SettingKeys.Standart.TEXT,
        startValue: '',
        inputsType: {
            type: SettingsType.INPUT,
        },
    },
    BaseUrl: {
        title: 'BaseUrl',
        key: SettingKeys.Standart.BASE_URL,
        hoverText: '?????????????? URL, ???????????????????? ?????? ????????????????????',
        startValue: '',
        inputsType: {
            type: SettingsType.INPUT,
        },
    },
    Url: {
        title: 'Url',
        key: SettingKeys.Standart.URL,
        startValue: '',
        inputsType: {
            type: SettingsType.INPUT,
        },
    },
    Target: {
        title: 'Target',
        key: SettingKeys.Standart.TARGET,
        inputsType: {
            type: SettingsType.CHECKBOX,
        },
    },
    LineBreak: {
        title: 'LineBreak',
        key: SettingKeys.Standart.LINE_BREAK,
        inputsType: {
            type: SettingsType.CHECKBOX,
        },
    },
    Link: {
        title: 'Link',
        key: SettingKeys.Standart.LINK,
        startValue: '',
        inputsType: {
            type: SettingsType.INPUT,
            condition: [InputsType.INPUT],
        },
    },
    Disabled: {
        title: 'Disabled',
        key: SettingKeys.Standart.DISABLED,
        inputsType: {
            type: SettingsType.CHECKBOX,
            condition: [InputsType.INPUT],
        },
    },
    Direction: {
        title: 'Direction',
        key: SettingKeys.Standart.DIRECTION,
        startValue: [],
        inputsType: {
            type: SettingsType.SELECT,
            arr: ['horizontal', 'vertical'],
            condition: [InputsType.RADIO],
        }
    },
    ExtComponent: {
        title: 'ExtComponent',
        hoverText: '?????????? ?? ???????????? ????????????????????, ?????????????? ?????????? ???????????????? ???????????? Details Picker`a',
        key: SettingKeys.Standart.EXT_COMPONENT,
        startValue: '',
        inputsType: {
            type: SettingsType.INPUT,
            condition: [InputsType.DETAILS_PICKER],
        },
    },
    InputsType: {
        title: 'InputsType',
        key: SettingKeys.Ds.INPUTS_TYPE,
        startValue: [],
        inputsType: {
            type: SettingsType.SELECT,
            arr: formItems,
        },
        clearButton: false
    },
    Prefix: {
        title: 'Prefix',
        key: SettingKeys.Ds.PREFIX,
        inputsType: {
            type: SettingsType.CHECKBOX,
            condition: [InputsType.INPUT, InputsType.HIDDEN_INPUT],
        },
    },
    Numeric: {
        title: 'Numeric',
        titleTwo: 'Min',
        titleThree: 'Max',
        key: SettingKeys.Ds.NUMERIC,
        keyTwo: SettingKeys.Styles.MIN_VALUE,
        keyThree: SettingKeys.Styles.MAX_VALUE,
        inputsType: {
            type: SettingsType.CHECKBOX_TWO_INPUTS,
            condition: [InputsType.INPUT, InputsType.HIDDEN_INPUT],
            numeric: true,
        },
    },
    ExtComponentCmpKey: {
        title: 'CmpKey',
        key: SettingKeys.Standart.EXT,
        startValue: '',
        inputsType: {
            type: SettingsType.INPUT,
        },
    },
    Format: {
        title: 'format',
        key: SettingKeys.Standart.FORMAT,
        startValue: [],
        inputsType: {
            type: SettingsType.SELECT,
            arr: ['rows', 'line'],
        }
    },
    BarColorPlus: {
        title: 'BarColor Plus',
        key: SettingKeys.Props.BAR_COLOR,
        keyTwoLevel: SettingKeys.Props.BAR_COLOR_PLUS,
        inputsType: {
            type: SettingsType.INPUT,
        },
    },
    BarColorMinus: {
        title: 'BarColor Minus',
        key: SettingKeys.Props.BAR_COLOR,
        keyTwoLevel: SettingKeys.Props.BAR_COLOR_MINUS,
        inputsType: {
            type: SettingsType.INPUT,
        },
    },
    ChartPieAngleField: {
        title: '????????????????',
        hoverText: '???????????????? ????????????????, ?????????????? ?????????? ????????????????????????????',
        key: SettingKeys.Props.PROPS,
        keyTwoLevel: SettingKeys.Props.ANGLE_FIELD,
        inputsType: {
            type: SettingsType.SELECT,
            arrKey: ListKeys.KEYS,
        },
    },
    ChartColorField: {
        title: '????????????????',
        hoverText: '???????????????? ?????????????? ?????? ?????????????????????? ?? ????????????',
        key: SettingKeys.Props.PROPS,
        keyTwoLevel: SettingKeys.Props.COLOR_FIELD,
        inputsType: {
            type: SettingsType.SELECT,
            arrKey: ListKeys.KEYS,
        },
    },
    TooltipFields: {
        title: 'TooltipFields',
        hoverText: '???????????????? ?????????????? ?????? ?????????????????????? ?????? ?????????????????? ???? ??????????',
        key: SettingKeys.Props.TOOLTIP_FIELDS,
        inputsType: {
            type: SettingsType.SELECT,
            arrKey: ListKeys.KEYS,
            mode: SelectMode.MULTI
        },
    },
    LineSmooth: {
        title: 'smooth',
        key: SettingKeys.Props.SMOOTH,
        inputsType: {
            type: SettingsType.CHECKBOX,
        },
    },
    AddictionName: {
        title: 'Addiction Name',
        key: SettingKeys.Ds.AD_KEY,
        inputsType: {
            type: SettingsType.INPUT,
        },
    },
}

export const StyleSettings = {
    InputWidth: {
        title: 'Input Width',
        key: SettingKeys.Styles.INPUT_WIDTH,
        inputsType: {
            type: SettingsType.INPUT,
            numeric: true,
        },
    },
    Style: {
        key: SettingKeys.Styles.STYLE,
        ...InputsTypeStyle,
    },
    HeadStyle: {
        key: SettingKeys.Styles.HEAD_STYLE,
        ...InputsTypeStyle,
    },
    BodyStyle: {
        key: SettingKeys.Styles.BODY_STYLE,
        ...InputsTypeStyle,
    },
    InputsStyle: {
        key: SettingKeys.Styles.INPUTS_STYLE,
        ...InputsTypeStyle,
    },
    MaskStyle: {
        key: SettingKeys.Styles.MASK_STYLE,
        ...InputsTypeStyle,
    },
    LabelStyle: {
        key: SettingKeys.Styles.LABEL_STYLE,
        ...InputsTypeStyle,
    },
    ContentStyle: {
        key: SettingKeys.Styles.CONTENT_STYLE,
        ...InputsTypeStyle,
    },
    TitleStyle: {
        key: SettingKeys.Styles.TITLE_STYLE,
        ...InputsTypeStyle,
    },
    ImageStyle: {
        key: SettingKeys.Styles.IMAGE_STYLE,
        ...InputsTypeStyle,
    },

}

export const DsInteractionSettings = {
    Ds: {
        title: 'Ds',
        prefix: 'Selected',
        hoverText: '???????????????? ????????????',
        key: SettingKeys.Ds.DS,
        keyTwo: SettingKeys.Ds.CHECKED,
        startValue: '',
        inputsType: {
            type: SettingsType.DS,
        }
    },
    DsKey: {
        title: 'Ds',
        hoverText: '???????????????? ????????????',
        key: SettingKeys.Ds.DS,
        keyTwoLevel: SettingKeys.Ds.KEY,
        startValue: '',
        inputsType: {
            type: SettingsType.SELECT,
        }
    },
    ImageKey: {
        title: 'ImageKey',
        key: SettingKeys.Ds.IMAGE_KEY,
        startValue: '',
        inputsType: {
            type: SettingsType.SELECT,
            arrKey: ListKeys.KEYS,
        },
    },
    ListKey: {
        title: 'ListKey',
        hoverText: '???????? ?????? ???????????????????????? ???????????? (??????????)',
        key: SettingKeys.Ds.LIST,
        startValue: '',
        inputsType: {
            type: SettingsType.SELECT,
            arrKey: ListKeys.KEYS,
        }
    },
    ListValues: {
        title: 'ListValues',
        hoverText: '???????? ?????? ?????????????????? ?????????????? ???????????????? ???? ????????????',
        key: SettingKeys.Ds.LIST_VALUES,
        startValue: '',
        inputsType: {
            type: SettingsType.SELECT,
            arrKey: ListKeys.KEYS,
        }
    },
    ListTitle: {
        title: 'ListTitle',
        hoverText: '???????? ?????? ??????????????????',
        key: SettingKeys.Ds.LIST_TITLE,
        startValue: '',
        inputsType: {
            type: SettingsType.SELECT,
            arrKey: ListKeys.KEYS,
        }
    },
    HighLevelKey: {
        title: 'HighLevelKey',
        hoverText: '???????? ???????????????????????? ?????????? ?????????? ?????? ???????????????????? ????????????????',
        key: SettingKeys.Ds.HIGH_LEVEL_KEY,
        startValue: '',
        inputsType: {
            type: SettingsType.SELECT,
            arrKey: ListKeys.KEYS,
        }
    },
    DsIterations: {
        title: 'Iterations',
        hoverText: '?????????????????????????? ???? ???????? items ?????? ?????????? ???????????????? ???????????? ???? items[0]',
        key: SettingKeys.Ds.ITERATIONS,
        inputsType: {
            type: SettingsType.CHECKBOX,
        }
    },
    SearchDs: {
        title: 'Ds',
        hoverText: '???????????????? ????????????',
        key: SettingKeys.Ds.SEARCH_OBJ,
        keyTwoLevel: SettingKeys.Ds.DS,
        startValue: '',
        inputsType: {
            type: SettingsType.SELECT,
        }
    },
    SearchDsPrefix: {
        title: 'Prefix',
        key: SettingKeys.Ds.SEARCH_OBJ,
        keyTwoLevel: SettingKeys.Ds.PREFIX,
        startValue: '',
        inputsType: {
            type: SettingsType.INPUT,
        }
    },
    ResetInputs: {
        title: 'Reset Inputs',
        hoverText: '?????????? ???? ?????????????? ???????????? ???????????????? ??????????????, ?????????????????? ?? ???????? Redux Elements',
        key: SettingKeys.Ds.RESET_INPUTS,
        inputsType: {
            type: SettingsType.CHECKBOX,
        }
    },
    CloseModal: {
        title: 'Close Modal',
        hoverText: "???????????????? ???????????????????? ???????? ???? ?????????????? ????????????. ???????? ?????????????????? ?? ???????????? ?? ?? ?????????????????? ???????? ???????????? ??????????????????",
        key: SettingKeys.Ds.CLOSE_MODAL,
        keyTwo: SettingKeys.Ds.AD_KEY,
        inputsType: {
            type: SettingsType.CHECKBOX_INPUT,
        }
    },
    Procedure: {
        title: 'Procedure Name',
        hoverText: '?????????????????????? ??????????????????',
        key: SettingKeys.Ds.PROCEDURE,
        startValue: '',
        inputsType: {
            type: SettingsType.SELECT,
        }
    },
    ReduxElements: {
        title: 'Redux Elements',
        hoverText: '???????????????? ???? state/ds/ls/vars ???????????????? ?????????????? ?????????? ???????????????????????? ??????????????????',
        key: SettingKeys.Ds.REDUX_ELEMENT,
        startValue: [],
        inputsType: {
            type: SettingsType.SELECT,
            mode: SelectMode.MULTI
        }
    },
    TableDs: {
        title: 'Ds',
        hoverText: '???????????????? ????????????',
        key: SettingKeys.Ds.DS,
        keyTwo: SettingKeys.Ds.KEY,
        keyTwoHoverText: '???????? Ds',
        keyThree: SettingKeys.Ds.DEPENDENCY,
        keyThreeHoverText: '??????????-???? ??????????????????????. ?????? ?????????????? ?? ???????????????? ???????? ??????????????',
        startValue: '',
        inputsType: {
            type: SettingsType.TABLE_DS,
        }
    },
    AddButtton: {
        title: '???????????????? ????????????',
        hoverText: '?????????????????? ????????????',
        key: SettingKeys.Ds.IS_BUTTON_ACTION,
        inputsType: {
            type: SettingsType.CHECKBOX,
        }
    },
    ActionButttonTitle: {
        title: 'Button title',
        hoverText: '?????????????????? ???????????? title',
        key: SettingKeys.Ds.BUTTON_TITLE,
        startValue: '',
        inputsType: {
            type: SettingsType.INPUT,
        }
    },
    CurPage: {
        title: 'CurPage',
        key: SettingKeys.Standart.CUR_PAGE,
        startValue: '',
        inputsType: {
            type: SettingsType.INPUT,
            infoItem: true,
        },
    },
    PerPage: {
        title: 'PerPage',
        key: SettingKeys.Standart.PER_PAGE,
        startValue: '',
        inputsType: {
            type: SettingsType.INPUT,
            infoItem: true,
        },
    },
    Show: {
        title: '????????????????',
        key: SettingKeys.Ds.SHOW,
        startValue: [],
        inputsType: {
            type: SettingsType.SELECT,
            mode: SelectMode.MULTI
        },
    },
    Hide: {
        title: '????????????',
        key: SettingKeys.Ds.HIDE,
        startValue: [],
        inputsType: {
            type: SettingsType.SELECT,
            mode: SelectMode.MULTI
        },
    },
}

export const ComplexInteractionSettings = {
    Actions: {
        title: 'Actions',
        hoverText: '????????????????, ?????????????????????? ??????????????????????',
        key: SettingKeys.Ds.ACTIONS,
        startValue: '',
        inputsType: {
            type: SettingsType.ACTIONS,
            condition: [InputsType.SELECT]
        }
    },
    GetUrl: {
        title: 'Get URL',
        hoverText: '?????????????????????? ????????????',
        key: SettingKeys.Ds.GET_URL,
        startValue: '',
        inputsType: {
            type: SettingsType.GET_URL,
        }
    },
    // FlyInputsType: {
    //     inputsType: {
    //         type: SettingsType.INPUTS_TYPE,
    //     }
    // },
    FlyInputsValidation: {
        inputsType: {
            type: SettingsType.INPUTS_VALIDATION,
        }
    },
    FlyInputsConditions: {
        inputsType: {
            type: SettingsType.INPUTS_CONDITION,
            condition: [InputsType.DATE_PICKER],
        }
    },
    FlyInputsInitDictionary: {
        inputsType: {
            type: SettingsType.INPUTS_INIT_DICTIONARY,
            condition: [InputsType.SELECT, InputsType.SELECT_MULTI],
        }
    },
    DetailsPickerMenu: {
        inputsType: {
            type: SettingsType.INPUTS_DETAILS_PICKER_MENU,
            condition: [InputsType.DETAILS_PICKER],
        },
    },
    FlyInputsDsSettings: {
        inputsType: {
            type: SettingsType.INPUTS_DS_SETTINGS,
        },
    },
}

export const PropsSettings = {
    Size: {
        title: '????????????',
        key: SettingKeys.Props.PROPS,
        keyTwoLevel: SettingKeys.Props.SIZE,
        startValue: '',
        inputsType: {
            type: SettingsType.SELECT,
            arr: ['small', 'middle', 'default']
        },
    },
    Title: {
        title: 'Title',
        key: SettingKeys.Props.PROPS,
        keyTwoLevel: SettingKeys.Props.TITLE,
        startValue: '',
        inputsType: {
            type: SettingsType.INPUT,
        },
    },
    Bordered: {
        title: 'Bordered',
        key: SettingKeys.Props.PROPS,
        keyTwoLevel: SettingKeys.Props.BORDERED,
        inputsType: {
            type: SettingsType.CHECKBOX,
        },
    },
    ClassName: {
        title: 'ClassName',
        key: SettingKeys.Props.PROPS,
        keyTwoLevel: SettingKeys.Styles.CLASS_NAME,
        startValue: '',
        inputsType: {
            type: SettingsType.INPUT,
        }
    },
    Type: {
        title: 'Type',
        key: SettingKeys.Props.PROPS,
        keyTwoLevel: SettingKeys.Props.TYPE,
        startValue: '',
        inputsType: {
            type: SettingsType.INPUT,
        },
    },
    Src: {
        title: 'Src',
        key: SettingKeys.Props.PROPS,
        keyTwoLevel: SettingKeys.Props.SRC,
        startValue: '',
        inputsType: {
            type: SettingsType.INPUT,
        },
    },
    Width: {
        title: 'Width',
        key: SettingKeys.Props.PROPS,
        keyTwoLevel: SettingKeys.Props.WIDTH,
        startValue: '',
        inputsType: {
            type: SettingsType.INPUT,
        },
    },
    Height: {
        title: 'Height',
        key: SettingKeys.Props.PROPS,
        keyTwoLevel: SettingKeys.Props.HEIGHT,
        startValue: '',
        inputsType: {
            type: SettingsType.INPUT,
        },
    },
    Pagination: {
        title: 'Pagination',
        hoverText: '???????????????????? ???????????????????????? ??????????',
        key: SettingKeys.Props.PROPS,
        keyTwoLevel: SettingKeys.Props.PAGINATION,
        startValue: '',
        inputsType: {
            type: SettingsType.INPUT,
        },
    },
    Scroll: {
        title: 'Scroll',
        hoverText: 'max-x -- ?????? ?????? ?????? ?? ???????? ???? ???????? ??????????????????...',
        key: SettingKeys.Props.PROPS,
        keyTwoLevel: SettingKeys.Props.SCROLL,
        startValue: '',
        inputsType: {
            type: SettingsType.INPUT,
        },
    },
    Column: {
        title: '??????????????',
        hoverText: '???????????????????? ?????????????? ???? ???????????? ????????????????????',
        key: SettingKeys.Props.PROPS,
        keyTwoLevel: SettingKeys.Props.COLUMN,
        inputsType: {
            type: SettingsType.OBJ_INPUTS,
            arr: ['xs', 'sm', 'md', 'lg', 'xl'],
            numeric: true,
        },
    },
    Options: {
        title: '?????????????????? BarCode',
        key: SettingKeys.Props.OPTIONS,
        inputsType: {
            type: SettingsType.OBJ_INPUTS,
            arr: BAR_CODE_PROPS
        },
    },
    TextAlign: {
        title: 'textAlign',
        key: SettingKeys.Props.OPTIONS,
        keyTwoLevel: SettingKeys.Props.TEXT_ALIGN,
        startValue: '',
        inputsType: {
            type: SettingsType.SELECT,
            arr: ['left', 'center', 'right'],
        },
    },
    TextPosition: {
        title: 'textPosition',
        key: SettingKeys.Props.OPTIONS,
        keyTwoLevel: SettingKeys.Props.TEXT_POSITION,
        startValue: '',
        inputsType: {
            type: SettingsType.SELECT,
            arr: ['top', 'bottom'],
        },
    },
    DisplayValue: {
        title: 'DisplayValue',
        key: SettingKeys.Props.OPTIONS,
        keyTwoLevel: SettingKeys.Props.DISPLAY_VALUE,
        inputsType: {
            type: SettingsType.CHECKBOX,
        },
    },
    Flat: {
        title: 'flat',
        key: SettingKeys.Props.OPTIONS,
        keyTwoLevel: SettingKeys.Props.FLAT,
        inputsType: {
            type: SettingsType.CHECKBOX,
        },
    },
    Value: {
        title: 'Value',
        hoverText: '????????????, ?????????????? ?????????? ??????????????????????????????????',
        key: SettingKeys.Standart.VALUE,
        startValue: '',
        inputsType: {
            type: SettingsType.INPUT,
        },
    },
    QrProps: {
        title: '?????????????????? QrCode',
        key: SettingKeys.Props.QR_PROPS,
        inputsType: {
            type: SettingsType.OBJ_INPUTS,
            arr: QR_CODE_PROPS
        },
    },
    QrStyle: {
        title: 'qrStyle',
        key: SettingKeys.Props.QR_PROPS,
        keyTwoLevel: SettingKeys.Props.QR_STYLE,
        startValue: '',
        inputsType: {
            type: SettingsType.SELECT,
            arr: ['squares', 'dots'],
        },
    },
    QrEcLevel: {
        title: 'ecLevel',
        key: SettingKeys.Props.QR_PROPS,
        keyTwoLevel: SettingKeys.Props.QR_EC_LEVEL,
        startValue: '',
        inputsType: {
            type: SettingsType.SELECT,
            arr: ['L', 'M', 'Q', 'H'],
        },
    },
    QrEnableCors: {
        title: 'enableCORS',
        key: SettingKeys.Props.QR_PROPS,
        keyTwoLevel: SettingKeys.Props.QR_ENABLE_CORS,
        inputsType: {
            type: SettingsType.CHECKBOX,
        },
    },
    PropsXField: {
        title: 'xField',
        key: SettingKeys.Props.PROPS,
        keyTwoLevel: SettingKeys.Props.X_FIELD,
        startValue: '',
        inputsType: {
            type: SettingsType.SELECT,
            arrKey: ListKeys.KEYS,
        },
    },
    XFieldNumeric: {
        title: 'xField Numeric',
        key: SettingKeys.Props.X_FIELD_NUMERIC,
        inputsType: {
            type: SettingsType.CHECKBOX,
        },
    },
    PropsYField: {
        title: 'yField',
        key: SettingKeys.Props.PROPS,
        keyTwoLevel: SettingKeys.Props.Y_FIELD,
        startValue: '',
        inputsType: {
            type: SettingsType.SELECT,
            arrKey: ListKeys.KEYS,
        },
    },
    YFieldNumeric: {
        title: 'yField Numeric',
        key: SettingKeys.Props.Y_FIELD_NUMERIC,
        inputsType: {
            type: SettingsType.CHECKBOX,
        },
    },
    PropsSeriesField: {
        title: 'seriesField',
        hoverText: '?????????????????????? ??????????',
        key: SettingKeys.Props.PROPS,
        keyTwoLevel: SettingKeys.Props.SERIES_FIELD,
        startValue: '',
        inputsType: {
            type: SettingsType.SELECT,
            arrKey: ListKeys.KEYS,
        },
    },
    XAxisMin: {
        title: 'xAxis Min',
        key: SettingKeys.Props.X_AXIS_MIN,
        startValue: '',
        inputsType: {
            type: SettingsType.INPUT,
            numeric: true,
        },
    },
    YAxisMin: {
        title: 'yAxis Min',
        key: SettingKeys.Props.Y_AXIS_MIN,
        startValue: '',
        inputsType: {
            type: SettingsType.INPUT,
            numeric: true,
        },
    },
    BinField: {
        title: 'binField',
        key: SettingKeys.Props.BIN_FIELD,
        startValue: '',
        inputsType: {
            type: SettingsType.SELECT,
            arrKey: ListKeys.KEYS,
        },
    },
    BinFieldForUsers: {
        title: 'binField for users',
        hoverText: '?????? ???????????? ???????????? ???????????????????????? ???????????????????? ???????????????? select ?????? ???????????????????????????????? ???????????? ???????????? ?????? ??????????????????????',
        key: SettingKeys.Props.BIN_FIELD_FOR_USERS,
        startValue: [],
        inputsType: {
            type: SettingsType.SELECT,
            mode: SelectMode.MULTI,
            arrKey: ListKeys.KEYS,
        },
    },
    BinWidth: {
        title: 'binWidth',
        key: SettingKeys.Props.BIN_WIDTH,
        startValue: '',
        inputsType: {
            type: SettingsType.INPUT,
            numeric: true,
        },
    },

}


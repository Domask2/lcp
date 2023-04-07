import {IDataSourceAll} from "./redux/ds/ds.initial";
import {IAction, IAddictions, IResult} from "./redux/project/project.initial";
import {CSSProperties} from "react";

export const AppRoute = {
    ADMIN: '/admin',
    WIKI: '/wiki',
    USER: '/user',
    REGISTRATION: '/registration',
    SETTINGS: '/settings',
    PROFILE_USER: '/profile/user',
    PROFILE_USER_SECURE: '/profile/secure',
    FORGOT_PASSWORD: '/forgot-password',
    LOGIN: '/login',
    IN_WORK: '/work',
    FAQ: '/faq',
    ADMINKA_USER_PAGE: '/adm/hidden/user',
};

export const KeyCode = {
    ENTER: 'Enter',
    ESC: 'Esc',
    ESCAPE: 'Escape',
    NUM_ENTER: 'NumpadEnter',
    DELETE: 46,
    NUM_DELETE: 'NumpadDecimal',
    CTRL: 17
};


export const ComponentTypes = {
    INPUT: 'Input',
    ROW: 'Row',
    FILTER_TAGS: 'FilterTags',
}

export const marks = {
    1: '1',
    2: '2',
    3: '3',
    4: '4',
    5: '5',
    6: '6',
    7: '7',
    8: '8',
    9: '9',
    10: '10',
    11: '11',
    12: '12',
    13: '13',
    14: '14',
    15: '15',
    16: '16',
    17: '17',
    18: '18',
    19: '19',
    20: '20',
    21: '21',
    22: '22',
    23: '23',
    24: '24',
}

export const YaMapsPlacemarkColorsList = ['blue', 'red', 'darkOrange', 'night', 'darkBlue', 'pink', 'gray', 'brown', 'darkGreen', 'violet', 'black', 'yellow', 'green', 'orange', 'lightBlue', 'olive']

export const YaMapsPlacemarkIconsList = ['Attention', 'Airport', 'Auto', 'Bar', 'Dog', 'Factory', 'Heart', 'Home', 'Pocket', 'RapidTransit', 'Sport', 'Toilet', 'Vegetation', 'Waste', 'Christian', 'Waterway']

export const YaMapsPlacemarkTypesList = ['Icon', 'StretchyIcon', 'DotIcon', 'CircleIcon', 'CircleDotIcon']

const Icons = {
    ICON: 'Icon',
    CIRCLE_ICON: 'CircleIcon',
    STRETCHY_ICON: 'StretchyIcon'
}

// const CoutnryCodeString = 'AU AT AZ AX AL DZ UM VI AS AI AO AD AQ AG AR AM AW AF BS BD BB BH BZ BY BE BJ BM BG BO BA BW BR IO VG BN BF BI VU VA GB HU VE TL VN GA HT GY GP GT GN GW DE GI HN HK GD GL GR GE GU DK CD DJ DM DO EU EG ZM EH ZW IL IN ID JO IQ IR IE IS ES IT YE KP CV KZ KY KH CM CA QA KE CY KG KI CN CC CO KM CR CI CU KW LA LV LS LR LB LY LT LI LU MU MR MG YT MO MK MW MY ML MV MT MA MQ MH MX MZ MD MC MN MS MM NA NR NP NE NG AN NL NI NU NC NZ NO AE OM CX CK HM PK PW PS PA PG PY PE PN PL PT PR CG RE RU RW RO US SV WS SM ST SA SZ SJ MP SC SN VC KN LC PM RS CS SG SY SK SI SB SO SD SR SL SU TJ TH TW TZ TG TK TO TT TV TN TM TR UG UZ UA UY FO FM FJ PH FI FK FR GF PF TF HR CF TD ME CZ CL CH SE LK EC GQ ER EE ET ZA KR GS JM JP BV NF SH TC WF';

export const CoutnryCode = ["AU", "AT", "AZ", "AX", "AL", "DZ", "UM", "VI", "AS", "AI", "AO", "AD", "AQ", "AG", "AR", "AM", "AW", "AF", "BS", "BD", "BB", "BH", "BZ", "BY", "BE", "BJ", "BM", "BG", "BO", "BA", "BW", "BR", "IO", "VG", "BN", "BF", "BI", "VU", "VA", "GB", "HU", "VE", "TL", "VN", "GA", "HT", "GY", "GP", "GT", "GN", "GW", "DE", "GI", "HN", "HK", "GD", "GL", "GR", "GE", "GU", "DK", "CD", "DJ", "DM", "DO", "EU", "EG", "ZM", "EH", "ZW", "IL", "IN", "ID", "JO", "IQ", "IR", "IE", "IS", "ES", "IT", "YE", "KP", "CV", "KZ", "KY", "KH", "CM", "CA", "QA", "KE", "CY", "KG", "KI", "CN", "CC", "CO", "KM", "CR", "CI", "CU", "KW", "LA", "LV", "LS", "LR", "LB", "LY", "LT", "LI", "LU", "MU", "MR", "MG", "YT", "MO", "MK", "MW", "MY", "ML", "MV", "MT", "MA", "MQ", "MH", "MX", "MZ", "MD", "MC", "MN", "MS", "MM", "NA", "NR", "NP", "NE", "NG", "AN", "NL", "NI", "NU", "NC", "NZ", "NO", "AE", "OM", "CX", "CK", "HM", "PK", "PW", "PS", "PA", "PG", "PY", "PE", "PN", "PL", "PT", "PR", "CG", "RE", "RU", "RW", "RO", "US", "SV", "WS", "SM", "ST", "SA", "SZ", "SJ", "MP", "SC", "SN", "VC", "KN", "LC", "PM", "RS", "CS", "SG", "SY", "SK", "SI", "SB", "SO", "SD", "SR", "SL", "SU", "TJ", "TH", "TW", "TZ", "TG", "TK", "TO", "TT", "TV", "TN", "TM", "TR", "UG", "UZ", "UA", "UY", "FO", "FM", "FJ", "PH", "FI", "FK", "FR", "GF", "PF", "TF", "HR", "CF", "TD", "ME", "CZ", "CL", "CH", "SE", "LK", "EC", "GQ", "ER", "EE", "ET", "ZA", "KR", "GS", "JM", "JP", "BV", "NF", "SH", "TC", "WF"];

export const extensions = ['png', 'jpg', 'jpeg', 'webp', 'svg', 'gif', 'tiff', 'tif', 'bmp']

export const AccessControlLayout = {
    MAGE: 'mage',
    ADMIN: 'admin',
    MODER: 'moderator',
    USER: 'user',
}

export const ActionType = {
    FUNCTION: 'func',
    PROCEDURE: 'proc'
}

export const INIT_VALUES = {
    CURRENT_PAGE: '__cur_page',
    PER_PAGE: '__per_page',
    SEARCH: '__search',
    RESET_VALUE: '__cur_page=1&__per_page',
}


export const TypeAddictions = {
    AVAILABILITY: {
        title: 'Наличие',
        value: 'availability',
        nextStep: false
    },
    FAILURE: {
        title: 'Отсутствие',
        value: 'failure',
        nextStep: false
    },
    MORE: {
        title: 'Больше',
        value: '>',
        nextStep: true
    },
    LESS: {
        title: 'Меньше',
        value: '<',
        nextStep: true
    },
    MORE_EQUAL: {
        title: 'Больше/Равно',
        value: '>=',
        nextStep: true
    },
    LESS_EQUAL: {
        title: 'Меньше/Равно',
        value: '<=',
        nextStep: true
    },
    EQUALLI: {
        title: 'Равно',
        value: '=',
        nextStep: true
    },
    NOT_EQUAL: {
        title: 'Не равно',
        value: '!=',
        nextStep: true
    },
    DS: {
        title: 'DS загружена',
        value: 'dsLoaded',
        nextStep: false
    },
    NOT_DS: {
        title: 'Нет DS',
        value: 'notDs',
        nextStep: false
    },
}

export const AddictionsChoiceType = {
    KEY: {
        value: 'key',
        title: 'ds.items[0].key'
    },
    ITEM: {
        value: 'item',
        title: 'ds.items.length()'
    },
    PROP: {
        value: 'prop',
        title: 'ds.key'
    },
    ROW: {
        value: 'row',
        title: 'table.row.key'
    },
    LS_VARS: {
        value: 'ls_vars',
        title: 'LS VARS',
    },
}

export const formItems = ["Input", "Select", "SelectMulti", "DetailsPicker", "HiddenInput", "Radio", "DatePicker", "Checkbox", "RangePicker", "RangeInput"]

export const InputsType = {
    INPUT: 'Input',
    RADIO: 'Radio',
    DATE_PICKER: 'DatePicker',
    SELECT: 'Select',
    SELECT_MULTI: 'SelectMulti',
    CHECKBOX: 'Checkbox',
    DETAILS_PICKER: 'DetailsPicker',
    RANGE_PICKER: 'RangePicker',
    RANGE_INPUT: 'RangeInput',
    HIDDEN_INPUT: 'HiddenInput',
}

export interface IRoutingChild {
    id: string;
    active_page: boolean;
    key: string;
    children: any;
    project_roles: Array<any>;
    title: string;
    visible: boolean;
    params: string;
}

export const addictionTemplate: IAddictions = {
    choice: '',
    ds: '',
    dsKey: '',
    id: '',
    title: '',
    type: '',
    value: '',
    page: []
}

export const actionTemplate: IAction = {
    actionName: '',
    source: '',
    type: '',
    sep: ';'
}

export const IconsArray = ['StepBackwardOutlined', 'StepForwardOutlined', 'ArrowUpOutlined', 'ArrowDownOutlined', 'ArrowLeftOutlined', 'ArrowRightOutlined', 'PrinterOutlined', 'BarChartOutlined', 'PieChartOutlined', 'LineChartOutlined', 'DotChartOutlined', 'AreaChartOutlined', 'FilterOutlined', 'CloudDownloadOutlined', 'CloudUploadOutlined', 'IdcardOutlined', 'PlusOutlined', 'PlusCircleOutlined', 'EditOutlined', 'OrderedListOutlined', 'UnorderedListOutlined', 'CheckOutlined', 'CheckCircleOutlined', 'CheckSquareOutlined', 'SearchOutlined', 'GoogleOutlined', 'AntDeleteOutlined', 'AntStopOutlined', 'AntSaveOutlined'];

export const checkPlacemarkIcon = (icon: string, type: string) => {
    if (icon) {
        if (type === Icons.ICON || type === Icons.CIRCLE_ICON) {
            return icon
        } else {
            return ''
        }
    } else {
        return ''
    }
}

export const checkIconContent = (caption: string, type: string) => {
    if (caption) {
        if (type === Icons.STRETCHY_ICON) {
            return caption
        } else {
            return caption.substr(0, 2)
        }
    } else {
        return ''
    }
}

export const validateCountryCode = (value: string) => {
    return CoutnryCode.includes(value)
}

export const validateValue = (cmp: any, storedValue: any) => {

    const value = storedValue === null ? '' : storedValue;

    if (cmp.regexp) {
        let regexp = new RegExp(`${cmp.regexp}`);
        return regexp.test(value)
    } else if (cmp.required) {
        return !!value?.length || !!value
    } else {
        return true
    }
}

export function verification(auth: any) {
    if (auth.authenticated === true)
        return (auth.role === AccessControlLayout.MAGE || auth.role === AccessControlLayout.ADMIN)
}

export function EnterClick(click: any) {
    if (click === KeyCode.ENTER || click === KeyCode.NUM_ENTER)
        return true
}

export function DelClick(click: any) {
    if (click === KeyCode.DELETE || click === KeyCode.NUM_DELETE)
        return true
}

export function checkRole(projectRoles: any, accessRoles: any) {
    let render = false;

    if ((!projectRoles || !projectRoles.length) && (!accessRoles || !accessRoles.length)) {
        return render = true;
    }
    if (accessRoles && accessRoles.length) {
        let access = (typeof (accessRoles) === "string") ? [accessRoles] : accessRoles;

        if (projectRoles && projectRoles.length) {

            projectRoles.forEach((role: string) => {
                if (access.includes(role)) {
                    render = true;
                }
            })
        } else {
            render = true;
        }
    } else {
        render = false;
    }
    return render;
};

export function searchRoles(pagesArray: any, pagesKeys: any, ind: any): any {

    const result = pagesArray?.filter((item: any) => item.key === pagesKeys[ind]);

    if (!result?.length) {
        if (pagesArray === undefined) return
        return pagesArray[0].project_roles
    }

    return pagesKeys.length > ind + 1 && result[0].children?.length ? searchRoles(result[0].children, pagesKeys, ind + 1) : result[0].project_roles;
}

export function searchParams(pagesArray: any, pagesKeys: any, ind: any): any {

    const result = pagesArray.filter((item: any) => {
        let arr = item.key.split('/');
        arr.splice(0, 1);

        item.key.slice('/')
        return arr[ind] === pagesKeys[ind]
    });

    if (!result.length) {
        return pagesArray[0]?.params
    }

    return pagesKeys.length > ind + 1 && result[0].children?.length ? searchParams(result[0].children, pagesKeys, ind + 1) : result[0].params;
}

export function changeKey(obj: any, key: any) {

    let prevKey = obj.key;
    let newKey = key ? `${key}/${prevKey}` : prevKey;
    obj['key'] = `/${newKey}`;

    return obj.children ? obj.children.map((child: any) => changeKey(child, newKey)) : obj;
}

// const definitionDS = (all: IDataSourceAll, addict: IAddictions, row: any) => {
//     if (row) {
//         return row
//     } else {
//         return all[addict.ds]
//     }
// }

export function checkTableStyleAddiction(addictionsArr: [any], condition: any) {

    let result = {
        res: true,
        style: {}
    };
    // let finalResult: any = [];
    if (!addictionsArr) return result

    addictionsArr.forEach((addict: any) => {
        switch (addict.type) {
            case TypeAddictions.AVAILABILITY.value:
                result.res = !!condition;
                break
            case TypeAddictions.FAILURE.value:
                result.res = !condition;
                break
            case TypeAddictions.MORE.value:
                result.res = +condition > +addict.value;
                break
            case TypeAddictions.LESS.value:
                result.res = +condition < +addict.value;
                break
            case TypeAddictions.MORE_EQUAL.value:
                result.res = +condition >= +addict.value;
                break
            case TypeAddictions.LESS_EQUAL.value:
                result.res = +condition <= +addict.value;
                break
            case TypeAddictions.EQUALLI.value:
                result.res = String(condition) === addict.value;
                break
            case TypeAddictions.NOT_EQUAL.value:
                result.res = String(condition) !== addict.value;
                break
            default:
                console.log('No-no-no!');
                result.res = false;
        }
        result.style = result.res ? addict.style : result.style
    })


    return result

}

export function checkAddiction(row: any, addiction: [IAddictions], allDs: IDataSourceAll, ls: any) {

    if (!addiction.length) {
        return true
    }
    let result = true;
    let finalResult: any = [];

    addiction.forEach((addict: IAddictions) => {

        if (addict.type === TypeAddictions.DS.value) {
            return result = allDs[addict.ds] !== undefined;
        }

        if (addict.type === TypeAddictions.NOT_DS.value) {
            return result = allDs[addict.ds] === undefined;
        }

        if (allDs[addict.ds] === undefined && ls === undefined) {
            return result = false
        }

        let condition;
        if (allDs[addict.ds]) {
            const addictDs: any = allDs[addict.ds]
            switch (addict.choice) {
                case AddictionsChoiceType.ITEM.value:
                    condition = addictDs?.items && addictDs.items.length;
                    break;
                case AddictionsChoiceType.KEY.value:
                    condition = addictDs?.items.length && addictDs.items[0][addict.dsKey];
                    break;
                case AddictionsChoiceType.PROP.value:
                    condition = addictDs[addict.dsKey];
                    break;
                case AddictionsChoiceType.ROW.value:
                    condition = row[addict.dsKey];
                    break;
                default:
                    break;
            }
        }

        if (addict.choice === AddictionsChoiceType.LS_VARS.value) {
            condition = ls.vars[addict.ds];
        }

        switch (addict.type) {
            case TypeAddictions.AVAILABILITY.value:
                result = !!condition;
                break
            case TypeAddictions.FAILURE.value:
                result = !condition;
                break
            case TypeAddictions.MORE.value:
                result = +condition > +addict.value;
                break
            case TypeAddictions.LESS.value:
                result = +condition < +addict.value;
                break
            case TypeAddictions.MORE_EQUAL.value:
                result = +condition >= +addict.value;
                break
            case TypeAddictions.LESS_EQUAL.value:
                result = +condition <= +addict.value;
                break
            case TypeAddictions.EQUALLI.value:
                result = String(condition) === addict.value;
                break
            case TypeAddictions.NOT_EQUAL.value:
                result = String(condition) !== addict.value;
                break
            default:
                console.log(addiction, allDs, ls);

                console.log('No-no-no!');
                result = false;
        }
        finalResult.push(result)
    })
    finalResult.push(result)

    return finalResult.includes(true)

}

const setParams = (params: any) => {
    return params?.reduce((obj: {}, item: any) => {
        return {...obj, [item]: ''};
    }, 0);
}

const setFunc = (proc: any) => {
    return {
        [proc.key]: setParams(proc.params)
    }
}

export const superFunc = (arr: any) => {
    let obj = {}
    for (let index: number = 0; index < arr.length; index++) {
        let func = setFunc(arr[index])
        obj = {
            ...obj,
            ...func
        }
    }
    return obj
}

// возвращает массив ключей с пустым значением из принимаемого объекта
export const getFreeKeys = (obj: any) => {
    let arr: any = obj && Object.keys(obj).filter((item: any) => !obj[item])
    return arr
}


// получает две DS-ки и возвращает значение из второй по ключу cmp.dictionaryDsKey и данным из первой 
export const setDictValue = (ds: any, dsDict: any, cmp: any) => {
    // if (cmp.initValue) {
    //     console.log(ds, dsDict, cmp);

    // }
    if (!ds.items[0]) {
        return
    }
    const item = dsDict?.items?.filter((item: any) => item[cmp.initDsKey] === ds.items[0][cmp.initDsKey])
    return item.length ? item[0][cmp.dictionaryDsKey] : ds.items[0][cmp.initDsKey];
}

export const renderListDsBlock = (type: string) => {
    switch (type) {
        case InputsType.RADIO:
            return true;
        case InputsType.SELECT:
            return true;
        case InputsType.SELECT_MULTI:
            return true;
        case InputsType.DETAILS_PICKER:
            return true;
        default:
            return false
    }
}

export const renderInitValueBlock = (type: string) => {
    switch (type) {
        case InputsType.RADIO:
            return false;
        case InputsType.SELECT:
            return false;
        case InputsType.SELECT_MULTI:
            return false;
        case InputsType.DETAILS_PICKER:
            return false;
        case InputsType.DATE_PICKER:
            return false;
        default:
            return true
    }
}

export const formationValue = (textKeys: any, initialDataSource: any) => {
    let initValue: any

    // проверка на array - в ранней версии было одно значение типа строка
    if (Array.isArray(textKeys)) {
        // формирование строки инициализационного значения по выбранным ключам
        textKeys.forEach((item: any) => {
            // конкатенация нового значения на каждой итерации
            initValue = initValue ?
                `${initValue}${initialDataSource?.[item] ?
                    ` - ${initialDataSource?.[item]}`
                    :
                    ''}`
                :
                initialDataSource?.[item]
        })
    }
    return initValue
}

export const formatDate = (date: string) => {
    let regexp = new RegExp('[0-9]{2}.[0-9]{2}.[0-9]{4}');
    let regexpTwo = new RegExp('[0-9]{4}-[0-9]{2}-[0-9]{2}');
    if (regexp.test(date)) {
        return date
    } else if (regexpTwo.test(date)) {
        const [one, two, three] = date.split('-')
        return [three, two, one].join('.')
    }
    return undefined
}

export const checkRequiredFields = (cmp: any) => {

    const result: any = {
        reply: true,
        message: 'All right!'
    }

    if (cmp.type === ComponentTypes.INPUT) {
        switch (cmp.inputsType) {
            case InputsType.INPUT:
                result.reply = !(cmp.initValue && !cmp.ds);
                result.message = 'Не заполнено поле InitDs';
                break;
            case InputsType.HIDDEN_INPUT:
                result.reply = !(cmp.initValue && !cmp.ds);
                result.message = 'Не заполнено поле InitDs';
                break;
            case InputsType.SELECT:
                break;
            case InputsType.DETAILS_PICKER:
                break;
            case InputsType.CHECKBOX:
                result.reply = !(cmp.initValue && !cmp.ds);
                result.message = 'Не заполнено поле InitDs';
                break;
            case InputsType.DATE_PICKER:
                break;
            case InputsType.RADIO:
                break;
            case InputsType.RANGE_INPUT:
                break;
            default:
                return result;
        }
    } else {
        switch (cmp.type) {
            case ComponentTypes.FILTER_TAGS:
                result.reply = (cmp.ds && cmp.dsKey && cmp.ds1 && cmp.dsKey1 && cmp.dsKeyValues1);
                result.message = `Не заполнены обязательные поля: ${cmp.ds ? '' : 'Ds,'} ${cmp.dsKey ? '' : 'Key Ds,'} ${cmp.ds1 ? '' : 'Tags Ds,'} ${cmp.dsKey1 ? '' : 'Tags Key,'} ${cmp.dsKeyValues1 ? '' : 'Tags Key Values.'}`;
                break;
            default:
                return result;
        }
    }
    return result
}

export const getAddictionStyle = (resultCheckAddiction: IResult | boolean, cmp: any): CSSProperties => {
    let addictionStyle: CSSProperties = {}
    if (typeof resultCheckAddiction !== "boolean" && typeof resultCheckAddiction?.arrayAddictionResult === 'object') {
        resultCheckAddiction?.arrayAddictionResult && resultCheckAddiction?.arrayAddictionResult.map((addict: { result: boolean, addict: IAddictions }) => {
            if (addict.result) {
                cmp?.addictionStyleArray && cmp?.addictionStyleArray.map((addictStyle: { id: number, style: CSSProperties }) => {
                    if (addict.addict.id === addictStyle.id) {
                        addictionStyle = addictStyle.style
                    }
                })
            }
        })
    }

    return addictionStyle;
}
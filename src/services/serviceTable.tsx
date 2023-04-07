import {NavLink} from "react-router-dom";
import TableModalView from "../components/AntComponents/Table/TableModalView";
import {Button, Modal} from "antd";
import ReactJson from "react-json-view";
import {InfoCircleOutlined} from '@ant-design/icons';
import {IColumn} from "../redux/ds/ds.initial";
import {IComponentDs} from "../redux/project/project.initial";
import AntButton from "../components/AntComponents/Button/AntButton";
import {ITableColumns} from "../components/AntComponents/Page/templates";
import React from "react";
import {checkTableStyleAddiction} from "../utils";


const serviceTable = {
    /**
     * Строим строку запроса.
     * @param cmp_ds
     * @param master
     */
    createFilterString: (cmp_ds: IComponentDs, master: Array<any>) => {
        /** есть ли секция с зависисомтью */
        if (cmp_ds.dependency === undefined) return ''

        /**
         * Если источник данных master (SelectedRows) не определен вернем пустоту.
         */
        const arrDsDep = cmp_ds.dependency.split(':');
        if (master === undefined || master.length === 0) return ''
        /** ----------------------------------------------------------------- */

        let arr_where: any = []
        master.forEach((item: any) => {
            if (item[arrDsDep[2]] !== undefined) {
                arr_where.push(arrDsDep[1] + '=' + item[arrDsDep[2]])
            }
        })

        return arr_where.join('|')
    },
    /**
     * @param value         значение поля
     * @param dataIndex     индекс поля
     * @param columns
     * @param mutators      мутаторы - ситочники данных этой таблицы
     * @param item
     */
    mutateValue: (value: string, dataIndex: string, columns: ITableColumns | undefined, mutators: any, item: any) => {
        if (columns === undefined) return value
        let ret: any = value

        if (ret) {
            /** переберем колонки в описании таблицы, мало ли что-то хотим поменять. */
            Object.keys(columns).forEach((col: any) => {
                if (col === dataIndex) {
                    /** нашли колонку которую будем менять, переберем действия что с ней делать. */
                    if (columns[col].mutate !== undefined) ret = serviceTable.__mutate(ret, columns, col, value, mutators)
                    /** нашли колонку которую будем менять, переберем действия что с ней делать. */
                    if (columns[col].style !== undefined) {
                        let check = checkTableStyleAddiction(columns[col]?.addictions, ret)
                        let style = check.style
                        ret = serviceTable.__style(ret, style)
                    }
                    /** нашли колонку которую будем менять, переберем действия что с ней делать. */
                    if (columns[col].className !== undefined) ret = serviceTable.__class(ret, columns[col].className)
                    /** создадим ссылку окно */
                    if (columns[col].link !== undefined) ret = serviceTable.__link(ret, columns, col, item)
                    /** создадим глобальную ссылку */
                    if (columns[col].href !== undefined) ret = serviceTable.__href(ret, columns, col, item)
                    if (columns[col].url !== undefined) ret = serviceTable.__url(ret, columns, col, item)
                    /** это функция, поставить ссылку и повесить слушатель */
                    if (columns[col].fnc !== undefined) ret = serviceTable.__fnc(ret, columns, col, item, value)
                    if (columns[col].proc !== undefined) ret = serviceTable.__proc(ret, columns, col, item, value)
                    /** создадим модальное окно */
                    if (columns[col].modal !== undefined) ret = serviceTable.__modal(ret, columns, col, item, value, mutators)
                    /** второе значение в ячейку */
                    if (columns[col].multiple !== undefined) ret = serviceTable.__multiple(ret, columns, col, item, value, mutators)
                }
            })
            return ret
        } else {
            Object.keys(columns).forEach((col: any) => {
                if (col === dataIndex) {
                    if (columns[col].style !== undefined) {
                        let check = checkTableStyleAddiction(columns[col]?.addictions, ret)
                        let style = check.style
                        ret = serviceTable.__style(ret, style)
                    }
                }
            })
            return ret
        }
    },

    __mutate: (ret: any, columns: ITableColumns, col: any, value: string, mutators: any) => {
        let arr_cmp_mutator = columns[col].mutate?.split(':')
        const mutator = mutators[col]

        if (mutator !== undefined && mutator.items !== undefined && arr_cmp_mutator !== undefined) {
            let k1 = arr_cmp_mutator[1] !== undefined ? arr_cmp_mutator[1] : ''
            let k2 = arr_cmp_mutator[2] !== undefined ? arr_cmp_mutator[2] : ''

            mutator.items.forEach((item: any) => {
                if (arr_cmp_mutator !== undefined && item[k1] === value) {
                    ret = item[k2]
                    return
                }
            })
        }
        return ret
    },
    __style: (ret: any, style: any) => {
        // if (style === undefined) return ret
        ret = <span style={style}>{ret}</span>
        return ret
    },
    __class: (ret: any, className: any) => {
        if (className === undefined) return ret
        ret = <span className={className}>{ret}</span>
        return ret
    },
    __link: (ret: any, columns: ITableColumns, col: any, item: any) => {
        let arr_cmp_link = columns[col].link?.split(':')
        if (arr_cmp_link !== undefined && arr_cmp_link.length > 1) {
            let to = arr_cmp_link[0] + item.row[arr_cmp_link[1]]
            ret = <NavLink to={to}>{ret}</NavLink>
        }
        return ret
    },
    __href: (ret: any, columns: ITableColumns, col: any, item: any) => {
        if (columns[col].href !== undefined) {
            ret = <a href={item.row[columns[col].href!]} target='_blank' rel='noopener noreferrer'>{ret}</a>
        }
        return ret
    },
    __url: (ret: any, columns: ITableColumns, col: any, item: any) => {
        if (columns[col].url !== undefined) {
            ret = <a href={columns[col].url + item.row[col]} target='_blank' rel='noopener noreferrer'>{ret}</a>
        }
        return ret
    },
    __fnc: (ret: any, columns: ITableColumns, col: any, item: any, value: string) => {
        /** Ничего не помню!!! Нужно разобраться и откомментировать все */

        let fncArr = columns[col].fnc?.actions?.split(':')
        let fnc_key = fncArr !== undefined && fncArr[0] ? fncArr[0] : 'undefined'
        // let param_value = fncArr !== undefined && fncArr[1] ? item.row[fncArr[1]] : 'undefined'
        let fnc_id = fncArr !== undefined && fncArr[1] ? fncArr[1] : ''

        // let action = "fnc:" + fnc_key + ":" + fnc_id + param_value

        let actionName = "fnc:" + fnc_key + ":" + fnc_id
        let source = fnc_key

        let title = columns[col].title
        if (title !== undefined && title !== null) {
            if (title.substring(title.length - 1) === '+') title = title.substring(0, title.length - 1) + value
        } else title = value

        let newObj: any = {};
        newObj['actionName'] = actionName
        newObj['actions'] = actionName
        newObj['source'] = source

        ret = value !== undefined ? <AntButton item={item.row} editor={false} cmp={{
            props: {type: "link", className: "p-button-sm"},
            caption: title,
            style: columns[col].style,
            key: "button" + value,
            actions: [newObj],
            actionsDetails: columns[col].fnc?.actionsDetails,
            type: "Button"
        }} /> : <></>
        return ret
    },
    __proc: (ret: any, columns: ITableColumns, col: any, item: any, value: string) => {
        /** Ничего не помню!!! Нужно разобраться и откомментировать все */
        // console.log(columns[col].proc.actions)
        let fncArr = columns[col].proc?.actions?.split(':')
        // console.log(fncArr)
        let fnc_key = fncArr !== undefined && fncArr[0] ? fncArr[0] : 'undefined'
        // let param_value = fncArr !== undefined && fncArr[1] ? item.row[fncArr[1]] : 'undefined'
        let fnc_id = fncArr !== undefined && fncArr[1] ? fncArr[1] : ''

        // let action = "fnc:" + fnc_key + ":" + fnc_id + param_value
        let action = "proc:" + fnc_key + ":" + fnc_id
        let title = columns[col].title
        if (title !== undefined && title !== null) {
            if (title.substring(title.length - 1) === '+') title = title.substring(0, title.length - 1) + value
        } else title = value

        ret = value !== undefined ? <AntButton item={item.row} editor={false} cmp={{
            props: {type: "link", className: "p-button-sm"},
            caption: title,
            style: columns[col].style,
            key: "button" + value,
            actions: [action],
            actionsDetails: columns[col].proc?.actionsDetails,
            type: "Button"
        }} /> : <></>
        return ret
    },
    __modal: (ret: any, columns: ITableColumns, col: any, item: any, value: string, mutators: any) => {
        switch (columns[col].modal?.split(':')[0]) {
            case 'this':
                ret = <TableModalView value={ret} entity={item} />
                break;
            case 'mutate':
                let arr_cmp_mutator = columns[col].mutate?.split(':')
                const mutator = mutators[col]

                let entity: any = {}
                if (mutator !== undefined && mutator.items !== undefined)
                    mutator.items.forEach((item: any) => {
                        if (arr_cmp_mutator !== undefined && item[arr_cmp_mutator[1]] === value) {
                            entity = item
                        }
                    })

                let info = () => {
                    Modal.info({
                        title: 'Инфонмация по справочнику',
                        content: (
                            <ReactJson src={entity} />
                        ),
                        onOk() {
                        },
                    });
                }

                ret = <Button type='link' onClick={info}><InfoCircleOutlined /> {ret}</Button>
                break;
        }
        return ret
    },
    __multiple: (ret: any, columns: ITableColumns, col: any, item: any, value: string, mutators: any) => {
        let keyMultiple = columns[col].multiple?.key
        let styleMultiple = columns[col].multiple?.style
        let className = columns[col].multiple?.className
        if (keyMultiple !== undefined && item.row[keyMultiple] !== undefined && item.row[keyMultiple] !== '') {
            if (columns[col].multiple?.mutate !== undefined) {
                let mutateValue = serviceTable.__mutate(item.row[keyMultiple], columns, keyMultiple, item.row[keyMultiple], mutators)
                let text = serviceTable.__style(mutateValue, styleMultiple)
                text = serviceTable.__class(text, className)
                ret = <>{ret}<br />{text}</>
            } else {
                let text = item.row[keyMultiple] === '' ? '---' : item.row[keyMultiple]
                text = serviceTable.__style(text, styleMultiple)
                text = serviceTable.__class(text, className)
                ret = <>{ret}<br />{serviceTable.__style(text, styleMultiple)}</>
            }
        }
        return ret
    },


    withOutNumber: (title: string) => {
        if (title[0] === '[')
            return title.split(']')[1]
        else
            return title
    },
    issetPk: (columns: Array<IColumn>) => {
        return !!columns.filter(item => item.pk).length
    }
}

export default serviceTable
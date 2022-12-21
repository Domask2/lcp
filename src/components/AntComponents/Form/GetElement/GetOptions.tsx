import React from "react";
import {Select} from "antd";

/**
 * Добавляем опций для select. Опций берутсья из ds подключенной к форме
 * @param item - текущий элемент select
 * @param cmp - cmp формы
 */

export const GetOptions = (item: any, cmp: any, dataSources: any) => {
    if (item.ds.key === undefined)
        item.ds.key = ''

    if (item.ds.key !== null) {
        // есди поле filter пустое отобржаем ds без фильраций
        // поле ds имеет вид rij/v_belg:id:bv_str
        // rij/v_belg - подключенная - ds ds_selector
        // id - value select - ds_selector_key
        // bv_str - выпадающий список - ds_selector_val

        const [ds_selector, ds_selector_key, ds_selector_val] = item.ds.key.split(':')

        if (dataSources[ds_selector] !== undefined) {
            // если поле filter не пустое отображаем ds согласно фильтру
            // из поля filter можем получить строку 2 типов
            // 1 - val: filter>5
            // 2 - <rij/v_belg_svid_allbv:id:bv_str>
            if (item.filter) {
                let [filterType, filter] = item.filter.split(':')
                // let filterType = filterArray[0]
                // let filter = filterArray[1]
                switch (filterType) {
                    // если поле фильтер иммет ввид val:filter>5
                    case 'val':
                        let operand = ''
                        let operands = ['=', '<', '>']
                        // определяем тип операнда
                        operands.forEach((item => {
                            if (filter.split(item).length === 2) {
                                operand = item
                            }
                        }))
                        // после того как известен операнд сплитим по нему => получаем поле ds select, тип операнда, занчения для логики фильтраций
                        const [filterSelector, filterValue] = filter.split(operand)

                        return dataSources[ds_selector].items.forEach((ds_select: any) => {
                                // получим значение из ds select по ключу из 1-го поля фильтраций
                                const ds_select_filter = ds_select[filterSelector]

                                // в зависимости от операнда проводим соответсвующие операций: сравнение, больше, меньше

                                if ((operand === '=' && ds_select_filter === filterValue) ||
                                    (operand === '>' && ds_select_filter > filterValue) ||
                                    (operand === '<' && ds_select_filter < filterValue) ) {
                                    return <Select.Option
                                        key={ds_select[ds_selector_key]}
                                        value={ds_select[ds_selector_key]}
                                    >
                                        {ds_select[ds_selector_val]}
                                    </Select.Option>
                                }
                            }
                        )
                    default:
                        // из поля filter иммет строку ввида <predok_id>:<o_animal_id>
                        // получаем адрес DS покдлюченной ко всей форме
                        let dsForm = cmp.source
                        // дожидаемся загрузки DS
                        if (dataSources[dsForm] !== undefined) {
                            // из поля filter получим строку ввида <predok_id>:<o_animal_id>
                            // <predok_id> - поле из DS Selector
                            // <o_animal_id> - поле из DS Form Source
                            const [filterSelector, filterDSForm] = item.filter.split(':')
                            // проходим по массиву ds подключенной к selector
                            return dataSources[ds_selector].items.forEach((ds_select: any) => {
                                    // получим значение из ds select по ключу из 1-го поля фильтраций
                                    const ds_select_filter = ds_select[filterSelector]
                                    // получим значение из ds form по ключу из 2-го поля фильтраций
                                    const ds_form_filter = dataSources[dsForm].items[0][filterDSForm]

                                    if (ds_select_filter === ds_form_filter) {
                                        return <Select.Option
                                            key={ds_select[ds_selector_key]}
                                            value={ds_select[ds_selector_key]}
                                        >
                                            {ds_select[ds_selector_val]}
                                        </Select.Option>
                                    }
                                }
                            )
                        }
                }
            } else {
                // есди поле filter пустое отобржаем ds без фильраций
                // поле ds имеет вид rij/v_belg:id:bv_str
                // rij/v_belg - подключенная ds
                // id - value select
                // bv_str - выпадающий список
                return dataSources[ds_selector].items.map((item: any) =>
                    <Select.Option key={item[ds_selector_key]}
                                   value={item[ds_selector_key]}>
                        {item[ds_selector_val]}
                    </Select.Option>)
            }
        }
    }

    // если поля ds нет отображаем поле obj
    // получим строку типа <txt: text, pfd: PDF>
    // 1-е значение попадаем в value Select
    // 2-e значегие попдает в выпадающий список select
    if (!item.ds_key && item.obj && item.obj.key) {
        let obj = item.obj.key.split(',')
        return obj.map((ob: any) => {
            let ob1 = ob.split(':')[0].trim()
            let ob2 = ob.split(':')[1].trim()
            return <Select.Option key={ob1} value={ob1}>{ob2}</Select.Option>
        })
    }

    return null
}
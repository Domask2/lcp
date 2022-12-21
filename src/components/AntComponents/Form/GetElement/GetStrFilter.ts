/**
 * Создадим строку фильтрации.
 * Она будет передана action при выполнение
 * @param values
 * @param items
 */

export const getStrFilter = (values: any, items: any) => {

    let arr_filter: any = []
    items.forEach((item: any) => {

        // это выбранное значение из выпадающего списка. = < > <= != ...
        let prefix = values['prefix_' + item.props.name] === undefined ? '=' :
            values['prefix_' + item.props.name]
        if ( (values[item.props.name] !== '' && values[item.props.name] !== undefined && values[item.props.name] !== null) ||
            (values[item.props.name + '1'] && values[item.props.name + '2'])) {

            switch (item.type) {
                case 'Select':
                case 'Input':
                    switch (prefix) {
                        case '>-<':
                            let val = values[item.props.name].split('-')
                            if (val[0])
                                arr_filter.push(item.props.name + '>' + val[0])

                            if (val[1])
                                arr_filter.push(item.props.name + '<' + val[1])
                            break;
                        default:
                            if (values[item.props.name] !== 'clear') {
                                arr_filter.push(item.props.name + prefix + values[item.props.name])
                            }
                    }
                    break
                case 'Hidden':
                    arr_filter.push(item.props.name + prefix + values[item.props.name])
                    break
                case 'SelectMulti':
                    if (values[item.props.name].length > 0)
                        arr_filter.push(item.props.name + prefix + values[item.props.name].join('|'))
                    break
                case 'Checkbox':
                    arr_filter.push(item.props.name + prefix + (values[item.props.name] ? 1 : 0))
                    break
                case 'RangeInput':
                    let prefix1 = values['prefix_' + item.props.name + '1'] === undefined ? '=' :
                        values['prefix_' + item.props.name + '1']

                    let prefix2 = values['prefix_' + item.props.name + '2'] === undefined ? '=' :
                        values['prefix_' + item.props.name + '2']

                    arr_filter.push(item.props.name + prefix1 + (values[item.props.name + '1']))
                    arr_filter.push(item.props.name + prefix2 + (values[item.props.name + '2']))
                    break
                case 'DatePicker':
                    arr_filter.push(item.props.name + '=' + values[item.props.name].format("DD.MM.YYYY"))
                    break
                case 'RangePicker':
                    arr_filter.push(item.props.name + '>=' + values[item.props.name][0].format("DD.MM.YY"))
                    arr_filter.push(item.props.name + '<=' + values[item.props.name][1].format("DD.MM.YY"))
                    break
            }
        }
    })
    return arr_filter.join(',')
}

export const getDsStrFilter = (ds: any, str_filter: string) => {
    let ds_filter_arr = ds.filter.split('&')
    let new_ds_filter_arr = []
    new_ds_filter_arr = ds_filter_arr.filter((item:any) => {
        return item.indexOf('__filter') === -1
    })
    new_ds_filter_arr.push("__filter=" + str_filter)
    let ds_filter_str = new_ds_filter_arr.join('&')
    return ds_filter_str
}
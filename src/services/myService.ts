import {getDataSourceLsVarsByKey, getDsByKey, getLsByKey} from "../redux/ds/ds.selector";
import {RootState} from "../redux/redux.store";

export const mappedText = (state: RootState, text: string) => {
    let arrTxt = text !== undefined || text !== null ? text?.split('[[') : []
    if (arrTxt === undefined) {
        arrTxt = []
    }
    let result: string = arrTxt[0]
    let source: any
    let value: string | number = ''

    arrTxt.shift()
    while (arrTxt.length) {
        let a = arrTxt.shift()
        if (a !== undefined) {
            const arrA = a.split(']]')
            /**
             * "Кличка - [[animal_detalis:klichka]], ninv - [[animal_detalis:ninv]]" - пример строки
             *
             * В нулевой элемент попатает ls_key и column_name. Сплитим по ":".
             * Берем ls по этому ключу и в блоке row по названию колонки достаем значение.
             */
            const arrData = arrA[0].split(':')

            switch (arrData[0]) {
                case 'lsVars':
                    source = getDataSourceLsVarsByKey(state, arrData[1])
                    value = source
                    break
                case 'ls':
                    source = getLsByKey(state, arrData[1])
                    value = ''
                    if (!!source && !!source.row && !!source.columns) {     /** может быть записана строка из базы */
                        if (source.row[arrData[2]] !== undefined)
                            value = source.row[arrData[2]]
                    } else {                                    /** может быть записан любой объект ключ/значение */
                        if (!!source[arrData[2]])
                            value = source[arrData[2]]
                    }
                    break
                case 'ds':
                    source = getDsByKey(state, arrData[1])
                    value = 0
                    if (source) {
                        switch (arrData[2]) {
                            case 'selectedRows':
                                if (source.selectedRows)
                                    switch (arrData[3]) {
                                        case 'length':
                                        case 'count':
                                            value = source.selectedRows.length
                                            break
                                        case 'val':
                                            value = source.selectedRows
                                            break
                                    }
                                break
                            case 'first':
                                value = source.items[0] ? source.items[0][arrData[3]] : 'нету'
                                value = value === null ? '---' : value
                                break
                        }
                    }
                    break
                case 'url':
                    value = document.location.href
                    break
                default:
                    value = "[[" + arrData.join(':') + "]]"
            }

            result += value + arrA[1]
        }
    }

    return result
}

export const transliterate = (word: any) => {
    word = word !== undefined ? word : ' '
    let answer = ""
    let a: any = {};

    a["Ё"] = "YO"; a["Й"] = "I"; a["Ц"] = "TS"; a["У"] = "U"; a["К"] = "K"; a["Е"] = "E"; a["Н"] = "N"; a["Г"] = "G"; a["Ш"] = "SH"; a["Щ"] = "SCH"; a["З"] = "Z"; a["Х"] = "H"; a["Ъ"] = "'";
    a["ё"] = "yo"; a["й"] = "i"; a["ц"] = "ts"; a["у"] = "u"; a["к"] = "k"; a["е"] = "e"; a["н"] = "n"; a["г"] = "g"; a["ш"] = "sh"; a["щ"] = "sch"; a["з"] = "z"; a["х"] = "h"; a["ъ"] = "'";
    a["Ф"] = "F"; a["Ы"] = "I"; a["В"] = "V"; a["А"] = "A"; a["П"] = "P"; a["Р"] = "R"; a["О"] = "O"; a["Л"] = "L"; a["Д"] = "D"; a["Ж"] = "ZH"; a["Э"] = "E";
    a["ф"] = "f"; a["ы"] = "i"; a["в"] = "v"; a["а"] = "a"; a["п"] = "p"; a["р"] = "r"; a["о"] = "o"; a["л"] = "l"; a["д"] = "d"; a["ж"] = "zh"; a["э"] = "e";
    a["Я"] = "Ya"; a["Ч"] = "CH"; a["С"] = "S"; a["М"] = "M"; a["И"] = "I"; a["Т"] = "T"; a["Ь"] = "'"; a["Б"] = "B"; a["Ю"] = "YU";
    a["я"] = "ya"; a["ч"] = "ch"; a["с"] = "s"; a["м"] = "m"; a["и"] = "i"; a["т"] = "t"; a["ь"] = "'"; a["б"] = "b"; a["ю"] = "yu";

    let i: any
    for (i in word) {
        if (word.hasOwnProperty(i)) {
            if (a[word[i]] === undefined) {
                answer += word[i];
            } else {
                answer += a[word[i]];
            }
        }
    }
    return answer;
}
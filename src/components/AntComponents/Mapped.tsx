import React from 'react';
import AntIcon from "./Icon/AntIcon";

/**
 * Компонента вставляет в текст другие компоненты.
 * В тексте компонента обозначается тэгами << >>
 * Для иконок формат такой <<icon:NameIcon[:fontSize]>>
 */
type MappedType = {
    text: string
}
const Mapped:React.FC<MappedType> = ({text}) => {
    let arrTxt = text !== undefined ? text?.split('<<') : ['']
    let result: Array<any> = [<>{arrTxt[0]}</>]
    let value: any = ''

    arrTxt.shift()
    while (arrTxt.length) {
        let a = arrTxt.shift()
        if (a !== undefined) {
            const arrA = a.split('>>')
            const arrData = arrA[0].split(':')

            switch (arrData[0]) {
                case 'icon':
                    let stl = {fontSize: '13px'}
                    if (arrData[2] !== undefined)
                        stl.fontSize = arrData[2]

                    value = <AntIcon name={arrData[1]} style={stl} />
                    break
                default:
                    value = "<<" + arrData.join(':') + ">>"
            }

            result.push(<>{value} {arrA[1]}</>)
        }
    }

    return <>{result.map((r, i) => <span key={i}>{r}</span>)}</>
};

export default Mapped;
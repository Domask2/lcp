import React from 'react';
import {Card} from "antd";
import TableCellStyleAddict from './TableCellStyleAddict';


type TableCellStyleAddictionsType = {
    addictions: any
    setAddictions: any
}

const addictTemplate = {
    type: '',
    value: '',
    style: {}
}

const TableCellStyleAddictions: React.FC<TableCellStyleAddictionsType> = ({addictions, setAddictions}) => {

    const delItem = (index: number) => {
        setAddictions([...addictions.slice(0, index), ...addictions.slice(index + 1, addictions.length)])
    }
    const addItem = () => {
        setAddictions((prevState: any) => {
            const newArr = [...prevState, addictTemplate]
            return newArr
        })
    }
    const changeItem = (index: number, item: any) => {
        const newArray = [...addictions.slice(0, index), ...addictions.slice(index + 1, addictions.length)]
        newArray.splice(index, 0, item)
        setAddictions(newArray)
    }
    const moveItem = (index: number, item: any, trend: boolean) => {
        const newArray = [...addictions.slice(0, index), ...addictions.slice(index + 1, addictions.length)]
        trend ? newArray.splice(index - 1, 0, item) : newArray.splice(index + 1, 0, item)
        setAddictions(newArray)
    }

    return (<Card size="small" title={'Стили по условию'} style={{marginBottom: '8px'}}>
        {addictions?.length ? addictions.map((addict: any, index: number) => {
            return <TableCellStyleAddict key={`${index}_${addict.type}`} arrLength={addictions?.length} addict={addict} addictIndex={index} delItem={delItem} addItem={addItem} changeItem={changeItem} moveItem={moveItem} />

        }) : (
            <TableCellStyleAddict arrLength={addictions?.length} addict={addictTemplate} addictIndex={0} changeItem={changeItem} />
        )}
    </Card>)
}

export default TableCellStyleAddictions;
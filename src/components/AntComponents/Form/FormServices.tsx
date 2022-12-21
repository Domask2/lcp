import React from "react";
import {List} from "antd";
import {Link} from "react-router-dom";

export const formItems = ["Input", "DatePicker", "RangePicker", "RangeInput", "Select", "SelectMulti", "Checkbox", "Hidden", "DetailsPicker"]

interface ListFilterType {
    title: string
    description: {title: string, desc: string}[]
}

export const linkAction = <div>подключить выполнение actions (подробнее: <Link to='/faq/front/conponent-settings/action'>actions</Link>)</div>

export const titleListFilter = 'Необходимо наличие ds. Поле может содержать фильтр 2 типов:';
export const descriptionListFilter = [
    {
        title: 'predok_id:o_animal_id',
        desc: 'predok_id - поле из DS Select; o_animal_id - поле из DS Form Source'
    },
    {
        title: 'val:filterSelect>5',
        desc: 'val - тип фильтра; filterSelect - поле из DS Select; > - логика фильтраций по операнду'
    }
]

export const titleListDs = 'Подключить ds для выпадающего списка';
export const descriptionListDs = [
    {
        title: 'строка вида: rij/v_belg:id:bv_str',
        desc: 'rij/v_belg - ds; id - value select; bv_str - имя в списке'
    },
]

export const titleListObj = 'Cловарик для выпадающего списка. Доступно при отсутвие поля ds и filter.';
export const descriptionListObj = [
    {
        title: 'строка вида: txt: text',
        desc: 'txt - value Select; text - имя в списке'
    },
]

export const ListDescription: React.FC<ListFilterType> = ({title, description}) => {
    return (
        <List
            size="small"
            style={{maxWidth: '600px'}}
            header={<span>{title}</span>}
            dataSource={description}
            renderItem={(item) => <List.Item>
                <div><p>{item.title}</p><p>{item.desc}</p></div>
            </List.Item>}
        />
    )
}
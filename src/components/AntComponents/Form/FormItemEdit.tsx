import React, {useEffect, useState} from 'react';

import EditBlock from "../Editor/Components/EditBlock";
import ObjectFixedEditor from "../Editor/Elements/ObjectFixedEditor";
import DetailsPickerEdit from './DetailsPickerEdit';
import AntPopover from "../Popover/AntPopover";

import {
    ListDescription,
    descriptionListFilter,
    formItems,
    titleListFilter,
    titleListDs,
    descriptionListDs, titleListObj, descriptionListObj, linkAction
} from "./FormServices";
import {Button} from "antd";


/**
 * Режим редактирования полей формы
 * каждый отдельный режим обарачивается в Card (actions, submit, reset и тд)
 *
 * Для отрисовки элементов используютсья след компоненты:
 * ObjectFixedEditor - продвинутая отрисовка элементов (передаем в template объект с элементами для отрисвоки,
 * есть visible(условие по которому отрисуется элемент))
 * popover - возможно добавить компонент для всплывающих подсказок
 *
 * ItemEdit - установка item для полей формы
 *
 */

type FormItemEditType = {
    item: any
    setItem: (p: any) => void
    cmp?: any
}
const FormItemEdit: React.FC<FormItemEditType> = ({item, setItem, cmp}) => {
    const [itemEdit, setItemEdit] = useState({...item})
    const [prp, setPrp] = useState({...item.props})
    const [ds, setDs] = useState({...item.ds})
    const [obj, setObj] = useState({...item.obj})
    const [actions, setActions] = useState(item.actions)

    useEffect(() => {
        itemEdit.props = prp
        itemEdit.ds = ds
        itemEdit.obj = obj
        itemEdit.actions = actions
        setItem(itemEdit)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [itemEdit, prp, ds, actions, obj])

    return <EditBlock


        style={{
            marginBottom: '16px',
            backgroundColor: item.del ? '#fdd' : '#f7f7f7'
        }}>
        {itemEdit.type === "DetailsPicker" ? (
            <DetailsPickerEdit item={itemEdit} setItem={setItem} cmp={cmp}/>
        ) : (
            <>
                <ObjectFixedEditor object={itemEdit}
                                   setObject={setItemEdit}
                                   template={
                                       {
                                           primaries: {
                                               type: 'boolean',
                                               title: 'primary',
                                               widthLabel: '60px',
                                               popover: <AntPopover
                                                   hoverText={'сделать значение поля уникальным'}
                                                   title={'primary'}
                                               />
                                           },
                                           numeric: {
                                               type: 'boolean',
                                               title: 'numeric',
                                               widthLabel: '60px',
                                               popover: <AntPopover
                                                   hoverText={'преобразовать значение поля в число'}
                                                   title={'numeric'}
                                               />
                                           },
                                           decimal: {
                                               type: 'boolean',
                                               title: 'decimal',
                                               widthLabel: '60px',
                                               visible: (itemEdit.type === 'Input' && itemEdit.numeric === true),
                                               popover: <AntPopover
                                                   hoverText={'проверять на целое число'}
                                                   title={'decimal'}
                                               />
                                           },
                                           disabled: {
                                               type: 'boolean',
                                               title: 'disabled',
                                               widthLabel: '60px',
                                               visible: (itemEdit.type === 'Input' || itemEdit.type === 'DatePicker'),
                                               popover: <AntPopover
                                                   hoverText={'сделает элемент недоступным для пользователя'}
                                                   title={'disabled'}
                                               />
                                           },
                                           required: {
                                               type: 'boolean',
                                               title: 'required',
                                               widthLabel: '60px',
                                               popover: <AntPopover
                                                   hoverText={'обязательное поле для заполнения'}
                                                   title={'required'}
                                               />
                                           },
                                           min: {
                                               type: 'string',
                                               title: 'min',
                                               widthLabel: '60px',
                                               visible: (itemEdit.numeric === true),
                                               popover: <AntPopover
                                                   hoverText={'min - default null'}
                                                   title={'min'}
                                               />
                                           },
                                           max: {
                                               type: 'string',
                                               title: 'max',
                                               widthLabel: '60px',
                                               visible: (itemEdit.numeric === true),
                                               popover: <AntPopover
                                                   hoverText={'max - default null'}
                                                   title={'max'}
                                               />
                                           },
                                           maxLen: {
                                               type: 'string',
                                               title: 'maxLen',
                                               widthLabel: '60px',
                                               visible: (itemEdit.type === 'Input'),
                                               popover: <AntPopover
                                                   hoverText={'maxLen - default null'}
                                                   title={'maxLen'}
                                               />
                                           },
                                           type: {
                                               type: 'select',
                                               title: 'type',
                                               widthLabel: '60px',
                                               items: formItems,
                                               popover: <AntPopover
                                                   hoverText={'тип элемента'}
                                                   title={'type'}
                                               />
                                           },
                                           block: {
                                               type: 'string',
                                               title: 'block',
                                               widthLabel: '60px',
                                               popover: <AntPopover
                                                   hoverText={'[-] дефис вначале сделает невидимым название блока'}
                                                   title={'block'}
                                               />
                                           },
                                           link: {
                                               type: 'string',
                                               title: 'link',
                                               description: '',
                                               widthLabel: '60px',
                                               visible: (itemEdit.type === 'Input'),
                                               popover: <AntPopover
                                                   hoverText={'добавить ссылку'}
                                                   title={'link'}
                                               />
                                           },
                                           filter: {
                                               type: 'string',
                                               title: 'filter',
                                               widthLabel: '60px',
                                               visible: (itemEdit.type === 'Select'),
                                               popover: <AntPopover
                                                   title={'filter'}
                                                   hoverText={<ListDescription title={titleListFilter}
                                                                               description={descriptionListFilter}/>}
                                               />
                                           },
                                           regExp: {
                                               type: 'string',
                                               title: 'regExp',
                                               widthLabel: '60px',
                                               visible: (itemEdit.type === 'Input'),
                                               popover: <AntPopover
                                                   title={'regExp'}
                                                   hoverText={'регулярные выражения'}
                                               />
                                           },
                                           messErr: {
                                               type: 'string',
                                               title: 'messErr',
                                               widthLabel: '60px',
                                               visible: (itemEdit.type === 'Input'),
                                               popover: <AntPopover
                                                   title={'messErr'}
                                                   hoverText={'сообщение об ошибки регулярки'}
                                               />
                                           },
                                           defaultValue: {
                                               type: 'string',
                                               title: 'value',
                                               widthLabel: '60px',
                                               visible: (itemEdit.type === 'Select')
                                           },
                                           // formula: {
                                           //     type: 'string',
                                           //     title: 'formula',
                                           //     widthLabel: '60px',
                                           //     visible: (itemEdit.type === 'Calc')
                                           // }
                                       }
                                   }
                />

                <ObjectFixedEditor object={ds}
                                   setObject={setDs}
                                   template={
                                       {
                                           key: {
                                               type: 'string',
                                               title: 'ds',
                                               widthLabel: '60px',
                                               visible: (itemEdit.type === 'Select' || itemEdit.type === 'SelectMulti'),
                                               popover: <AntPopover
                                                   title={'ds'}
                                                   hoverText={<ListDescription title={titleListDs}
                                                                               description={descriptionListDs}/>}
                                               />

                                           }
                                       }
                                   }
                />

                <ObjectFixedEditor object={obj}
                                   setObject={setObj}
                                   template={
                                       {
                                           key: {
                                               type: 'string',
                                               title: 'obj',
                                               widthLabel: '60px',
                                               visible: (itemEdit.type === 'Select' || itemEdit.type === 'SelectMulti'),
                                               popover: <AntPopover
                                                   title={'obj'}
                                                   hoverText={<ListDescription title={titleListObj}
                                                                               description={descriptionListObj}/>}
                                               />
                                           }
                                       }
                                   }
                />

                <ObjectFixedEditor object={itemEdit}
                                   setObject={setActions}
                                   cmp={item}
                                   template={
                                       {
                                           key: {
                                               type: 'actions',
                                               title: 'actions',
                                               widthLabel: '60px',
                                               visible: (itemEdit.type === 'Select'),
                                               popover: <AntPopover
                                                   hoverText={linkAction}
                                                   title={'actions'}
                                               />
                                           }
                                       }
                                   }
                />

                <ObjectFixedEditor object={prp}
                                   setObject={setPrp}
                                   template={
                                       {
                                           picker: {
                                               type: 'select',
                                               items: ["date", "week", "month", "quarter", "year"],
                                               title: 'picker',
                                               widthLabel: '60px',
                                               visible: (itemEdit.type === "RangePicker"),
                                               popover: <AntPopover
                                                   hoverText={'тип диапозона дат: месяц, неделя, год...'}
                                                   title={'picker'}
                                               />
                                           },
                                           label: {
                                               type: 'string',
                                               title: 'label',
                                               widthLabel: '60px',
                                               popover: <AntPopover
                                                   hoverText={'заголовок элемента'}
                                                   title={'label'}
                                               />
                                           },
                                           name: {
                                               type: 'string',
                                               title: 'name',
                                               widthLabel: '60px',
                                               popover: <AntPopover
                                                   hoverText={'имя элемента, попадает в объект формы при отправки'}
                                                   title={'name'}
                                               />
                                           },
                                       }
                                   }
                />
            </>
        )}

        <Button style={{float: 'right', padding: '3px 0 0', lineHeight: '1', height: '12px'}}
                type="link"
                danger={true}
                onClick={() => {
                    item.del = true
                    setItem(item)
                }
                }>удалить</Button>
    </EditBlock>
};

export default FormItemEdit;
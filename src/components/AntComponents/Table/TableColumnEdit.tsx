import React, {useEffect, useState} from 'react';
import {PlusOutlined, DeleteOutlined, DashOutlined} from '@ant-design/icons';
import {Card, Dropdown, Menu, Popconfirm} from "antd";
import ItemEdit from "../Editor/Elements/ItemEdit";
import ObjectEditor from "../Editor/Elements/ObjectEditor";
import LinkTree from './LinkTree';
import {useTypedSelector} from '../../../hooks';
import {getDataSource} from '../../../redux/ds/ds.selector';
import {RootState} from '../../../redux/redux.store';
import TableCellStyleAddictions from './TableCellStyleAddictions';


type TableColumnEditType = {
    col: string
    object: any
    setObject: any
    deleteCol: (col: string) => void
    cmp?: any
}

const TableColumnEdit: React.FC<TableColumnEditType> = ({col, object, setObject, deleteCol, cmp}) => {

    const dataSource = useTypedSelector((state: RootState) =>
        getDataSource(state, cmp.ds?.key)
    );

    const [modal, setModal] = useState(object.modal)
    const [style, setStyle] = useState({...object.style})
    const [addictions, setAddictions] = useState(object.addictions ? object.addictions : [])
    const [title, setTitle] = useState(object.title)
    const [mutate, setMutate] = useState(object.mutate)
    const [link, setLink] = useState(object.link)
    const [href, setHref] = useState(object.href)
    const [className, setClassName] = useState(object.className)
    const [multipleKey, setMultipleKey] = useState(object.multiple?.key)
    const [groupColumn, setGroupColumn] = useState(object.groupColumn)

    const [multipleStyle, setMultipleStyle] = useState({...object.multiple?.style})

    useEffect(() => {
        if (modal !== undefined && modal !== null) object.modal = modal
        else delete object.modal

        if (style !== undefined && style !== null) object.style = style
        else delete object.style

        object.addictions = addictions

        if (title !== undefined && title !== null) object.title = title
        else delete object.title

        if (mutate !== undefined && mutate !== null) object.mutate = mutate
        else delete object.mutate

        if (link !== undefined && link !== null) object.link = link
        else delete object.link

        if (href !== undefined && href !== null) object.href = href
        else delete object.href

        if (className !== undefined && className !== null) object.className = className
        else delete object.className

        if (multipleKey !== undefined && multipleKey !== null) {
            object.multiple = {key: multipleKey}
        } else {
            object.multiple = undefined
        }

        if (object.multiple !== undefined)
            object.multiple.style = multipleStyle

        if (groupColumn !== undefined && groupColumn !== null) object.groupColumn = groupColumn
        else delete object.groupColumn

        setObject({...object})
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modal, style, title, mutate, link, className, multipleKey, multipleStyle, groupColumn, href, addictions])

    const addItem = (typ: string) => {
        switch (typ) {
            case 'modal':
                setModal('')
                break
            case 'style':
                setStyle({})
                break
            case 'title':
                setTitle('')
                break
            case 'mutate':
                setMutate('')
                break
            case 'link':
                setLink('выберите URL')
                break
            case 'href':
                setHref('')
                break
            case 'className':
                setClassName('')
                break
            case 'multipleKey':
                setMultipleKey('')
                break
            case 'groupColumn':
                setGroupColumn('')
                break
        }
    }

    const menu = (
        <Menu>
            {(modal === undefined || modal === null) &&
                <Menu.Item key="1" onClick={() => addItem('modal')}><PlusOutlined /> modal [string]</Menu.Item>}

            {(title === undefined || title === null) &&
                <Menu.Item key="2" onClick={() => addItem('title')}><PlusOutlined /> title [string]</Menu.Item>}

            {(mutate === undefined || mutate === null) &&
                <Menu.Item key="3" onClick={() => addItem('mutate')}><PlusOutlined /> mutate [string]</Menu.Item>}

            {((link === undefined || link === null) && (href === undefined || href === null)) &&
                <Menu.Item key="4" onClick={() => addItem('link')}><PlusOutlined /> link [string]</Menu.Item>}

            {((link === undefined || link === null) && (href === undefined || href === null)) &&
                <Menu.Item key="5" onClick={() => addItem('href')}><PlusOutlined /> href [string]</Menu.Item>}

            {(className === undefined || className === null) &&
                <Menu.Item key="6" onClick={() => addItem('className')}><PlusOutlined /> className [string]</Menu.Item>}

            {(multipleKey === undefined || multipleKey === null) &&
                <Menu.Item key="7" onClick={() => addItem('multipleKey')}><PlusOutlined /> multipleKey [string]</Menu.Item>}

            {(groupColumn === undefined || groupColumn === null) &&
                <Menu.Item key="8" onClick={() => addItem('groupColumn')}><PlusOutlined /> groupColumn [string]</Menu.Item>}

            <Menu.Divider />

            <Menu.Item key="100" danger>
                <Popconfirm placement="right" title='Точно удалить?' onConfirm={() => deleteCol(col)}
                    okText="Yes" cancelText="No">
                    <DeleteOutlined /> Удалить
                </Popconfirm>
            </Menu.Item>
        </Menu>
    );

    return <Card size="small" title={col}
        style={{marginBottom: '16px', backgroundColor: '#f7f7f7'}}
        extra={<Dropdown overlay={menu}><DashOutlined /></Dropdown>}>

        <Card size="small" style={{marginBottom: '8px'}}>
            <ObjectEditor object={style} setObject={setStyle} />
        </Card>

        <TableCellStyleAddictions addictions={addictions} setAddictions={setAddictions} />

        <ItemEdit label={'modal'} item={modal} setItem={setModal} />
        <ItemEdit label={'title'} item={title} setItem={setTitle} />
        <ItemEdit label={'mutate'} item={mutate} setItem={setMutate} />
        <ItemEdit selectItems={dataSource?.columns?.map((item) => item.key)} type={'select'} label={'href'} item={href} setItem={setHref} />
        <LinkTree item={link} setItem={setLink} />
        <ItemEdit label={'className'} item={className} setItem={setClassName} />
        <ItemEdit label={'multipleKey'} item={multipleKey} setItem={setMultipleKey} />
        <ItemEdit label={'groupCol'} item={groupColumn} setItem={setGroupColumn} />

        {multipleKey !== undefined && multipleKey !== null &&
            <Card size="small" style={{marginTop: '8px'}}>
                <ObjectEditor object={multipleStyle} setObject={setMultipleStyle} />
            </Card>
        }
    </Card>
}

export default TableColumnEdit;
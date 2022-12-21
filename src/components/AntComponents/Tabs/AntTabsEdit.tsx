import React, {useEffect, useState} from 'react';
import {useActions} from "../../../hooks/useActions";
import {ITabs, templates} from "../Page/templates";
import {Button, Card, Col, Divider, Input, Row, Space, Switch, Tabs} from "antd";
import {
    ArrowRightOutlined,
    ArrowLeftOutlined
} from '@ant-design/icons';
import ButtonBlock from "../Editor/ButtonBlock";
import EditAcl from "../Editor/Components/EditAcl";
import AddictionContainer from '../../addiction/AddictionContainer';

const {TabPane} = Tabs;

type AntTabsType = {
    cmp: ITabs,
    setVisible?: (v: boolean) => void
}
const AntTabsEdit: React.FC<AntTabsType> = ({
    cmp, setVisible = () => {
    }
}) => {
    const {cmpUpdate} = useActions()
    let model = {...cmp, props: {...cmp.props}, children: [...cmp.children]}

    const [children, setChildren] = useState([...model.children])
    const [acl, setAcl] = useState(model.acl)
    const [addiction, setAddiction] = useState<number | ''>(model.addiction ? model.addiction : '')

    useEffect(() => {
        model.children = children
        model.acl = acl
        model.addiction = addiction

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [children, acl, addiction])

    const onClose = () => {
        setVisible(false)
    }

    const onApply = () => {
        cmpUpdate(model)
        setVisible(false)
    }

    type ItemType = {
        title: string
        props: {disabled: boolean}
        key: string
    }
    const updateItem = (item: ItemType) => {
        let newChildren: Array<any> = []
        children.forEach((c) => {
            if (c.key === item.key)
                newChildren.push(item)
            else
                newChildren.push(c)
        })

        setChildren(newChildren)
    }

    const addItem = (a: any, action: any) => {
        switch (action) {
            case 'remove':  //если remove то в a будет ключ
                let newChildren: Array<any> = []
                children.forEach((c) => {
                    if (a !== c.key)
                        newChildren.push(c)
                })
                setChildren(newChildren)
                break;
            case 'add':
                let row: any = templates.Row
                let col = templates.Col
                row.page_key = cmp.page_key
                row.key = model.key + '_row_' + Math.floor(Math.random() * 1000000)
                col.page_key = cmp.page_key
                col.key = model.key + '_col_' + Math.floor(Math.random() * 1000000)

                row.children = [col]
                let item = {
                    key: model.key + '_tab_' + Math.floor(Math.random() * 1000000),
                    title: 'Новая закладка',
                    children: [row]
                }

                setChildren([...children, item])
                break;
        }
    }

    const moveTab = (direction: string, index: number) => {
        let newChildren = []
        let shift = direction === 'left' ? 1 : 0

        for (let i = 0; i < index - shift; i++)     //- ii
            newChildren.push(children[i])

        newChildren.push(children[index - shift + 1])       //- ii + 1
        newChildren.push(children[index - shift])   //- ii

        for (let i = index - shift + 2; i < children.length; i++)   //- ii + 2
            newChildren.push(children[i])

        setChildren(newChildren)
    }

    return <>
        <h3>Редактирование: {cmp.type} - {cmp.key}</h3>

        <Tabs defaultActiveKey="1" type="editable-card" onEdit={(e, action) => {
            addItem(e, action)
        }}>
            {children.map((item: any, index) => <TabPane key={item.key} tab={item.title}>
                <Row gutter={[16, 16]} style={{marginBottom: '16px'}}>
                    <Col span={12}>
                        <Card size="small" className="cardEdit">
                            <Row>
                                <Col style={{width: '110px'}}>
                                    Заголовок:
                                </Col>
                                <Col style={{width: 'calc(100% - 130px)'}}>
                                    <Input
                                        className="lcEditorInput"
                                        size="small"
                                        style={{width: '100%'}}
                                        onChange={(v) => {
                                            updateItem({...item, title: v.currentTarget.value})
                                        }}
                                        value={item.title}
                                    />
                                </Col>

                                <Col style={{width: '110px'}}>
                                    Активна:
                                </Col>
                                <Col style={{width: 'calc(100% - 130px)'}}>
                                    <Space><Switch size="small" checked={!item.props?.disabled}
                                        onChange={(v) => {
                                            updateItem({
                                                ...item,
                                                props: {...item.props, disabled: !v}
                                            })
                                        }} /></Space>
                                </Col>

                                <Col style={{width: '110px'}}>
                                    Переместить:
                                </Col>
                                <Col style={{width: 'calc(100% - 130px)'}}>
                                    <Button size="small"
                                        type="link"
                                        title="налево"
                                        disabled={index === 0}
                                        onClick={() => moveTab('left', index)}><ArrowLeftOutlined /></Button>
                                    <Button size="small"
                                        type="link"
                                        title="направо"
                                        disabled={index === children.length - 1}
                                        onClick={() => moveTab('right', index)}><ArrowRightOutlined /></Button>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </TabPane>)}
        </Tabs>

        <Divider />
        <Row>
            <Col span={12}>
                <Card size="small" className="cardEdit">
                    <AddictionContainer setState={setAddiction} cmp={cmp} addictionId={addiction} />
                </Card>

                <Card size="small" className="cardEdit cardEditAcl">
                    <EditAcl item={acl} setItem={setAcl} />
                </Card>
            </Col>
        </Row>


        <ButtonBlock onApply={onApply} onClose={onClose} />
    </>
};

export default AntTabsEdit;
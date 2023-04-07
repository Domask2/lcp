import React, {useEffect, useState} from 'react';
import {useActions} from "../../../hooks";
import ButtonBlock from "../Editor/ButtonBlock";
import EditBlock from "../Editor/Components/EditBlock";
import EditStyle from "../Editor/Components/EditStyle";
import ItemEdit from "../Editor/Elements/ItemEdit";
import EditAcl from "../Editor/Components/EditAcl";
import AddictionContainer from '../../addiction/AddictionContainer';
import AddictionStyle from "./AddictionStyle";
import {getCurrentProject} from "../../../redux/project/project.selector";
import {useKeyPress} from "../../../hooks";
import {AddictionStyleProvider} from "./AddictionStyleContext";
import {useTypedSelector} from "../../../hooks";
import {Card, Col, Input, Row, Skeleton, Space, Switch} from "antd";
import {RootState} from "../../../redux/redux.store";
import {IAddictionStyleArray} from "../../../redux/project/project.initial";

type AndCardEditType = {
    cmp: any,
    setVisible?: (v: boolean) => void
}
const AntCardEdit: React.FC<AndCardEditType> = ({
                                                    cmp, setVisible = () => {
    }
                                                }) => {
    const {cmpUpdate} = useActions()
    let model = {...cmp, props: {...cmp.props}}
    const currentProject = useTypedSelector((state: RootState) => getCurrentProject(state));
    const [size, setSize] = useState(model.props.size)
    const [style, setStyle] = useState({...model.style})
    const [bodyStyle, setBodyStyle] = useState({...model.bodyStyle})
    const [headStyle, setHeadStyle] = useState({...model.headStyle})
    const [title, setTitle] = useState<string>(model.title)
    const clName = cmp.className !== undefined ? cmp.className : ''
    const [className, setClassName] = useState<string>(clName)
    const [acl, setAcl] = useState<string>(model.acl)
    const [addiction, setAddiction] = useState<number | ''>(model.addiction ? model.addiction : '')
    const [addictionStyleArray, setAddictionStyleArray] = useState<IAddictionStyleArray[]>(model.addictionStyleArray ?? []);
    const [anchor, setAnchor] = useState<string>(model.anchor);

    useEffect(() => {
        model.style = style
        model.bodyStyle = bodyStyle
        model.headStyle = headStyle
        model.props.size = size
        model.title = title
        model.className = className
        model.acl = acl
        model.addiction = addiction
        model.anchor = anchor
        model.addictionStyleArray = addictionStyleArray

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [style, bodyStyle, headStyle, size, title, className, acl, addiction, anchor, addictionStyleArray])

    const onClose = () => {
        setVisible(false)
    }

    const onApply = () => {
        cmpUpdate(model)
        setVisible(false)
    }

    const arrayDepends = [style, bodyStyle, headStyle, size, title, className, acl, addiction, anchor];
    useKeyPress(["altLeft", 'KeyS'], onApply, arrayDepends)


    return <>
        <h3>Редактирование: {cmp.type} - {cmp.key}</h3>
        <br/>
        <Row gutter={[16, 16]}>
            <Col span={12} style={{minHeight: '280px'}}>
                <Row gutter={[16, 16]}>
                    <Col span={24}>
                        <Card size={size} className={className} style={style} bodyStyle={bodyStyle}
                              headStyle={headStyle} title={title}>
                            <Skeleton avatar paragraph={{rows: 4}}/>
                        </Card>
                    </Col>

                    <Col span={24}>
                        <Card className="cardEdit" size="small">
                            <Row gutter={[16, 16]}>
                                <Col style={{width: '130px'}}>
                                    Размер карточки:
                                </Col>

                                <Col style={{width: 'calc(100% - 130px)'}}>
                                    <Space style={{marginRight: '16px'}}>default: <Switch size="small"
                                                                                          checked={size !== 'small'}
                                                                                          onChange={() => {
                                                                                              setSize('default')
                                                                                          }}/></Space>
                                    <Space>small: <Switch size="small" checked={size === 'small'} onChange={() => {
                                        setSize('small')
                                    }}/></Space>
                                </Col>

                                <Col span={24}>
                                    <ItemEdit label="title" item={title} setItem={setTitle} del={false} nullable={true}
                                              type="string" labelWidth="130px"/>
                                    <ItemEdit label="className" item={className} setItem={setClassName} del={false}
                                              nullable={true} type="string" labelWidth="130px"/>
                                </Col>
                            </Row>
                        </Card>

                        <Card size="small" className="cardEdit">
                            <AddictionContainer setState={setAddiction} cmp={cmp} addictionId={addiction}/>
                        </Card>

                        <Card size="small" className="cardEdit cardEditAcl">
                            <EditAcl item={acl} setItem={setAcl}/>
                        </Card>
                    </Col>
                </Row>
            </Col>

            <Col span={12}>
                <EditBlock title="Style">
                    <EditStyle style={style} setStyle={setStyle}/>
                </EditBlock>

                <EditBlock title="BodyStyle">
                    <EditStyle style={bodyStyle} setStyle={setBodyStyle}/>
                </EditBlock>

                <EditBlock title="HeadStyle">
                    <EditStyle style={headStyle} setStyle={setHeadStyle}/>
                </EditBlock>

                <Card size="small" className="cardEdit">
                    <h3>Anchor</h3>
                    <Input value={anchor && anchor} className="lcEditorInput" onChange={(e) => {
                        setAnchor(e.currentTarget.value)
                    }}/>
                </Card>

                <AddictionStyleProvider
                    cmp={cmp}
                    currentProject={currentProject}
                    addictionStyleArray={addictionStyleArray}
                    setAddictionStyleArray={setAddictionStyleArray}
                >
                    <AddictionStyle/>
                </AddictionStyleProvider>

            </Col>
        </Row>

        <ButtonBlock onApply={onApply} onClose={onClose}/>
    </>
};

export default AntCardEdit;
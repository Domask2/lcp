import React, {useEffect, useState} from 'react';
import {Card, Col, Input, Row, Slider, Space} from "antd";
import {useActions} from "../../../hooks/useActions";
import {ICol} from "../Page/templates";
import ButtonBlock from "../Editor/ButtonBlock";
import EditBlock from "../Editor/Components/EditBlock";
import EditStyle from "../Editor/Components/EditStyle";
import EditAcl from "../Editor/Components/EditAcl";
import AddictionContainer from '../../addiction/AddictionContainer';
import {useKeyPress} from "../../../hooks/useKeyPress";
import {marks} from '../../../utils';

type AndColEdit = {
    cmp: ICol,
    setVisible?: (v: boolean) => void
}
const AntColEdit: React.FC<AndColEdit> = ({
    cmp, setVisible = () => {
    }
}) => {
    const {cmpUpdate} = useActions()
    let model = {...cmp, props: {...cmp.props}}

    const [span, setSpan] = useState(model.props.span)
    const [xs, setXs] = useState(model.props.xs)
    const [sm, setSm] = useState(model.props.sm)
    const [md, setMd] = useState(model.props.md)
    const [lg, setLg] = useState(model.props.lg)
    const [xl, setXl] = useState(model.props.xl)
    const [acl, setAcl] = useState(model.acl)
    const [style, setStyle] = useState({...model.style})
    const [addiction, setAddiction] = useState<number | ''>(model.addiction ? model.addiction : '')
    const [anchor, setAnchor] = useState<string>(model.anchor ? model.anchor : '');

    useEffect(() => {
        model.props.span = span
        model.props.xs = xs
        model.props.sm = sm
        model.props.md = md
        model.props.lg = lg
        model.props.xl = xl
        model.acl = acl
        model.style = style
        model.addiction = addiction
        model.anchor = anchor

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [style, span, xs, sm, md, lg, xl, acl, addiction, anchor])

    const onClose = () => {
        setVisible(false)
    }

    const onApply = () => {
        cmpUpdate(model)
        setVisible(false)
    }

    const arrayDepends = [style, span, xs, sm, md, lg, xl, acl, addiction, anchor];
    useKeyPress(["altLeft", 'KeyS'], onApply, arrayDepends)

    return <>
        <h3>Редактирование: {cmp.type} - {cmp.key}</h3>
        <br />
        <Row gutter={[16, 16]}>
            <Col span={24}>
                <Card className="cardEdit" size="small">
                    <Row gutter={[16, 16]} style={{marginBottom: '16px'}}>

                        <Col style={{width: '130px'}}>
                            <Space style={{paddingTop: '3px'}}>
                                Размер колонки span
                            </Space>
                        </Col>

                        <Col style={{width: 'calc(100% - 130px)'}}>
                            <Slider
                                min={1}
                                max={24}
                                onChange={(val) => {
                                    setSpan(val)
                                }}
                                value={span}
                                step={1}
                                marks={marks}
                            />
                        </Col>
                    </Row>

                    <Row gutter={[16, 16]} style={{marginBottom: '16px'}}>

                        <Col style={{width: '130px'}}>
                            <Space style={{paddingTop: '3px'}}>
                                Размер колонки XS
                            </Space>
                        </Col>

                        <Col style={{width: 'calc(100% - 130px)'}}>
                            <Slider
                                min={1}
                                max={24}
                                onChange={(val) => {
                                    setXs(val)
                                }}
                                value={xs}
                                step={1}
                                marks={marks}
                            />
                        </Col>
                    </Row>

                    <Row gutter={[16, 16]} style={{marginBottom: '16px'}}>

                        <Col style={{width: '130px'}}>
                            <Space style={{paddingTop: '3px'}}>
                                Размер колонки SM
                            </Space>
                        </Col>

                        <Col style={{width: 'calc(100% - 130px)'}}>
                            <Slider
                                min={1}
                                max={24}
                                onChange={(val) => {
                                    setSm(val)
                                }}
                                value={sm}
                                step={1}
                                marks={marks}
                            />
                        </Col>
                    </Row>

                    <Row gutter={[16, 16]} style={{marginBottom: '16px'}}>

                        <Col style={{width: '130px'}}>
                            <Space style={{paddingTop: '3px'}}>
                                Размер колонки MD
                            </Space>
                        </Col>

                        <Col style={{width: 'calc(100% - 130px)'}}>
                            <Slider
                                min={1}
                                max={24}
                                onChange={(val) => {
                                    setMd(val)
                                }}
                                value={md}
                                step={1}
                                marks={marks}
                            />
                        </Col>
                    </Row>

                    <Row gutter={[16, 16]} style={{marginBottom: '16px'}}>

                        <Col style={{width: '130px'}}>
                            <Space style={{paddingTop: '3px'}}>
                                Размер колонки LG
                            </Space>
                        </Col>

                        <Col style={{width: 'calc(100% - 130px)'}}>
                            <Slider
                                min={1}
                                max={24}
                                onChange={(val) => {
                                    setLg(val)
                                }}
                                value={lg}
                                step={1}
                                marks={marks}
                            />
                        </Col>
                    </Row>

                    <Row gutter={[16, 16]} style={{marginBottom: '16px'}}>

                        <Col style={{width: '130px'}}>
                            <Space style={{paddingTop: '3px'}}>
                                Размер колонки XL
                            </Space>
                        </Col>

                        <Col style={{width: 'calc(100% - 130px)'}}>
                            <Slider
                                min={1}
                                max={24}
                                onChange={(val) => {
                                    setXl(val)
                                }}
                                value={xl}
                                step={1}
                                marks={marks}
                            />
                        </Col>
                    </Row>

                    <Col span={24}>
                        <Row gutter={[16, 16]}>
                            <Col span={span}>
                                <Card size="small" style={{
                                    textAlign: "center",
                                    border: '3px dashed #91d5ff',
                                    color: '#66c5ff',
                                    fontWeight: 'bold'
                                }}>1</Card>
                            </Col>
                            <Col span={24 - span}>
                                <Card size="small" style={{
                                    textAlign: "center",
                                    border: '3px dashed #eee',
                                    color: '#ddd',
                                    fontWeight: 'bold'
                                }}>2</Card>
                            </Col>
                        </Row>
                    </Col>
                </Card>
            </Col>

            <Col span={12}>

                <Card size="small" className="cardEdit">
                    <AddictionContainer setState={setAddiction} cmp={cmp} addictionId={addiction} />
                </Card>

                <Card size="small" className="cardEdit cardEditAcl">
                    <EditAcl item={acl} setItem={setAcl} />
                </Card>

                <Card size="small" className="cardEdit">
                    <h3>Anchor</h3>
                    <Input value={anchor && anchor} className="lcEditorInput" onChange={(e) => {
                        setAnchor(e.currentTarget.value)
                    }} />
                </Card>
            </Col>

            <Col span={12}>
                <EditBlock title="Style">
                    <EditStyle style={style} setStyle={setStyle} />
                </EditBlock>
            </Col>
        </Row>

        <ButtonBlock onApply={onApply} onClose={onClose} />
    </>
};

export default AntColEdit;
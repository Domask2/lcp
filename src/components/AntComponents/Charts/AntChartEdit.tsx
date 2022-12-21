import React, {useEffect, useState} from 'react';
import {Card, Col, Row} from "antd";
import ButtonBlock from "../Editor/ButtonBlock";
import {useActions} from "../../../hooks/useActions";
import EditBlock from "../Editor/Components/EditBlock";
import EditStyle from "../Editor/Components/EditStyle";
import ObjectFixedEditor from "../Editor/Elements/ObjectFixedEditor";
import ItemEdit from "../Editor/Elements/ItemEdit";
import EditAcl from "../Editor/Components/EditAcl";
import {useTypedSelector} from '../../../hooks/useTypedSelector';
import {RootState} from '../../../redux/redux.store';
import {getDataSourcesAll} from '../../../redux/ds/ds.selector';
import AddictionContainer from '../../addiction/AddictionContainer';

type AntChartBarType = {
    cmp: any,
    setVisible?: (v: boolean) => void
}
const AntChartBarEdit: React.FC<AntChartBarType> = ({
    cmp, setVisible = () => {
    }
}) => {
    let model = {...cmp}
    const [style, setStyle] = useState<React.CSSProperties>({...model.style})
    const [ds, setDs] = useState({...model.ds})
    const [props, setProps] = useState({...model.props})
    const [barColor, setBarColor] = useState<{plus: string, minus: string}>(model.barColor)
    const [format, setFormat] = useState<"rows" | "line">(model.format)
    const [acl, setAcl] = useState<string>(model.acl)
    const [addiction, setAddiction] = useState<number | ''>(model.addiction ? model.addiction : '')

    const dsArr = useTypedSelector((state: RootState) => getDataSourcesAll(state));

    const {cmpUpdate} = useActions()

    useEffect(() => {
        model.style = style
        model.ds = ds
        model.props = props
        model.barColor = barColor
        model.format = format
        model.acl = acl
        model.addiction = addiction

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [style, ds, props, barColor, format, acl, addiction])

    const onClose = () => {
        setVisible(false)
    }

    const onApply = () => {
        cmpUpdate(model)
        setVisible(false)
    }

    const annotationDs = <code style={{fontSize: 11}}>
        В <b>ds</b> должны содержаться обязательные поля <b>columns</b> и <b>items</b>.<br />
        <b>columns</b> - [visible = true] для тех полей что нужно отобразить.<br />
        <b>items</b> - массив строк, значение для таблицы берется из первой строки.
    </code>

    return <>
        <h3>Редактирование: {cmp.type} - {cmp.key}</h3>
        <br />
        <Row gutter={[16, 16]}>
            <Col span={12}>
                <EditBlock title="Style">
                    <EditStyle style={style} setStyle={setStyle} />
                </EditBlock>

                {model.type === 'ChartBar' && <EditBlock title="BarColor">
                    <ObjectFixedEditor object={barColor}
                        setObject={setBarColor}
                        template={
                            {
                                plus: {
                                    type: 'string',
                                    title: 'plus',
                                    widthLabel: '100px'
                                },
                                minus: {
                                    type: 'string',
                                    title: 'minus',
                                    widthLabel: '100px'
                                },
                            }
                        } />
                </EditBlock>}

                <Card size="small" className="cardEdit">
                    <AddictionContainer setState={setAddiction} cmp={cmp} addictionId={addiction} />
                </Card>

                <Card size="small" className="cardEdit cardEditAcl">
                    <EditAcl item={acl} setItem={setAcl} />
                </Card>
            </Col>

            <Col span={12}>

                <EditBlock title="DS">
                    <ObjectFixedEditor object={ds}
                        setObject={setDs}
                        template={
                            {
                                key: {
                                    type: 'select',
                                    title: 'Ключ DS',
                                    widthLabel: '120px',
                                    items: Object.keys(dsArr),
                                },
                            }
                        } />
                    <p style={{paddingLeft: 10, lineHeight: 1.25}}>{annotationDs}</p>
                </EditBlock>

                <EditBlock title="Props">
                    {model.type === 'ChartPie' ? (
                        <ObjectFixedEditor object={props}
                            setObject={setProps}
                            template={
                                {
                                    angleField: {
                                        type: 'select',
                                        title: 'Значение',
                                        items: dsArr[ds.key]?.items[0] && Object.keys(dsArr[ds.key].items[0]),
                                        widthLabel: '100px'
                                    },
                                    colorField: {
                                        type: 'select',
                                        title: 'Название',
                                        items: dsArr[ds.key]?.items[0] && Object.keys(dsArr[ds.key].items[0]),
                                        widthLabel: '100px'
                                    }
                                }
                            } />
                    ) : (
                        <ObjectFixedEditor object={props}
                            setObject={setProps}
                            template={
                                {
                                    xField: {
                                        type: 'select',
                                        title: 'xField',
                                        items: dsArr[ds.key]?.items[0] && Object.keys(dsArr[ds.key].items[0]),
                                        widthLabel: '100px'
                                    },
                                    yField: {
                                        type: 'select',
                                        title: 'yField',
                                        items: dsArr[ds.key]?.items[0] && Object.keys(dsArr[ds.key].items[0]),
                                        widthLabel: '100px'
                                    }
                                }
                            } />
                    )}
                    {model.type === 'ChartBar' && <ItemEdit label={'format'}
                        item={format}
                        setItem={setFormat}
                        nullable={true}
                        type="select"
                        labelWidth="100px"
                        del={false}
                        selectItems={["row", "line"]} />}
                </EditBlock>
            </Col>
        </Row>

        <ButtonBlock onApply={onApply} onClose={onClose} />
    </>
};

export default AntChartBarEdit;
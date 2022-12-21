import React, {useEffect, useState} from 'react';
import {Card, Col, Input, Row, Switch, Tabs} from "antd";
import {useActions} from "../../../hooks/useActions";
import ButtonBlock from "../Editor/ButtonBlock";
import ObjectFixedEditor from "../Editor/Elements/ObjectFixedEditor";
import EditBlock from "../Editor/Components/EditBlock";
import EditStyle from "../Editor/Components/EditStyle";
import ItemEdit from "../Editor/Elements/ItemEdit";
import TableColumnsEdit from "../Table/TableColumnsEdit";
import EditAcl from "../Editor/Components/EditAcl";
import {useTypedSelector} from '../../../hooks/useTypedSelector';
import {RootState} from '../../../redux/redux.store';
import {getDataSourcesAll} from '../../../redux/ds/ds.selector';
import AddictionContainer from '../../addiction/AddictionContainer';
import ArrayEditor from "../Editor/Elements/ArrayEditor";

const {TabPane} = Tabs;

type AndDescriptionEditType = {
    cmp: any,
    setVisible?: (v: boolean) => void
}
const AntDescriptionsEdit: React.FC<AndDescriptionEditType> = ({
                                                                   cmp, setVisible = () => {
    }
                                                               }) => {
    const {cmpUpdate} = useActions()

    let model = {...cmp}
    const [style, setStyle] = useState({...model.style})
    const [labelStyle, setLabelStyle] = useState({...model.labelStyle})
    const [contentStyle, setContentStyle] = useState({...model.contentStyle})
    const [ds, setDs] = useState({...model.ds})
    const [props, setProps] = useState({...model.props})
    const [column, setColumn] = useState({...model.props.column})
    const [show, setShow] = useState(model.show)
    const [hide, setHide] = useState(model.hide)
    const [columns, setColumns] = useState({...model.columns})
    const [acl, setAcl] = useState(model.acl);
    const [addiction, setAddiction] = useState<number | ''>(model.addiction)
    const [anchor, setAnchor] = useState<string>(model.anchor);
    const [titleStyle, setTitleStyle] = useState({...model.titleStyle});
    const [isBtnAction, setIsBtnAction] = useState(!!model.isBtnAction);
    const [btnTitle, setBtnTitle] = useState(model.btnTitle);
    const [actions, setActions] = useState(model.actions);

    const dsArr = useTypedSelector((state: RootState) => getDataSourcesAll(state));

    useEffect(() => {
        model.style = style
        model.labelStyle = labelStyle
        model.contentStyle = contentStyle
        model.props = props
        model.ds = ds
        model.props.column = column
        model.show = show
        model.hide = hide
        model.columns = columns
        model.acl = acl
        model.addiction = addiction
        model.anchor = anchor
        model.titleStyle = titleStyle;
        model.actions = actions;
        model.isBtnAction = isBtnAction;
        model.btnTitle = btnTitle;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [style, labelStyle, contentStyle, props, ds, column, show, hide, columns, acl, addiction, anchor, titleStyle, actions, isBtnAction, btnTitle])

    const onClose = () => {
        setVisible(false)
    }

    const onApply = () => {
        cmpUpdate(model)
        setVisible(false)
    }

    return <>
        <h3>Редактирование: {cmp.type} - {cmp.key}</h3>
        <Tabs defaultActiveKey="1">
            <TabPane tab="Внешний вид" key="1">
                <Row gutter={[16, 16]}>
                    <Col span={12}>
                        <Card className="cardEdit" size="small">
                            <h3>Props</h3>
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
                                               }/>
                            <br/>

                            <ItemEdit label="показать" item={show} setItem={setShow} nullable={true} del={false}
                                      type="string" labelWidth="100px"/>
                            <ItemEdit label="скрыть" item={hide} setItem={setHide} nullable={true} del={false}
                                      type="string" labelWidth="100px"/>

                            <ObjectFixedEditor object={props} setObject={setProps} template={{
                                size: {
                                    type: "select",
                                    widthLabel: "100px",
                                    title: "size",
                                    items: ['middle', 'small', 'default'],
                                },
                                title: {
                                    type: "string",
                                    widthLabel: "100px",
                                    title: "title"
                                },
                                bordered: {
                                    type: "boolean",
                                    widthLabel: "100px",
                                    title: "bordered"
                                }
                            }}/>
                        </Card>

                        <Card size="small" className="cardEdit">
                            <h3>Actions</h3>

                            <div style={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                alignItems: 'center',
                                marginTop: '8px'
                            }}>
                                <span style={{marginRight: '10px'}}>добавить кнопку:</span>
                                <Switch
                                    checked={isBtnAction}
                                    onChange={() => {
                                        setIsBtnAction(!isBtnAction)
                                    }}
                                    size='small'/>
                            </div>

                            <ItemEdit label="title" item={btnTitle} setItem={setBtnTitle}
                                      type='string'
                                      del={false} nullable={true} labelWidth="90px"/>
                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                <span style={{marginRight:'40px'}}>actions:</span>
                                <div style={{width:'100%'}}>
                                    <ArrayEditor cmp={cmp} list={actions} setList={setActions}/>
                                </div>
                            </div>
                        </Card>

                        <Card className="cardEdit" size="small">
                            <h3>Колонки</h3>
                            <ObjectFixedEditor object={column} setObject={setColumn} template={{
                                xs: {
                                    type: "number",
                                    title: "xs",
                                    widthLabel: "50px"
                                },
                                sm: {
                                    type: "number",
                                    title: "sm",
                                    widthLabel: "50px"
                                },
                                md: {
                                    type: "number",
                                    title: "md",
                                    widthLabel: "50px"
                                },
                                lg: {
                                    type: "number",
                                    title: "lg",
                                    widthLabel: "50px"
                                },
                                xl: {
                                    type: "number",
                                    title: "xl",
                                    widthLabel: "50px"
                                },
                            }}/>
                        </Card>

                        <Card size="small" className="cardEdit">
                            <AddictionContainer setState={setAddiction} cmp={cmp} addictionId={addiction}/>
                        </Card>

                        <Card size="small" className="cardEdit cardEditAcl">
                            <EditAcl item={acl} setItem={setAcl}/>
                        </Card>
                    </Col>

                    <Col span={12}>
                        <EditBlock title="Style">
                            <EditStyle style={style} setStyle={setStyle}/>
                        </EditBlock>

                        <EditBlock title="LabelStyle">
                            <EditStyle style={labelStyle} setStyle={setLabelStyle}/>
                        </EditBlock>

                        <EditBlock title="ContentStyle">
                            <EditStyle style={contentStyle} setStyle={setContentStyle}/>
                        </EditBlock>
                        <EditBlock title="TitleStyle">
                            <EditStyle
                                style={titleStyle}
                                setStyle={setTitleStyle}
                            />
                        </EditBlock>
                        <Card size="small" className="cardEdit">
                            <h3>Anchor</h3>
                            <Input value={anchor && anchor} className="lcEditorInput" onChange={(e) => {
                                setAnchor(e.currentTarget.value)
                            }}/>
                        </Card>
                    </Col>
                </Row>
            </TabPane>

            <TabPane tab="Настройка колонок" key="3">
                <TableColumnsEdit tableColumns={columns} setTableColumns={setColumns} cmp={cmp}/>
            </TabPane>
        </Tabs>


        <ButtonBlock onApply={onApply} onClose={onClose}/>
    </>
};

export default AntDescriptionsEdit;
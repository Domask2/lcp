import React, {useEffect, useState} from 'react';

import {useActions, useTypedSelector} from "../../../hooks";
import {getDataSourceLs, getDataSourcesAll, getMappedText} from "../../../redux/ds/ds.selector";

import ObjectEditor from "../Editor/Elements/ObjectEditor";
import ArrayEditor from "../Editor/Elements/ArrayEditor";
import ButtonBlock from "../Editor/ButtonBlock";
import EditStyle from "../Editor/Components/EditStyle";
import Mapped from "../Mapped";
import EditAcl from "../Editor/Components/EditAcl";
import AddictionContainer from '../../addiction/AddictionContainer';
import ObjectUrlEditor from "../Editor/Elements/ObjectUrlEditor/ObjectUrlEditor";

import {Button, Card, Col, Input, Row, Select, Switch} from "antd";
import {RootState} from "../../../redux/redux.store";
import {IButton} from "../Page/templates";
import ReduxElement from "./ReduxElement";
import {getCurrentProject} from "../../../redux/project/project.selector";

type AntButtonEditType = {
    cmp: IButton,
    setVisible?: (v: boolean) => void
}
const AntButtonEdit: React.FC<AntButtonEditType> = ({
    cmp, setVisible = () => {
    }
}) => {
    const {cmpUpdate} = useActions()
    let model = {...cmp}
    const [actions, setActions] = useState([...model.actions])
    const [props, setProps] = useState({...model.props})
    const [hiddenElement, setHiddenElement] = useState({...model.hiddenElement})
    const [style, setStyle] = useState({...model.style})
    const [caption, setCaption] = useState<string>(model.caption)
    const [ds, setDs] = useState(model?.ds?.includes('selected') ? model?.ds?.split('-')[1] : model?.ds ? model?.ds : '')
    const [acl, setAcl] = useState<string>(model.acl)
    const [addiction, setAddiction] = useState<number | ''>(model.addiction)
    const [checked, setChecked] = useState<boolean>(!!model.checked)
    const [anchor, setAnchor] = useState<string>(model.anchor)
    const [adKey, setAdKey] = useState<any>(model.adKey)
    const [closeModal, setCloseModal] = useState<any>(model.closeModal)
    const [resetInputs, setResetInputs] = useState<any>(model.resetInputs ? model.resetInputs : false)
    const [procedure, setProcedure] = useState(model.procedure)
    const [reduxElement, setReduxElement] = useState(model.reduxElement)
    const [getUrl, setGetUrl] = useState(model.getUrl ? model.getUrl : {baseUrl: '', params: [], random: false, download: false, ajax:false})

    const mappedCaption = useTypedSelector((state: RootState) => getMappedText(state, caption))
    const dsArr = useTypedSelector((state: RootState) => getDataSourcesAll(state));
    const ls: any = useTypedSelector((state: RootState) => getDataSourceLs(state));

    useEffect(() => {
        model.actions = actions
        model.closeModal = closeModal
        model.resetInputs = resetInputs
        model.adKey = adKey
        model.style = style
        model.props = props
        model.hiddenElement = hiddenElement
        model.caption = caption
        model.checked = checked
        model.procedure = procedure
        model.reduxElement = reduxElement
        !checked ? model.ds = ds : model.ds = `selected-${ds}`
        model.acl = acl
        model.addiction = addiction
        model.anchor = anchor
        model.getUrl = getUrl
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [style, props, caption, ds, actions, acl, addiction, anchor, checked, procedure, reduxElement, getUrl, adKey, closeModal, resetInputs, hiddenElement])

    useEffect(() => {
        if (model.ds.includes('selected')) {
            setDs(model.ds.split('-')[1])
        } else {
            setDs(model.ds)
        }
    }, [model.ds, checked])

    const onClose = () => {
        setVisible(false)
    }

    const onApply = () => {
        cmpUpdate(model)
        setVisible(false)
    }

    return <>
        <h3>Редактирование: {cmp.type} - {cmp.key}</h3>
        <br />
        <Row gutter={[16, 16]}>
            <Col span={12} style={{minHeight: '280px'}}>
                <Card size="small" className="cardEdit">
                    <Button style={style} {...props}>
                        <Mapped text={mappedCaption} />
                    </Button>
                </Card>

                <Card size="small" className="cardEdit">
                    <h3>Actions</h3>
                    <ArrayEditor cmp={cmp} list={actions} setList={setActions} />
                    <br />
                    <Switch
                        checked={closeModal}
                        size={'small'}
                        onChange={setCloseModal}
                        style={{marginRight: '10px'}}
                    /> <span style={{marginRight: '20px'}}>Close Modal</span>
                    {closeModal && <>
                        <span>AdKey: </span>
                        <Input style={{width: '50%'}} value={adKey} className="lcEditorInput" onChange={(e) => {
                            setAdKey(e.currentTarget.value)
                        }} />
                    </>}
                    <br />
                    <Switch
                        checked={resetInputs}
                        size={'small'}
                        onChange={setResetInputs}
                        style={{marginRight: '10px'}}
                    /> <span style={{marginRight: '20px'}}>Reset Inputs</span>
                </Card>

                <Card size="small" className="cardEdit">
                    <h3>Procedure Name</h3>
                    <Select
                        style={{
                            width: '100%',
                            borderBottom: '1px solid #eee',
                            backgroundColor: '#fff'
                        }}
                        bordered={false}
                        size="small"
                        onChange={setProcedure}
                        value={procedure}
                    >

                        <Select.Option key={'clear'} value={''}>{'--------'}</Select.Option>)
                        {
                            Object.keys(ls.pp).map((item: any, index: any) =>
                                <Select.Option key={index} value={item}>{item}</Select.Option>)
                        }
                    </Select>
                </Card>

                <ReduxElement reduxElement={reduxElement} setReduxElement={setReduxElement} />

                <Card size="small" className="cardEdit">
                    <h3>Redux Element Hidden Input</h3>
                    <ObjectEditor object={hiddenElement} setObject={setHiddenElement} />
                </Card>

                <Card size="small" className="cardEdit">
                    <h3>DS</h3>
                    <div style={{marginTop: '12px', marginBottom: '12px'}}>
                        <Select
                            style={{
                                width: '100%',
                                borderBottom: '1px solid #eee',
                                backgroundColor: '#fff'
                            }}
                            bordered={false}
                            size="small"
                            defaultValue={ds}
                            onChange={(val: any) => {
                                setDs(val)
                            }}>

                            {
                                Object.keys(dsArr).map((item: any, index: any) =>
                                    <Select.Option key={index} value={item}>{item}</Select.Option>)
                            }

                        </Select>

                        <div style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                            marginTop: '8px'
                        }}>
                            <span style={{marginRight: '10px'}}>selected:</span>
                            <Switch
                                checked={checked}
                                onChange={() => {
                                    setChecked(!checked)
                                }}
                                size='small' />
                        </div>
                    </div>
                </Card>

                <Card size="small" className="cardEdit">
                    <AddictionContainer setState={setAddiction} cmp={cmp} addictionId={addiction} />
                </Card>

                <Card size="small" className="cardEdit cardEditAcl">
                    <EditAcl item={acl} setItem={setAcl} />
                </Card>
            </Col>

            <Col span={12}>
                <Card size="small" className="cardEdit">
                    <h3>Title</h3>
                    <Input value={caption} className="lcEditorInput" onChange={(e) => {
                        setCaption(e.currentTarget.value)
                    }} />

                    <br />
                    <br />

                    <h3>Props</h3>
                    <ObjectEditor object={props} setObject={setProps} />
                </Card>

                <Card size="small" className="cardEdit">
                    <h3>Anchor</h3>
                    <Input value={anchor && anchor} className="lcEditorInput" onChange={(e) => {
                        setAnchor(e.currentTarget.value)
                    }} />
                </Card>

                <Card size="small" className="cardEdit">
                    <h3>Style</h3>
                    <EditStyle style={style} setStyle={setStyle} />
                </Card>

                <Card size='small' className='cardEdit'>
                    <h3>Get URL</h3>
                    <ObjectUrlEditor object={getUrl} setObject={setGetUrl} />
                </Card>
            </Col>
        </Row>

        <ButtonBlock onApply={onApply} onClose={onClose} />
    </>
};

export default AntButtonEdit;
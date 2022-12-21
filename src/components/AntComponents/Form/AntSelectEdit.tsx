import React, {useEffect, useState} from 'react';
import {useActions} from "../../../hooks/useActions";
import {getDataSourcesAll} from '../../../redux/ds/ds.selector';
import {getAppDb} from "../../../redux/app/app.selector";
import {getDsParamArray} from "../../../services/selectEdit";
import {useTypedSelector} from '../../../hooks/useTypedSelector';

import AddictionContainer from '../../addiction/AddictionContainer';
import ObjectFixedEditor from "../Editor/Elements/ObjectFixedEditor";
import ObjectEditor from "../Editor/Elements/ObjectEditor";
import ArrayEditor from "../Editor/Elements/ArrayEditor";
import ButtonBlock from "../Editor/ButtonBlock";
import EditAcl from "../Editor/Components/EditAcl";

import {Card, Col, Row, Switch} from "antd";
import {RootState} from '../../../redux/redux.store';

type AntSelectEditType = {
    cmp: any
    setVisible?: (v: boolean) => void
}
const AntSelectEdit: React.FC<AntSelectEditType> = ({
                                                        cmp, setVisible = () => {
    }
                                                    }) => {
    const {cmpUpdate} = useActions()
    const dsArr = useTypedSelector((state: RootState) => getDataSourcesAll(state))
    const dsApp = useTypedSelector((state: RootState) => getAppDb(state))

    let model = {...cmp}
    const [style, setStyle] = useState({...model.style})
    const [ds, setDs] = useState({...model.ds})
    const [item, setItem] = useState({...model.item})
    const [acl, setAcl] = useState(model.acl)
    const [actions, setActions] = useState(model.actions)
    const [addiction, setAddiction] = useState<number | ''>(model.addiction ? model.addiction : '')
    const [textClear, setTextClear] = useState(model.textClear)
    const [checked, setChecked] = useState<boolean>(!!model.isClear)
    let arrayParamDs = getDsParamArray(ds, dsArr, dsApp)

    useEffect(() => {
        model.style = style
        model.ds = ds
        model.item = item
        model.actions = actions
        model.acl = acl
        model.addiction = addiction
        model.isClear = checked
        model.textClear = textClear

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ds, style, item, acl, actions, addiction, checked, textClear])

    const onClose = () => {
        setVisible(false)
    }

    const onApply = () => {
        cmpUpdate(model)
        setVisible(false)
    }

    return <>
        <h3>Редактирование: {cmp.type} - {cmp.key}</h3>
        <br/>
        <Row gutter={[16, 16]}>
            <Col span={12}>
                <Card size="small" title="Style" className="cardEdit">
                    <ObjectEditor object={style} setObject={setStyle} autoCss={true}/>
                </Card>

                <Card size="small" className="cardEdit">
                    <AddictionContainer setState={setAddiction} cmp={cmp} addictionId={addiction}/>
                </Card>

                <Card size="small" className="cardEdit cardEditAcl">
                    <EditAcl item={acl} setItem={setAcl}/>
                </Card>
            </Col>

            <Col span={12}>
                <Card size="small" className="cardEdit">
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
                    <ObjectFixedEditor object={item}
                                       setObject={setItem}
                                       template={
                                           {
                                               key: {
                                                   type: 'select',
                                                   title: 'ключ записи',
                                                   widthLabel: '120px',
                                                   filter: true,
                                                   items: arrayParamDs.length > 0 ? arrayParamDs : []
                                               },
                                               val: {
                                                   type: 'select',
                                                   title: 'значение записи',
                                                   widthLabel: '120px',
                                                   filter: true,
                                                   items: arrayParamDs.length > 0 ? arrayParamDs : []
                                               },
                                           }
                                       }/>

                </Card>

                <Card className="cardEdit" size="small" title="Actions">
                    <ArrayEditor cmp={cmp} list={actions} setList={setActions}/>
                </Card>

                <Card size="small" className="cardEdit">

                    <ObjectFixedEditor object={textClear}
                                       setObject={setTextClear}
                                       template={
                                           {
                                               key: {
                                                   type: 'string',
                                                   title: 'техт для очистки',
                                                   widthLabel: '120px'
                                               },
                                           }
                                       }/>

                    <div style={{marginTop: '12px', marginBottom: '12px'}}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                            marginTop: '8px'
                        }}>
                            <span style={{marginRight: '10px'}}>добавить очистить поиск</span>
                            <Switch
                                checked={checked}
                                onChange={() => {
                                    setChecked(!checked)
                                }}
                                size='small'/>
                        </div>
                    </div>
                </Card>
            </Col>
        </Row>

        <ButtonBlock onApply={onApply} onClose={onClose}/>
    </>
};

export default AntSelectEdit;
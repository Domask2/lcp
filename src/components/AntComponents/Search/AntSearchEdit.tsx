import React, {useEffect, useState} from 'react';
import {Card, Col, Input, Row} from "antd";
import {useActions} from "../../../hooks/useActions";
import ButtonBlock from "../Editor/ButtonBlock";
import ItemEdit from "../Editor/Elements/ItemEdit";
import EditBlock from "../Editor/Components/EditBlock";
import EditStyle from "../Editor/Components/EditStyle";
import EditAcl from "../Editor/Components/EditAcl";
import AddictionContainer from '../../addiction/AddictionContainer';
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {RootState} from "../../../redux/redux.store";
import {getDataSourcesAll} from "../../../redux/ds/ds.selector";
import {ISearchComponent} from '../Page/templates';

type SearchEditType = {
    cmp: ISearchComponent,
    setVisible?: (v: boolean) => void
}
const AntSearchEdit: React.FC<SearchEditType> = ({cmp, setVisible = () => { }}) => {
    const {cmpUpdate} = useActions()
    const dsArr = useTypedSelector((state: RootState) => getDataSourcesAll(state));

    let model = {...cmp}
    const [style, setStyle] = useState({...model.style})
    const [styleInput, setStyleInput] = useState({...model.inputsStyle})
    const [caption, setCaption] = useState<string>(model.caption)
    const [ds, setDs] = useState(model.searchObj.ds)
    const [prefix, setPrefix] = useState<string>(model.searchObj.prefix)
    const [acl, setAcl] = useState(model.acl)
    const [addiction, setAddiction] = useState(model.addiction && model.addiction)
    const [anchor, setAnchor] = useState<string>(model.anchor ? model.anchor : '');

    useEffect(() => {
        model.style = style
        model.searchObj.ds = ds
        model.caption = caption
        model.acl = acl
        model.addiction = addiction
        model.searchObj.prefix = prefix
        model.inputsStyle = styleInput
        model.anchor = anchor

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [style, ds, acl, addiction, caption, prefix, styleInput, anchor])

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
            <Col span={12}>

                <Card className="cardEdit" size="small">
                    <ItemEdit label="Ds" item={ds ? ds : ''} setItem={setDs}
                        type='select'
                        selectItems={Object.keys(dsArr)}
                        del={false}
                        labelWidth="90px" />
                    <ItemEdit label="Prefix" item={prefix ? prefix : ''} setItem={setPrefix}
                        type='string'
                        del={false}
                        labelWidth="90px" />
                </Card>

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
                <Card size="small" className="cardEdit">
                    <h3>Title</h3>
                    <Input value={caption} className="lcEditorInput" onChange={(e) => {
                        setCaption(e.currentTarget.value)
                    }} />
                </Card>

                <EditBlock title="Style">
                    <EditStyle style={style} setStyle={setStyle} />
                </EditBlock>

                <EditBlock title="Style Input">
                    <EditStyle style={styleInput} setStyle={setStyleInput} />
                </EditBlock>
            </Col>
        </Row>

        <ButtonBlock onApply={onApply} onClose={onClose} />
    </>
};

export default AntSearchEdit;
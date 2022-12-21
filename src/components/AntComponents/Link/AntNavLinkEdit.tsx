import React, {useEffect, useState} from 'react';
import {useActions} from "../../../hooks/useActions";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {RootState} from "../../../redux/redux.store";
import {getMappedText} from "../../../redux/ds/ds.selector";
import {Card, Col, Row, Switch} from "antd";
import EditBlock from "../Editor/Components/EditBlock";
import EditStyle from "../Editor/Components/EditStyle";
import ButtonBlock from "../Editor/ButtonBlock";
import {NavLink} from "react-router-dom";
import ItemEdit from "../Editor/Elements/ItemEdit";
import Mapped from "../Mapped";
import EditAcl from "../Editor/Components/EditAcl";
import AddictionContainer from '../../addiction/AddictionContainer';

type AntNavLinkEditType = {
    cmp: any,
    setVisible?: (v: boolean) => void
}
const AntNavLinkEdit: React.FC<AntNavLinkEditType> = ({
    cmp, setVisible = () => {
    }
}) => {
    const {cmpUpdate} = useActions()
    let model = {...cmp}

    const [style, setStyle] = useState({...model.style})
    const [url, setUrl] = useState<string>(model.url)
    const [text, setText] = useState<string>(model.text)
    const [target, setTarget] = useState<boolean>(!!model.target)
    const [acl, setAcl] = useState<string>(model.acl)
    const [addiction, setAddiction] = useState<number | ''>(model.addiction ? model.addiction : '')

    const mappedText = useTypedSelector((state: RootState) => getMappedText(state, text))
    const mappedUrl = useTypedSelector((state: RootState) => getMappedText(state, url))

    useEffect(() => {
        model.style = style
        model.url = url
        model.text = text
        model.target = target
        model.acl = acl
        model.addiction = addiction

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [style, text, target, url, acl, addiction])

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
                    <NavLink style={style} to={mappedUrl ? mappedUrl : '/'}>
                        <Mapped text={mappedText} />
                    </NavLink>
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
                    <ItemEdit label="text" item={text} setItem={setText} del={false} nullable={true} type={"string"} />
                    <ItemEdit label="url" item={url} setItem={setUrl} del={false} nullable={true} type={"string"} />
                    <div style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        marginTop: '8px'
                    }}>
                        <span style={{marginRight: '10px'}}>target:</span>
                        <Switch
                            checked={target}
                            onChange={() => {
                                setTarget(!target)
                            }}
                            size='small' />
                    </div>
                </Card>

                <EditBlock title="Style">
                    <EditStyle style={style} setStyle={setStyle} />
                </EditBlock>
            </Col>
        </Row>

        <ButtonBlock onApply={onApply} onClose={onClose} />
    </>
};

export default AntNavLinkEdit;
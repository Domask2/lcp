import React, {useEffect, useState} from 'react';
import {useTypedSelector, useActions, useKeyPress} from "../../../hooks";
import {getMappedText} from "../../../redux/ds/ds.selector";

import ButtonBlock from "../Editor/ButtonBlock";
import EditBlock from "../Editor/Components/EditBlock";
import EditStyle from "../Editor/Components/EditStyle";
import EditAcl from "../Editor/Components/EditAcl";
import AddictionContainer from '../../addiction/AddictionContainer';

import DOMPurify from 'dompurify';
import {CKEditor} from '@ckeditor/ckeditor5-react';
import UserEditor from 'ckeditor5-lcp';

import {Card, Col, Input, Row} from "antd";
import {RootState} from "../../../redux/redux.store";
import ObjectEditor from "../Editor/Elements/ObjectEditor";

type AndTextEditType = {
    cmp: any,
    setVisible?: (v: boolean) => void
}
const AntTextEdit: React.FC<AndTextEditType> = ({cmp, setVisible = () => {}}) => {
    const {cmpUpdate} = useActions()
    let model = {...cmp}

    const [props, setProps] = useState({...model.props})
    const [style, setStyle] = useState({...model.style})
    const [text, setText] = useState<any>(model.text)
    const [acl, setAcl] = useState(model.acl)
    const [addiction, setAddiction] = useState<number | ''>(model.addiction ? model.addiction : '')
    const [anchor, setAnchor] = useState<string>(model.anchor);
    const mappedConvertedText = useTypedSelector((state: RootState) => getMappedText(state, text))
    const arrayDepends = [style, text, props, acl, addiction, anchor];
    useKeyPress(["altLeft", 'KeyS'], () => { cmpUpdate(model);setVisible(false) }, arrayDepends)

    useEffect(() => {
        model.style = style
        model.text = text
        model.props = props
        model.acl = acl
        model.addiction = addiction
        model.anchor = anchor

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, arrayDepends)

    useEffect(() => {
        if (model.text) {
            setText(model.text)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onClose = () => {
        setVisible(false)
    }

    const onApply = () => {
        cmpUpdate(model)
        setVisible(false)
    }

    const createMarkup = (html: any) => {
        return {
            __html: DOMPurify.sanitize(html)
        }
    }

    return <>
        <h3>Редактирование: {cmp.type} - {cmp.key}</h3>
        <br/>
        <Row gutter={[16, 16]}>
            <Col span={12} style={{minHeight: '280px'}}>
                <Card size="small" className="cardEdit">
                    <AddictionContainer setState={setAddiction} cmp={cmp} addictionId={addiction}/>
                </Card>

                <Card size="small" className="cardEdit cardEditAcl">
                    <EditAcl item={acl} setItem={setAcl}/>
                </Card>

                <Card size="small" className="cardEdit">
                    <h3>Anchor</h3>
                    <Input value={anchor && anchor} className="lcEditorInput" onChange={(e) => {
                        setAnchor(e.currentTarget.value)
                    }}/>
                </Card>
            </Col>

            <Col span={12}>
                <EditBlock title="Style">
                    <EditStyle style={style} setStyle={setStyle}/>
                </EditBlock>

                <EditBlock title="Props">
                    <ObjectEditor object={props} setObject={setProps}/>
                </EditBlock>
            </Col>

            <Col span={24}>
                <Card className="cardEdit" size="small">
                    <h4>Пример</h4>
                    <Card style={{marginTop: '20px'}}>
                        <div className="preview ck-content"
                             dangerouslySetInnerHTML={createMarkup(mappedConvertedText)}/>
                    </Card>
                </Card>

                <Card className="cardEdit" size="small">
                    <h4>Text</h4>

                    <CKEditor
                        editor={UserEditor}
                        data={text}
                        onReady={() => {}}
                        onChange={(event: any, editor: any) => {
                            const data = editor.getData();
                            setText(data)
                        }}

                    />
                </Card>
            </Col>
        </Row>

        <ButtonBlock onApply={onApply} onClose={onClose}/>
    </>
};

export default AntTextEdit;
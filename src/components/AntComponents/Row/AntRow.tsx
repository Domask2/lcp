import React, {useState} from "react";
import {useActions} from "../../../hooks/useActions";

import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {getCurrentPage} from "../../../redux/project/project.selector";
import {getEditMode} from "../../../redux/app/app.selector";

import Master from "../Master";
import Editor from "../Editor/Editor";
import {Button, Row} from "antd";

import {getRowAdd} from "../../../services/antRowServices";
import {setRandomKey} from "../../../services/setRandomKey";

import {ComponentInterface, templates} from "../Page/templates";
import {RootState} from "../../../redux/redux.store";
import ScrollableAnchor from "react-scrollable-anchor";

const AntRow = ({cmp, props}: any) => {
    const {cmpAddRow} = useActions();
    const editMode = useTypedSelector((state: RootState) => getEditMode(state))
    const page = useTypedSelector((state: RootState) => getCurrentPage(state))
    let editModeRowElements = getRowAdd(page!, cmp)

    const [style, setStyle] = useState(editMode ?
        {...cmp.style, border: '3px dashed transparent', marginLeft: 0, marginRight: 0} :
        cmp.style)

    const onMouseOver = () => {
        setStyle({...cmp.style, border: '3px dashed #62a9ff', marginLeft: 0, marginRight: 0})
    }
    const onMouseOut = () => {
        setStyle({...cmp.style, border: '3px dashed transparent', marginLeft: 0, marginRight: 0})
    }

    const onAddCmp = (templateCmp: ComponentInterface) => {
        let newCmp = JSON.parse(JSON.stringify(templateCmp))
        delete newCmp.editor
        setRandomKey(newCmp, cmp.page_key)
        if (page) {
            cmpAddRow(page, newCmp)
        }
    }
    if (cmp.children === undefined)
        return <></>

    return <div style={{position: 'relative'}}>
        {cmp.anchor && <ScrollableAnchor id={`${cmp.anchor}`}>
            <span/>
        </ScrollableAnchor>}
        <Editor cmp={cmp} rowStyle={{height: '100%', left: '-3px',padding: '0px 3px 1px', width:'0', writingMode:'vertical-rl', background: '#40a9ff'}}
                onMouseOut={onMouseOut}
                onMouseOver={onMouseOver}
                direction='left'
                testEditorStyle={true}
                height='20px'
        />
        <Row {...cmp.props} style={{marginLeft: '0px', marginRight: '0px', ...style}}>
            {cmp.children.map((item: ComponentInterface) =>
                <Master key={item.key} cmp={{...item, page_key: cmp.page_key, ext: cmp.ext}} props={props} />)}
        </Row>
        {editMode && editModeRowElements && <Button onClick={() => onAddCmp(templates['Row'])}>Добавить Row</Button>}
    </div>
}

export default AntRow
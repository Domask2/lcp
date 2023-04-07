import {Col} from "antd";
import React, {useState} from "react";
import Master from "../Master";
import {ICol, ComponentInterface} from "../Page/templates";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {RootState} from "../../../redux/redux.store";
import {getEditMode} from "../../../redux/app/app.selector";
import Editor from "../Editor/Editor";
import ScrollableAnchor from "react-scrollable-anchor";

type AntColType = {
    cmp: ICol
    props: any
}
const AntCol = ({cmp, props}: AntColType) => {
    const editMode = useTypedSelector((state: RootState) => getEditMode(state))
    const [style, setStyle] = useState(editMode ?
        {...cmp.style, border: '3px dashed transparent'} :
        cmp.style)

    const onMouseOver = () => {
        setStyle({...cmp.style, border: '3px dashed #6fbd00'})
    }
    const onMouseOut = () => {
        setStyle({...cmp.style, border: '3px dashed transparent'})
    }

    return <>
        <Col {...cmp.props} style={style}>
            {cmp.anchor && <ScrollableAnchor id={`${cmp.anchor}`}>
                <span></span>
            </ScrollableAnchor>}

            <Editor cmp={cmp}
                    onMouseOut={onMouseOut}
                    onMouseOver={onMouseOver}
            />
            {cmp.children.map((item: ComponentInterface) =>
                <Master key={item.key} cmp={{...item, page_key: cmp.page_key, ext: cmp.ext}} props={props} />)}
        </Col>
    </>
}

export default AntCol
import React from "react";
import {Divider} from "antd";
import {IDivider} from "../Page/templates";
import Editor from "../Editor/Editor";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {RootState} from "../../../redux/redux.store";
import {getEditMode} from "../../../redux/app/app.selector";
import ScrollableAnchor from "react-scrollable-anchor";
import {getMappedText} from "../../../redux/ds/ds.selector";
import Mapped from "../Mapped";

type AntDividerType = {
    cmp: IDivider
}
const AntDivider = ({cmp}: AntDividerType): any => {
    const editMode = useTypedSelector((state: RootState) => getEditMode(state))
    const textVariant = cmp.caption ? cmp.caption : cmp.text
    let text: any = textVariant === undefined || textVariant === null ? false : textVariant
    const mappedCaption = useTypedSelector((state: RootState) => getMappedText(state, textVariant ? textVariant : ''))

    if (editMode)
        text = <>{<Mapped text={mappedCaption} />}</>

    return <>
        {cmp.anchor && <ScrollableAnchor id={`${cmp.anchor}`}>
            <span></span>
        </ScrollableAnchor>}
        <Editor cmp={cmp} />
        <Divider style={cmp.style} children={text} />
    </>
}

export default AntDivider
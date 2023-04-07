import React from "react";
import {useTypedSelector} from "../../../hooks";
import {getMappedText} from "../../../redux/ds/ds.selector";

import Editor from "../Editor/Editor";
// import DOMPurify from "dompurify";
import ScrollableAnchor from "react-scrollable-anchor";

import {RootState} from "../../../redux/redux.store";
import {IText} from "../Page/templates";

type AntTextType = {
    cmp: IText
}

const AntText = ({cmp}: AntTextType): any => {
    const mappedText = useTypedSelector((state: RootState) => getMappedText(state, cmp.text!))

    // const createMarkup = (html: any) => {
    //     DOMPurify.setConfig({ADD_ATTR: ['target']});
    //     return {
    //         __html: DOMPurify.sanitize(html)
    //     }
    // }

    return <div style={{position:'relative'}}>
        {cmp.anchor && <ScrollableAnchor id={`${cmp.anchor}`}>
            <span></span>
        </ScrollableAnchor>}
        <Editor cmp={cmp} direction='left' testEditorStyle={true} height='25px' />
        {/*<div className="preview" style={cmp.style} dangerouslySetInnerHTML={createMarkup(mappedText)} />*/}
        <div style={cmp.style} className="preview ck-content" dangerouslySetInnerHTML={{__html: mappedText}} />

    </div>

}

export default AntText
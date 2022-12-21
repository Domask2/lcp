import React from "react";

import Editor from "../Editor/Editor";
import ScrollableAnchor from "react-scrollable-anchor";

const TestComponent = ({cmp, props}: any) => {

    return <>
        {cmp.anchor && <ScrollableAnchor id={`${cmp.anchor}`}>
            <span></span>
        </ScrollableAnchor>}
        <Editor cmp={cmp} />
        <br />
        <p>{cmp.caption}</p>
        <br />
    </>
}

export default TestComponent
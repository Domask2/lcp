import React from "react";
import {Image} from 'antd';
import {IImage} from "../Page/templates";
import Editor from "../Editor/Editor";
import ScrollableAnchor from "react-scrollable-anchor";

type AntImageType = {
    cmp: IImage
}
const AntImage: React.FC<AntImageType> = ({cmp}) => {

    return <div style={{display: 'inline-block', ...cmp.style}}>
        {cmp.anchor && <ScrollableAnchor id={`${cmp.anchor}`}>
            <span></span>
        </ScrollableAnchor>}

        <Editor cmp={cmp} />
        <Image {...cmp.props} width={(cmp.props.width && +cmp.props.width) ? +cmp.props.width : 'auto'} height={(cmp.props.height && +cmp.props.height) ? +cmp.props.height : 'auto'} />
    </div>
}

export default AntImage
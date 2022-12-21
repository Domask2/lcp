import {Card} from "antd";
import React from "react";
import Master from "../Master";
import {ICard, ComponentInterface} from "../Page/templates";
import Editor from "../Editor/Editor";
import ScrollableAnchor from "react-scrollable-anchor";
import {useTypedSelector} from "../../../hooks";
import {RootState} from "../../../redux/redux.store";
import {getMappedText} from "../../../redux/ds/ds.selector";
import Mapped from "../Mapped";

type AntCardType = {
    cmp: ICard
    props: any
}
const AntCard = ({cmp, props}: AntCardType) => {
    const className = cmp.className !== undefined ? cmp.className : ''
    const mappedCaption = useTypedSelector((state: RootState) => getMappedText(state, cmp.caption!))
    const mappedTitle = useTypedSelector((state: RootState) => getMappedText(state, cmp.title!))

    return <>
        <Editor style={{marginTop: '5px'}} cmp={cmp} />

        <Card {...cmp.props}
            bodyStyle={cmp.bodyStyle}
            headStyle={cmp.headStyle}
            style={cmp.style}
            className={className}
            title={cmp.caption || cmp.title ? <Mapped text={mappedCaption || mappedTitle} /> : false} >
            {cmp.anchor && <ScrollableAnchor id={`${cmp.anchor}`}>
                <span></span>
            </ScrollableAnchor>}

            {cmp.children.map((item: ComponentInterface) =>
                <Master key={item.key} cmp={{...item, page_key: cmp.page_key, ext: cmp.ext}} props={props} />)}
        </Card>
    </>
}

export default AntCard
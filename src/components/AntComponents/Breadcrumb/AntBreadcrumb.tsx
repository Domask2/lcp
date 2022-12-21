import React from "react";
import {Link} from "react-router-dom";
import {useTypedSelector} from "../../../hooks";

import Editor from "../Editor/Editor";
import Mapped from "../Mapped";

import {Breadcrumb} from "antd";
import ScrollableAnchor from "react-scrollable-anchor";
import {IBreadcrumb} from "../Page/templates";
import {RootState} from "../../../redux/redux.store";
import {mappedText} from "../../../services/myService";

type antBreadcrumbType = {
    cmp: IBreadcrumb
    props: any
}

const AntBreadcrumb: React.FC<antBreadcrumbType> = ({cmp, props}) => {
    const rootState = useTypedSelector((state: RootState) => state)
    let cmp_details = {...cmp}

    for (let paramsKey in props.match?.params) {
        cmp_details.title = cmp_details.title.replace
            (":" + paramsKey, props.match?.params[paramsKey])
    }

    return <>
        {cmp.anchor && <ScrollableAnchor id={`${cmp.anchor}`}>
            <span>''</span>
        </ScrollableAnchor>}
        <Editor cmp={cmp} />
        <Breadcrumb style={cmp.style}>
            {cmp_details.items.map((item) => <Breadcrumb.Item key={item.route}>
                <Link to={mappedText(rootState, item.route)}>
                    <Mapped text={mappedText(rootState, item.title)} /></Link>
            </Breadcrumb.Item>
            )}
            <Breadcrumb.Item key='this_page'><Mapped text={mappedText(rootState, cmp.title)} /></Breadcrumb.Item>
        </Breadcrumb>
    </>
}

export default AntBreadcrumb
import React, {memo} from "react";
import {Breadcrumb} from 'antd';
import Mapped from "../../Mapped";
import {NavLink} from "react-router-dom";
import {mappedText} from "../../../../services/myService";
import {useTypedSelector} from "../../../../hooks";
import {RootState} from "../../../../redux/redux.store";

type AntInputType = {
    props: any
}

const BreadcrumbPreviewElement: React.FC<AntInputType> = ({props}) => {

    const rootState = useTypedSelector((state: RootState) => state)

    return <Breadcrumb style={props.value.style}>
        {props.value.items.map((item: any) => <Breadcrumb.Item key={item.route}>
            <NavLink
                to={mappedText(rootState, item.route)}>
                <Mapped text={mappedText(rootState, item.title)} /></NavLink>
        </Breadcrumb.Item>)}
        <Breadcrumb.Item key='this_page'><Mapped text={mappedText(rootState, props.value.title)} /></Breadcrumb.Item>
    </Breadcrumb>
}

export default memo(BreadcrumbPreviewElement)
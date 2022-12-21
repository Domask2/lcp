import React, {memo} from "react";
import Mapped from "../../Mapped";
import {NavLink} from "react-router-dom";
import {useTypedSelector} from "../../../../hooks";
import {RootState} from "../../../../redux/redux.store";
import {getMappedText} from "../../../../redux/ds/ds.selector";

type AntInputType = {
    props: any
}

const NavLinkPreviewElement: React.FC<AntInputType> = ({props}) => {

    const mappedText = useTypedSelector((state: RootState) => getMappedText(state, props.value.text))
    const mappedUrl = useTypedSelector((state: RootState) => getMappedText(state, props.value.url))

    return (
        <NavLink style={props.value.style} to={mappedUrl ? mappedUrl : '/'}>
            <Mapped text={mappedText} />
        </NavLink>
    )
}

export default memo(NavLinkPreviewElement)
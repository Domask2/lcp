import React from 'react';
import {useActions} from "../../../hooks/useActions";
import {IButton} from "../Page/templates";
import {Button} from "antd";
import {useParams} from "react-router-dom";

type antButtonType = { cmp: IButton }
const AntButtonActions = ({cmp}: antButtonType) => {
    const {executeFnc} = useActions()
    const params:any = useParams();

    let param = cmp.param === undefined ? '' : cmp.param
    let arrParam = param.toString().split(':')
    switch (arrParam[0]) {
        /** значение находится в параметрах страницы. */
        case 'params':
            param = params[arrParam[1]]
    }

    const handleButtonClick = () => {
        cmp.actions?.forEach((a:any) => {
            let aArr = a.actionName.split(':')
            switch (aArr[0]) {
                case 'fnc':
                    executeFnc(aArr[1], param)
                    break
            }
        })
    }

    return <Button size={"small"} {...cmp.props} style={cmp.style} onClick={handleButtonClick}>{cmp.caption}</Button>
};

export default AntButtonActions;
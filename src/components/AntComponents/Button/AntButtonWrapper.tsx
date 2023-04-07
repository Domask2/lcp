import {Button, Popconfirm, Tooltip} from "antd";
import {IButton} from "../Page/templates";
import React from "react";
import AntButtonConfirm from "./AntButtonConfirm";
import Mapped from "../Mapped";
import AntButtonTooltip from "./AntButtonTooltip";
import AntButtonConfirmTooltip from "./AntButtonConfirmTooltip";

type IButtonType = {
    cmp: IButton
    action: (a?: any) => void
    disabled: boolean
    mappedText: string
    confirm?: {
        title: string,
        okText: string,
        cancelText: string,
    }
}

export const AntButtonWrapper = ({cmp, action, disabled, mappedText, confirm}: IButtonType) => {
    let button = <Button
        {...cmp.props}
        danger={cmp.danger}
        style={cmp.style}
        onClick={action}
        className={cmp.className}
        disabled={disabled}
    ><Mapped text={mappedText}/>
    </Button>

    if (cmp.confirm && !cmp.tooltip) {
        button = <AntButtonConfirm cmp={cmp} action={action} disabled={disabled} mappedText={mappedText} confirm={confirm}/>
    }

    if (!cmp.confirm && cmp.tooltip) {
        button = <AntButtonTooltip cmp={cmp} action={action} disabled={disabled} mappedText={mappedText} confirm={confirm}/>
    }

    if (cmp.confirm && cmp.tooltip) {
        button = <AntButtonConfirmTooltip cmp={cmp} action={action} disabled={disabled} mappedText={mappedText} confirm={confirm}/>
    }

    return button
}

export default AntButtonWrapper

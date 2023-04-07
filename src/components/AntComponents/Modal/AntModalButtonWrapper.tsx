import {Button, Tooltip} from "antd";
import {IModal} from "../Page/templates";
import React from "react";
import Mapped from "../Mapped";

type IButtonType = {
    cmp: IModal
    action: (a?: any) => void
    button_title: string
}

export const AntModalButtonWrapper = ({cmp, action, button_title}: IButtonType) => {
    let button = <Button
        danger={cmp.danger}
        type ={cmp.button.type}
        className={cmp.button.className}
        style={cmp.buttonStyle}
        onClick={action}>
        <Mapped text={button_title} />
    </Button>

    if (cmp.tooltip) {
        button = <Tooltip
            overlayInnerStyle={cmp.tooltipOverlayInnerStyle}
            color={cmp.tooltipColor}
            placement={cmp.tooltipPlacement ?? 'top'}
            title={cmp.tooltipTitle ?? ''}
        >
            <Button
                danger={cmp.danger}
                type ={cmp.button.type}
                className={cmp.button.className}
                style={cmp.buttonStyle}
                onClick={action}>
                <Mapped text={button_title} />
            </Button>
        </Tooltip>
    }

    return button
}

export default AntModalButtonWrapper

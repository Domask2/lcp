import {Button, Popconfirm, Tooltip} from "antd";
import Mapped from "../Mapped";
import {IButton} from "../Page/templates";

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

const confirmDefault = {
    title: 'Подтвердите действие',
    okText: 'Подтверждаю',
    cancelText: 'Отменить'
}

export const AntButtonConfirmTooltip = ({cmp, action, disabled, mappedText, confirm = confirmDefault}: IButtonType) => {
    return <div style={cmp.confirmStyle}>
        <Popconfirm
            placement="left"
            title={confirm.title}
            onConfirm={action} okText={confirm.okText} cancelText={confirm.cancelText}>
            <Tooltip
                overlayInnerStyle={cmp.tooltipOverlayInnerStyle}
                color={cmp.tooltipColor}
                placement={cmp.tooltipPlacement ?? 'top'}
                title={cmp.tooltipTitle ?? ''}
            >
                <Button
                    {...cmp.props}
                    danger={cmp.danger}
                    style={cmp.style}
                    className={cmp.className}
                    disabled={disabled}
                >
                    <Mapped text={mappedText}/>
                </Button>&nbsp;
            </Tooltip>
        </Popconfirm>
    </div>
}

export default AntButtonConfirmTooltip

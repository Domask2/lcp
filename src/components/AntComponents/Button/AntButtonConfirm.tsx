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

export const AntButtonConfirm = ({cmp, action, disabled, mappedText, confirm = confirmDefault}: IButtonType) => {
    return (
        <div style={cmp.confirmStyle}>
            <Popconfirm
                placement="left"
                title={confirm.title}
                onConfirm={action} okText={confirm.okText} cancelText={confirm.cancelText}>
                <Button
                    {...cmp.props}
                    danger={cmp.danger}
                    style={cmp.style}
                    className={cmp.className}
                    disabled={disabled}
                >
                    <Mapped text={mappedText}/>
                </Button>&nbsp;
            </Popconfirm>
        </div>
    )
}

export default AntButtonConfirm

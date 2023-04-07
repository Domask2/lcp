import {Button, Popconfirm} from "antd";
import Mapped from "../AntComponents/Mapped";
import {IButton} from "../AntComponents/Page/templates";
import Editor from "../AntComponents/Editor/Editor";

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
    return cmp.confirm ? (
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
    ) : (
        <>
            <Button
                {...cmp.props}
                danger={cmp.danger}
                style={cmp.style}
                onClick={action}
                className={cmp.className}
                disabled={disabled}
            ><Mapped text={mappedText}/>
            </Button>&nbsp;
        </>
    )
}

export default AntButtonConfirm

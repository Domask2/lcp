export const InputsType = {
    INPUT: 'Input',
    SELECT: 'Select',
    ADDICTION: 'addiction',
    STYLE: 'style'
}
export const SelectMode = {
    MULTI: 'multiple',
    TAGS: 'tags'
}

const SettingKeys = {
    Standart: {
        ANCHOR: 'anchor',
        ACL: 'acl',
        CAPTION: 'caption',
        ADDICTION: 'addiction',
    },
    Styles: {
        STYLE: 'style',
        BODY_STYLE: 'bodyStyle',
        HEAD_STYLE: 'headStyle',
        INPUTS_STYLE: 'inputsStyle',
        INPUT_WIDTH: 'inputWidth',
        MASK_STYLE: 'maskStyle',
        // BAR_COLOR: 'style',
        LABEL_STYLE: 'labelStyle',
        CONTENT_STYLE: 'contentStyle',
        TITLE_STYLE: 'titleStyle',
    }
}

const StandartSettings = [
    {
        key: SettingKeys.Standart.ADDICTION,
        startValue: [],
        inputsType: {
            type: InputsType.ADDICTION,
        },
    },
    {
        title: 'Заголовок',
        key: SettingKeys.Standart.CAPTION,
        startValue: '',
        inputsType: {
            type: InputsType.INPUT,
        }
    },
    {
        title: 'Якорная ссылка',
        hoverText: "Якорная ссылка",
        key: SettingKeys.Standart.ANCHOR,
        startValue: '',
        inputsType: {
            type: InputsType.INPUT,
        }
    },
    {
        title: 'Ограничение по ролям',
        hoverText: "Роли пользователей, которые видят компонент.",
        key: SettingKeys.Standart.ACL,
        startValue: [],
        inputsType: {
            type: InputsType.SELECT,
            mode: SelectMode.MULTI
        }
    }
]
const InputsTypeStyle = {
    inputsType: {
        type: InputsType.STYLE,
    }
}
const StyleSettings = [
    {
        key: SettingKeys.Styles.STYLE,
        ...InputsTypeStyle,
    },
    {
        key: SettingKeys.Styles.BODY_STYLE,
        ...InputsTypeStyle,
    },
    {
        key: SettingKeys.Styles.HEAD_STYLE,
        ...InputsTypeStyle,
    },
    {
        key: SettingKeys.Styles.INPUTS_STYLE,
        ...InputsTypeStyle,
    },
    {
        key: SettingKeys.Styles.INPUT_WIDTH,
        ...InputsTypeStyle,
    },
    {
        key: SettingKeys.Styles.MASK_STYLE,
        ...InputsTypeStyle,
    },
    {
        key: SettingKeys.Styles.LABEL_STYLE,
        ...InputsTypeStyle,
    },
    {
        key: SettingKeys.Styles.CONTENT_STYLE,
        ...InputsTypeStyle,
    },
    {
        key: SettingKeys.Styles.TITLE_STYLE,
        ...InputsTypeStyle,
    },
]


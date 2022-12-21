import React, {useEffect, useState} from 'react';
import {useActions} from "../../../hooks/useActions";
import {locale} from "../Page/jsoninput_locale";
import JSONInput from "react-json-editor-ajrm";
import {Button} from "antd";

type AntTabsType = {
    cmp: any,
    setVisible?: (v: boolean) => void
}
const AntTemplateEdit: React.FC<AntTabsType> = ({
                                                    cmp, setVisible = () => {
    }
                                                }) => {
    const {cmpUpdate} = useActions()
    let model = {...cmp, props: {...cmp.props}}

    const [style, setStyle] = useState({...model.style})

    useEffect(() => {
        model.style = style
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [style])

    const onBlur = (e: any) => {
        setStyle({...e.jsObject})
    }

    const onClose = () => {
        setVisible(false)
    }

    const onApply = () => {
        cmpUpdate(model)
        setVisible(false)
    }

    return <>
        <JSONInput onKeyPressUpdate="false"
                   height='130px'
                   onBlur={onBlur}
                   width="100%"
                   id='JSONInput'
                   placeholder={style}
                   locale={locale}/>

        <Button className="lcButtonLc" onClick={onApply}>Применить</Button>

        <Button type="default" style={{margin: '0 10px'}} onClick={onClose}>Закрыть</Button>
    </>
};

export default AntTemplateEdit;
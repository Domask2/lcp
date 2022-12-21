import React, {memo} from "react";
import {ComponentsType} from "../../../../editorUtils/editorDictionaries";
import ArrayObjectsEditor from "../../Editor/Elements/ArrayObjectsEditor";
import ColSettingsElement from "./ColSettingsElement";
import RowSettingsElement from "./RowSettingsElement";
import TabsSettingsElement from "./TabsSettingsElement";
import TextSettingsElement from "./TextSettingsElement";

type EditorUniqSwitchType = {
    props: any
    setValue: any
    value: any
}

const EditorUniqSwitch: React.FC<EditorUniqSwitchType> = ({props, setValue, value}) => {

    const renderPreview = () => {
        switch (props.value.type) {
            case ComponentsType.ROW:
                return <RowSettingsElement
                    setValue={setValue}
                    value={value}
                />
            case ComponentsType.COL:
                return <ColSettingsElement
                    setValue={setValue}
                    value={value}
                />
            case ComponentsType.TEXT:
                return <TextSettingsElement
                    setValue={setValue}
                    value={value}
                />
            case ComponentsType.TABS:
                return <TabsSettingsElement
                    props={props}
                    setValue={setValue}
                    value={value}
                />
            case ComponentsType.BREADCRUMB:
                return <ArrayObjectsEditor
                    list={props.value.items}
                    setList={setValue}
                    template={{route: '', title: ''}} />
            default:
                break;
        }
    }

    return <>{renderPreview()}</>
}

export default memo(EditorUniqSwitch)
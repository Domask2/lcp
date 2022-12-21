import React, {FC} from 'react';
import {Input} from "antd";
import {SetObjectType} from "../ObjectFixedEditor";

interface StringElementProps {
    objectKey: string,
    setObject: (o: (o: SetObjectType) => SetObjectType) => void,
    keyElement: string
    templateKeyType: string
    templateKeyTitle: string
}

export const InputElement: FC<StringElementProps> = ({objectKey, setObject, keyElement, templateKeyType, templateKeyTitle}) => {
    return (
        <Input
            className="lcEditorInput"
            size="small"
            onChange={(v) => {
                let val: any = v.currentTarget.value

                setObject((o: SetObjectType) => {
                    let newObj: any = {...o}
                    newObj[keyElement] = val

                    if (templateKeyType === 'number') {
                        val = val * 1
                        newObj[keyElement] = val
                    }

                    return newObj
                })
            }}
            value={objectKey}
        />
    )
}
import React, {FC} from 'react';
import {Switch} from "antd";
import {SetObjectType} from "../ObjectFixedEditor";

interface BooleanElementProps {
    objectKey: boolean,
    setObject: (o: (o: SetObjectType) => SetObjectType) => void,
    keyElement: string
}

export const SwitchElement: FC<BooleanElementProps> = ({objectKey, setObject, keyElement}) => {
    return (
        <Switch checked={objectKey}
                size="small"
                onChange={(v) => {
                    setObject((o: SetObjectType) => {
                        let newObj:any = {...o}
                        newObj[keyElement] = v
                        return newObj
                    })
                }}/>
    )
}
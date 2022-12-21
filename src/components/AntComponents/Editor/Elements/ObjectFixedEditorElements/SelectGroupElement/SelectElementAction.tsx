import React, {FC} from 'react';
import {Select} from "antd";
import {SetObjectType} from "../../ObjectFixedEditor";

interface SelectElementProps {
    object: SetObjectType
    setObject: (o: (o: SetObjectType) => SetObjectType) => void,
    templateKeyItems: Array<string>
    setSelectAction: (val: string) => void
}

export const SelectElementAction: FC<SelectElementProps> = ({
                                                                object,
                                                                setObject,
                                                                templateKeyItems,
                                                                setSelectAction
                                                            }) => {

    const handleOnChangeSelect = (val: string) => {
        setObject((o: SetObjectType) => {
            let newObj: any = {...o}
            newObj['typeSubmit'] = val
            setSelectAction(val)
            return newObj
        })
    }

    return (
        <Select
            defaultValue={object?.typeSubmit}
            onChange={(val: string) => handleOnChangeSelect(val)}

            size="small"
            style={{
                width: '100%',
                borderBottom: '1px solid #eee',
                backgroundColor: '#fff',

            }}>
            bordered={false}

            {templateKeyItems.map((item: string, index: number) =>
                <Select.Option key={index} value={item}>{item}</Select.Option>)
            }
        </Select>
    )
}
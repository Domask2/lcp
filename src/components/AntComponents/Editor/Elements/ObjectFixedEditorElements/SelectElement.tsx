import React, {FC} from 'react';
import {Select} from "antd";
import {SetObjectType} from "../ObjectFixedEditor";

interface SelectElementProps {
    objectKey: string,
    setObject: (o: (o: SetObjectType) => SetObjectType) => void,
    keyElement: string
    templateKeyType?: string
    templateKeyItems: any
    filter?: any
}

export const SelectElement: FC<SelectElementProps> = ({
    objectKey,
    setObject,
    keyElement,
    templateKeyType,
    templateKeyItems,
    filter
}) => {
    return (
        <Select
            style={{
                width: '100%',
                borderBottom: '1px solid #eee',
                backgroundColor: '#fff'
            }}
            bordered={false}
            size="small"
            defaultValue={objectKey}

            showSearch={filter}
            filterOption={(input, option) =>
                (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())
            }

            onChange={(val: any) => {
                setObject((o: any) => {
                    let newObj: any = {...o}
                    newObj[keyElement] = val
                    if (templateKeyType === 'number') {
                        val = val * 1
                        newObj[keyElement] = val
                    }

                    return newObj
                })
            }}>

            {
                templateKeyItems?.map((item: any, index: any) =>
                    <Select.Option key={index} value={item}>{item}</Select.Option>)
            }

        </Select>
    )
}
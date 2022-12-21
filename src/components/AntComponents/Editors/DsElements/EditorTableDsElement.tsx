import React, {memo, useEffect, useState} from "react";
import {Button, Input, Select} from 'antd';
import AntPopover from "../../Popover/AntPopover";
import {ClearOutlined} from '@ant-design/icons';

type EditorTableDsElementType = {
    props: any
    setValue: any
    value: any
}

const EditorTableDsElement: React.FC<EditorTableDsElementType> = ({props, setValue, value}) => {
    const [dsKey, setDsKey] = useState<string>(value.key);
    const [dependency, setDependency] = useState<string>(value.dependency);

    useEffect(() => {
        setValue({
            key: dsKey,
            dependency: dependency
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dsKey, dependency])

    return <>
        <div style={props.containerStyle}>
            {
                props.keyTwoHoverText ? (
                    <AntPopover
                        title={`${props.title} ${props.keyTwo}:`}
                        hoverText={props.keyTwoHoverText}
                    />
                ) : (
                    <span>{props.keyTwo && `${props.keyTwo}:`}</span>
                )
            }
            <Select
                showSearch
                mode={props.inputsType.mode}
                style={{
                    minWidth: "60%",
                    width: "60%",
                    marginLeft: "4%",
                    borderBottom: '1px solid #eee',
                    backgroundColor: '#fff',
                    overflow: 'hidden',
                }}
                bordered={false}
                size="small"
                onChange={e => setDsKey(e)}
                value={dsKey}
            >
                {
                    props.list && props.list.map((item: any, index: any) =>
                        <Select.Option key={`${item?.key ? item.key : item}_${index}`} value={item.key ? item.key : item}>{item.title ? item.title : item}</Select.Option>)
                }
            </Select>
            {props.clearButton !== false && <Button
                type="link"
                onClick={() => setDsKey('')}
                icon={<ClearOutlined />}
            />}
        </div>
        <div style={props.containerStyle}>
            {
                props.keyThreeHoverText ? (
                    <AntPopover
                        title={`${props.title} ${props.keyThree}:`}
                        hoverText={props.keyThreeHoverText}
                    />
                ) : (
                    <span>{props.keyThree && `${props.keyThree}:`}</span>
                )
            }

            <Input
                style={{
                    minWidth: "60%",
                    width: "60%",
                    marginLeft: "4%",
                    borderBottom: '1px solid #eee',
                    backgroundColor: '#fff',
                    overflow: 'hidden',
                }}
                value={dependency}
                className="lcEditorInput"
                onChange={e => setDependency(e.target.value)}
            />

            {props.clearButton !== false && <Button
                type="link"
                onClick={() => setDependency('')}
                icon={<ClearOutlined />}
            />}
        </div>
    </>

}

export default memo(EditorTableDsElement)
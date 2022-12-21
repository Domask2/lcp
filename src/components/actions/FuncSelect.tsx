import React from 'react';
import {Select} from 'antd';

interface IFuncSelect {
    mode?: 'multiple' | 'tags' | undefined
    arrParams?: any
    setItem: (item: any, param?: any) => void
    value: any
    placeholder?: string
    param?: any
    size?: 'large' | 'middle' | 'small'
}

const FuncSelect: React.FC<IFuncSelect> = ({param, mode, arrParams, setItem, value, placeholder,size='middle'}) => {
    const handleChange = (value: any) => {
        param ? setItem(value, param) : setItem(value);
    }

    return <>
        <Select
            mode={mode ? mode : undefined}
            showSearch
            placeholder={placeholder ? placeholder : "Inserted are removed"}
            value={value}
            size={size}
            onChange={handleChange}
            style={{width: '100%'}}
        >
            {arrParams ? arrParams.map((item: any) => (
                <Select.Option key={item.key} value={item.key}>
                    {item.title}
                </Select.Option>
            ))
                : (
                    ''
                )}
        </Select>
    </>

};

export default FuncSelect
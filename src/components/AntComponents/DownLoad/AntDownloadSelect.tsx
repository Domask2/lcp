import React, {Dispatch, FC, memo, ReactNode, SetStateAction} from 'react';
import {Select} from "antd";

interface AntDownloadSelectType {
    children: ReactNode
    value: string | number
    setValue: Dispatch<SetStateAction<any>>
}

const AntDownloadSelect: FC<AntDownloadSelectType> = ({children, value, setValue}) => {
    return (
        <Select style={{
            width: '100%',
            borderBottom: '1px solid #eee',
            backgroundColor: '#fff'
        }}
                size={'small'}
                value={value}
                onChange={setValue}
        >
            <Select.Option key={'no'} value={''}>
                {'не выбрано'}
            </Select.Option>
            {children}
        </Select>
    );
}

export default memo(AntDownloadSelect);

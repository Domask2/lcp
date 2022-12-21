import React from 'react';
import {Input} from "antd";

type LoadRemoteInputType = {
    setRemoteDB: any
}

const LoadRemoteInput: React.FC<LoadRemoteInputType> = ({setRemoteDB}) => {

    const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.code == 'NumpadEnter' || e.code == 'Enter') {
            console.log(true)
        }
    }

    return <Input size='small' onKeyPress={onKeyPress} />
};

export default LoadRemoteInput;
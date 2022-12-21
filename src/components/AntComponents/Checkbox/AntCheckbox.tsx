import { Checkbox } from 'antd';
import React from "react";

const AntCheckbox = ({cmp, style}: any) => {
    // const checked = useTypedSelector((state:any) => getFlag(state, cmp.ds.key, cmp.ds.item_key))
    let checked = true;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // dispatch(setFlag(cmp.ds.key, cmp.ds.item_key, e.target.checked))
    };

    return <Checkbox style={style} onChange={onChange} checked={checked} {...cmp.props} >
        {cmp.caption}
    </Checkbox>
}

export default AntCheckbox
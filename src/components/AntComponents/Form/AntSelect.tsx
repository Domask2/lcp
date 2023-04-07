import React from 'react';
import Editor from "../Editor/Editor";
import useAction from "../../../hooks/useAction";

import {getDataSource} from "../../../redux/ds/ds.selector";
import {useTypedSelector} from "../../../hooks/useTypedSelector";

import {Select} from "antd";

import {RootState} from "../../../redux/redux.store";
import {ISelect} from "../Page/templates";

type AntSelectType = {
    cmp: ISelect
}

const AntSelect: React.FC<AntSelectType> = ({cmp}) => {
    const dataSource = useTypedSelector((state: RootState) => getDataSource(state, cmp.ds.key))
    const action = useAction(cmp.actions!)

    return (
        <>
            <Editor cmp={cmp} oldComponent={true} />
            <Select size={"small"} defaultValue="Выберие источник данных" style={cmp.style}
                onChange={(e) => action.onClick(e)}>

                {
                    cmp?.isClear && (
                        <Select.Option key={'010101'} value={'clear'}>
                            {cmp?.textClear.key}
                        </Select.Option>
                    )
                }

                {dataSource?.items.map(item =>
                    <Select.Option key={item.key} value={item[cmp.item.key]}>
                        {item[cmp.item.val]}
                    </Select.Option>
                )}
            </Select>
        </>
    )
};

export default AntSelect;
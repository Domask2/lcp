import {Card, Select} from "antd";
import React, {memo} from "react";
import {useTypedSelector} from "../../../hooks";
import {RootState} from "../../../redux/redux.store";
import {getDataSourceLs} from "../../../redux/ds/ds.selector";

const ReduxElement = ({reduxElement, setReduxElement}:any) => {
    const ls: any = useTypedSelector((state: RootState) => getDataSourceLs(state));
    return (
        <Card size="small" className="cardEdit">
            <h3>Redux Element</h3>
            <Select
                style={{
                    width: '100%',
                    borderBottom: '1px solid #eee',
                    backgroundColor: '#fff'
                }}
                mode='multiple'
                allowClear
                bordered={false}
                size="small"
                onChange={setReduxElement}
                value={reduxElement}
            >
                {
                    Object.keys(ls.vars).map((item: any, index: any) =>
                        <Select.Option key={index} value={item}>{item}</Select.Option>)
                }
            </Select>
        </Card>
    )
}

export default memo(ReduxElement);
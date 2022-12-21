import React from "react";
import {Form, Select} from "antd";

/**
 * Поле для фильтрации, выпадающий список с операторами для элемента Select.
 * Нужен только для фильтрации.
 * @param key
 */

export const SelectBefore = ({keyName}: any) => {
    return <Form.Item initialValue="=" name={"prefix_" + keyName} noStyle>
        <Select style={{borderTop: "none", width: '80px'}} className="select-before">
            <Select.Option value="=">{'='}</Select.Option>
            <Select.Option value=">">{'>'}</Select.Option>
            <Select.Option value="<">{'<'}</Select.Option>
            <Select.Option value=">=">{'>='}</Select.Option>
            <Select.Option value="<=">{'<='}</Select.Option>
            <Select.Option value="!=">{'!='}</Select.Option>
            <Select.Option value=">-<">{'>-<'}</Select.Option>
            <Select.Option value="__like__">{'like'}</Select.Option>
            <Select.Option value="__is_null__">{'is null'}</Select.Option>
            <Select.Option value="__is_not_null__">{'is not null'}</Select.Option>
        </Select>
    </Form.Item>
};

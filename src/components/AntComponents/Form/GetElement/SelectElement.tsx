import React from "react";
import {combineAction, setObjectSelect} from "../../../../services/combineActions";
import {GetOptions} from "./index";
import {Select} from "antd";
import {FormItemsInterfaces, IForm} from "../../Page/templates";

export const SelectElement = (item: FormItemsInterfaces, cmp: IForm, ObjectFncDsHooksAll: any, onChange: (e: any) => void) => {
    const {fncAll, dataSources, actionsHooks} = ObjectFncDsHooksAll

    const handleChange = (e: any) => {
        if (item.actions) {
            if (item.actions.length) {
                item.actions.forEach((action: any) => {
                    if (e !== 'clear') {
                        let {objectAction} = setObjectSelect(action, e);
                        combineAction(objectAction, fncAll, actionsHooks);
                    }
                })
            }
        }
        if (e !== 'clear') {
            onChange(e)
        }
    }

    return (
        <Select
            showSearch
            onChange={(e) => handleChange(e)}
            filterOption={(input, option: any) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
            <Select.Option key='clear' value='clear'>-------</Select.Option>)
            {GetOptions(item, cmp, dataSources)}
        </Select>
    )
}
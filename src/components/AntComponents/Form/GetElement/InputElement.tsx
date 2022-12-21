import React from "react";
import {SelectBefore} from "./index";
import {Input} from "antd";
import {FormItemsInterfaces, IForm} from "../../Page/templates";

export const InputElement = (item: FormItemsInterfaces, cmp: IForm, form_type: string, dataSources: any, navigate: any) => {
    let link = item.link
    let disabled = item.disabled

    const handlePush = () => {
        if (link) {
            let url = getUrlInput(item, cmp, dataSources);
            navigate(url)
        } else {
            return null
        }
    }

    return <Input
        type={item.numeric ? 'number' : 'text'}
        min={item.min}
        max={item.max}
        spellCheck={!link}
        onClick={handlePush}
        disabled={disabled ? link ? false : disabled : false}
        className={'inputLink'}
        style={{
            color: link ? '#1890ff' : 'black',
            cursor: link ? 'pointer' : 'text',
            textDecorationStyle: link ? 'unset' : 'inherit'
        }}

        // onKeyDown={(e) => {
        //     if (item.decimal) {
        //         const input = e.target as HTMLInputElement
        //         console.log(input.value)
        //         input.value = parseInt(input.value).toString()
        //     }
        // }}

        addonBefore={form_type === 'filter' ?
            <SelectBefore key={item.props.name} keyName={item.props.name}/> : false}
    />
}

export const getUrlInput = (item: any, cmp: any, dataSources: any) => {
    let urlLinkArr = item.link.split(':')
    let animalId = cmp.source !== undefined && dataSources[cmp.source] !== undefined ? dataSources[cmp.source]?.items[0][urlLinkArr[1]] : ''
    return urlLinkArr[0] + animalId
}


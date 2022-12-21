import React, {memo} from "react";
import {Col, Input, Select} from 'antd';

type AntInputType = {
    ds?: any
    setValue: (e: any) => void
    value: string
    list?: string[]
    title: string
    type?: string
}

const ChartInputsElement: React.FC<AntInputType> = ({ds, list, value, setValue, title, type}) => {

    const arr = list?.map((key: any) => {
        return ds?.filter((item: any) => item.key === key)[0]
    })

    return (
        <>
            {list ? (
                <Col style={{marginRight: '10px'}}>
                    <h4>{title}</h4>
                    <Select
                        style={{
                            minWidth: '200px',
                            marginBottom: '10px',
                        }}
                        showSearch
                        size="small"
                        onChange={e => setValue(e)}
                        value={value}
                    >
                        {
                            arr && arr.map((item: any, index: any) =>
                                <Select.Option key={`${item?.key}_${index}`} value={item?.key}>{item?.title?.split(']')[1] ? item.title.split(']')[1] : item?.title}</Select.Option>)
                        }
                    </Select>
                </Col>
            ) : (
                <Col style={{marginRight: '10px'}}>
                    <h4>{title}</h4>
                    <Input
                        style={{
                            minWidth: '200px',
                            marginBottom: '10px',
                        }}
                        type={type ? type : 'text'}
                        size="small"
                        value={value}
                        onChange={e => setValue(+e.target.value ? +e.target.value : e.target.value)}
                    />
                </Col>
            )}
        </>
    )
}

export default memo(ChartInputsElement)
import React, {memo, useEffect, useState} from "react";
import {Button, Select} from 'antd';
import AntPopover from "../../Popover/AntPopover";
import {ClearOutlined} from '@ant-design/icons';
import useDebounce from "../../Inputs/UseDebounce";
import {RootState} from "../../../../redux/redux.store";
import {useTypedSelector} from "../../../../hooks";
import {getSysVarsSettings} from "../../../../redux/app/app.selector";
import {ApiYaMaps} from "../../../../saga/api/api.yaMaps";

type GeoCodeType = {
    props: any
    setValue: any
    setValueTwo: any
    value: any
}

const GeoCode: React.FC<GeoCodeType> = ({props, setValue, setValueTwo, value}) => {

    const [address, setAddress] = useState<string>(value);
    const [responseList, setResponseList] = useState<any>([]);

    const yaMapsApiKey = useTypedSelector((state: RootState) => getSysVarsSettings(state))?.yaMapsApiKey;
    const apiKey = yaMapsApiKey ? yaMapsApiKey : '5fcad956-3d28-4b70-b26c-796973d8976f'

    const debouncedValue = useDebounce(address, 1000);

    const handleCleanUp = () => {
        setAddress('');
        setResponseList([]);
        setValue('');
        setValueTwo('');
    };

    const handleChange = (values: any) => {
        const geoPos = values.point.pos.split(' ').map((item: string) => +item);
        geoPos.length && ([geoPos[0], geoPos[1]] = [geoPos[1], geoPos[0]]);

        setAddress(values.value);
        setValue(values.value);
        setValueTwo(geoPos);
    };

    useEffect(() => {
        if (debouncedValue.length) {
            const result = ApiYaMaps.geocode(apiKey, debouncedValue)
            result.then((res: any) => setResponseList(res?.response?.GeoObjectCollection?.featureMember))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedValue]);

    return <>
        <div style={props.containerStyle}>
            {
                props.hoverText ? (
                    <AntPopover
                        title={`${props.title}:`}
                        hoverText={props.hoverText}
                    />
                ) : (
                    <span>{props.title && `${props.title}:`}</span>
                )
            }
            <Select
                showSearch
                style={{
                    minWidth: "60%",
                    width: "60%",
                    marginLeft: "4%",
                    borderBottom: '1px solid #eee',
                    backgroundColor: '#fff',
                    overflow: 'hidden',
                }}
                size="small"
                placeholder={'введите адрес'}
                defaultActiveFirstOption={false}
                showArrow={false}
                filterOption={false}
                bordered={false}
                notFoundContent={null}
                onSearch={(e: any) => {
                    console.log(e);
                    setAddress(e);
                }}
                onChange={(e: any, values: any) => {
                    handleChange(values);
                }}
                value={address}
                options={(responseList || []).map((item: any) => ({
                    value: item.GeoObject.metaDataProperty.GeocoderMetaData.Address.formatted,
                    point: item.GeoObject.Point
                }))}
            />
            {props.clearButton !== false && <Button
                type="link"
                onClick={handleCleanUp}
                icon={<ClearOutlined />}
            />}
        </div>
    </>

}

export default memo(GeoCode)
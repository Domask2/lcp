import React, {useEffect, useState} from "react";

import Editor from "../Editor/Editor";
import {YMaps, Map, Placemark} from '@pbe/react-yandex-maps';
import ScrollableAnchor from "react-scrollable-anchor";
import {IYaMaps} from "../Page/templates";
import {checkIconContent, checkPlacemarkIcon} from "../../../utils";
import {Button, Select} from "antd";
import useDebounce from "../Inputs/UseDebounce";
import {ApiYaMaps} from "../../../saga/api/api.yaMaps";
import {useActions, useTypedSelector} from "../../../hooks";
import {RootState} from "../../../redux/redux.store";
import {getSysVarsSettings} from "../../../redux/app/app.selector";

type YaMapsType = {
    cmp: IYaMaps;
    props?: any;
};

const YaMaps: React.FC<YaMapsType> = ({cmp, props}: any) => {

    const {setLsVars} = useActions();
    const [geometry, setGeometry] = useState<any>(cmp.placemarkGeo?.length ? cmp.placemarkGeo : [+cmp.placemarkLatitude, +cmp.placemarkLongitude]);
    const [visible, setVisible] = useState<boolean>(cmp.geocodeMode ? false : true);
    const [address, setAddress] = useState<string>(cmp.placemarkGeoAddress);
    const [responseList, setResponseList] = useState<any>([]);

    const debouncedValue = useDebounce(address, 1000);
    const yaMapsApiKey = useTypedSelector((state: RootState) => getSysVarsSettings(state))?.yaMapsApiKey;
    const apiKey = yaMapsApiKey ? yaMapsApiKey : '5fcad956-3d28-4b70-b26c-796973d8976f';

    const centerGeo: any = cmp.mapCenterGeo?.length ? cmp.mapCenterGeo : [+cmp.mapCenterLatitude, +cmp.mapCenterLongitude];
    const placemarkGeo: any = cmp.placemarkGeo?.length ? cmp.placemarkGeo : [+cmp.placemarkLatitude, +cmp.placemarkLongitude];
    const caption: any = props.dataSource?.items[0][cmp.dsKeyValue] ? props.dataSource.items[0][cmp.dsKeyValue] : cmp.caption;

    const icon = checkPlacemarkIcon(cmp.placemarkIcon, cmp.placemarkType);
    const color = cmp.placemarkColor ? cmp.placemarkColor : '';
    const type = cmp.placemarkType ? cmp.placemarkType : '';
    const placemark = `islands#${color}${icon}${type}`;

    const scrollZoom = cmp.scrollZoom ? ['scrollZoom', 'drag', 'multiTouch', 'dblClickZoom', 'rightMouseButtonMagnifier'] : ['drag', 'multiTouch', 'dblClickZoom', 'rightMouseButtonMagnifier'];

    const varsKey = `${cmp.varsKey}__${cmp.key}`;
    const varsValue = `${cmp.varsValue}__${cmp.key}`;

    const getCenterPosition = () => {
        let position: number[] | undefined = centerGeo;
        if (cmp.geocodeMode) {
            position = geometry;
        } else {
            if (cmp.commonCenter) {
                position = getPlacemarkPosition()[0]?.position ? getPlacemarkPosition()[0]?.position : getPlacemarkPosition();
            } else if (cmp.ds) {
                let posArray: number[] = [0, 0];
                let minLat = 100;
                let maxLat = 0;
                let minLng = 100;
                let maxLng = 0;
                getPlacemarkPosition().forEach((item: any) => {
                    if (item?.position) {
                        minLat = +item?.position[0] < minLat ? +item?.position[0] : minLat;
                        maxLat = +item?.position[0] > maxLat ? +item?.position[0] : maxLat;
                        minLng = +item?.position[1] < minLng ? +item?.position[1] : minLng;
                        maxLng = +item?.position[1] > maxLng ? +item?.position[1] : maxLng;
                    }
                })
                posArray[0] = (+minLat + +maxLat + 0.02) / 2
                posArray[1] = (+minLng + +maxLng) / 2
                position = cmp.iterations ? posArray : getPlacemarkPosition()[0].position
            }
        }
        return position
    }

    const getPlacemarkPosition = () => {
        let position: any[] = placemarkGeo;
        if (cmp.geocodeMode) {
            position = geometry;
        } else if (cmp.ds) {
            if (cmp.iterations) {
                const arr: any[] = [];
                props.dataSource?.items?.forEach((item: any) => {

                    if (getPosNum(item).length) {
                        arr.push({
                            title: item[cmp.dsKeyValue],
                            position: getPosNum(item),
                        })
                    }
                    position = arr
                })
            } else {
                position = getPosNum(props.dataSource?.items[0]);
            }
        }
        return position
    }

    const getPosNum = (item: any) => {
        if (item.lat && item.lng) {
            return [item.lat, item.lng]
        } else {
            return cmp.iterations ? [] : [59.938955, 30.315644]
        }
    }

    const defaultState = {
        center: getCenterPosition(),
        zoom: cmp.zoom,
        behaviors: scrollZoom,
    };

    useEffect(() => {
        if (cmp.geocodeMode) {
            setLsVars(varsKey, '');
            setLsVars(varsValue, '');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (debouncedValue?.length) {
            const result = ApiYaMaps.geocode(apiKey, debouncedValue)
            result.then((res: any) => setResponseList(res?.response?.GeoObjectCollection?.featureMember))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedValue]);

    const handleChange = (values: any) => {
        const geoPos = values.point.pos.split(' ').map((item: string) => +item);
        geoPos.length && ([geoPos[0], geoPos[1]] = [geoPos[1], geoPos[0]]);
        setGeometry(geoPos);
        setAddress(values.value);
        setLsVars(varsKey, geoPos);
        setLsVars(varsValue, values.value);
    };

    return <>
        {cmp.anchor && <ScrollableAnchor id={`${cmp.anchor}`}>
            <span></span>
        </ScrollableAnchor>}
        <Editor cmp={cmp} />
        <br />
        {!!cmp.geocodeMode && <div>
            <Select
                showSearch
                style={{
                    width: '85%',
                }}
                placeholder={'введите адрес'}
                defaultActiveFirstOption={false}
                showArrow={false}
                filterOption={false}
                notFoundContent={null}
                onSearch={(e: any) => {
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
            <Button
                type="default"
                onClick={() => setVisible(!visible)}
                style={{width: '15%'}}
            >
                {visible ? 'Скрыть' : 'Показать'} карту
            </Button>

            <br />
            <br />
        </div>}
        {visible && <YMaps >
            <Map state={defaultState} style={cmp.style} >
                {cmp.iterations ? (
                    getPlacemarkPosition().map((item: any, index: number) => {
                        return (
                            <Placemark
                                key={`${item.title}_${index}`}
                                modules={["geoObject.addon.balloon"]} // TO DO KEY!!!!
                                geometry={item.position}
                                properties={{
                                    //  balloonContentBody:
                                    //      cmp.text,
                                    iconContent: checkIconContent(item.title, cmp.placemarkType),
                                }}
                                options={{
                                    preset: placemark
                                }}
                            />
                        )
                    })
                ) : (
                    <Placemark
                        modules={["geoObject.addon.balloon"]}
                        geometry={getPlacemarkPosition()}
                        properties={{
                            balloonContentBody:
                                cmp.text,
                            iconContent: checkIconContent(caption, cmp.placemarkType),
                        }}
                        options={{
                            preset: placemark
                        }}
                    />
                )}
            </Map>
        </YMaps>}
    </>
}

export default YaMaps
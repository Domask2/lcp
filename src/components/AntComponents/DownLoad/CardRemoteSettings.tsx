import React, {memo, useEffect, useState, FC} from 'react';
import AntPopover from "../Popover/AntPopover";
import {getDataSource} from "../../../redux/ds/ds.selector";
import {getAppDb} from "../../../redux/app/app.selector";
import {useTypedSelector} from "../../../hooks";
import AntDownloadSelect from "./AntDownloadSelect";
import AntDownloadDB from "./AntDownloadDB";
import {Col, Row, Select} from "antd";
import {RootState} from "../../../redux/redux.store";
import {IDataSource} from "../../../redux/ds/ds.initial";
import {albumType, CardRemoteSettingsType, categoriesTypes, ObjetType, popover} from "./type";

const CardRemoteSettings: FC<CardRemoteSettingsType> = ({
                                                            dateBase,
                                                            setDateBase,
                                                            dsKey,
                                                            setDsKey,
                                                            sortFiles,
                                                            setSortFiles
                                                        }) => {
    const dBArray = useTypedSelector((state: RootState) => getAppDb(state));
    const [albumsFilter, setAlbumsFilter] = useState<albumType[]>([]);

    const [dbRemote, setDbRemote] = useState<string>(dateBase.dbRemote ?? '');
    const [reloadDS, setReloadDS] = useState<string>(dateBase.reloadDS ?? '');

    const [dsKeyObjectType, setDsKeyObjectType] = useState<string>(dsKey.dsKeyObjectType ?? '');
    const [dsKeyCategories, setDsKeyCategories] = useState<string>(dsKey.dsKeyCategories ?? '');
    const [dsKeyAlbums, setDsKeyAlbums] = useState<string>(dsKey.dsKeyAlbums ?? '');

    const object_type = useTypedSelector((state: RootState) => getDataSource(state, dsKeyObjectType));
    const categories = useTypedSelector((state: RootState) => getDataSource(state, dsKeyCategories));
    const albums = useTypedSelector((state: RootState) => getDataSource(state, dsKeyAlbums));

    const [objectType, setObjectType] = useState<string>(sortFiles.objectType ?? '');
    const [category, setCategory] = useState<number>(sortFiles.category ?? 0);
    const [album, setAlbum] = useState<number>(sortFiles.album ?? 0);

    useEffect(() => {
        setDateBase({dbRemote, reloadDS})
    }, [dbRemote, reloadDS])

    useEffect(() => {
        setDsKey({dsKeyObjectType, dsKeyCategories, dsKeyAlbums})
    }, [dsKeyObjectType, dsKeyCategories, dsKeyAlbums])

    useEffect(() => {
        setSortFiles({objectType, category, album})
    }, [objectType, category, album])

    useEffect(() => {
        let result: albumType[] = []
        if (albums) {
            if (objectType && !category) {
                result = albums?.items.filter((item: albumType) => item.object_name === objectType)
            } else if (category && !objectType) {
                result = albums?.items.filter((item: albumType) => item.category_id === category)
            } else if (objectType && category) {
                result = albums?.items.filter((item: albumType) => item.category_id === category && item.object_name === objectType)
            }
        }

        setAlbumsFilter(result);
    }, [objectType, category]);

    return (
        <>
            <Row>
                <Col flex={'110px'}>
                    <AntPopover
                        title="DB Remote:"
                        hoverText={<div style={{maxWidth: "600px"}}>{popover.dbRemote}</div>}
                    />
                </Col>

                <Col flex={'auto'}>
                    <AntDownloadSelect value={dbRemote} setValue={setDbRemote}>
                        {
                            dBArray && dBArray.map((item: IDataSource) => (
                                <Select.Option key={item.key} value={item.key}>
                                    {item.title}
                                </Select.Option>
                            ))
                        }
                    </AntDownloadSelect>
                </Col>
            </Row>

            <Row>
                <Col flex={'110px'}>
                    <AntPopover
                        title="Reload DS:"
                        hoverText={<div style={{maxWidth: "600px"}}>{popover.reloadDs}</div>}
                    />
                </Col>

                <Col flex={'auto'}>
                    <AntDownloadDB dBArray={dBArray} item={reloadDS} setItem={setReloadDS}/>
                </Col>
            </Row>

            <Row>
                <Col flex={'110px'}>
                    <AntPopover
                        title="DS-ObjectType:"
                        hoverText={<div style={{maxWidth: "600px"}}>{popover.dsObjectType}</div>}
                    />
                </Col>

                <Col flex={'auto'}>
                    <AntDownloadDB dBArray={dBArray} item={dsKeyObjectType} setItem={setDsKeyObjectType}/>
                </Col>
            </Row>

            <Row>
                <Col flex={'110px'}>
                    <AntPopover
                        title="DS-Categories:"
                        hoverText={<div style={{maxWidth: "600px"}}>{popover.dsCategories}</div>}
                    />
                </Col>

                <Col flex={'auto'}>
                    <AntDownloadDB dBArray={dBArray} item={dsKeyCategories} setItem={setDsKeyCategories}/>
                </Col>
            </Row>

            <Row>
                <Col flex={'110px'}>
                    <AntPopover
                        title="DS-Albums:"
                        hoverText={<div style={{maxWidth: "600px"}}>{popover.dsAlbums}</div>}
                    />
                </Col>

                <Col flex={'auto'}>
                    <AntDownloadDB dBArray={dBArray} item={dsKeyAlbums} setItem={setDsKeyAlbums}/>
                </Col>
            </Row>

            <h4>Расположение файла:</h4>

            <Row>
                <Col flex={'110px'}>
                    <div>Object Type:</div>
                </Col>

                <Col flex={'auto'}>
                    <AntDownloadSelect value={objectType} setValue={setObjectType}>
                        {
                            object_type && object_type?.items && object_type.items.map((item: ObjetType) => {
                                return (
                                    <Select.Option key={item.key}
                                                   value={item.object_name}>{item.object_name}</Select.Option>
                                )
                            })
                        }
                    </AntDownloadSelect>
                </Col>
            </Row>

            <Row>
                <Col flex={'110px'}>
                    <div>Category:</div>
                </Col>

                <Col flex={'auto'}>
                    <AntDownloadSelect value={category} setValue={setCategory}>
                        {
                            categories && categories?.items && categories.items.map((item: categoriesTypes) => {
                                return (
                                    <Select.Option key={item.key} value={item.id}>{item.title}</Select.Option>
                                )
                            })
                        }
                    </AntDownloadSelect>
                </Col>
            </Row>

            <Row>
                <Col flex={'110px'}>
                    <div>Album:</div>
                </Col>

                <Col flex={'auto'}>
                    <AntDownloadSelect value={album} setValue={setAlbum}>
                        {
                            albumsFilter && albumsFilter.length > 0 && albumsFilter.map((item: albumType, index: number) => {
                                return (
                                    <Select.Option key={index} value={item.id}>{item.album_title}</Select.Option>
                                )
                            })
                        }
                    </AntDownloadSelect>
                </Col>
            </Row>
        </>
    );
}

export default memo(CardRemoteSettings);
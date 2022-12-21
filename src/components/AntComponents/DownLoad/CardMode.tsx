import React, {FC, memo} from 'react';
import {Checkbox, Col, Input, Row} from "antd";
import {CardModeType, defaultModeI, modeDownloadI} from "./type";

const CardMode: FC<CardModeType> = ({defaultMode, setDefaultMode, modeDownload, setModeDownload, folder, setFolder}) => {
    return (
        <>
            <h4>Дополнительные настройки:</h4>
            <Row>
                <Col flex={'110px'}>
                    <Checkbox checked={modeDownload.title} style={{marginLeft: '5px', padding: 0}}
                              onChange={(e: any) => {
                                  setModeDownload((prev: modeDownloadI) => {
                                      return {
                                          ...prev,
                                          title: e.target.checked
                                      }
                                  })
                              }}>Title:</Checkbox>
                </Col>
                <Col flex={'auto'}>
                    <Input value={defaultMode.title}
                           onChange={(e) => setDefaultMode((prev: defaultModeI) => {
                               return {
                                   title: e.target.value,
                                   description: prev.description
                               }
                           })}
                           size={'small'}/>
                </Col>
            </Row>

            <Row>
                <Col flex={'110px'}>
                    <Checkbox checked={modeDownload.description} style={{marginLeft: '5px', padding: 0}}
                              onChange={(e: any) => {
                                  setModeDownload((prev: modeDownloadI) => {
                                      return {
                                          ...prev,
                                          description: e.target.checked
                                      }
                                  })
                              }}>Descript:</Checkbox>
                </Col>
                <Col flex={'auto'}>
                    <Input value={defaultMode.description}
                           size={'small'}
                           onChange={(e) => setDefaultMode((prev: defaultModeI) => {
                               return {
                                   description: e.target.value,
                                   title: prev.title
                               }
                           })}
                    />
                </Col>
            </Row>

            <Row>
                <Col>
                    <Checkbox checked={modeDownload.visible} style={{marginLeft: '5px', padding: 0}}
                              onChange={(e: any) => {
                                  setModeDownload((prev: modeDownloadI) => {
                                      return {
                                          ...prev,
                                          visible: e.target.checked
                                      }
                                  })
                              }}>Visible</Checkbox>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Checkbox checked={modeDownload.singleFile} style={{marginLeft: '5px', padding: 0}}
                              onChange={(e: any) => {
                                  setModeDownload((prev: modeDownloadI) => {
                                      return {
                                          ...prev,
                                          singleFile: e.target.checked
                                      }
                                  })
                              }}>SingleFile</Checkbox>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Checkbox checked={modeDownload.slug} style={{marginLeft: '5px', padding: 0}}
                              onChange={(e: any) => {
                                  setModeDownload((prev: modeDownloadI) => {
                                      return {
                                          ...prev,
                                          slug: e.target.checked
                                      }
                                  })
                              }}>Slug</Checkbox>
                </Col>
            </Row>

            {/*<Row>*/}
            {/*    <Col flex={'110px'}>*/}
            {/*        <div style={{marginLeft:'30px'}}>Folder</div>*/}
            {/*    </Col>*/}
            {/*    <Col flex={'auto'}>*/}
            {/*        <Input value={folder}*/}
            {/*               size={'small'}*/}
            {/*               onChange={(e) => setFolder(e.target.value)}*/}
            {/*        />*/}
            {/*    </Col>*/}
            {/*</Row>*/}
        </>
    );
}

export default memo(CardMode);
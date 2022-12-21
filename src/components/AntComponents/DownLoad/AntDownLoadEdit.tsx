import React, {FC, memo, useEffect, useState} from 'react';
import {useActions} from "../../../hooks";
import ButtonBlock from "../Editor/ButtonBlock";
import CardMode from "./CardMode";
import CardRemoteSettings from "./CardRemoteSettings";
import {Card, Col, Row} from "antd";
import {AntDownLoadEditType, defaultModeI, modeDownloadI} from "./type";

const AntDownLoadEdit: FC<AntDownLoadEditType> = ({cmp, setVisible = () => {}}) => {
    const {cmpUpdate} = useActions()
    let model = {...cmp}

    const [folder, setFolder] = useState<string>(model.folder);
    const [dateBase, setDateBase] = useState(model.dateBase);
    const [dsKey, setDsKey] = useState(model.dsKey);
    const [modeDownload, setModeDownload] = useState<modeDownloadI>(model.modeDownload);
    const [defaultMode, setDefaultMode] = useState<defaultModeI>(model.defaultMode);
    const [sortFiles, setSortFiles] = useState(model.sortFiles)

    useEffect(() => {
        model.modeDownload = modeDownload
        model.defaultMode = defaultMode
        model.folder = folder
        model.sortFiles = sortFiles
        model.dateBase = dateBase
        model.dsKey = dsKey
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [defaultMode, modeDownload, folder, sortFiles, dateBase, dsKey])

    const onClose = () => {
        setVisible(false)
    }

    const onApply = () => {
        cmpUpdate(model)
        setVisible(false)
    }

    return <>
        <h3>Редактирование: {cmp.type} - {cmp.key}</h3>
        <Row gutter={[16, 16]}>
            <Col span={12}>
                <Card size="small" className="cardEdit">
                    <CardMode
                        folder={folder}
                        setFolder={setFolder}
                        defaultMode={defaultMode}
                        setDefaultMode={setDefaultMode}
                        modeDownload={modeDownload}
                        setModeDownload={setModeDownload}
                    />
                </Card>
            </Col>
            <Col span={12}>
                <Card size="small" className="cardEdit">
                    <h4>Настройки удаленного сервера:</h4>
                    <CardRemoteSettings
                        dateBase={dateBase}
                        setDateBase={setDateBase}
                        dsKey={dsKey}
                        setDsKey={setDsKey}
                        sortFiles={sortFiles}
                        setSortFiles={setSortFiles}
                    />
                </Card>
            </Col>
        </Row>

        <ButtonBlock onApply={onApply} onClose={onClose}/>
    </>
};

export default memo(AntDownLoadEdit);
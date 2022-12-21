import React, {FC, memo, useEffect, useState} from 'react';
import {Select} from "antd";
import {IDataSource} from "../../../redux/ds/ds.initial";

interface AntDownloadDBType {
    item: string
    setItem: (a: string) => void
    dBArray: any
}

const AntDownloadDB: FC<AntDownloadDBType> = ({item, setItem, dBArray}) => {
    let [db, procedure] = item !== '' ? item?.split('/') : ['', ''];
    const [filteredDB, setFilteredDB] = useState<string>(db);
    const [ProcedureArray, setProcedureArray] = useState<[]>([]);
    const [filteredProcedure, setFilteredProcedure] = useState<string>(procedure);

    useEffect(() => {
        let arrTwo = filteredDB && dBArray.filter((item: any) => item.key === filteredDB)[0]?.dataSources;
        setProcedureArray(arrTwo);
        setItem(`${filteredDB}/${filteredProcedure}`)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filteredDB, filteredProcedure]);

    return (
        <>
            <Select style={{
                width: '50%',
                borderBottom: '1px solid #eee',
                backgroundColor: '#fff'
            }}
                    size={'small'}
                    value={filteredDB}
                    onChange={setFilteredDB}
            >
                <Select.Option key={'no'} value={''}>
                    {'не выбрано'}
                </Select.Option>
                {dBArray ? dBArray.map((item: any) => (
                        <Select.Option key={item.key} value={item.key}>
                            {item.title}
                        </Select.Option>
                    ))
                    : (
                        ''
                    )}

            </Select>

            <Select style={{
                width: '50%',
                borderBottom: '1px solid #eee',
                backgroundColor: '#fff'
            }}
                    size={'small'}
                    value={filteredProcedure}
                    onChange={setFilteredProcedure}
            >
                <Select.Option key={'no'} value={''}>
                    {'не выбрано'}
                </Select.Option>
                {ProcedureArray ? ProcedureArray.map((item: any) => (
                        <Select.Option key={item.key} value={item.key}>
                            {item.title}
                        </Select.Option>
                    ))
                    : (
                        ''
                    )}
            </Select>

        </>
    )
}

export default memo(AntDownloadDB);
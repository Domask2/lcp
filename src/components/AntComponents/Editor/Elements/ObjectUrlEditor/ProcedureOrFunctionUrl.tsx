import {Col, Row} from "antd";
import FuncSelect from "../../../../actions/FuncSelect";
import React, {memo, useEffect, useState} from "react";
import {useTypedSelector} from "../../../../../hooks";
import {RootState} from "../../../../../redux/redux.store";
import {getAppDb} from "../../../../../redux/app/app.selector";

const ProcedureOrFunctionUrl = ({baseUrl, setBaseUrl}: {baseUrl: string, setBaseUrl: (a: string) => void}) => {
    let url = baseUrl?.split('/')
    const [filteredOne, setFilteredOne] = useState<any>(baseUrl?.includes('/') ? url[0] : '');
    const [filteredArrOne] = useState<any>(useTypedSelector((state: RootState) => getAppDb(state)));
    const [filteredTwo, setFilteredTwo] = useState<any>(url && url[1] ? url[1] : '');
    const [filteredArrTwo, setFilteredArrTwo] = useState<any>();

    useEffect(() => {
        let arrTwo = filteredOne && filteredArrOne.filter((item: any) => item.key === filteredOne)[0]?.dataSources;
        arrTwo && setFilteredArrTwo(arrTwo)
        filteredOne && setBaseUrl(filteredOne)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filteredOne]);

    useEffect(() => {
        if (filteredOne && filteredTwo) {
            setBaseUrl(`${filteredOne}/${filteredTwo}`)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filteredTwo]);

    return (
        <Row>
            <Col flex="70px">
                <h4>Proc/Func</h4>
            </Col>

            <Col span={'10'} style={{marginRight: '10px'}}>
                <FuncSelect placeholder='source' size={'small'} arrParams={filteredArrOne}
                    setItem={setFilteredOne}
                    value={filteredOne} />
            </Col>

            <Col span={'10'}>
                <FuncSelect placeholder='view' size={'small'} arrParams={filteredArrTwo}
                    setItem={setFilteredTwo}
                    value={filteredTwo} />
            </Col>

        </Row>
    )
}

export default memo(ProcedureOrFunctionUrl)
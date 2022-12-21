import React, {useEffect, useState} from 'react';
import {useTypedSelector} from '../../hooks';
import {getAppDb} from '../../redux/app/app.selector';
import FuncSelect from '../actions/FuncSelect';
import {Col, Row} from 'antd';
import {RootState} from '../../redux/redux.store';

interface IFuncConstructor {
    cmp?: any
    type?: string
    flag?: any
    width?: any
    setFuncObject?: any
}

const FuncConstructor: React.FC<IFuncConstructor> = ({cmp, type, flag, width = 4, setFuncObject}) => {
    const [filtredOne, setFiltredOne] = useState<any>();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [filtredArrOne, setFiltredArrOne] = useState<any>(useTypedSelector((state: RootState) => getAppDb(state)));
    const [filtredTwo, setFiltredTwo] = useState<any>();
    const [filtredArrTwo, setFiltredArrTwo] = useState<any>();
    const [filtredThree, setFiltredThree] = useState<any>([]);
    const [filtredArrThree, setFiltredArrThree] = useState<any>();
    const [funcObj, setFuncObj] = useState<any>({})

    useEffect(() => {
        let arrTwo = filtredOne && filtredArrOne.filter((item: any) => item.key === filtredOne)[0].dataSources;
        setFiltredArrTwo(arrTwo);
        setFiltredTwo('');
        setFuncObj({
            ...funcObj,
            source: `${filtredOne}/${filtredTwo}`
        })

        if (filtredOne) {
            setFuncObject((prevState: any) => ({
                ...prevState,
                source: `${filtredOne}/${filtredTwo}`
            }))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filtredOne]);

    useEffect(() => {
        let arrThree = filtredTwo && filtredArrTwo.filter((item: any) => item.key === filtredTwo)[0].dataSourceFields;
        setFiltredArrThree(arrThree);
        setFiltredThree([]);
        setFuncObj({
            ...funcObj,
            source: `${filtredOne}/${filtredTwo}`
        })

        if (filtredOne) {
            setFuncObject((prevState: any) => ({
                ...prevState,
                source: `${filtredOne}/${filtredTwo}`
            }))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filtredTwo]);

    useEffect(() => {
        setFuncObj({
            ...funcObj,
            params: filtredThree
        })

        if (filtredOne) {
            setFuncObject((prevState: any) => ({
                ...prevState,
                // source: `${filtredOne}/${filtredTwo}`,
                source: `${filtredOne}/${filtredTwo}:${filtredThree}`,

                params: filtredThree
            }))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filtredThree]);

    useEffect(() => {
        if (flag) {
            setFiltredOne('');
            setFuncObj('')
            setFiltredArrTwo('');
            setFiltredTwo('');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [flag]);

    return (
        <>
            <Row>
                {filtredArrOne && <Col span={width}>
                    <FuncSelect placeholder='source' arrParams={filtredArrOne} setItem={setFiltredOne}
                                value={filtredOne}/>
                </Col>}

                {filtredArrTwo && <Col span={width}>
                    <FuncSelect placeholder='view' arrParams={filtredArrTwo} setItem={setFiltredTwo}
                                value={filtredTwo}/>
                </Col>}

                {filtredArrThree && <Col span={12}>
                    <FuncSelect placeholder='params' mode={'multiple'} arrParams={filtredArrThree}
                                setItem={setFiltredThree} value={filtredThree}/>
                </Col>}
            </Row>
            {/* {filtredThree && filtredThree.map((param:any) => <DsParamSearch key={param} obj={cmp} inputValue={param}/>)} */}
        </>
    );
};

export default FuncConstructor
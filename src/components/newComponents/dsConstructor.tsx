import React, { useEffect, useState } from 'react';
import { useTypedSelector } from '../../hooks';
import { getAppDb } from '../../redux/app/app.selector';
import { Select } from 'antd';
import { RootState } from '../../redux/redux.store';

interface IDsConstructor {
  setItem: (item: any) => void
  values: any
}

const DsConstructor: React.FC<IDsConstructor> = ({ setItem, values }) => {
  const [filtredOne, setFiltredOne] = useState<any>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [filtredArrOne, setFiltredArrOne] = useState<any>(useTypedSelector((state: RootState) => getAppDb(state)));
  const [filtredTwo, setFiltredTwo] = useState<any>();
  const [filtredArrTwo, setFiltredArrTwo] = useState<any>();
  const [filtredThree, setFiltredThree] = useState<any>();
  const [filtredArrThree, setFiltredArrThree] = useState<any>();
  // const [funcObj, setFuncObj] = useState<any>({})

  useEffect(() => {
    let arrTwo = filtredOne && filtredArrOne.filter((item: any) => item.key === filtredOne)[0].dataSources;
    setFiltredArrTwo(arrTwo);
    setItem((prevState:any) => ({
      ...prevState,
      key: `${filtredOne}/${filtredTwo}`
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtredOne]);

  useEffect(() => {
    let arrThree = filtredTwo && filtredArrTwo.filter((item: any) => item.key === filtredTwo)[0].dataSourceFields;
    setFiltredArrThree(arrThree);
    setFiltredThree('');
    setItem((prevState:any) => ({
      ...prevState,
      key: `${filtredOne}/${filtredTwo}`
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtredTwo]);

  useEffect(() => {
    setItem((prevState:any) => ({
      ...prevState,
      filter: filtredThree
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtredThree]);

  useEffect(() => {
    if (!values.key) {
      setFiltredOne('');
      setFiltredTwo('');
    }
    if (!values.filter) {
      setFiltredThree('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  return (
    <>
     <Select
      showSearch
      placeholder="DS"
      value={filtredOne}
      onChange={setFiltredOne}
      style={{borderTop: "none", width: '23%'}}
    >
      {filtredArrOne ? filtredArrOne.map((item: any) => (
          <Select.Option key={item.key} value={item.key}>
            {item.title}
          </Select.Option>
        ))
      : (
        ''
      )}
    </Select>
    <Select
      showSearch
      placeholder="key"
      value={filtredTwo}
      onChange={setFiltredTwo}
      style={{borderTop: "none", width: '23%'}}
    >
      {filtredArrTwo ? filtredArrTwo.map((item: any) => (
          <Select.Option key={item.key} value={item.key}>
            {item.title}
          </Select.Option>
        ))
      : (
        ''
      )}
    </Select>
    <Select
      showSearch
      placeholder="filter"
      value={filtredThree}
      onChange={setFiltredThree}
      style={{borderTop: "none", width: '46%'}}
    >
      {filtredArrThree ? filtredArrThree.map((item: any) => (
          <Select.Option key={item.key} value={item.key}>
            {item.title}
          </Select.Option>
        ))
      : (
        ''
      )}
    </Select>
    </>
  );
};

export default DsConstructor
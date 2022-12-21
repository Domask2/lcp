import React, { useEffect, useState } from 'react';
import { Col, Row, Select } from 'antd';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { RootState } from '../../redux/redux.store';
import { getAppDb } from '../../redux/app/app.selector';
import { getDataSourcesAll } from '../../redux/ds/ds.selector';


const Test: React.FC = () => {
  
  const [count, setCount] = useState(0);

  const hadler = () => {
    setCount(prevState => prevState-1);
    setCount(prevState => prevState+3);
    // setCount(prevState => prevState+1);
    // setCount(prevState => prevState+1);
  }
  const hadler2 = () => {
    setCount(count-1)
  }


  return <>
      <button onClick={hadler}>+</button>
      {count}
      <button onClick={hadler2}>-</button>
  </>

};

export default Test
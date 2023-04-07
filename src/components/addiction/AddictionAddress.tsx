import React, {useEffect, useState} from 'react';
import {useTypedSelector} from '../../hooks';
import {getCurrentPage} from '../../redux/project/project.selector';
import {getDataSourceLs, getDataSourceLsVars, getDataSourcesAll} from '../../redux/ds/ds.selector'
import {AddictionsChoiceType, TypeAddictions} from '../../utils';

import {Button, Select} from 'antd';
import {ClearOutlined} from '@ant-design/icons';

import {RootState} from '../../redux/redux.store';
import {IAddictions} from '../../redux/project/project.initial';

type AddressInputType = {
    setAddiction: (v: any) => void
    addiction: IAddictions,
}

const AddressInput: React.FC<AddressInputType> = ({setAddiction, addiction}) => {

    // const currentPage = useTypedSelector((state: RootState) => getCurrentPage(state))
    const varsKeys = useTypedSelector((state: RootState) => getDataSourceLsVars(state))
    // const varsKeys = Object.keys(ls.vars)
    const [address, setAddress] = useState<string>();
    const allDS = useTypedSelector((state: RootState) => getDataSourcesAll(state));
    const [currentDsArray, setCurrentDsArray] = useState<any>(allDS && Object.keys(allDS));
    const startedArr = allDS && Object.keys(allDS)

    // обработка события выбора значения из селекта
    // при начальном выборе записывается ds
    // при наличии ds проверяем choiceType и записываем либо dsKey либо перезаписываем ds
    const handleSelectValue = (value: string) => {
        if (!addiction.ds) {
            setAddiction((prevState: IAddictions) => {
                return {
                    ...prevState,
                    ds: value,
                }
            })
        } else {
            if (addiction.choice === AddictionsChoiceType.ITEM.value || addiction.choice === TypeAddictions.DS.value || addiction.choice === TypeAddictions.NOT_DS.value || addiction.choice === AddictionsChoiceType.LS_VARS.value) {
                setAddiction((prevState: IAddictions) => {
                    return {
                        ...prevState,
                        ds: value,
                        dsKey: '',
                    }
                })
            } else {
                setAddiction((prevState: IAddictions) => {
                    return {
                        ...prevState,
                        dsKey: value,
                    }
                })
            }
        }
    }

    const handleClean = () => {
        setAddiction((prevState: IAddictions) => {
            return {
                ...prevState,
                ds: '',
                dsKey: '',
            }
        })
        setAddress('');
        setCurrentDsArray(startedArr)
    }

    useEffect(() => {
        setAddress(addiction.dsKey ? `${addiction.ds}:${addiction.dsKey}` : addiction.ds)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [addiction.ds, addiction.dsKey])

    // формируем массив значений для выбора, в зависимости от типа зависимости)))
    useEffect(() => {
        switch (addiction.choice) {
            case AddictionsChoiceType.ITEM.value:
                setCurrentDsArray(startedArr);
                break;
            case AddictionsChoiceType.PROP.value:
                addiction.ds && allDS[addiction.ds] && setCurrentDsArray(Object.keys(allDS[addiction.ds]))
                break;
            case AddictionsChoiceType.KEY.value:
                setCurrentDsArray(addiction.ds ? allDS[addiction.ds]?.columns : startedArr);
                break;
            case TypeAddictions.DS.value:
                setCurrentDsArray(startedArr);
                break;
            case TypeAddictions.NOT_DS.value:
                setCurrentDsArray(startedArr);
                break;
            case AddictionsChoiceType.LS_VARS.value:
                setCurrentDsArray(varsKeys);
                break;
            default:
                setCurrentDsArray(addiction.ds ? allDS[addiction.ds]?.columns : startedArr);
                break;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [addiction.choice, addiction.ds])

    return (
        <>
            <Select
                showSearch
                placeholder="Выбор источника"
                defaultValue={address}
                value={address && address}
                onChange={handleSelectValue}
                style={{borderTop: "none", width: '90%'}}
            >
                {currentDsArray && currentDsArray.map((item: any) => (
                    <Select.Option key={item?.key ? item.key : item} value={item?.key ? item.key : item}>
                        {item?.title ? item.title : item}
                    </Select.Option>

                ))}
            </Select>
            <Button type="link" onClick={handleClean} icon={<ClearOutlined />} />
        </>

    )
};

export default AddressInput;
import React, {useEffect, useState} from 'react';
import {Col, Row, Select, Typography} from "antd";
import ObjectFixedEditor from "../Editor/Elements/ObjectFixedEditor";
import {useTypedSelector} from '../../../hooks/useTypedSelector';
import {RootState} from '../../../redux/redux.store';
import {getDataSource, getDataSourcesAll} from '../../../redux/ds/ds.selector';
import {IForm} from '../Page/templates';

const formItems = ["Input", "DatePicker", "RangePicker", "Select", "Checkbox", "Hidden", "DetailsPicker"]
const {Text} = Typography;

type FormItemEditType = {
    item: any
    setItem: (p: any) => void
    cmp?: IForm
}
const DetailsPickerEdit: React.FC<FormItemEditType> = ({item, setItem, cmp}) => {

    const dsArr = useTypedSelector((state: RootState) => getDataSourcesAll(state))

    const [currentItem, setcurrentItem] = useState({...item})
    const [prp, setPrp] = useState({...item.props})
    const [source, setSource] = useState(item.source ? item.source : '')
    const [keys, setKeys] = useState(item.keys ? item.keys : [])
    const [actualKey, setActualKey] = useState(item.actualKey ? item.actualKey : '')
    const [initialKey, setInitialKey] = useState(item.initialKey ? item.initialKey : [])

    const dataSource = useTypedSelector((state: RootState) => getDataSource(state, currentItem?.source));
    const initialDataSource = useTypedSelector((state: RootState) => getDataSource(state, cmp?.source));

    useEffect(() => {
        currentItem.props = prp
        currentItem.keys = keys
        currentItem.source = source
        currentItem.actualKey = actualKey
        currentItem.initialKey = initialKey
        // currentItem.extComponent = extComponent

        setItem(currentItem)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentItem, prp, keys, actualKey, source, initialKey])

    const handleSetSource = (e: any) => {
        setSource(e);
        setKeys([]);
        setActualKey('');
    }

    function renderRows(arr: any[], value: any, setValue: (p: any) => void, title: string, multiple: boolean = false) {
        return (
            <Row >
                <Col flex='60px'
                    className={''}>
                    <Text>{title}</Text>
                </Col>

                <Col flex="auto">
                    <Select
                        mode={multiple ? 'multiple' : undefined}

                        style={{
                            width: '100%',
                            borderBottom: '1px solid #eee',
                            backgroundColor: '#fff'
                        }}
                        bordered={false}
                        size="small"
                        onChange={setValue}
                        value={value}
                    >
                        {
                            arr.map((item: any, index: any) =>
                                <Select.Option key={index} value={item}>{item}</Select.Option>)
                        }
                    </Select>
                </Col>
            </Row>
        )

    }
    return <>
        <ObjectFixedEditor object={currentItem}
            setObject={setcurrentItem}
            template={
                {
                    primaries: {
                        type: 'boolean',
                        title: 'primary',
                        widthLabel: '60px',
                    },
                    type: {
                        type: 'select',
                        title: 'type',
                        widthLabel: '60px',
                        items: formItems,
                    },
                    block: {
                        type: 'string',
                        title: 'block',
                        description: '[-] дефис вначале сделает невидимым название блока',
                        widthLabel: '60px',
                    },
                    ext: {
                        type: 'string',
                        title: 'ext',
                        widthLabel: '60px',
                    },
                    header: {
                        type: 'string',
                        title: 'header',
                        widthLabel: '60px',
                    },
                }
            } />
        <ObjectFixedEditor object={prp}
            setObject={setPrp}
            template={
                {
                    label: {
                        type: 'string',
                        title: 'label',
                        widthLabel: '60px'
                    },
                    name: {
                        type: 'string',
                        title: 'name',
                        widthLabel: '60px'
                    },
                }
            } />

        {renderRows(Object.keys(dsArr), source, handleSetSource, 'source')}
        {dataSource && renderRows(dataSource?.columns?.map((item) => item.key), actualKey, setActualKey, 'actualKey')}
        {dataSource && renderRows(dataSource?.columns?.map((item) => item.key), keys, setKeys, 'keys', true)}
        {initialDataSource && renderRows(initialDataSource?.columns?.map((item) => item.key), initialKey, setInitialKey, 'initialKey', true)}

    </>
};

export default DetailsPickerEdit;
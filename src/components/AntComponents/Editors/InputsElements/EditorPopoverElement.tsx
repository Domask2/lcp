import React, {useEffect, useState} from "react";
import {Button, Checkbox, Popover, Select, Space} from 'antd';
import {ClearOutlined, FieldStringOutlined} from '@ant-design/icons';
import {useTypedSelector} from "../../../../hooks";
import {RootState} from "../../../../redux/redux.store";
import {getDataSourceLsVars, getDataSourcesAll} from "../../../../redux/ds/ds.selector";
import AntIcon from "../../Icon/AntIcon";
import {IconsArray} from "../../../../utils";
import Circle from "react-color/lib/components/circle/Circle";

type PopoverType = {
    setValue: any
    value?: any
}

const EditorPopoverElement: React.FC<PopoverType> = ({setValue, value}) => {

    const [open, setOpen] = useState(false);
    const [check, setCheck] = useState(false);

    const [source, setSource] = useState('');
    const [dsLsList, setDsLsList] = useState<any>([]);
    const [ds, setDs] = useState('');
    const [keysList, setKeysList] = useState([]);
    const [key, setKey] = useState('');
    const [icon, setIcon] = useState('');
    const [color, setColor] = useState<any>('');

    const allDs: any = useTypedSelector((state: RootState) => getDataSourcesAll(state));
    const lsVars: any = useTypedSelector((state: RootState) => getDataSourceLsVars(state));

    useEffect(() => {
        setKeysList(allDs[ds] && allDs[ds].items[0] && Object.keys(allDs[ds].items[0]));
        key && setKey('')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ds]);

    useEffect(() => {
        if (ds && key) {
            setValue(` [[ds:${ds}:first:${key}]] `);
            setDs('');
        }
        if (source === 'LsVars') {
            ds && setValue(` [[lsVars:${ds}]] `);
            setDs('');
        }
        if (icon && (color || check)) {
            setValue(` <<icon:${icon}:15px:${color}>> `);
            setIcon('');
            setColor('')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ds, key, icon, color]);

    const changeSourceHandler = (value: any) => {
        setSource(value)
        switch (value) {
            case 'DS':
                setDsLsList(allDs && Object.keys(allDs));
                break;
            case 'LsVars':
                setDsLsList(lsVars && Object.keys(lsVars));
                break;

            default:
                break;
        }
        setDs('');
        setKey('');
    };

    const hadleCheckboxChange = (e: any) => {
        setCheck(e);
    };

    const content = <>
        <Space>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <Select
                    showSearch
                    style={{
                        minWidth: '80px',
                    }}
                    size="small"
                    onChange={(e) => changeSourceHandler(e)}
                    value={source}
                >
                    <Select.Option key={'DS'} value={'DS'}>DS</Select.Option>
                    <Select.Option key={'LsVars'} value={'LsVars'}>LsVars</Select.Option>
                    <Select.Option key={'Icons'} value={'Icons'}>Icons</Select.Option>
                </Select>
                {source === 'Icons' && <Checkbox checked={check} style={{marginTop: '5px'}} onChange={(e) => hadleCheckboxChange(e.target.checked)}>Без цвета</Checkbox>}
            </div>
            :
            {source === 'Icons' ? (
                <>
                    <div style={{width: '200px'}}> {IconsArray.map((icon: string) => {
                        return (
                            <Button
                                key={icon}
                                size="small"
                                onClick={() => setIcon(icon)}
                            >
                                <AntIcon name={icon} style={{color: '#1890ff'}} />
                            </Button>
                        )
                    })}
                    </div>
                    <Circle
                        color={color}
                        colors={["#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4", "#009688", "#4caf50", "#8bc34a", "#cddc39", "#ffeb3b", "#ffc107", "#ff9800", "#ff5722", "#795548", "#607d8b"]}
                        onChangeComplete={(e: any) => setColor(e.hex)}
                    />
                </>
            ) : (
                <>
                    <Select
                        showSearch
                        style={{
                            minWidth: '150px',
                        }}
                        size="small"
                        onChange={setDs}
                        value={ds}
                    >
                        {
                            dsLsList && dsLsList.map((item: any, index: any) =>
                                <Select.Option key={`${item}_${index}`} value={item}>{item}</Select.Option>)
                        }
                    </Select>
                    <Button
                        type="link"
                        style={{marginLeft: '-10px'}}
                        onClick={() => setDs('')}
                        icon={<ClearOutlined />}
                    />
                </>
            )}
        </Space>
        {source === 'DS' && <Space>
            <span>Key: </span>
            <Select
                showSearch
                style={{
                    minWidth: '100px',
                }}
                size="small"
                onChange={setKey}
                value={key}
            >
                {
                    keysList && keysList.map((item: any, index: any) =>
                        <Select.Option key={`${item?.key ? item.key : item}_${index}`} value={item.key ? item.key : item}>{item.title ? item.title : item}</Select.Option>)
                }
            </Select>
            <Button
                type="link"
                style={{marginLeft: '-10px'}}
                onClick={() => setKey('')}
                icon={<ClearOutlined />}
            />
        </Space>}
    </>

    return <>
        <Popover
            placement="left"
            trigger="click"
            content={content}
            open={open}
            onOpenChange={setOpen}
        >
            <Button
                type="link"
                // onClick={() => setValue(props.startValue)}
                icon={<FieldStringOutlined />}
            />
        </Popover>

    </>
}

export default EditorPopoverElement
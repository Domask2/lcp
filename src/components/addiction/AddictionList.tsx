import {Button, Form, Input, Popconfirm, Space} from 'antd';
import React from 'react';
import Text from "antd/es/typography/Text";
import {useTypedSelector} from '../../hooks/useTypedSelector';
import {RootState} from '../../redux/redux.store';
import {getCurrentProject} from '../../redux/project/project.selector';
import {DeleteOutlined} from "@ant-design/icons";
import {useActions} from '../../hooks/useActions';
import {IAddictions} from '../../redux/project/project.initial';
import {addictionTemplate} from '../../utils';

type AddictionListType = {
    setCurrentAddiction: (v: IAddictions) => void
    setCurrentAddictionIndex: (v: number | '') => void
    cmp: any
    currentAddictionIndex: number | ''
    updateAddictionsArray: any
}

const AddictionList: React.FC<AddictionListType> = ({setCurrentAddictionIndex, setCurrentAddiction, cmp, currentAddictionIndex, updateAddictionsArray}) => {

    const {saveProject} = useActions();

    const currentProject = useTypedSelector((state: RootState) => getCurrentProject(state));
    const additionsArr = currentProject?.addictions

    const cptStyle = {
        padding: '4px 11px',
        backgroundColor: '#fffbdf',
        border: '1px solid #ddd'
    }
    const greenStyle = {
        cursor: 'pointer',
        backgroundColor: 'lightgreen'
    }

    const getCurrentAddictIndex = (itemIndex: any, indexArr: any) => {

        let result = false
        if (Array.isArray(indexArr)) {

            indexArr.forEach((item: number) => {
                if (itemIndex === item) {
                    result = true
                    return
                }
            })
        } else if (typeof indexArr === 'number') {
            return itemIndex === indexArr
        }
        return result
    }

    const onFocus = (index: number) => {
        setCurrentAddictionIndex(index);
        currentProject?.addictions && setCurrentAddiction(currentProject.addictions[index]);
    }

    const deleteFnc = (index: number) => {
        currentProject?.addictions?.splice(index, 1);
        currentProject && saveProject(currentProject);
        setCurrentAddictionIndex('');
        setCurrentAddiction(addictionTemplate)
        updateAddictionsArray()
    }

    return (<>
        <p>Сохраненные зависимости:</p>
        <Form.Item >
            <Input.Group compact>
                <Text style={{...cptStyle, width: '25%'}}>title</Text>
                <Text style={{...cptStyle, width: '10%'}}>type</Text>
                <Text style={{...cptStyle, width: '10%'}}>choice</Text>
                <Text style={{...cptStyle, width: '25%'}}>ds</Text>
                <Text style={{...cptStyle, width: '10%'}}>dsKey</Text>
                <Text style={{...cptStyle, width: '10%'}}>value</Text>
            </Input.Group>
            {
                additionsArr && additionsArr.map((item: any, index: number) => <><Input.Group onFocus={() => onFocus(index)} key={index} compact>
                    <Input style={getCurrentAddictIndex(index, currentAddictionIndex) ? {...greenStyle, borderTop: "none", width: '25%'} : {borderTop: "none", width: '25%', cursor: 'pointer'}}
                        name={"addition:" + index + ":title"}
                        value={item?.title} />
                    <Input style={getCurrentAddictIndex(index, currentAddictionIndex) ? {...greenStyle, borderTop: "none", width: '10%'} : {borderTop: "none", width: '10%', cursor: 'pointer'}}
                        name={"addition:" + index + ":type"}
                        value={item?.type} />
                    <Input style={getCurrentAddictIndex(index, currentAddictionIndex) ? {...greenStyle, borderTop: "none", width: '10%'} : {borderTop: "none", width: '10%', cursor: 'pointer'}}
                        name={"addition:" + index + ":choice"}
                        value={item?.choice} />
                    <Input style={getCurrentAddictIndex(index, currentAddictionIndex) ? {...greenStyle, borderTop: "none", width: '25%'} : {borderTop: "none", width: '25%', cursor: 'pointer'}}
                        name={"addition:" + index + ":ds"}
                        value={item?.ds} />
                    <Input style={getCurrentAddictIndex(index, currentAddictionIndex) ? {...greenStyle, borderTop: "none", width: '10%'} : {borderTop: "none", width: '10%', cursor: 'pointer'}}
                        name={"addition:" + index + ":dsKey"}
                        value={item?.dsKey} />
                    <Input style={getCurrentAddictIndex(index, currentAddictionIndex) ? {...greenStyle, borderTop: "none", width: '10%'} : {borderTop: "none", width: '10%', cursor: 'pointer'}}
                        name={"addition:" + index + ":value"}
                        value={item?.value} />
                    <Popconfirm placement="left" title={`${item?.key} - Точно удалить?`}
                        onConfirm={() => deleteFnc(index)} okText="Yes" cancelText="No">
                        <Button type="link" style={{width: '8%'}} danger icon={<DeleteOutlined />} />
                    </Popconfirm>
                </Input.Group>
                    {getCurrentAddictIndex(index, currentAddictionIndex) && item.page?.length ? <Space style={{fontWeight: 400, fontSize: '12px', padding: '5px', border: '1px solid #d9d9d9', borderTop: 'none', width: '89.5%'}}>{item.page.join(' || ')}</Space> : <></>}
                </>)
            }
        </Form.Item>
    </>
    )
};

export default AddictionList;
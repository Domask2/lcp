import React, {useState} from 'react';
import {useTypedSelector} from '../../hooks';
import {getCurrentProject} from '../../redux/project/project.selector';
import AddictionModal from './AddictionModal';

import {Button, Col, Popconfirm, Select} from 'antd';
import {ControlOutlined, DeleteOutlined} from '@ant-design/icons';

// import {IAddictions} from '../../redux/project/project.initial';
import {RootState} from '../../redux/redux.store';

type AddictionsSelectType = {
    setState: (v: any) => void
    cmp: any
    addictionId?: any
    title?: boolean
}

const AddictionContainer: React.FC<AddictionsSelectType> = ({cmp, setState, addictionId, title = true}) => {

    const currentProject = useTypedSelector((state: RootState) => getCurrentProject(state));
    const projectAddictions: any = currentProject?.addictions ? currentProject.addictions : []
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentAddictions, setCurrentAddictions] = useState<any>(addictionId);

    // в addiction компонента записывается массив id зависимости
    // в дальнейшем при изменении зависимости в конструкторе,
    // меняется поведение всех компонентов
    // к которым данная зависимость подключена
    const handleSelectMultiple = (value: any) => {
        const indexArr = value.map((num: any) => {
            return projectAddictions.findIndex((item: any) => item.id == num)
        })

        projectAddictions.forEach((item: any, index: number) => {
            let pageKeys = item.page ? item.page : []
            pageKeys = pageKeys.filter((item: any) => item !== `${cmp.page_key}_${cmp.key}`)
            if (indexArr.includes(index)) {
                pageKeys.push(`${cmp.page_key}_${cmp.key}`)
                // pageKeys.push(`${cmp.page_key}`)
            }
            projectAddictions[index] = {
                ...projectAddictions[index],
                page: pageKeys
            }
        })
        if (currentProject) {
            currentProject.addictions = currentProject?.addictions && [
                ...projectAddictions
            ]
        }
        setState(value);
        setCurrentAddictions(value)
    }
    const updateAddictionsArray = () => {
        setState(addictionId.filter((id: number) => {
            return projectAddictions?.filter((item: any) => item.id === id).length
        }))
        setCurrentAddictions(addictionId.filter((id: number) => {
            return projectAddictions?.filter((item: any) => item.id === id).length
        }))
    }

    const deleteAddiction = () => {
        setState([]);
        setCurrentAddictions([])
        handleSelectMultiple([])
    }


    return (<Col style={{width: '100%'}}>
        {title && <span>Выбор зависимости: </span>}
        <Select
            showSearch
            mode='multiple'
            placeholder="Зависимость"
            value={currentAddictions}
            onChange={handleSelectMultiple}
            style={{borderTop: "none", minWidth: 'calc(100% - 60px)'}}
        >
            {currentProject?.addictions && Object.values(currentProject.addictions).map((item: any) => (

                <Select.Option key={item.title} value={item.id ? item.id : '1'}>
                    {item.title}
                </Select.Option>

            ))}
        </Select>
        <Button aria-label='настройки' title='настройки' type='link' icon={<ControlOutlined />} onClick={() => {
            setIsModalVisible(true)
        }} />
        <Popconfirm placement="left" title={'Точно удалить зависимость?'}
            onConfirm={deleteAddiction} okText="Yes" cancelText="No">
            <Button danger type="link" icon={<DeleteOutlined />} style={{width: '16px'}} disabled={!addictionId?.length} />
        </Popconfirm>

        {isModalVisible && <AddictionModal updateAddictionsArray={updateAddictionsArray} setView={setIsModalVisible} cmp={cmp} />}
    </Col>
    )
};

export default AddictionContainer;
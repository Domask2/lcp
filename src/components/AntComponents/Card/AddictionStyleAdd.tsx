import React, {useState} from 'react';
import {useData} from "./AddictionStyleContext";
import EditStyle from "../Editor/Components/EditStyle";
import {Button, Select} from "antd";
import {IAddictions, IAddictionStyleArray} from "../../../redux/project/project.initial";
import styles from './AddictionStyle.module.css';

const AddictionStyleAdd = () => {
    const {setAddictionStyleArray, cmp, currentProject} = useData();
    const [newAddiction, setNewAddiction] = useState('');
    const [addictionStyle, setAddictionStyle] = useState({});

    const addictionStylesArraySelect = currentProject?.addictions.filter((addict: IAddictions) => cmp.addiction.includes(addict.id))

    const clearState = () => {
        setNewAddiction('');
        setAddictionStyle({});
    }

    const addStyleAddiction = () => {
        if (newAddiction && addictionStyle) {
            setAddictionStyleArray((addictStyleArr: IAddictionStyleArray[]) => {
                let arr: any[] = [...addictStyleArr];
                arr.push({
                    id: newAddiction,
                    style: addictionStyle
                })

                return arr
            })

            clearState();
        }
    }

    return (
        <div>
            <h3>Добавить зависимость и стили</h3>

            <Select
                showSearch
                placeholder="Зависимость"
                value={newAddiction}
                onChange={setNewAddiction}
                className={styles.select_addictionAdd}
            >
                {addictionStylesArraySelect && addictionStylesArraySelect.map((item: any) => (
                    <Select.Option key={item.title} value={item.id ? item.id : '1'}>
                        {item.title}
                    </Select.Option>
                ))}
            </Select>

            <EditStyle style={addictionStyle} setStyle={setAddictionStyle}/>

            <Button className={styles.button_addictionAdd} onClick={addStyleAddiction}>Добавить зависимость</Button>
        </div>
    );
}

export default AddictionStyleAdd;
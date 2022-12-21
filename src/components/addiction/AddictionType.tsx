import {Input, Select} from 'antd';
import React from 'react';
import {IAddictions} from '../../redux/project/project.initial';
import {AddictionsChoiceType, TypeAddictions} from '../../utils';

type TypeInputType = {
    setAddiction: (v: any) => void
    addiction: IAddictions
    validate: boolean
}

const TypeInput: React.FC<TypeInputType> = ({setAddiction, addiction, validate}) => {

    const handleSelectType = (value: string) => {

        setAddiction((prevState: IAddictions) => {
            return {
                ...prevState,
                type: value,
                value: '',
                choice: prevState.choice ? prevState.choice : AddictionsChoiceType.KEY.value,
            }
        })

        if (value === TypeAddictions.DS.value || value === TypeAddictions.NOT_DS.value) {
            setAddiction((prevState: IAddictions) => {
                return {
                    ...prevState,
                    value: '',
                    choice: value,
                    dsKey: '',
                }
            })
        } else {
            setAddiction((prevState: IAddictions) => {
                return {
                    ...prevState,
                    value: '',
                    choice: '',
                }
            })
        }
    }

    const handleSelectChoice = (value: string) => {
        setAddiction((prevState: IAddictions) => {
            return {
                ...prevState,
                choice: value,
                dsKey: ''
            }
        })
    }

    const handleInput = (evt: any) => {
        setAddiction((prevState: IAddictions) => {
            return {
                ...prevState,
                [evt.target.name]: evt.target.value,
            }
        })
    }

    const setChoiceArray = () => {
        let array: any = Object.values(AddictionsChoiceType);

        if (addiction.type === TypeAddictions.DS.value) {

            array = []
        }
        return array
    }

    return (
        <div style={{marginBottom: '10px'}}>
            <Input
                value={addiction.title && addiction.title}
                name='title'
                placeholder='Addiction name'
                style={validate ? {width: '25%'} : {width: '25%', borderColor: 'red'}}
                onChange={handleInput}
            />
            <Select
                showSearch
                placeholder="Type"
                value={addiction.type && addiction.type}
                onChange={handleSelectType}
                style={{borderTop: "none", width: '15%'}}
            >
                {Object.values(TypeAddictions).map((item: any) => (
                    <Select.Option key={item.value} value={item.value}>
                        {item.title}
                    </Select.Option>

                ))}
            </Select>
            <Select
                showSearch
                value={addiction.choice && addiction.choice}
                placeholder="Choice"
                onChange={handleSelectChoice}
                style={{borderTop: "none", width: '25%'}}
            >
                {setChoiceArray().map((item: any) => (
                    <Select.Option key={item.value} value={item.value}>
                        {item.title}
                    </Select.Option>

                ))}
            </Select>
            <Input
                value={addiction.value && addiction.value}
                name='value'
                placeholder="Value"
                style={{width: '25%'}}
                onChange={handleInput}
            />
        </div>
    )
};

export default TypeInput;
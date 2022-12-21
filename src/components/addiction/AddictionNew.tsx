import React, {useEffect, useState} from 'react';
import {useTypedSelector, useActions} from '../../hooks';
import {getCurrentProject} from '../../redux/project/project.selector';
import {AddictionsChoiceType, addictionTemplate} from '../../utils';

import AddressInput from './AddictionAddress';
import TypeInput from './AddictionType';

import {Button, Form} from 'antd';
import {RootState} from '../../redux/redux.store';
import {IAddictions} from '../../redux/project/project.initial';

type AddictionNewType = {
    setCurrentAddiction: (v: IAddictions) => void
    cmp: any
    currentAddiction: IAddictions | undefined
    currentAddictionIndex: number | ''

}

const AddictionNew: React.FC<AddictionNewType> = ({cmp, currentAddiction, currentAddictionIndex, setCurrentAddiction}) => {
    const {saveProject} = useActions();
    const currentProject = useTypedSelector((state: RootState) => getCurrentProject(state));

    const [addictionObj, setAddictionObj] = useState<IAddictions>(addictionTemplate);
    const [validate, setValidate] = useState<boolean>(false);

    const handleOk = () => {
        setAddictionObj((prevState: any) => {
            return {
                ...prevState,
                choice: !addictionObj.choice ? addictionObj.dsKey ? AddictionsChoiceType.KEY.value : AddictionsChoiceType.ITEM.value : addictionObj.choice,
                id: Math.floor(Math.random() * 1000000000),
                page: []
            }
        });
        setCurrentAddiction(addictionTemplate)
    }

    const handleRedact = () => {
        if (currentProject) {
            currentProject.addictions = currentProject?.addictions && [...currentProject.addictions.slice(0, +currentAddictionIndex), addictionObj, ...currentProject.addictions.slice(+currentAddictionIndex + 1)];
            saveProject(currentProject)
            handlerClean();
            setCurrentAddiction(addictionTemplate)
        }
    }

    const handlerClean = () => {
        setAddictionObj(addictionTemplate)
    }

    useEffect(() => {
        if (!currentAddiction?.id && addictionObj.id) {
            if (currentProject) {
                currentProject.addictions = currentProject?.addictions?.length ? [...currentProject.addictions, addictionObj] : [addictionObj];
                saveProject(currentProject);
                handlerClean();
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [addictionObj.id])

    useEffect(() => {
        if (addictionObj.title) {
            setValidate(!Boolean(currentProject?.addictions?.filter((item: any) => item.title === addictionObj.title.trim()).length));
        } else {
            setValidate(!!addictionObj.title)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [addictionObj.title, currentProject?.addictions?.length])

    useEffect(() => {
        if (currentAddiction) {
            setAddictionObj({...currentAddiction})
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentAddiction])

    return (
        <Form>
            <p>Новая зависимость</p>
            <div>
                <TypeInput
                    setAddiction={setAddictionObj}
                    addiction={addictionObj}
                    validate={validate}
                />
                <AddressInput
                    setAddiction={setAddictionObj}
                    addiction={addictionObj}
                />
            </div>
            <br />
            <Button style={{marginRight: '20px'}} type="primary" onClick={handleOk} disabled={!validate}>
                Создать
            </Button>
            <Button style={{marginRight: '20px'}} type="ghost" onClick={handleRedact} disabled={!currentAddiction}>
                Редактировать
            </Button>
        </Form>
    )
};

export default AddictionNew;
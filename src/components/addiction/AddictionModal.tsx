import {Modal} from 'antd';
import React, {useState} from 'react';
import AddictionNew from './AddictionNew';
import AddictionList from './AddictionList';
import {IAddictions} from '../../redux/project/project.initial';
import {useTypedSelector} from '../../hooks/useTypedSelector';
import {RootState} from '../../redux/redux.store';
import {getCurrentProject} from '../../redux/project/project.selector';
import {addictionTemplate} from '../../utils';

type AddictionModalType = {
    setView: (v: boolean) => void
    cmp: any
    addictionId?: number | ''
    updateAddictionsArray: any
}

const AddictionModal: React.FC<AddictionModalType> = ({updateAddictionsArray, setView, cmp}) => {

    // const currentProject = useTypedSelector((state: RootState) => getCurrentProject(state));

    // const [currentAddiction, setCurrentAddiction] = useState<IAddictions>(currentProject?.addictions ? currentProject.addictions.filter((item: IAddictions) => item.id === addictionId)[0] : addictionTemplate);
    // const [currentAddictionIndex, setCurrentAddictionIndex] = useState<number | ''>(currentProject?.addictions ? currentProject.addictions.findIndex((item: IAddictions) => item.id === addictionId) : -1);

    const currentProject = useTypedSelector((state: RootState) => getCurrentProject(state));
    const addictionId = cmp?.addiction ? Array.isArray(cmp?.addiction) ? cmp?.addiction : [cmp?.addiction] : [];

    const [currentAddiction, setCurrentAddiction] = useState<IAddictions>(currentProject?.addictions ? currentProject.addictions.filter((item: IAddictions) => item.id === addictionId)[0] : addictionTemplate);

    const [currentAddictionIndex, setCurrentAddictionIndex] = useState<any>(currentProject?.addictions && addictionId?.map((addictId: number) => currentProject?.addictions.findIndex((item: any) => item.id === addictId)));

    const handleCancel = () => {
        setView(false)
    }

    return (<Modal
        width={1000}
        style={{top: 0}}
        bodyStyle={{border: '5px solid #ba5fff', borderWidth: '7px 0 0 0'}}
        open={true}
        onCancel={handleCancel}
        footer={false}
    >
        <h3>Настройка Зависимостей</h3>

        <AddictionList
            cmp={cmp}
            currentAddictionIndex={currentAddictionIndex}
            setCurrentAddiction={setCurrentAddiction}
            setCurrentAddictionIndex={setCurrentAddictionIndex}
            updateAddictionsArray={updateAddictionsArray}
        />
        <AddictionNew
            cmp={cmp}
            currentAddiction={currentAddiction}
            currentAddictionIndex={currentAddictionIndex}
            setCurrentAddiction={setCurrentAddiction}
        />
        <br />

    </Modal>)

};

export default AddictionModal;
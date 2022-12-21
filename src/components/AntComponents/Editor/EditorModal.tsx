import React from 'react';
import {ComponentInterface} from "../Page/templates";
import {Modal} from "antd";
import MainEdit from '../Editors/MainEditor';

type EditorModalType = {
    cmp: ComponentInterface
    setVisible: (v: boolean) => void
}
const EditorModal: React.FC<EditorModalType> = ({cmp, setVisible}) => {

    return <Modal
        width={1250}
        open={true}
        style={{top: 0}}
        bodyStyle={{border: '5px solid #ba5fff', borderWidth: '7px 0 0 0'}}
        footer={false}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
    >
        <MainEdit cmp={cmp} setVisible={setVisible} />
    </Modal>
}

export default EditorModal
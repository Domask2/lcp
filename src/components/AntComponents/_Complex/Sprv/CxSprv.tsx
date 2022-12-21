import React, {useState} from 'react';
import {Button, Modal} from "antd";
import Editor from "../../Editor/Editor";
import {ComponentInterface, IModal} from "../../Page/templates";
import Master from "../../Master";

/**
 * не применяется нигде
 */
type AntModalType = {
    cmp: IModal
    props: any
}
const CxSprv: React.FC<AntModalType> = ({cmp, props}) => {
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return <>
        <Button {...cmp.button} onClick={showModal}>
            {cmp.button.title}
        </Button>&nbsp;<Editor cmp={cmp} />
        <Modal title={cmp.caption} open={isModalVisible}
            style={cmp.style}
            bodyStyle={cmp.bodyStyle}
            maskStyle={cmp.maskStyle}
            footer={false}
            onOk={handleOk} onCancel={handleCancel}>
            {cmp.children.map((item: ComponentInterface) =>
                <Master key={item.key} cmp={{...item, page_key: cmp.page_key, ext: cmp.ext}} props={props} />)}
        </Modal>
    </>
};

export default CxSprv;
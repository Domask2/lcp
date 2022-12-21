import React, {memo, useEffect, useState} from "react";
import {useTypedSelector, useActions} from "../../../hooks";
import {getLsVars, getMappedText} from "../../../redux/ds/ds.selector";

import Master from "../Master";
import Mapped from "../Mapped";
import Editor from "../Editor/Editor";

import {Button, Modal} from "antd";
import {ComponentInterface, IModal} from "../Page/templates";
import {RootState} from "../../../redux/redux.store";

type AntModalType = {
    cmp: IModal
    maskClosable?: boolean
    props: any
    open?: boolean
}

const AntModal: React.FC<AntModalType> = ({cmp, props, maskClosable = true, open}) => {

    const {setLsVars} = useActions()
    const lsVars = useTypedSelector((state: RootState) => getLsVars(state));
    const button_title = useTypedSelector((state: RootState) => getMappedText(state, cmp.button.title))
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    // const mappedCaption = useTypedSelector((state: RootState) => getMappedText(state, cmp.caption ? cmp.caption : ''))

    const showModal = () => {
        setIsModalVisible(true);
        cmp.adKey && setLsVars(cmp.adKey, true);
    };

    const handleOk = (e: any) => {
        setIsModalVisible(false);
    };

    const handleCancel = (e: any) => {
        setIsModalVisible(false);
    };

    useEffect(() => {
        cmp.adKey && setLsVars(cmp.adKey, false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (cmp.adKey) {
            setIsModalVisible(lsVars[cmp.adKey])
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cmp.adKey && lsVars[cmp.adKey]])

    return <>
        <Editor cmp={cmp} />
        <Button {...cmp.button} onClick={() => {
            showModal();
        }}>
            <Mapped text={button_title} />
        </Button>
        {isModalVisible && (
            <Modal
                maskClosable={maskClosable}
                title={cmp.caption}
                open={true}
                style={cmp.style}
                bodyStyle={cmp.bodyStyle}
                maskStyle={cmp.maskStyle}
                footer={false}
                onOk={handleOk} onCancel={handleCancel}>
                {cmp.children.map((item: ComponentInterface) =>
                    <Master key={item.key} cmp={{...item, page_key: cmp.page_key, ext: cmp.ext}} props={props} />)}
            </Modal>
        )}
    </>
}

export default memo(AntModal)
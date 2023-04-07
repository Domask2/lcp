import React, {memo, useEffect, useState} from "react";
import {useTypedSelector, useActions} from "../../../hooks";
import {getDataSourceLsVarsByKey, getLsVars, getMappedText} from "../../../redux/ds/ds.selector";

import Master from "../Master";
import Mapped from "../Mapped";
import Editor from "../Editor/Editor";

import {Button, Modal} from "antd";
import {ComponentInterface, IModal} from "../Page/templates";
import {RootState} from "../../../redux/redux.store";
import {getEditMode} from "../../../redux/app/app.selector";
import AntButtonWrapper from "../Button/AntButtonWrapper";
import AntModalButtonWrapper from "./AntModalButtonWrapper";

type AntModalType = {
    cmp: IModal
    maskClosable?: boolean
    props: any
    open?: boolean
}

const AntModal: React.FC<AntModalType> = ({cmp, props, maskClosable = true, open}) => {
    const {setLsVars} = useActions()
    const lsVars = useTypedSelector((state: RootState) => getDataSourceLsVarsByKey(state, cmp.adKey));
    const button_title = useTypedSelector((state: RootState) => getMappedText(state, cmp.button.title))
    const [isModalVisible, setIsModalVisible] = useState<boolean>(lsVars);
    const editMode = useTypedSelector((state: RootState) => getEditMode(state));
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
            setIsModalVisible(lsVars)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lsVars])

    return <div style={editMode ? {
        position: 'relative',
        display: 'inline-flex',
    } : {}}>
        <Editor cmp={cmp} testEditorStyle={true} height='30px' />

        <AntModalButtonWrapper cmp={cmp} action={showModal} button_title={button_title}/>

        {isModalVisible && (
            <Modal
                maskClosable={maskClosable}
                title={cmp.caption}
                open={true}
                width={cmp?.style?.width ?? '520px'}
                style={cmp.style}
                bodyStyle={cmp.bodyStyle}
                maskStyle={cmp.maskStyle}
                footer={false}
                onOk={handleOk} onCancel={handleCancel}>
                {cmp.children.map((item: ComponentInterface) =>
                    <Master key={item.key} cmp={{...item, page_key: cmp.page_key, ext: cmp.ext}} props={props} />)}
            </Modal>
        )}
    </div>
}

export default memo(AntModal)
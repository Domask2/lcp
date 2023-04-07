import React, {useState} from 'react';
import {Button, Drawer} from "antd";
import {ComponentInterface, IDrawer} from "../Page/templates";
import Master from "../Master";
import Editor from "../Editor/Editor";
import Mapped from "../Mapped";
import {useTypedSelector} from "../../../hooks";
import {RootState} from "../../../redux/redux.store";
import {getMappedText} from "../../../redux/ds/ds.selector";

type AntDrawerType = {
    cmp: IDrawer
    props: any
}
const AndDrawer = ({cmp, props}: AntDrawerType) => {
    const [show, setShow] = useState(false)
    const mappedCaption = useTypedSelector((state: RootState) => getMappedText(state, cmp.button?.title ? cmp.button.title : ''))

    return <>
        <Editor cmp={cmp} />
        <Button type={cmp.button?.type} className={cmp.button.className} onClick={() => {setShow(true)}}>
            <Mapped text={mappedCaption} />
        </Button>
        <Drawer
            bodyStyle={cmp.bodyStyle}
            headerStyle={cmp.headStyle}
            {...cmp.props}
            placement="right"
            closable={true}
            onClose={() => {setShow(false)}}
            open={show}
            key={"placement"}
        >
            {cmp.children.map((item: ComponentInterface) =>
                <Master key={item.key} cmp={{...item, page_key: cmp.page_key, ext: cmp.ext}} props={props} />)}
        </Drawer>
    </>
};

export default AndDrawer;
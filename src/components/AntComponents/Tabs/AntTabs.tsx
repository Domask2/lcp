import {Tabs} from "antd";
import React from "react";
import Master from "../Master";
import {ITabs} from "../Page/templates";
import Editor from "../Editor/Editor";
import ScrollableAnchor from "react-scrollable-anchor";

const {TabPane} = Tabs;

type AntTabsType = {
    cmp: ITabs
    props: any
}
const AntTabs = ({cmp, props}: AntTabsType): any => {
    return <>
        {cmp.anchor && <ScrollableAnchor id={`${cmp.anchor}`}>
            <span></span>
        </ScrollableAnchor>}
        <Editor cmp={cmp} />
        <Tabs defaultActiveKey="1">
            {cmp.children.map((item: any) => <TabPane style={{padding: '8px'}} key={item.key} tab={item.title} {...item.props} >
                {item.children.map((item2: any) => <Master key={item2.key} cmp={item2} props={props} />)}
            </TabPane>)}
        </Tabs>
    </>
}

export default AntTabs
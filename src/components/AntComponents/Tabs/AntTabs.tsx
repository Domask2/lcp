import React, {useMemo} from "react";
import Editor from "../Editor/Editor";
import Master from "../Master";
import {Tabs} from "antd";
import {ITabs} from "../Page/templates";
import ScrollableAnchor from "react-scrollable-anchor";

// const {TabPane} = Tabs;

type AntTabsType = {
    cmp: ITabs
    props: any
}

const AntTabs = ({cmp, props}: AntTabsType): any => {

    const items = useMemo(() => {
        return cmp.children.map((item: any) => {
            return {
                label: item.title, key: item.key, children: <div style={{padding: '8px'}} {...item.props} >
                    {item.children.map((item2: any) => <Master key={item2.key} cmp={item2} props={props} />)}
                </div>
            }
        }
        )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cmp.children]);

    return <>
        {cmp.anchor && <ScrollableAnchor id={`${cmp.anchor}`}>
            <span />
        </ScrollableAnchor>}
        <Editor cmp={cmp} />
        <Tabs defaultActiveKey="1" items={items} />

        {/*<Tabs defaultActiveKey="1">*/}
        {/*    {cmp.children.map((item: any) => <TabPane style={{padding: '8px'}} key={item.key}*/}
        {/*                                              tab={item.title} {...item.props} >*/}
        {/*        {item.children.map((item2: any) => <Master key={item2.key} cmp={item2} props={props}/>)}*/}
        {/*    </TabPane>)}*/}
        {/*</Tabs>*/}
    </>
}

export default AntTabs
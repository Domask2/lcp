import React from "react";
import Editor from "../Editor/Editor";
import ScrollableAnchor from "react-scrollable-anchor";
import Master from "../Master";
import {IIterator} from "../Page/templates";
import {useTypedSelector} from "../../../hooks";
import {RootState} from "../../../redux/redux.store";
import {getDataSource} from "../../../redux/ds/ds.selector";
import {getEditMode} from "../../../redux/app/app.selector";
// import WithIteratorComponents from "./iteratorHoc";

type IteratorType = {
    cmp: IIterator;
};


const Iterator: React.FC<IteratorType> = ({cmp}: any) => {

    const dataSource = useTypedSelector((state: RootState) => getDataSource(state, cmp.iteratorDs));
    const editMode = useTypedSelector((state: RootState) => getEditMode(state))

    return <>
        {cmp.anchor && <ScrollableAnchor id={`${cmp.anchor}`}>
            <span></span>
        </ScrollableAnchor>}
        <Editor cmp={cmp} />
        {editMode ? (
            <Master key={dataSource?.items[0].key} cmp={cmp.children[0]} props={{index: 0, item: dataSource?.items[0]}} />
        ) : (
            dataSource?.items.map((item: any, index: number) => <Master key={item.key} cmp={cmp.children[0]} props={{index: index, item: item}} />)
        )}
    </>
}

export default Iterator
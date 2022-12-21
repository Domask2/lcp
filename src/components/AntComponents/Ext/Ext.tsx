import React from 'react';
import Master from "../Master";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {RootState} from "../../../redux/redux.store";
import {getPages} from "../../../redux/project/project.selector";
import Editor from "../Editor/Editor";

type ExtType = {
    cmp: any,
    props: any
}
const Ext: React.FC<ExtType> = ({cmp, props}) => {
    const pages = useTypedSelector((state: RootState) => getPages(state))

    let components: any = {}
    Object.keys(pages).forEach(key => {
        pages[key].components.forEach((c: any) => {
            components[key + '/' + c.key] = c
        })
    })

    // components[cmp.cmp_key].ext = true;

    return <>
        <Editor cmp={cmp} />
        {cmp.cmp_key !== '' && <Master key={cmp.key} cmp={components[cmp.cmp_key]} props={props} />}
    </>
};

export default Ext;
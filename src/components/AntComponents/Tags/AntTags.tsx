import React, {FC, useEffect, useState} from 'react';
import {useActions, useTypedSelector} from '../../../hooks';
import {getDataSource} from '../../../redux/ds/ds.selector';
import {RootState} from '../../../redux/redux.store';
import Editor from '../Editor/Editor';
import {ITags} from '../Page/templates';
import AntMoreTagsBlock from './AntMoreTagsBlock';
import AntOneTagsBlock from './AntOneTagsBlock';

type AntTagsType = {
    cmp: ITags
    props: any
}

const AntTags: FC<AntTagsType> = ({cmp, props}) => {

    const {setLsVars} = useActions()
    const dataSource = useTypedSelector((state: RootState) => getDataSource(state, cmp.ds));

    const [selectedTags, setSelectedTags] = useState<any>({});

    useEffect(() => {
        cmp.adKey && setLsVars(`${cmp.adKey}__${cmp.key}`, selectedTags)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedTags])

    const parsing = (value: any) => {
        const regexp = /\[/;
        return regexp.test(value) ? JSON.parse(value) : value
    }

    const zeroTagTitle = dataSource?.items?.length && cmp.listTitle ? `${dataSource?.items[props.index][cmp.listTitle]}` : 'Теги';

    const zeroTagsList = dataSource?.items?.length && cmp.list && dataSource?.items[props.index][cmp.list] && parsing(dataSource?.items[props.index][cmp.list]);
    const zeroCheckedTags = dataSource?.items?.length && cmp.listValues && dataSource?.items[props.index][cmp.listValues] && parsing(dataSource?.items[props.index][cmp.listValues]);
    const zeroProjectKey = dataSource?.items?.length && cmp.listTitle ? `${dataSource?.items[props.index][cmp.listTitle]}` : 'tags';

    return (
        <div style={cmp.style}>
            <Editor cmp={cmp} />
            <p style={cmp.titleStyle}>{cmp.caption}</p>
            {cmp.iterations ? (
                <>
                    {dataSource?.items?.length ? dataSource?.items.map((item: any) => {

                        const itemTitle = cmp.listTitle ? `${item[cmp.listTitle]}` : `${cmp.title}: `;
                        const itemTags = cmp.list && item[cmp.list] && parsing(item[cmp.list]);
                        const itemCheckedTags = cmp.listValues && item[cmp.listValues] && parsing(item[cmp.listValues]);
                        const projectKey = cmp.listTitle ? `${item[cmp.listTitle]}` : 'tags';

                        return (
                            <AntMoreTagsBlock
                                key={item.key}
                                title={itemTitle}
                                tags={itemTags}
                                checkedTags={itemCheckedTags}
                                contentStyle={cmp.contentStyle}
                                labelStyle={cmp.labelStyle}
                                projectKey={projectKey}
                                listKey={cmp.list}
                                setValue={setSelectedTags}
                                ds={dataSource}
                            />
                        )
                    }) : <></>}
                </>
            ) : (
                <>
                    {dataSource?.items?.length && <AntOneTagsBlock
                        title={zeroTagTitle}
                        tags={zeroTagsList}
                        checkedTags={zeroCheckedTags}
                        contentStyle={cmp.contentStyle}
                        labelStyle={cmp.labelStyle}
                        projectKey={zeroProjectKey}
                        listKey={cmp.list}
                        setValue={setSelectedTags}
                        ds={dataSource}
                    />}
                </>
            )}
        </div>
    );
};

export default AntTags;
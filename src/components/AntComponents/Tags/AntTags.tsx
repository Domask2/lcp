import {Tag} from 'antd';
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

const AntTags: FC<AntTagsType> = ({cmp}) => {

    const {setLsVars} = useActions()
    const dataSource = useTypedSelector((state: RootState) => getDataSource(state, cmp.ds));

    const [selectedTags, setSelectedTags] = useState<any>({});

    useEffect(() => {
        cmp.adKey && setLsVars(`${cmp.adKey}__${cmp.key}`, selectedTags)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedTags])

    const zeroTagTitle = dataSource?.items?.length && cmp.listTitle ? `${dataSource?.items[0][cmp.listTitle]}` : 'Теги:';
    const zeroTagsList = dataSource?.items?.length && cmp.list && dataSource?.items[0][cmp.list] && JSON.parse(dataSource?.items[0][cmp.list]);
    const zeroCheckedTags = dataSource?.items?.length && cmp.listValues && dataSource?.items[0][cmp.listValues] && JSON.parse(dataSource?.items[0][cmp.listValues]);
    const zeroProjectKey = dataSource?.items?.length && cmp.listTitle ? `${dataSource?.items[0][cmp.listTitle]}` : 'tags';

    return (
        <div style={cmp.style}>
            <Editor cmp={cmp} />
            <p style={cmp.titleStyle}>{cmp.caption}</p>
            {cmp.iterations ? (
                <>
                    {dataSource?.items?.length ? dataSource?.items.map((item: any) => {

                        const itemTitle = cmp.listTitle ? `${item[cmp.listTitle]}` : `${cmp.title}: `;
                        const itemTags = cmp.list && item[cmp.list] && JSON.parse(item[cmp.list]);
                        const itemCheckedTags = cmp.listValues && item[cmp.listValues] && JSON.parse(item[cmp.listValues]);
                        const projectKey = cmp.listTitle ? `${item[cmp.listTitle]}` : 'tags';

                        return (
                            <AntMoreTagsBlock
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
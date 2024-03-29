import {Tag} from 'antd';
import React, {FC, useEffect, useState} from 'react';

const {CheckableTag} = Tag;

type AntOneTagsBlockType = {
    title: any
    tags: any
    checkedTags: any
    contentStyle: any
    labelStyle: any
    projectKey: any
    listKey: any
    setValue: any
    ds: any
}

const AntOneTagsBlock: FC<AntOneTagsBlockType> = ({title, tags, checkedTags, contentStyle, labelStyle, projectKey, listKey, setValue, ds}) => {

    const [selectedTags, setSelectedTags] = useState<any>({
        [projectKey]: checkedTags
    });

    useEffect(() => {
        if (selectedTags) {
            setSelectedTags({
                [projectKey]: checkedTags
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ds])


    const handleChange = (tag: string, checked: boolean) => {
        const nextSelectedTags = checked ? [...selectedTags[projectKey], tag] : selectedTags[projectKey].filter((t: any) => t !== tag);
        if (projectKey === 'tags') {
            setSelectedTags({
                [projectKey]: nextSelectedTags
            });
            setValue(nextSelectedTags)
        } else {
            setSelectedTags({
                [projectKey]: nextSelectedTags
            });
            setValue({
                [projectKey]: nextSelectedTags
            })
        }
    };

    return (
        <div style={{marginBottom: '10px'}}>
            <span style={{width: '100px', display: 'inline-block', ...labelStyle}}>{title}:</span>
            {Array.isArray(tags) ? (
                tags?.map((tag: any) => (
                    <CheckableTag
                        style={contentStyle}
                        key={tag}
                        checked={selectedTags[projectKey]?.indexOf(tag) > -1}
                        onChange={checked => handleChange(tag, checked)}
                    >
                        {tag}
                    </CheckableTag>
                ))
            ) : (
                'неподходящий формат источника данных'
            )}
        </div>
    );
};

export default AntOneTagsBlock;
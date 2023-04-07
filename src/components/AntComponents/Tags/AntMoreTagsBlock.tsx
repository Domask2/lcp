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

const AntMoreTagsBlock: FC<AntOneTagsBlockType> = ({title, tags, checkedTags, contentStyle, labelStyle, projectKey, listKey, setValue, ds}) => {

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
        setSelectedTags({
            [projectKey]: nextSelectedTags
        });
        setValue((prevState: any) => {
            return {
                ...prevState,
                [projectKey]: nextSelectedTags
            }
        })
    };

    return (
        <div style={{marginBottom: '10px'}}>
            <span style={{minWidth: '100px', display: 'inline-block', ...labelStyle}}>{title}:</span>
            {Array.isArray(tags) ? (
                tags?.map((tag: any, index: number) => (
                    <CheckableTag
                        style={contentStyle}
                        key={`${title}_${tag}_${index}_${ds.items[0]?.user_id}`}
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

export default AntMoreTagsBlock;
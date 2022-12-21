import {Tag} from 'antd';
import React, {FC, useState} from 'react';

const {CheckableTag} = Tag;

type AntOneTagsBlockType = {
    props: any
}

const AntMoreTagsBlock: FC<AntOneTagsBlockType> = ({props}) => {

    const [checkedTags, setCheckedTags] = useState<any>({
        [props.projectKey]: props.checkedTags
    });

    // useEffect(() => {
    //     if (selectedTags) {
    //         props.setValue((prevState: any) => {
    //             return {
    //                 ...prevState,
    //                 [props.listKey]: {
    //                     ...prevState[props.listKey],
    //                     ...selectedTags
    //                 },
    //             }
    //         })
    //     }
    // }, [selectedTags])

    const handleChange = (tag: string, checked: boolean) => {
        const nextSelectedTags = checked ? [...checkedTags[props.projectKey], tag] : checkedTags[props.projectKey].filter((t: any) => t !== tag);
        setCheckedTags({
            [props.projectKey]: nextSelectedTags
        });
        props.setValue((prevState: any) => {
            return {
                ...prevState[props.listKey],
                [props.projectKey]: nextSelectedTags
            }
        })
    };

    return (
        <div style={{marginBottom: '10px'}}>
            <span style={{minWidth: '100px', display: 'inline-block', ...props.labelStyle}}>{props.title}:</span>
            {props.tags?.map((tag: any) => (
                <CheckableTag
                    style={props.contentStyle}
                    key={tag}
                    checked={checkedTags[props.projectKey]?.indexOf(tag) > -1}
                    onChange={checked => handleChange(tag, checked)}
                >
                    {tag}
                </CheckableTag>
            ))}
        </div>
    );
};

export default AntMoreTagsBlock;
import {Button, Tag} from 'antd';
import {FC, useEffect, useState} from 'react';
import {useActions} from '../../../hooks';
import useDataSourceFiltred from '../../../hooks/useDataSourceFilter';
import Editor from '../Editor/Editor';
// import useDebounce from '../Inputs/UseDebounce';
import {IFilterTags} from '../Page/templates';
import {ClearOutlined} from '@ant-design/icons';

const {CheckableTag} = Tag;

type AntTagsType = {
    cmp: IFilterTags
    props: any
};

const AntFilterTags: FC<AntTagsType> = ({cmp, props}) => {

    const {dataSource} = props;
    const {loadDataSource} = useActions();
    const {getFilter, addFilter} = useDataSourceFiltred(dataSource?.key, cmp)

    const [selectedTags, setSelectedTags] = useState<any>([]);
    const tagsDs = props.dataSource1;

    // const debouncedValue = useDebounce(selectedTags, 800);

    const setTagsBackgroundColor = (item: any) => {
        const bkgColor = {backgroundColor: '#1890ff'};
        if (item.color) {
            bkgColor.backgroundColor = item.color;
        } else if (cmp.contentStyle?.backgroundColor) {
            bkgColor.backgroundColor = cmp.contentStyle?.backgroundColor;
        }
        return {
            ...cmp.contentStyle,
            ...bkgColor
        }
    };

    const handleChange = (tag: any, checked: boolean) => {
        const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter((t: any) => t !== tag);
        setSelectedTags(nextSelectedTags);
    };
    const loadDS = () => {
        dataSource?.key && loadDataSource(dataSource?.key, addFilter(cmp.dsKey, selectedTags), false);
    }

    useEffect(() => {
        if (!cmp.buttonVisible) {
            loadDS();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedTags])

    const handleClick = () => {
        loadDS();
    };

    const handleReset = () => {
        setSelectedTags([])
        // перезаписываем ds-ку в начальное состояние
        loadDataSource(dataSource?.key, addFilter(cmp.dsKey, []), false)
    }

    useEffect(() => {
        if (!getFilter()) {
            setSelectedTags([])
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getFilter()])

    return (
        <div style={cmp.style}>
            <Editor cmp={cmp} />
            {cmp.caption && <p style={cmp.titleStyle}>{cmp.caption}</p>}

            {cmp.dsKey1 && tagsDs?.items?.map((tag: any, index: number) => {
                return <CheckableTag
                    style={selectedTags?.includes(tag[cmp.dsKey1!]) ? setTagsBackgroundColor(tag) : {}}
                    key={`${tag[cmp.dsKey1!]}_${index}`}
                    checked={selectedTags?.includes(tag[cmp.dsKey1!])}
                    onChange={checked => handleChange(tag[cmp.dsKey1!], checked)}
                >
                    {tag[cmp.dsKeyValues1!]}
                </CheckableTag>
            })}
            {cmp.buttonVisible && <Button
                size={cmp.buttonSize}
                onClick={handleClick}
                style={cmp.buttonStyle}
                type={cmp.button?.type}>
                {cmp.button?.title ? cmp.button?.title : 'Применить'}
            </Button>}
            <Button
                style={{marginTop: '-1px'}}
                type='link' size='small'
                onClick={handleReset}
            >
                <ClearOutlined />
            </Button>

        </div>
    );
};

export default AntFilterTags;
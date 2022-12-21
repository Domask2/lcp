import React, {useState} from "react";
import {Image} from 'antd';
import {IImage} from "../Page/templates";
import Editor from "../Editor/Editor";
import ScrollableAnchor from "react-scrollable-anchor";
import {RootState} from "../../../redux/redux.store";
import {useTypedSelector} from "../../../hooks";
import {getDataSource} from "../../../redux/ds/ds.selector";
import {extensions} from "../../../utils";
import AntImageComp from "./AntImageComp";

type AntImageType = {
    cmp: IImage
}
const AntImageGallery: React.FC<AntImageType> = ({cmp}) => {

    const ds = useTypedSelector((state: RootState) =>
        getDataSource(state, cmp.ds)
    );

    const imageArray = ds?.items?.filter((item: any) => {
        const ext = cmp.imageKey && item[cmp.imageKey].split('.').pop()
        return extensions?.includes(ext) && item
    })

    return <div style={{display: 'inline-block', ...cmp.style}}>
        {cmp.anchor && <ScrollableAnchor id={`${cmp.anchor}`}>
            <span></span>
        </ScrollableAnchor>}

        <Editor cmp={cmp} />
        <Image.PreviewGroup>
            {cmp.baseUrl ? (
                imageArray?.map((item: any) => {
                    return (
                        <AntImageComp cmp={cmp} item={item} />
                    )
                })
            ) : (
                cmp.props.src ? (
                    <>
                        <div style={{display: 'inline-block', ...cmp.imageStyle}}>
                            <Image src={cmp.props.src} width={(cmp.props.width && +cmp.props.width) ? +cmp.props.width : 'auto'} height={(cmp.props.height && +cmp.props.height) ? +cmp.props.height : 'auto'} />
                        </div>
                        <div style={{display: 'inline-block', ...cmp.imageStyle}}>
                            <Image src={cmp.props.src} width={(cmp.props.width && +cmp.props.width) ? +cmp.props.width : 'auto'} height={(cmp.props.height && +cmp.props.height) ? +cmp.props.height : 'auto'} />
                        </div>
                    </>
                ) : (
                    <></>
                )
            )}
        </Image.PreviewGroup>
    </div>
}

export default AntImageGallery
import {Card, Row} from "antd";
import React, {CSSProperties, useEffect, useState} from "react";
import Master from "../Master";
import {ICard, ComponentInterface} from "../Page/templates";
import Editor from "../Editor/Editor";
import ScrollableAnchor from "react-scrollable-anchor";
import {useTypedSelector} from "../../../hooks";
import {RootState} from "../../../redux/redux.store";
import {getMappedText} from "../../../redux/ds/ds.selector";
import Mapped from "../Mapped";
import {getEditMode} from "../../../redux/app/app.selector";

type AntCardType = {
    cmp: ICard
    props: any
    addictionStyle?: CSSProperties
}

const useAddictionStyle = (styles:CSSProperties) => {
    const [addictionStyle, setAddictionStyle] = useState({});

    useEffect(() => {
        if (Object.keys(styles).length > 0) {
            setAddictionStyle({...styles});
        }

        return (() => {
            setAddictionStyle({})
        })

    }, [styles])

    return addictionStyle

}

const AntCard = ({cmp, props, addictionStyle = {}}: AntCardType) => {
    const className = cmp.className !== undefined ? cmp.className : '';
    const mappedCaption = useTypedSelector((state: RootState) => getMappedText(state, cmp.caption!));
    const mappedTitle = useTypedSelector((state: RootState) => getMappedText(state, cmp.title!));
    const editMode = useTypedSelector((state: RootState) => getEditMode(state))

    const bodyStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        flexGrow: 1,
        padding: 0
    };

    const addictStyles = useAddictionStyle(addictionStyle);

    const padding = cmp.props.size === 'default' ? '24px' : '12px';
    const [style, setStyle] = useState(editMode ?
        {...cmp.style, border: '3px dashed transparent', marginLeft: 0, marginRight: 0} :
        cmp.style)

    const onMouseOver = () => {
        setStyle({...cmp.style, border: '3px dashed #d874e3', marginLeft: 0, marginRight: 0})
    }
    const onMouseOut = () => {
        setStyle({...cmp.style, border: '3px dashed transparent', marginLeft: 0, marginRight: 0})
    }


    return <>
        <Editor
            onMouseOut={onMouseOut}
            onMouseOver={onMouseOver}
            style={{marginTop: '5px'}}
            cmp={cmp}/>

        {cmp.anchor && <ScrollableAnchor id={`${cmp.anchor}`}>
            <span/>
        </ScrollableAnchor>}
        <Card {...cmp.props}
              bodyStyle={bodyStyle}
              headStyle={cmp.headStyle}
              style={{...style, ...addictStyles}}
              className={className}
              title={cmp.caption || cmp.title ? <Mapped text={mappedCaption || mappedTitle}/> : false}
        >
            <div style={{padding: padding, ...cmp.bodyStyle}}>
                {cmp.children.map((item: ComponentInterface) =>
                    <Master key={item.key} cmp={{...item, page_key: cmp.page_key, ext: cmp.ext}} props={props}/>)}
            </div>
            {!!cmp.footerChildren?.length ? (
                <div style={{marginBottom: '0', marginTop: 'auto', ...cmp.footerStyle}}>
                    {cmp.footerChildren.map((item: ComponentInterface) =>
                        <Master key={item.key} cmp={{...item, page_key: cmp.page_key, ext: cmp.ext}} props={props}/>)}
                </div>
            ) : ''}
        </Card>
    </>
}

export default AntCard
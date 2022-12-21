import React, {useState} from "react";
import {Image} from 'antd';
import {IImage} from "../Page/templates";

type AntImageType = {
    cmp: IImage
    item: any
}
const AntImageComp: React.FC<AntImageType> = ({cmp, item}) => {

    const [ErrImg, setErrImg] = useState<boolean>(false);

    return (
        <div style={ErrImg ? {display: 'none'} : {display: 'inline-block', ...cmp.imageStyle}}>
            <Image title={item.title} onError={() => {
                setErrImg(true)
            }} src={cmp.imageKey && `${cmp.baseUrl}/${item[cmp.imageKey]}`} width={(cmp.props.width && +cmp.props.width) ? +cmp.props.width : 'auto'} height={(cmp.props.height && +cmp.props.height) ? +cmp.props.height : 'auto'} />
        </div>
    )

}

export default AntImageComp
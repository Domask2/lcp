import React from 'react';
import ObjectEditor from "../Elements/ObjectEditor";

type EditStyleType = {
    style: React.CSSProperties
    setStyle: (v: React.CSSProperties) => void
}
const EditStyle: React.FC<EditStyleType> = ({style, setStyle}) => {
    return <ObjectEditor object={style} setObject={setStyle} autoCss={true}/>
};

export default EditStyle;
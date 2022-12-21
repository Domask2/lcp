import React from "react";
import ArrayEditor from "../../Editor/Elements/ArrayEditor";

type AntInputType = {
    props: any
    setValue: any
    value: any
}

const EditorActionsElement: React.FC<AntInputType> = ({props, setValue, value}) => {

    return <>
        <h3>Actions</h3>
        <ArrayEditor cmp={props.value} list={value} setList={setValue} />
        <br />
    </>
}

export default EditorActionsElement
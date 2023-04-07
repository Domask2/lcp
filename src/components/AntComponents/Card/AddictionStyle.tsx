import React from "react";
import {useData} from "./AddictionStyleContext";
import AddictionStyleCard from "./AddictionStyleCard";
import AddictionStyleAdd from "./AddictionStyleAdd";
import {Card} from "antd";

const AddictionStyle = () => {
    const {addictionStyleArray} = useData();

    return (
        <Card size="small" className="cardEdit">
            <h3>Addiction Styles</h3>
            {
                addictionStyleArray && addictionStyleArray.map((style: any) => {
                    return <AddictionStyleCard key={style.id} style={style}/>
                })
            }

            <AddictionStyleAdd/>
        </Card>
    )
}

export default AddictionStyle;
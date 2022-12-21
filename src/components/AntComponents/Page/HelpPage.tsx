import {help} from "./help";
import ReactJson from "react-json-view";
import React from "react";


const HelpPage = ({part}: {part: "page" | "navigation"}) => {
    return <ReactJson quotesOnKeys={true} displayDataTypes={false} displayObjectSize={false} theme="monokai" src={help[part]}/>
}

export default HelpPage
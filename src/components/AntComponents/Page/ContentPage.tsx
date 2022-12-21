import React from 'react';
import {IPage} from "../../../redux/project/project.initial";
import {ComponentInterface} from "./templates";
import Master from "../Master";

interface ContentPageInterface {
    page: IPage
    props: any
}
const ContentPage: React.FC<ContentPageInterface> = ({page, props}) => {
    return page.components.map((item: ComponentInterface) => {
        return <Master cmp={{...item, page_key: page.key}} key={item.key} props={props}/>
    });
};

export default ContentPage;
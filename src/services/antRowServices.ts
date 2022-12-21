import {IPage} from "../redux/project/project.initial";
import {ComponentInterface} from "../components/AntComponents/Page/templates";

export const getRowAdd = (page: IPage, cmp: ComponentInterface) => {
    let editModeRowElements = false
    if(page) {
        page?.components.forEach((comp: ComponentInterface, index: number) => {
            if (comp.key === cmp.key && index === page?.components.length - 1) {
                editModeRowElements = true
            }
        })
    }

    return editModeRowElements
}
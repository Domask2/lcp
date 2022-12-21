import React, {useState} from 'react';

import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {getFncAll} from "../../../redux/fnc/fnc.selector";
import {getAppDb} from "../../../redux/app/app.selector";

import {getActionDescription} from "../../../services/antformUtils";
import {Button, Popover} from "antd";

import {RootState} from "../../../redux/redux.store";
import {IForm} from "../Page/templates";

type AndFormEditDescriptionType = {
    cmp: IForm
}

const AndFormEditDescription: React.FC<AndFormEditDescriptionType> = ({cmp}) => {
    const fncAll = useTypedSelector((state: RootState) => getFncAll(state))
    const dbAll = useTypedSelector((state: RootState) => getAppDb(state))
    const currentActions = cmp.submit.actions
    let infoDescription = getActionDescription(fncAll, dbAll, currentActions, cmp);

    const [visible, setVisible] = useState(false);

    const description = <>
        {
            infoDescription!.vars.map((desc, index: number) => {
                return (
                    <div key={index}>
                        <span>{desc.name + ':' + desc.type + ' '}</span>
                    </div>
                )
            })
        }
    </>

    const handleVisibleChange = (visible: boolean) => {
        setVisible(visible)
    };

    return (
        <>
            {
                infoDescription!.vars[0].name !== '' ?
                    (
                        <Popover
                            content={description}
                            title="Action"
                            trigger="click"
                            visible={visible}
                            onVisibleChange={handleVisibleChange}
                        >
                            <Button type="default">Description Action</Button>
                        </Popover>
                    ) :
                    null
            }
        </>
    )
};

export default AndFormEditDescription;
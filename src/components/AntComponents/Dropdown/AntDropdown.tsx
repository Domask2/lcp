import React from 'react';
import {Dropdown, Menu} from "antd";
import {IDropdown} from "../Page/templates";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {RootState} from "../../../redux/redux.store";
import {getDataSource} from "../../../redux/ds/ds.selector";
import {useActions} from "../../../hooks/useActions";
import {useParams} from "react-router-dom";
import ScrollableAnchor from 'react-scrollable-anchor';
import Editor from '../Editor/Editor';

type AntDropdownType = {cmp: IDropdown}

const AntDropdown: React.FC<AntDropdownType> = ({cmp}) => {
    const {userId} = useParams();

    const dataSource = useTypedSelector((state: RootState) => getDataSource(state, cmp.ds.key));
    const {executeFnc} = useActions()

    const handleButtonClick = () => {
        const act = cmp?.item?.actions!.split(',')
        act.forEach(a => {
            let aArr = a.split(':')
            switch (aArr[0]) {
                case 'fnc':
                    executeFnc(aArr[1], userId)
            }
        })
    }

    const handleMenuClick = (e: any) => {
        const act = cmp?.item?.actions!.split(',')
        act.forEach(a => {
            let aArr = a.split(':')
            switch (aArr[0]) {
                case 'fnc':
                    executeFnc(aArr[1], e.key)
            }
        })
    }

    let menu = <></>
    if (dataSource !== undefined)
        menu = <Menu onClick={handleMenuClick}>
            {dataSource.items.map(item => <Menu.Item key={item[cmp.item.key]}>
                {item[cmp.item.val]}
            </Menu.Item>)}
        </Menu>

    return <div>
        {cmp.anchor && <ScrollableAnchor id={`${cmp.anchor}`}>
            <span></span>
        </ScrollableAnchor>}
        <Editor cmp={cmp} />
        <Dropdown.Button size='small' style={cmp.style} onClick={handleButtonClick} overlay={menu}>
            По оригиналу
        </Dropdown.Button>
        <br /><br />
    </div>
};

export default AntDropdown;
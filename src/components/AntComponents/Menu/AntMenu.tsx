import {useLocation, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from 'react';
import {MenuProps} from 'antd';
import {Menu} from 'antd';
import {IMenu} from '../Page/templates';
import ScrollableAnchor from 'react-scrollable-anchor';
import Editor from '../Editor/Editor';


type MenuType = {
    cmp: IMenu;
    props: any
};

const AntMenu: React.FC<MenuType> = ({cmp, props}: any) => {
    // const [theme, setTheme] = useState<MenuTheme>('light');
    const [items, setItems] = useState<string[]>(cmp.open ? props.dataSource?.items?.map((item: any) => item[cmp.listValues]) : []);
    // const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();

    const currentKey = location.pathname.split('/')[location.pathname.split('/').length - 1];

    const navigate = useNavigate()

    // const toggleCollapsed = () => {
    //     setCollapsed(!collapsed);
    // };
    // const changeTheme = (value: boolean) => {
    //     setTheme(value ? 'dark' : 'light');
    // };
    const onClick: MenuProps['onClick'] = (e) => {
        const url = `${cmp.url ? cmp.url : ''}/${e.key ? e.key : ''}`
        cmp.url && navigate(url);
    };

    const getItem = (arr: any) => {
        if (cmp.initDictionary && Object.keys(cmp.initDictionary).length) {
            return Object.keys(cmp.initDictionary).map((key: string) => {
                return {
                    label: cmp.initDictionary[key],
                    key: key,
                    // icon: <UnorderedListOutlined />,
                    style: cmp.labelStyle,
                }
            })
        } else {
            return arr?.map((item: any) => {
                return {
                    label: item[cmp.listTitle],
                    key: item[cmp.listValues],
                    // icon: <UnorderedListOutlined />,
                    style: cmp.labelStyle,
                    children: item.child && typeof item.child === 'string' ? getItem(JSON.parse(item.child)) : getItem(item.child),
                }
            })
        }
    }
    useEffect(() => {
        cmp.open && setItems(props.dataSource?.items?.map((item: any) => item[cmp.listValues]))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.dataSource])

    const changeOpenKeys = (e: any) => {
        setItems(e);
    }

    return (<>
        {cmp.anchor && <ScrollableAnchor id={`${cmp.anchor}`}>
            <span></span>
        </ScrollableAnchor>}
        <Editor cmp={cmp} />

        <div style={{width: '100%'}}>
            {/* <Switch
                checked={theme === 'dark'}
                onChange={changeTheme}
                checkedChildren="Dark"
                unCheckedChildren="Light"
            />
            <br />
            <br />
            <Button type="primary" onClick={toggleCollapsed} style={{marginBottom: 16}}>
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </Button> */}
            <Menu
                style={cmp.style}
                selectedKeys={[currentKey]}
                // defaultOpenKeys={['sub1']}
                onClick={onClick}
                mode="inline"
                // theme={theme}
                theme={'light'}
                // inlineCollapsed={collapsed}
                items={getItem(props.dataSource?.items)}
                openKeys={items}
                onOpenChange={(e) => changeOpenKeys(e)}
            />
        </div>
    </>
    );
};

export default AntMenu;
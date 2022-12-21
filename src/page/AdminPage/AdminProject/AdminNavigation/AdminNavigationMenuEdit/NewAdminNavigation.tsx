import {Menu, Switch, Divider, Button} from 'antd';
import {
    MenuUnfoldOutlined,
    CalendarOutlined,
    AppstoreOutlined,

} from '@ant-design/icons';

const {SubMenu} = Menu;

export const NavAdminNavigation = ({project}: any) => {

    const navigation = project.navigation;

    return (
        <>
            <Menu
                mode="inline"
                style={{width: 256}}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
            >

                {
                    navigation.map((nav1: any, index: number) => {
                        return (
                            nav1?.children.length === 0 ?
                                (
                                    <Menu.Item onClick={() => console.log(nav1, project)} key={index}
                                               icon={<AppstoreOutlined/>}>
                                        title={nav1.title}

                                    </Menu.Item>
                                )
                                :
                                (
                                    <SubMenu
                                        onTitleClick={() => console.log(nav1, project)}
                                        key={index} icon={<AppstoreOutlined/>}
                                        title={nav1.title}
                                    >
                                        {
                                            nav1?.children.map((nav2: any, index2: number) => {
                                                return (
                                                    nav2?.children.length === 0 ?
                                                        (
                                                            <Menu.Item key={nav2.title} icon={<CalendarOutlined/>}>
                                                                title={nav2.title}
                                                            </Menu.Item>
                                                        ) : (
                                                            <SubMenu key={nav2.title} icon={<CalendarOutlined/>}
                                                                     title={nav2.title}>
                                                                {
                                                                    nav2?.children.map((nav3: any, index: number) => {
                                                                        return (
                                                                            <Menu.Item key={nav3.title}>
                                                                                title={nav3.title}
                                                                            </Menu.Item>
                                                                        )
                                                                    })
                                                                }
                                                            </SubMenu>
                                                        )
                                                )
                                            })
                                        }
                                    </SubMenu>
                                )


                        )
                    })
                }
            </Menu>
        </>
    );
};
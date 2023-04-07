import React, {useEffect} from 'react';
import {useActions, useTypedSelector} from "../../../hooks";
import AdminRemotesDs from "./Remotes/AdminRemotesDS";
import AdminRemotesProject from "./Remotes/AdminRemotesProject";
import LoginRemote from "./Remotes/LoginRemote";
import {getAuthRemote} from "../../../redux/remote/remote.selector";
import {Alert, Space, Tabs, Tag} from "antd";
import {RootState} from "../../../redux/redux.store";
import Text from "antd/es/typography/Text";

// const items = [
//     {label: 'DateSources', key: 'remote-1', children: <AdminRemotesDs />},
//     {label: 'Projects', key: 'remote-2', children: <AdminRemotesProject />},
//     {label: 'Users', key: 'remote-3', children: 'Content of Tab Pane 3'},
// ];


const AdminRemotes = () => {
    const authRemote = useTypedSelector((state: RootState) => getAuthRemote(state));
    const {loadRemoteDb} = useActions()

    useEffect(() => {
        if (authRemote !== undefined) {
            loadRemoteDb(authRemote)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authRemote])

    const items = [
        {label: 'DateSources', key: '1', children: <AdminRemotesDs />},
        {label: 'Projects', key: '2', children: <AdminRemotesProject />},
        {label: 'Users', key: '3', children: <div>Content of Tab Pane 3</div>},
    ]

    return <>
        {authRemote === undefined &&
            <Alert message='Для экспорта данных необходимо подключиться к удаленному серверу.' type='info' action={
                <Space direction="vertical">
                    <LoginRemote />
                </Space>
            } />}

        {authRemote !== undefined && <Alert
            message={<><Text type='danger'>{authRemote.url}</Text> - {authRemote.name} <Tag
                color="purple">{authRemote.role}</Tag></>} type='success' action={
                    <Space direction="vertical">
                        <Text type="secondary">
                            Отключение произойдет автоматически, при перезагрузке страницы
                        </Text>
                    </Space>
                } />}

        <hr />

        <Tabs defaultActiveKey="1" items={items} />
        {/* <Tabs defaultActiveKey="1" items={items}/> */}
    </>
};

export default AdminRemotes;
import React from 'react';
import {Col, Layout, Row, Skeleton} from "antd";
import HeaderLayout from "./HeaderLayout";
import Routing from "../routes/Routing";
// import { FncExecutor, ReloaderDs } from "../App";
// import {ReloaderDs} from "../App";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {RootState} from "../redux/redux.store";
import {getInitialized} from "../redux/app/app.selector";

const {Content} = Layout;

const MainLayout: React.FC = () => {
    const initialized = useTypedSelector((state: RootState) => getInitialized(state))

    return <Layout>
        <HeaderLayout />

        {
            !initialized ? (
                <Row style={{paddingTop: '200px', minHeight: 'calc(100vh - 90px)'}} gutter={[24, 24]}>
                    <Col xs={24} sm={24} lg={{span: 16, offset: 4}}
                        xl={{span: 12, offset: 6}}>
                        <Skeleton active paragraph={{rows: 5}} avatar />
                    </Col>
                </Row>
            ) : (

                <Layout>
                    <Layout style={{minHeight: 'calc(100vh - 70px)'}}>
                        {/* <Layout style={{padding: '16px 16px', minHeight: 'calc(100vh - 70px)', display: 'flex', flexDirection: 'row'}}>
                        <div style={{width: '200px'}}>
                            <h1>SideBar</h1>
                        </div> */}
                        <Content
                            className="site-layout-background"
                            style={{
                                margin: 0,
                                minHeight: 280,
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <Routing />
                        </Content>

                    </Layout>
                </Layout>
            )
        }

        {/*<ReloaderDs/>*/}
        {/*<FncExecutor />*/}
    </Layout>;
};

export default MainLayout;
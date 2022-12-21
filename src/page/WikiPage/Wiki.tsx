import React from 'react';
import {Card, Col, Row, Tabs} from "antd";
import WikiProjects from "./WikiProjects";
import WikiPages from "./WikiPages";
import WikiCmp from "./WikiCmp";

const { TabPane } = Tabs;

const Wiki = () => {
    const callback = (key: string) => {

    }

    return <>
        <Row gutter={[16, 16]}>
            <Col span={24}>
                <Card size="small" className="lcCard lcBlockLc">
                    <Tabs defaultActiveKey="1" onChange={callback}>
                        <TabPane tab="Проекты" key="1">
                            <WikiProjects />
                        </TabPane>
                        <TabPane tab="Странцы" key="2">
                            <WikiPages />
                        </TabPane>
                        <TabPane tab="Компоненты" key="3">
                            <WikiCmp />
                        </TabPane>
                    </Tabs>
                </Card>
            </Col>
        </Row>
    </>;
};

export default Wiki;
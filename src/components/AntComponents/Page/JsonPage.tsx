import React from 'react';
import {Col, Collapse, Row, Tabs} from "antd";
import JSONInput from "react-json-editor-ajrm";
import ReactJson from "react-json-view";
import {layouts} from "./layouts";
import {templates} from "./templates";
import {locale} from "./jsoninput_locale";
const {Panel} = Collapse;
// const {TabPane} = Tabs;

const JsonPage = ({myJson, onBlurJson, onEdit}: any) => {

    const itemsJSON = [
        {
            label: 'JSONInput',
            key: '1',
            children: <JSONInput onKeyPressUpdate="false" onBlur={onBlurJson} width="100%" id='JSONInput'
                                 placeholder={myJson} locale={locale}/>
        },
        {
            label: 'ReactJson',
            key: '2',
            children: <ReactJson quotesOnKeys={false} displayDataTypes={false} displayObjectSize={false}
                                 theme="monokai" src={myJson} onEdit={onEdit} onAdd={() => {
            }} onDelete={onEdit}/>
        }
    ];

    const itemsSample = [
        {
            label: 'Шаблоны',
            key: '1',
            children: <Collapse bordered={false} defaultActiveKey={['1']}>
                {
                    Object.keys(layouts).map(key => <Panel header={key}
                                                           key={layouts[key].key}>
                        <ReactJson quotesOnKeys={true} displayDataTypes={false}
                                   displayObjectSize={false}
                                   theme="monokai" src={layouts[key]}/>
                    </Panel>)
                }
            </Collapse>
        },
        {
            label: 'Компоненты',
            key: '2',
            children: <Collapse bordered={false} defaultActiveKey={['1']}>
                {
                    Object.keys(templates).map(key => <Panel header={templates[key].type}
                                                             key={templates[key].key}>
                        <ReactJson quotesOnKeys={true} displayDataTypes={false}
                                   displayObjectSize={false}
                                   theme="monokai" src={templates[key]}/>
                    </Panel>)
                }
            </Collapse>
        }
    ]

    return <Row gutter={[16, 16]}>
        <Col span={16}>
            <Tabs items={itemsJSON} defaultActiveKey="1"/>
            {/*    <TabPane tab="JSONInput" key="1">*/}
            {/*        <JSONInput onKeyPressUpdate="false" onBlur={onBlurJson} width="100%" id='JSONInput'*/}
            {/*                   placeholder={myJson} locale={locale}/>*/}
            {/*    </TabPane>*/}
            {/*    <TabPane tab="ReactJson" key="2">*/}
            {/*        <ReactJson quotesOnKeys={false} displayDataTypes={false} displayObjectSize={false}*/}
            {/*                   theme="monokai" src={myJson} onEdit={onEdit} onAdd={() => {*/}
            {/*        }}*/}
            {/*                   onDelete={onEdit}/>*/}
            {/*    </TabPane>*/}
            {/*</Tabs>*/}
        </Col>

        <Col span={8}>
            <Tabs items={itemsSample} defaultActiveKey="1"/>
            {/*<TabPane tab="Шаблоны" key="1" >*/}
            {/*        <Collapse bordered={false} defaultActiveKey={['1']}>*/}
            {/*            {*/}
            {/*                Object.keys(layouts).map(key => <Panel header={key}*/}
            {/*                                                       key={layouts[key].key}>*/}
            {/*                    <ReactJson quotesOnKeys={true} displayDataTypes={false}*/}
            {/*                               displayObjectSize={false}*/}
            {/*                               theme="monokai" src={layouts[key]}/>*/}
            {/*                </Panel>)*/}
            {/*            }*/}
            {/*        </Collapse>*/}
            {/*    </TabPane>*/}
            {/*    <TabPane tab="Компоненты" key="2">*/}
            {/*        <Collapse bordered={false} defaultActiveKey={['1']}>*/}
            {/*            {*/}
            {/*                Object.keys(templates).map(key => <Panel header={templates[key].type}*/}
            {/*                                                         key={templates[key].key}>*/}
            {/*                    <ReactJson quotesOnKeys={true} displayDataTypes={false}*/}
            {/*                               displayObjectSize={false}*/}
            {/*                               theme="monokai" src={templates[key]}/>*/}
            {/*                </Panel>)*/}
            {/*            }*/}
            {/*        </Collapse>*/}
            {/*    </TabPane>*/}
            {/*</Tabs>*/}
        </Col>
    </Row>;
};

export default JsonPage;
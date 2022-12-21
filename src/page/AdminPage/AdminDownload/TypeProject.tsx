import React, {useState} from 'react';
import {Col, Form, Row, Select} from "antd";
import {useTypedSelector} from "../../../hooks";
import {RootState} from "../../../redux/redux.store";
import {getProjectsAll} from "../../../redux/project/project.selector";

const TypeProject = ({model}: any) => {
    const project: any = useTypedSelector((state: RootState) => getProjectsAll(state));
    const arraySelect = Object.values(project);

    const [projectSelect, setProjectSelect] = useState<any>(model.project);
    const [projectPage, setProjectPage] = useState<any>(project[projectSelect]?.pages);
    const [projectPageSelect, setProjectPageSelect] = useState<any>(model.page);

    return (
        <div style={{minHeight: '50px'}}>
            <Row >
                <Col flex={'110px'}><span style={{marginLeft: '30px'}}>project:</span></Col>
                <Col flex={'auto'} >
                    <Form.Item
                        style={{marginBottom: '0px'}}
                        name={'project'}
                        initialValue={projectSelect}
                    >
                        <Select onChange={(values) => {
                            setProjectSelect(values)
                            if (values === 'no') {
                                setProjectPage(null);
                            } else {
                                setProjectPage(project[values]?.pages)
                            }
                        }}>
                            <Select.Option key={'notProject'} value={'no'}>
                                {'не выбрано'}
                            </Select.Option>
                            <Select.Option key={'lcp'} value={'lcp'}>
                                {'lcp'}
                            </Select.Option>
                            {
                                arraySelect && arraySelect.length && arraySelect.map((sel: any) => {
                                    return (
                                        <Select.Option key={sel.key} value={sel.key}>
                                            {sel.key}
                                        </Select.Option>
                                    )
                                })
                            }


                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            {
                projectPage && <Row>
                    <Col flex={'110px'}><span style={{marginLeft: '30px'}}>page:</span></Col>
                    <Col flex={'auto'}>
                        <Form.Item
                            style={{marginBottom: '0px'}}
                            name={'page'}
                            initialValue={projectPageSelect}
                        >
                            <Select onChange={setProjectPageSelect}>
                                <Select.Option key={'notPage'} value={'no'}>
                                    {'не выбрано'}
                                </Select.Option>
                                {
                                    projectPage && projectPage.map((page: any) => {
                                        return (
                                            <Select.Option key={page.key} value={page.key}>
                                                {page.key}
                                            </Select.Option>
                                        )
                                    })
                                }
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
            }

        </div>

    )
}

export default TypeProject;
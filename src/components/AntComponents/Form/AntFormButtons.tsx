import React from "react";
import {Button, Col, Form} from "antd";

const AntFormButtons = ({cmp, onClickForm, onClickFormFilter, onReset, disableSubmit}: any) => {
    return(
        ((cmp.submit !== undefined && cmp.submit.visible) || (cmp.reset !== undefined && cmp.reset.visible) || (cmp?.submit.isBtnFilter)) &&
        (<>
            <br/>
            <Col key="col-b">
                <Form.Item wrapperCol={{offset: 0, span: 24}}>

                    {(cmp.submit !== undefined && cmp.submit.visible) &&
                        <Button type={cmp.submit?.type}
                                className={cmp.submit.className}
                                onClick={onClickForm}
                                disabled={disableSubmit}>{cmp.submit.title}</Button>}

                    {(cmp.submit !== undefined && cmp.submit.typeSubmit === 'filter' && cmp.submit.isBtnFilter) &&
                        <Button type={cmp.submit?.type}
                                style={{marginLeft: '16px'}}
                                className={cmp.submit.className}
                                onClick={onClickFormFilter}
                                disabled={disableSubmit}>{cmp.submit.titleBtnFilter}</Button>}

                    {(cmp.reset !== undefined && cmp.reset.visible) &&
                        <Button style={{margin: '0 8px'}}
                                type={cmp.reset?.type}
                                onClick={onReset}>{cmp.reset.title}</Button>}

                </Form.Item>
            </Col>
        </>))
}

export default AntFormButtons
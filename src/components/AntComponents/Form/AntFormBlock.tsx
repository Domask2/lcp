import React, {FC} from "react";
import {Card, Col, Row} from "antd";

interface AntFormBlockProps {
    colSpan: any
    cmp: any
    form_type: any
    blocks: any
}

const AntFormBlock: FC<AntFormBlockProps> = ({colSpan, cmp, form_type, blocks}) => {
    return (
        <Row gutter={[16, 16]}>
            {Object.keys(blocks).map(key => {
                // если у блока есть имя отрисуем согласна совпадающем именам блоков
                if (key !== 'invisible') {
                    return (
                        <Col span={colSpan} key={key}>
                            <Card
                                size="small"
                                className={cmp.className}
                                style={{...cmp.style, border: form_type === '' ? '1px dashed red' : cmp.style?.border}}>

                                {key[0] !== '-' && <h3>{key !== 'default' && key === 'null' ? '' : key}</h3>}

                                {
                                    <Row gutter={[16, 0]}>
                                        {
                                            blocks[key].map((item: any) => {
                                                return item
                                            })
                                        }
                                    </Row>
                                }

                            </Card>
                        </Col>)
                } else {
                    return <div key={key} style={{display: 'none'}}>
                        {
                            blocks[key].map((item: any) => {
                                return item
                            })
                        }
                    </div>
                }
            })}
        </Row>
    )
}

export default AntFormBlock
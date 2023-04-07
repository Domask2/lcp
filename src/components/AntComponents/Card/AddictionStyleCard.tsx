import React, {useEffect, useState} from "react";
import {useData} from "./AddictionStyleContext";
import EditStyle from "../Editor/Components/EditStyle";
import {Button, Col, Popconfirm, Row, Typography} from "antd";
import {DeleteOutlined} from "@ant-design/icons";
import styles from './AddictionStyle.module.css';

const AddictionStyleCard = ({style}: any) => {
    const { setAddictionStyleArray, currentProject } = useData();
    const [newStyle, setNewStyle] = useState(style.style);

    useEffect(() => {
        setAddictionStyleArray((array: any) => {
            let newArr: any = [...array]

            newArr.forEach((arr: any) => {
                if (arr.id === style.id) {
                    arr.style = {...newStyle}
                }
            })
            return newArr
        })
    }, [newStyle])

    return (
        <div className={styles.addictionStyleCard}>
            <Row>

                {currentProject?.addictions && Object.values(currentProject.addictions).map((item: any) => {
                    if (item.id === style.id) {
                        return <Col key={item.id} className={styles.col_addiction}>
                            <Typography className={styles.col_addiction_text}>{item.title}</Typography>
                        </Col>
                    }
                })}

                <Col flex="20px">
                    <Popconfirm placement="right" title='Удалить зависимость?'
                                onConfirm={() => {
                                    setAddictionStyleArray((array: any) => {
                                        let newArr: any = [...array]

                                        newArr.forEach((arr: any, index: number) => {
                                            if (arr.id === style.id) {
                                                newArr.splice(index, 1)
                                            }
                                        })
                                        return newArr
                                    })

                                }}
                                okText="Yes" cancelText="No">
                        <Button type="primary" danger
                                icon={<DeleteOutlined/>}/>
                    </Popconfirm>
                </Col>
            </Row>

            <EditStyle style={style.style} setStyle={setNewStyle}/>
        </div>
    )

}

export default AddictionStyleCard;
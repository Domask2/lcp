import React, {useEffect, useState} from 'react';
import {useActions} from "../../../hooks";
import ItemEdit from "../Editor/Elements/ItemEdit";
import ButtonBlock from "../Editor/ButtonBlock";
import {Card, Col, Row} from "antd";

type ExtEditType = {
    cmp: any,
    setVisible?: (v: boolean) => void
}
const ExtEdit: React.FC<ExtEditType> = ({
                                            cmp, setVisible = () => {
    }
                                        }) => {
    const {cmpUpdate} = useActions()
    let model = {...cmp}
    const [cmp_key, setCmpKey] = useState<string>(model.cmp_key)

    useEffect(() => {
        model.cmp_key = cmp_key
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cmp_key])

    const onClose = () => {
        setVisible(false)
    }

    const onApply = () => {
        cmpUpdate(model)
        setVisible(false)
    }

    return <>
        <h3>Редактирование: {cmp.type} - {cmp.key}</h3>
        <br/>
        <Row gutter={[16, 16]}>
            <Col span={12}>
                <Card size="small" className="cardEdit">
                    <ItemEdit label="cmp_key" item={cmp_key} setItem={setCmpKey} del={false} nullable={true} type={"string"}/>
                </Card>
            </Col>
        </Row>

        <ButtonBlock onApply={onApply} onClose={onClose}/>
    </>
};

export default ExtEdit;
import React from 'react';
import {Button, Col, Row} from "antd";

type ButtonBlockType = {
    onApply: (e:any) => void,
    onClose: () => void
}
const ButtonBlock: React.FC<ButtonBlockType> = ({onApply, onClose}) => {
    return <Row dir="rtl" style={{marginTop: '16px'}}>
        <Col>
            <Button className="lcButtonPrimary" onClick={onApply}>Применить</Button>
            <Button className="lcButtonDefault" style={{margin: '0 10px'}} onClick={onClose}>Закрыть</Button>
        </Col>
    </Row>
};

export default ButtonBlock;
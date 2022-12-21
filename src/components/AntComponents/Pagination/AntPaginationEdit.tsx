import React, {useEffect, useState} from 'react';
import {Card, Col, Row} from "antd";
import {useTypedSelector, useActions} from "../../../hooks";
import ButtonBlock from "../Editor/ButtonBlock";
import ItemEdit from "../Editor/Elements/ItemEdit";
import EditBlock from "../Editor/Components/EditBlock";
import EditStyle from "../Editor/Components/EditStyle";
import EditAcl from "../Editor/Components/EditAcl";
import AddictionContainer from '../../addiction/AddictionContainer';

import {RootState} from "../../../redux/redux.store";
import {getDataSourcesAll} from "../../../redux/ds/ds.selector";

type AntPaginationEditType = {
    cmp: any,
    setVisible?: (v: boolean) => void
}

const AntPaginationEdit: React.FC<AntPaginationEditType> = ({cmp, setVisible = () => { }}) => {
    const {cmpUpdate} = useActions()
    const dsArr = useTypedSelector((state: RootState) => getDataSourcesAll(state));

    let model = {...cmp}
    const [style, setStyle] = useState({...model.style})
    const [ds, setDs] = useState(model.ds.key)
    const [acl, setAcl] = useState(model.acl)
    const [addiction, setAddiction] = useState<number | ''>(model.addiction)
    const [curPage, setCurPage] = useState(model.cur_page)
    const [perPage, setPerPage] = useState(model.per_page)

    useEffect(() => {
        model.style = style
        model.ds = {key: ds}
        model.acl = acl
        model.addiction = addiction
        model.cur_page = +curPage
        model.per_page = +perPage
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [style, ds, acl, addiction, curPage, perPage])

    const onClose = () => {
        setVisible(false)
    }

    const onApply = () => {
        cmpUpdate(model)
        setVisible(false)
    }

    return <>
        <h3>Редактирование: {cmp.type} - {cmp.key}</h3>
        <br />
        <Row gutter={[16, 16]}>
            <Col span={12}>

                <Card className="cardEdit" size="small">
                    <ItemEdit label="Ds" item={ds} setItem={setDs}
                              type='select'
                              selectItems={Object.keys(dsArr)}
                              del={false}
                              labelWidth="90px" />
                </Card>

                <Card className="cardEdit" size="small">
                    <ItemEdit label="Cur_Page" item={curPage} setItem={setCurPage}
                              type='string'
                              del={false}
                              labelWidth="90px" />

                    <ItemEdit label="Per_Page" item={perPage} setItem={setPerPage}
                              type='string'
                              del={false}
                              labelWidth="90px" />
                </Card>

                <Card size="small" className="cardEdit">
                    <AddictionContainer setState={setAddiction} cmp={cmp} addictionId={addiction} />
                </Card>

                <Card size="small" className="cardEdit cardEditAcl">
                    <EditAcl item={acl} setItem={setAcl} />
                </Card>

            </Col>

            <Col span={12}>
                <EditBlock title="Style">
                    <EditStyle style={style} setStyle={setStyle} />
                </EditBlock>
            </Col>
        </Row>

        <ButtonBlock onApply={onApply} onClose={onClose} />
    </>
};

export default AntPaginationEdit;
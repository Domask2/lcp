import React, {useEffect, useState} from 'react';
import {Card, Col, Row, Tabs} from "antd";
import ObjectFixedEditor from "../Editor/Elements/ObjectFixedEditor";
import {useActions} from "../../../hooks/useActions";
import ButtonBlock from "../Editor/ButtonBlock";
import ObjectEditor from "../Editor/Elements/ObjectEditor";
import ArrayEditor from "../Editor/Elements/ArrayEditor";
import TableColumnsEdit from "../Table/TableColumnsEdit";
import EditAcl from "../Editor/Components/EditAcl";
import {useTypedSelector} from '../../../hooks/useTypedSelector';
import {RootState} from '../../../redux/redux.store';
import {getDataSourcesAll} from '../../../redux/ds/ds.selector';
import AddictionContainer from '../../addiction/AddictionContainer';

const {TabPane} = Tabs;

type AntSelectEditType = {
    cmp: any
    setVisible?: (v: boolean) => void
}
const AntTableTreeEdit: React.FC<AntSelectEditType> = ({
    cmp, setVisible = () => {
    }
}) => {
    const {cmpUpdate} = useActions()
    let model = {...cmp}
    const [style, setStyle] = useState({...model.style})
    const [ds, setDs] = useState({...model.ds})
    let h = model.hide !== undefined && model.hide !== null ? model.hide : []
    const [hide, setHide] = useState(h)
    const [columns, setColumns] = useState({...model.columns})
    const [acl, setAcl] = useState(model.acl)
    const [addiction, setAddiction] = useState<any>(model.addiction ? model.addiction : '')

    const dsArr = useTypedSelector((state: RootState) => getDataSourcesAll(state));

    useEffect(() => {
        model.style = style
        model.ds = ds
        model.hide = hide
        model.columns = columns
        model.acl = acl
        model.addiction = addiction

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ds, style, hide, columns, acl, addiction])

    const onClose = () => {
        setVisible(false)
    }

    const onApply = () => {
        cmpUpdate(model)
        setVisible(false)
    }

    return <>
        <h3>Редактирование: {cmp.type} - {cmp.key}</h3>
        <Tabs defaultActiveKey="1">
            <TabPane tab="Внешний вид" key="1">
                <Row gutter={[16, 16]}>
                    <Col span={12}>
                        <Card size="small" title="Style" className="cardEdit">
                            <ObjectEditor object={style} setObject={setStyle} autoCss={true} />
                        </Card>
                        <Card size="small" className="cardEdit">
                            <AddictionContainer setState={setAddiction} cmp={cmp} addictionId={addiction} />
                        </Card>

                        <Card size="small" className="cardEdit cardEditAcl">
                            <EditAcl item={acl} setItem={setAcl} />
                        </Card>
                    </Col>

                    <Col span={12}>
                        <Card size="small" className="cardEdit">
                            <ObjectFixedEditor object={ds}
                                setObject={setDs}
                                template={
                                    {
                                        key: {
                                            type: 'select',
                                            title: 'Ключ DS',
                                            widthLabel: '120px',
                                            items: Object.keys(dsArr),
                                        },
                                    }
                                } />
                        </Card>

                        <Card className="cardEdit" size="small" title="Скрыть">
                            <ArrayEditor list={hide} setList={setHide} />
                        </Card>
                    </Col>
                </Row>
            </TabPane>

            <TabPane tab="Настройка колонок" key="2">
                <TableColumnsEdit tableColumns={columns} setTableColumns={setColumns} cmp={cmp} />
            </TabPane>
        </Tabs>


        <ButtonBlock onApply={onApply} onClose={onClose} />
    </>

};

export default AntTableTreeEdit;
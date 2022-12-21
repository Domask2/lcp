import React, {FC, Fragment, useState} from 'react';

import ArrayEditor from "../../ArrayEditor";
import {SelectElementAction} from "./SelectElementAction";

import {Col, Row, Input, Switch} from "antd";

import {IActionsType, IForm} from "../../../../Page/templates";
import {SetObjectType} from "../../ObjectFixedEditor";

interface SelectGroupElementProps {
    object: SetObjectType
    cmp: IForm
    setObject: (o: (o: SetObjectType) => SetObjectType) => void,
    templateKeyItems: Array<string> | undefined
}

export const SelectGroupElement: FC<SelectGroupElementProps> = ({
                                                                    object,
                                                                    cmp,
                                                                    setObject,
                                                                    templateKeyItems,
                                                                }) => {
    const [selectAction, setSelectAction] = useState<string>(object.typeSubmit);

    const setList = (value: any) => {
        if (selectAction === 'action') {
            setObject((prevState) => {
                return {
                    ...prevState,
                    actionsSubmit: value,
                }
            })
        } else {
            setObject((prevState) => {
                return {
                    ...prevState,
                    actionsSubmitFilter: value,
                }
            })
        }
    }

    const handleChecked = (checked: boolean) => {
        setObject((prevState) => {
            return {
                ...prevState,
                isBtnFilter: checked
            }
        })
    }

    const getTitleBtnFilter = (value: string) => {
        setObject((prevState) => {
            return {
                ...prevState,
                titleBtnFilter: value
            }
        })
    }

    return (
        <Input.Group compact className='marginTop10 marginBottom10'
                     style={{display: 'flex', flexDirection: 'column'}}>
            <Row>

                <Row style={{display: 'flex'}} gutter={[3, 3]}>
                    <Col flex='100px' style={{marginBottom: '10px'}}>
                        <SelectElementAction object={object}
                                             setObject={setObject}
                                             templateKeyItems={templateKeyItems!}
                                             setSelectAction={setSelectAction}/>

                    </Col>
                </Row>

                {
                    selectAction === 'action' && (
                        <ArrayEditor list={object?.actionsSubmit as unknown as Array<IActionsType>}
                                     setList={setList}
                                     cmp={cmp}
                        />
                    )
                }

                {
                    selectAction === 'filter' && (
                        <Fragment>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginTop: '10px',
                                marginBottom: '10px'
                            }}>
                                <span style={{marginRight: '10px'}}>
                                    добавить кнопку обработчика событий:
                                </span>
                                <Switch checked={!!object.isBtnFilter}
                                        onChange={() => handleChecked(!object.isBtnFilter)}
                                        size='small'/>
                            </div>


                            {
                                object.isBtnFilter &&
                                <Fragment>

                                    <div style={{display: 'flex', height: '25px', marginBottom: '10px'}}>
                                        <span style={{marginRight: '20px'}}>title</span>
                                        <Input size='small' value={object.titleBtnFilter} className="lcEditorInput"
                                               onChange={(e) => getTitleBtnFilter(e.currentTarget.value)}/>
                                    </div>
                                    <ArrayEditor list={object?.actionsSubmitFilter as unknown as Array<IActionsType>}
                                                 setList={setList}
                                                 cmp={cmp}
                                    />
                                </Fragment>
                            }
                        </Fragment>
                    )
                }


            </Row>
        </Input.Group>
    )
}
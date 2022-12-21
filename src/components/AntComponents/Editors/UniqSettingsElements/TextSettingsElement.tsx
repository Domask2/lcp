import React, {memo} from "react";
import {Card, Col} from 'antd';
import DOMPurify from 'dompurify';
import {CKEditor} from '@ckeditor/ckeditor5-react';
import UserEditor from 'ckeditor5-lcp';
import {useTypedSelector} from "../../../../hooks";
import {RootState} from "../../../../redux/redux.store";
import {getMappedText} from "../../../../redux/ds/ds.selector";

type InputElementType = {
    setValue: any
    value: any
}

const TextSettingsElement: React.FC<InputElementType> = ({setValue, value}) => {

    const mappedConvertedText = useTypedSelector((state: RootState) => getMappedText(state, value))

    const createMarkup = (html: any) => {
        return {
            __html: DOMPurify.sanitize(html)
        }
    }

    return <>

        <Col span={24}>
            <Card className="cardEdit" size="small">
                <h4>Пример</h4>
                <Card style={{marginTop: '20px'}}>
                    <div className="preview ck-content"
                        dangerouslySetInnerHTML={createMarkup(mappedConvertedText)} />
                </Card>
            </Card>

            <Card className="cardEdit" size="small">
                <h4>Text</h4>

                <CKEditor
                    editor={UserEditor}
                    data={value}
                    onReady={() => { }}
                    onChange={(event: any, editor: any) => {
                        const data = editor.getData();
                        setValue(data)
                    }}

                />
            </Card>
        </Col>
    </>
};


export default memo(TextSettingsElement)
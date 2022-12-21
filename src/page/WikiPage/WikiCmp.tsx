import React from 'react';
import {Divider, Typography} from "antd";
import ReactJson from "react-json-view";

const {Text} = Typography;

const WikiCmp = () => {
    return <>
        <h2>Button</h2>
        <table>

            <tr>
                <td valign="top" style={{paddingRight: '10px', width: '200px'}}><Text code>{`action:<string>`}</Text>
                </td>
                <td>
                    {`Строка описывающая что делать при нажатии. Состоит из двух частей разделенных ":".`}
                    <br/>
                    <Text
                        code>{`to:selected - перейти на страницу "selected", fnc:load_v_bulls:15 - выполнить фукнцию "load_v_bulls", с параметром 15`}</Text>
                </td>
            </tr>

        </table>

        <Divider/>

        <h2>Table</h2>
        <table>
            <tr>
                <td valign="top" style={{paddingRight: '10px', width: '200px'}}><Text code>{`props:<any>`}</Text></td>
                <td>
                    Свойства таблицы, передать можно все что умеет принимать AntD Table.
                    <Divider/>
                </td>
            </tr>

            <tr>
                <td valign="top" style={{paddingRight: '10px'}}><Text code>{`selectable:<boolean>`}</Text></td>
                <td>
                    Включается режим с возможность выбирать некоторые строки таблицы. Выбранные строки попадают в массив
                    selectedRows того источника данных к которому подключена таблица
                    <Divider/>
                </td>
            </tr>

            <tr>
                <td valign="top" style={{paddingRight: '10px'}}><Text code>{`actions:<object>`}</Text></td>
                <td>
                    <ReactJson style={{fontSize: '12px'}}
                               theme="monokai"
                               quotesOnKeys={false}
                               displayObjectSize={false}
                               enableClipboard={false}
                               name={false}
                               src={{
                                   "add": false,
                                   "edit": false,
                                   "delete": false
                               }}/>
                    Можно подключить соответствующие возможности.
                    <Divider/>
                </td>
            </tr>

            <tr>
                <td valign="top" style={{paddingRight: '10px'}}><Text code>{`ds:<object>`}</Text></td>
                <td>
                    <ReactJson style={{fontSize: '12px'}}
                               theme="monokai"
                               quotesOnKeys={false}
                               displayObjectSize={false}
                               enableClipboard={false}
                               name={false}
                               src={{
                                   "key": "key_data_source",
                                   "dependency": "<ds.key>:<colunm_name_this>:<column_name_that>"
                               }}/>

                    key - таблица возьмет данные из источника с этим ключом<br/>
                    dependency - таблица может иметь зависимость от другой таблицы.
                    <Divider/>
                </td>
            </tr>

            <tr>
                <td valign="top" style={{paddingRight: '10px'}}><Text code>{`columns:<object>`}</Text></td>
                <td>
                    <ReactJson style={{fontSize: '12px'}}
                               theme="monokai"
                               quotesOnKeys={false}
                               displayObjectSize={false}
                               enableClipboard={false}
                               name={false}
                               src={{
                                   "<col_name>": {
                                       "modal?": "this",
                                       "mutate?": "<ds_key>:<col_compare_name>:<col_val_name>",
                                       "link?": "<page_key>:<param_field>",
                                       "fnc?": "load_clones:id",
                                       "style?": {
                                           color: '#aaa',
                                           fontSize: '12px',
                                           whiteSpace: 'nowrap'
                                       },
                                       "multiple?": {
                                           key: "<col_key>",
                                           style: {}
                                       }
                                   }
                               }}/>

                    Можем задать для любой колонки дополнительные значения.<br/>

                    <Divider/>
                </td>
            </tr>

        </table>

    </>;
};

export default WikiCmp;
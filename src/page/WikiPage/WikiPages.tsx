import React from 'react';
import {Button, Col, notification, Row, Switch, Table, Typography} from "antd";

const {Paragraph} = Typography;

const WikiPages = () => {
    const openNotificationWithIcon = () => {
        notification["success"]({
            message: 'Создание страницы',
            description:
                'Все верно! После нажатия на эту кнопку страница будет создана.',
        });
    };

    return <Paragraph>
        <h3>Создание страницы</h3>
        После того как для проекта создана навигация. В меню сдева появятся разделы выбранного проекта.
        Внутри раздела страницы. Создать страницу можно перейдя на нее в основном меню.
        Если страницы еще нет, появится кнопка.<br/><br/>
        <Button className="lcButtonLc" onClick={() => openNotificationWithIcon()}>Такой страницы еще нет. Нажмите чтобы
            создать.</Button><br/><br/>

        <h3>Режим редактирования</h3>
        Режим редактирования включается переключателем в верхней части левого блока меню.&nbsp;&nbsp;
        <Switch checked={false} size="small" defaultChecked/>

        <br/>
        <br/>

        <h3>Код страницы</h3>
        <blockquote>
            При включении режима редактирования, вверху появятся вкладки "Вид", "Код JSON".<br/>
        </blockquote>

        <Row>
            <Col>
                <Table title={() => 'Свойства страницы'}
                       pagination={false}
                       columns={[{title: 'Свойство', dataIndex: 'prop'}, {title: 'Значение', dataIndex: 'val'}]}
                       dataSource={[
                           {key: 'id', prop: 'id', val: <>{`<integer>`} - уникальный идентификатор</>},
                           {key: 'title', prop: 'title', val: <>{`<string>`} - заголовок страницы</>},
                           {key: 'key', prop: 'key', val: <>{`<string>`}<span> - уникальный ключ страницы</span></>},
                           {
                               key: 'description',
                               prop: 'description',
                               val: <>{`<string>`} - кратное описание страницы</>
                           },
                           {
                               key: 'components',
                               prop: <b>components</b>,
                               val: <>{`Array<IComponent>`}<span> - массив содержащий компоненты страницы</span></>
                           },
                           {
                               key: 'datasources',
                               prop: <b>datasources</b>,
                               val: <>{`{[ds_key: string]: IDataSource}`} - объект содержащий информацию об источниках
                                   данных используемых на этой странице.</>
                           },
                           {
                               key: 'ls',
                               prop: <b>ls</b>,
                               val: <>{`Array<ILocalStorage>`} - массив объектов локальных хранилищ</>
                           },
                           {
                               key: 'fnc',
                               prop: <b>fnc</b>,
                               val: <>{`Array<IFnc>`} - массив функций используемых на этой странице.</>
                           },
                       ]}
                       size="small"
                />
            </Col>
        </Row>

    </Paragraph>;
};

export default WikiPages;
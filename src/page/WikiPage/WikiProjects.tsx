import React from 'react';
import { Typography } from 'antd';
import {NavLink} from "react-router-dom";
import ReactJson from "react-json-view";

const { Paragraph } = Typography;

const WikiProjects = () => {
    return <Paragraph>
        <h3>Создание проекта</h3>
        <p>
            Боковое меню, раздел "Пользвователь", подраздел <NavLink to="/admin">Admin</NavLink><br/>
            Вкладка "Проекты" --- "Новый проект
        </p>

        <h4>Навигация</h4>
        <blockquote>Массив, каждый элемент которого является JSON-объектом описывающим один раздел проекта.</blockquote>
        Сколько элементов в массиве, столько разделов будет в проекте.<br/>
        Пример раздела:
        <ReactJson theme="monokai"
                   quotesOnKeys={false}
                   displayObjectSize={false}
                   enableClipboard={false}
                   name={false}
                   src={{
            "key": "hidden_pages",
            "title": "Скрытые страницы",
            "visible": false,
            "children": [
                {
                    "key": "bull",
                    "title": "Бык",
                    "params": "/:id?",
                    "visible": true
                },
                {
                    "key": "selected",
                    "title": "Выбранные быки"
                }
            ]
        }} />

    </Paragraph>;
};

export default WikiProjects;
const DefaultTamplates: any = {
    STANDART: {
        template: {
            components: [
                {
                    "key": "row_01",
                    "type": "Row",
                    "props": {
                        "gutter": [
                            16,
                            16
                        ]
                    },
                    "style": {
                        "marginBottom": "16px",
                        'justifyContent': 'center',
                        'padding': '16px',
                    },
                    "children": [
                        {
                            "key": "col_01",
                            "type": "Col",
                            "props": {
                                "span": 24
                            },
                            "children": [
                                {
                                    "key": "card_01",
                                    "type": "Card",
                                    "props": {
                                        "size": "small"
                                    },
                                    "children": [
                                        {
                                            "key": "breadcrumb_01",
                                            "type": "Breadcrumb",
                                            "items": [
                                                {
                                                    "route": "/bulls/bulls_list",
                                                    "title": "Список животных"
                                                }
                                            ],
                                            "style": {
                                                "display": "inline"
                                            },
                                            "title": "[[ds:bulls/v_bull_details:first:klichka]] ([[ds:bulls/v_bull_details:first:ninv]])"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "key": "col_02",
                            "type": "Col",
                            "props": {
                                "span": 24
                            },
                            "children": [
                                {
                                    "key": "card_03",
                                    "type": "Card",
                                    "props": {
                                        "size": "small"
                                    },
                                    "children": []
                                }
                            ]
                        }
                    ]
                }
            ],
            datasources: {
                "<ds_key>": {
                    "key": "<ds_key>",
                    "filter": "__cur_page=1&__per_page=10"
                }
            },
            ls: [],
            fn: [],
        },
        title: 'Стандартный шаблон',
    },
    LEFT_MENU: {
        template: {
            components: [
                {
                    "key": "row_01",
                    "type": "Row",
                    "props": {
                        "gutter": [
                            16,
                            16
                        ]
                    },
                    "style": {
                        "marginBottom": "16px",
                        'justifyContent': 'center',
                        'padding': '16px',
                    },
                    "children": [
                        {
                            "acl": [],
                            "key": "Col_74262434",
                            "path": "0-0-0",
                            "type": "Col",
                            "props": {
                                "span": 12
                            },
                            "style": {
                                "maxWidth": "240px"
                            },
                            "anchor": null,
                            "children": [
                                {
                                    "acl": [],
                                    "key": "Card_707208380",
                                    "path": "0-0-0-0",
                                    "type": "Card",
                                    "props": {
                                        "size": "small",
                                        "className": null
                                    },
                                    "style": {
                                        "height": "100%"
                                    },
                                    "anchor": null,
                                    "caption": null,
                                    "children": [
                                        {
                                            "ds": "",
                                            "acl": [],
                                            "key": "Menu_780853913",
                                            "url": "",
                                            "path": "0-0-0-0-0",
                                            "type": "Menu",
                                            "style": {
                                                "borderRight": "none"
                                            },
                                            "anchor": "",
                                            "actions": "",
                                            "addiction": [],
                                            "listTitle": "",
                                            "labelStyle": {
                                                "height": "20px",
                                                "backgroundColor": "inherit"
                                            },
                                            "listValues": "",
                                            "per_page": "",
                                            "initDictionary": {
                                                "one": "Пункт 1",
                                                "two": "Пункт 2",
                                                "three": "Пункт 3"
                                            }
                                        }
                                    ],
                                    "per_page": null,
                                    "addiction": []
                                }
                            ],
                            "per_page": null,
                            "addiction": []
                        },
                        {
                            "acl": [],
                            "key": "Col_783094850",
                            "path": "0-0-1",
                            "type": "Col",
                            "props": {
                                "span": 18
                            },
                            "anchor": null,
                            "children": [
                                {
                                    "acl": [],
                                    "key": "Card_841521602",
                                    "type": "Card",
                                    "props": {
                                        "size": "small",
                                        "className": null
                                    },
                                    "style": {
                                        "height": "100%"
                                    },
                                    "anchor": null,
                                    "caption": null,
                                    "children": [
                                        {
                                            "acl": [],
                                            "key": "Divider_932116382",
                                            "path": "0-0-1-1",
                                            "type": "Divider",
                                            "style": [],
                                            "anchor": null,
                                            "caption": "Справочники",
                                            "per_page": null,
                                            "addiction": []
                                        },
                                        {
                                            "acl": [],
                                            "key": "Search_95118180",
                                            "path": "0-0-1-0",
                                            "type": "Search",
                                            "style": {
                                                "marginBottom": "16px"
                                            },
                                            "anchor": "",
                                            "caption": "Поиск",
                                            "per_page": "",
                                            "addiction": [],
                                            "searchObj": {
                                                "ds": "",
                                                "prefix": "",
                                                "searchValue": null
                                            },
                                            "filtredKey": "",
                                            "iteratorDs": ""
                                        },
                                        {
                                            "ds": {
                                                "key": "",
                                                "dependency": null
                                            },
                                            "acl": [],
                                            "key": "Table_690527352",
                                            "menu": [],
                                            "path": "0-0-1-2",
                                            "type": "Table",
                                            "props": {
                                                "size": "default",
                                                "scroll": "",
                                                "pagination": {
                                                    "pageSize": 50
                                                }
                                            },
                                            "style": {
                                                "width": "100%",
                                                "marginBottom": "16px"
                                            },
                                            "title": "default",
                                            "anchor": "",
                                            "select": {
                                                "selectable": false
                                            },
                                            "actions": {
                                                "add": false,
                                                "edit": false,
                                                "delete": false
                                            },
                                            "caption": "",
                                            "columns": {
                                                "key": {
                                                    "style": [],
                                                    "addictions": []
                                                }
                                            },
                                            "addiction": [],
                                            "filtredKey": "",
                                            "iteratorDs": "",
                                            "selectable": false
                                        }
                                    ],
                                    "per_page": null,
                                    "addiction": []
                                }
                            ],
                            "per_page": null,
                            "addiction": []
                        }
                    ]
                }
            ],
            datasources: {
                "<ds_key>": {
                    "key": "<ds_key>",
                    "filter": "__cur_page=1&__per_page=10"
                }
            },
            ls: [],
            fn: [],

        },
        title: 'Левое меню',
    },
    LEFT_2LEVEL_MENU: {
        template: {
            components: [
                {
                    "key": "row_01",
                    "type": "Row",
                    "props": {
                        "gutter": [
                            16,
                            16
                        ]
                    },
                    "style": {
                        "marginBottom": "16px",
                        "justifyContent": "center"
                    },
                    "children": [
                        {
                            "acl": [],
                            "key": "Col_19661326",
                            "path": "0-0-1",
                            "type": "Col",
                            "props": {
                                "span": 6
                            },
                            "style": {
                                "display": "flex",
                                "flexDirection": "column"
                            },
                            "anchor": null,
                            "children": [
                                {
                                    "acl": [],
                                    "key": "Card_899802549",
                                    "path": "0-0-1-0",
                                    "type": "Card",
                                    "props": {
                                        "size": "small",
                                        "className": null
                                    },
                                    "style": {
                                        "flexGrow": "1"
                                    },
                                    "anchor": null,
                                    "caption": "Меню",
                                    "children": [
                                        {
                                            "ds": "sprv/v_s_list_part",
                                            "acl": [],
                                            "key": "Menu_282003124",
                                            "url": "/sprv/s",
                                            "open": true,
                                            "path": "0-0-1-0-0",
                                            "type": "Menu",
                                            "style": {
                                                "marginTop": "20px"
                                            },
                                            "anchor": null,
                                            "actions": null,
                                            "page_key": "/hozlist/cascade",
                                            "addiction": [],
                                            "listTitle": "title",
                                            "labelStyle": {
                                                "margin": "-5px 0"
                                            },
                                            "listValues": "key"
                                        }
                                    ],
                                    "page_key": "/sprv/gen",
                                    "per_page": null,
                                    "addiction": []
                                }
                            ],
                            "page_key": "/sprv/gen",
                            "per_page": null,
                            "addiction": []
                        },
                        {
                            "acl": [],
                            "key": "Col_783094850",
                            "path": "0-0-0",
                            "type": "Col",
                            "props": {
                                "span": 18
                            },
                            "anchor": null,
                            "children": [
                                {
                                    "acl": [],
                                    "key": "Card_841521602",
                                    "type": "Card",
                                    "props": {
                                        "size": "small",
                                        "className": null
                                    },
                                    "style": {
                                        "height": "100%"
                                    },
                                    "anchor": null,
                                    "caption": null,
                                    "children": [
                                        {
                                            "acl": [],
                                            "key": "Divider_932116382",
                                            "path": "0-0-0-0-0",
                                            "type": "Divider",
                                            "style": [],
                                            "anchor": null,
                                            "caption": "Справочники",
                                            "per_page": null,
                                            "addiction": []
                                        },
                                        {
                                            "acl": [],
                                            "key": "Search_95118180",
                                            "path": "0-0-0-0-1",
                                            "type": "Search",
                                            "style": {
                                                "marginBottom": "16px"
                                            },
                                            "anchor": null,
                                            "caption": "Поиск",
                                            "per_page": null,
                                            "addiction": [],
                                            "searchObj": {
                                                "ds": null,
                                                "prefix": null,
                                                "searchValue": null
                                            },
                                            "filtredKey": null,
                                            "iteratorDs": null
                                        },
                                        {
                                            "ds": {
                                                "key": null,
                                                "dependency": null
                                            },
                                            "acl": [],
                                            "key": "Table_690527352",
                                            "menu": [],
                                            "path": "0-0-0-0-2",
                                            "type": "Table",
                                            "props": {
                                                "size": "default",
                                                "scroll": null,
                                                "pagination": {
                                                    "pageSize": 50
                                                }
                                            },
                                            "style": {
                                                "width": "100%",
                                                "marginBottom": "16px"
                                            },
                                            "title": "default",
                                            "anchor": null,
                                            "select": {
                                                "selectable": false
                                            },
                                            "actions": {
                                                "add": false,
                                                "edit": false,
                                                "delete": false
                                            },
                                            "caption": null,
                                            "columns": {
                                                "key": {
                                                    "style": [],
                                                    "addictions": []
                                                }
                                            },
                                            "addiction": [],
                                            "filtredKey": null,
                                            "iteratorDs": null,
                                            "selectable": false
                                        }
                                    ],
                                    "per_page": null,
                                    "addiction": [],
                                    "path": "0-0-0-0"
                                }
                            ],
                            "per_page": null,
                            "addiction": []
                        }
                    ],
                    "path": "0-0"
                }
            ],
            datasources: {
                "<ds_key>": {
                    "key": "<ds_key>",
                    "filter": "__cur_page=1&__per_page=10"
                }
            },
            ls: [],
            fn: [],

        },
        title: 'Левое двухуровневое меню',
    },
}

export default DefaultTamplates 
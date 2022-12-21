const default_values = {
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
                "marginBottom": "16px"
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
    fn: []
}

export default default_values
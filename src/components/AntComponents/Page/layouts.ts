export const layouts: { [key: string]: any } = {
    ROW_BREAD__COL24: {
        "key": "row_01",
        "type": "Row",
        "props": {
            "gutter": [16, 16]
        },
        "style": {
            "marginBottom": '16px'
        },
        children: [
            {
                "key": "col_01",
                "type": "Col",
                "props": {
                    "span": 24
                },
                children: [
                    {
                        "key": "card_01",
                        "type": "Card",
                        "props": {
                            "size": "small"
                        },
                        children: [
                            {
                                key: 'breadcrumb_01',
                                type: 'Breadcrumb',
                                items: [
                                    {
                                        route: '/bulls/bulls_list',
                                        title: 'Список животных'
                                    }
                                ],
                                style: {
                                    display: 'inline'
                                },
                                title: '[[ds:bulls/v_bull_details:first:klichka]] ([[ds:bulls/v_bull_details:first:ninv]])'
                            },
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
                children: [
                    {
                        "key": "card_03",
                        "type": "Card",
                        "props": {
                            "size": "small"
                        },
                        children: []
                    }
                ]
            }
        ]
    },
    ROW_BREAD__COLS12_12: {
        "key": "row_11",
        "type": "Row",
        "props": {
            "gutter": [16, 16]
        },
        "style": {
            "marginBottom": '16px'
        },
        children: [
            {
                "key": "col_01",
                "type": "Col",
                "props": {
                    "span": 24
                },
                children: [
                    {
                        "key": "card_01",
                        "type": "Card",
                        "props": {
                            "size": "small"
                        },
                        children: [
                            {
                                key: 'breadcrumb_01',
                                type: 'Breadcrumb',
                                items: [
                                    {
                                        route: '/bulls/bulls_list',
                                        title: 'Список животных'
                                    }
                                ],
                                style: {
                                    display: 'inline'
                                },
                                title: '[[ds:bulls/v_bull_details:first:klichka]] ([[ds:bulls/v_bull_details:first:ninv]])'
                            },
                        ]
                    }
                ]
            },
            {
                "key": "col_02",
                "type": "Col",
                "props": {
                    "span": 12
                },
                children: [
                    {
                        "key": "card_02",
                        "type": "Card",
                        "props": {
                            "size": "small"
                        },
                        children: []
                    }
                ]
            },
            {
                "key": "col_03",
                "type": "Col",
                "props": {
                    "span": 12
                },
                children: [
                    {
                        "key": "card_03",
                        "type": "Card",
                        "props": {
                            "size": "small"
                        },
                        children: []
                    }
                ]
            }
        ]
    },
}
const ds_old = [
    {
        id: 1,
        title: 'Флаги',
        dbserver: 'Plinor.DB1',
        endpoint: '/api/flags',
        crud: ['read', 'update'],
        key: 'flags-1',
        type: 'flags',
        data: {
            check1: false,
            check2: true,
        }
    },
    {
        id: 3,
        title: 'Таблица животных',
        dbserver: 'Plinor.DB1',
        endpoint: '/api/tables/animals',
        crud: ['create', 'read', 'update', 'delete'],
        key: 'animals',
        type: 'table',
        fields: [
            {
                title: 'Id',
                dataIndex: 'id',
                key: 'id',
                visible: false,
                type: 'number'
            },
            {
                title: 'Кличка',
                dataIndex: 'klichka',
                key: 'klichka',
                type: 'string'
            },
            {
                title: 'NINV',
                dataIndex: 'ninv',
                key: 'ninv',
                type: 'string'
            },
            {
                title: 'Дата рождения',
                dataIndex: 'date_rogd',
                key: 'date_rogd',
                type: 'date'
            },
            {
                title: 'Хоязйство',
                dataIndex: 'nhoz',
                key: 'nhoz',
                type: 'number'
            },
        ],
        items: [
            {
                key: 'k-0',
                id: 1,
                klichka: 'Вихрь',
                ninv: 123,
                date_rogd: '15.06.2012',
                nhoz: 1265002,
            },
            {
                key: 'k-1',
                id: 2,
                klichka: 'Мастер',
                ninv: 225,
                date_rogd: '21.01.2015',
                nhoz: 1265002
            },
            {
                key: 'k-2',
                id: 6,
                klichka: 'Юпитер',
                ninv: 337,
                date_rogd: '11.07.2010',
                nhoz: 1265002
            },
            {
                key: 'k-01',
                id: 3,
                klichka: 'Аккорд',
                ninv: 123,
                date_rogd: '07.06.2012',
                nhoz: 1265002,
            },
            {
                key: 'k-11',
                id: 4,
                klichka: 'Юлиан',
                ninv: 225,
                date_rogd: '30.01.2015',
                nhoz: 1265002
            },
            {
                key: 'k-21',
                id: 9,
                klichka: 'Желотик',
                ninv: 337,
                date_rogd: '16.07.2010',
                nhoz: 1265002
            },
            {
                key: 'k-02',
                id: 5,
                klichka: 'Барабан',
                ninv: 123,
                date_rogd: '25.06.2012',
                nhoz: 1265002,
            },
            {
                key: 'k-12',
                id: 8,
                klichka: 'Кубик',
                ninv: 225,
                date_rogd: '11.01.2015',
                nhoz: 1265002
            },
            {
                key: 'k-22',
                id: 7,
                klichka: 'Силач',
                ninv: 337,
                date_rogd: '14.07.2010',
                nhoz: 1265002
            },
            {
                key: 'k-03',
                id: 10,
                klichka: 'Зеленый',
                ninv: 123,
                date_rogd: '13.06.2012',
                nhoz: 1265002,
            },
            {
                key: 'k-13',
                id: 12,
                klichka: 'Боевой',
                ninv: 225,
                date_rogd: '24.01.2015',
                nhoz: 1265002
            },
            {
                key: 'k-23',
                id: 11,
                klichka: 'Борис',
                ninv: 337,
                date_rogd: '03.07.2010',
                nhoz: 1265002
            }
        ]
    },
    {
        id: 2,
        title: 'Справочник хозяйств',
        dbserver: 'Plinor.SPRV',
        endpoint: '/api/sprv/shoz',
        crud: ['read'],
        key: 'SPRV.shoz',
        type: 'sprv',
    },
    {
        id: 4,
        title: 'Справочник пород',
        dbserver: 'Plinor.SPRV',
        endpoint: '/api/sprv/spor',
        crud: ['read'],
        key: 'SPRV.spor',
        type: 'sprv',
    }
]

export default ds_old

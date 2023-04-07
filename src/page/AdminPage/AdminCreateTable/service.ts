import {dataBaseI, sqlPackI} from "./type";

export const check = (db: dataBaseI[], key: string, res: boolean): dataBaseI[] => {
    return db.map((db) => {
        if (db.key === key) {
            db['check'] = res
        }
        return db
    })
}

export const deleteCheck = (db: dataBaseI[], key: string): dataBaseI[] => {
    return db.map((db) => {
        if (db.key === key) {
            delete db['check']
        }
        return db
    })
}

export const optionsFromSqlPacksArray = (array: sqlPackI[]): sqlPackI[] => {
    if (array.length) {
        return array.map((sql: sqlPackI) => {
            sql['value'] = sql.key;
            sql['label'] = sql.key;
            return sql;
        })
    } else {
        return array
    }
}
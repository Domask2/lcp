import {IActionsType, IForm} from "../components/AntComponents/Page/templates";
import {IFnc} from "../redux/fnc/fnc.initial";
import {IDB} from "../redux/app/app.initial";

export const getFormDate = (cmp: IForm) => {
    let getFormDateArray: Array<any> = ['unknow_form_type', "unknow_ds_key", ['']]

    if (cmp.submit !== undefined) {
        if(cmp.submit.typeSubmit === 'action') {
            if(cmp.submit.actionsSubmit !== undefined) {
                getFormDateArray[0] = cmp?.submit?.typeSubmit
                getFormDateArray[1] = cmp?.source
                getFormDateArray[2] = cmp?.submit?.actionsSubmit
            }
        } else {
            getFormDateArray[0] = cmp?.submit?.typeSubmit
            getFormDateArray[1] = cmp?.source
            getFormDateArray[2] = cmp?.submit?.actionsSubmitFilter
        }

    }

    return getFormDateArray
}

export const getActionDescription = (fncAll: Array<IFnc>, dbAll: Array<IDB>, currentActions: Array<IActionsType>, cmp: IForm) => {
    let actionDescription = '';
    if (currentActions.length > 0) {
        let currentFncData: { key_db: string, key_fnc: string } = {key_db: '', key_fnc: ''};

        if (fncAll.length > 0) {
            fncAll?.forEach((fnc: IFnc) => {
                currentActions.forEach((action: IActionsType) => {
                    if (fnc.key === action.source) {
                        currentFncData.key_db = fnc!.source!.split('/')[0]!;
                        currentFncData.key_fnc = fnc!.source!.split('/')[1].split(':')[0]
                    }
                })
            })
        }

        if (currentFncData.key_fnc !== '' && currentFncData.key_db !== '') {
            dbAll?.forEach((db: IDB) => {
                if (db?.key === currentFncData.key_db)
                    db?.dataSources.forEach((dbSource: any) => {
                        if (dbSource?.key === currentFncData.key_fnc) {
                            actionDescription = dbSource.description
                        }
                    })
            })
        }
    }

    let isObjAction = '';
    if (cmp?.submit?.actions?.length > 0) {
        cmp?.submit?.actions.forEach((action: IActionsType) => {
            if (action?.params !== null) {
                action?.params.forEach((param: { string: string | number }) => {
                    isObjAction = Object.keys(param)[0]
                })
            }
        })
    }

    let infoDescription = {vars: [{name: '', type: ''}]}
    if (isObjAction === 'obj') {
        if (actionDescription !== '') {
            if (actionDescription.split(':')[0] === 'json') {
                infoDescription = JSON.parse(actionDescription.split('json:')[1])
            }
        }
    }

    return infoDescription;
}


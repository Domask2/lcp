import useTo from "./useTo";
import useLoadDataSource from "./useLoadDataSource";
import {useActions} from "./useActions";

import {useTypedSelector} from "./useTypedSelector";
import {getFncAll} from "../redux/fnc/fnc.selector";
import {getDataSource} from "../redux/ds/ds.selector";
import {getAllDsProject} from "../redux/project/project.selector";

import {combineAction, getAllReloadDs, setObjectAction, setObjectSelect} from "../services/combineActions";

import {RootState} from "../redux/redux.store";
import {IActionsType, ITableRow} from "../components/AntComponents/Page/templates";

export default function useAction(actions: Array<IActionsType>, dsBtnForm?: string, itemTableMenu?: ITableRow) {
    const {to} = useTo();
    const [loadDataSourceWithCache] = useLoadDataSource();
    const {executeDbProcedure, loadDataSource, clearSelect} = useActions();
    const actionsHooks = {to, loadDataSourceWithCache, executeDbProcedure, loadDataSource};

    const dataSource = useTypedSelector((state: RootState) => getDataSource(state, dsBtnForm));
    const fncAll = useTypedSelector((state: RootState) => getFncAll(state));
    const allDsProject = useTypedSelector((state: RootState) => getAllDsProject(state));

    const onClick = (e?: any, formValue?: any, btnReduxElem?: any) => {
        // if (formValue && formValue.num_svid) formValue.num_svid = +formValue.num_svid //ToDo: убрать

        actions && Array.isArray(actions) && actions?.forEach((action: any) => {
            // if (action.type === 'to') {
            //     let {objectAction} = setObjectAction(action, undefined);
            //     combineAction(objectAction, fncAll, actionsHooks);
            // }
            // button procObj

            if (action.type === 'api') {
                // form
                if (formValue) {
                    let newDsFilter = getAllReloadDs(allDsProject, action.reloadDS, dsBtnForm);
                    let {objectAction} = setObjectAction(action, formValue, false);
                    combineAction(objectAction, fncAll, actionsHooks, newDsFilter);
                    // table menu
                } else if (itemTableMenu) {
                    let newDsFilter = getAllReloadDs(allDsProject, action.reloadDS, undefined, action?.ds_table);
                    let {objectAction} = setObjectAction(action, itemTableMenu, false);
                    combineAction(objectAction, fncAll, actionsHooks, newDsFilter);
                }
            }

            if (btnReduxElem) {
                let newDsFilter = getAllReloadDs(allDsProject, action.reloadDS, dsBtnForm);
                let {objectAction} = setObjectAction(action, btnReduxElem, false, true);
                combineAction(objectAction, fncAll, actionsHooks, newDsFilter, true);
            }

            // table menu
            if (itemTableMenu !== undefined && action.type !== 'api') {
                let newDsFilter = getAllReloadDs(allDsProject, action.reloadDS, undefined, action?.ds_table);
                let {objectAction} = setObjectAction(action, itemTableMenu, false);
                // console.log(objectAction)
                combineAction(objectAction, fncAll, actionsHooks, newDsFilter);
            }

            // button
            if (dsBtnForm !== undefined && !formValue && !btnReduxElem) {
                if (dataSource?.items[0] === undefined) {
                    console.error('ds нет в базе')

                } else {
                    let newDsFilter = getAllReloadDs(allDsProject, action.reloadDS, dsBtnForm);
                    let {objectAction} = setObjectAction(action, dataSource?.items[0]);
                    combineAction(objectAction, fncAll, actionsHooks, newDsFilter);
                }
            }

            // select
            if (e && dsBtnForm === undefined && itemTableMenu === undefined) {
                let {objectAction} = setObjectSelect(action, e);
                if (e === 'clear') {

                    let sourceDs: any;
                    fncAll.forEach((fnc: any) => {
                        if (action.source === fnc.key) {
                            sourceDs = fnc.source.split(':')[0]
                        }
                    })
                    clearSelect(sourceDs);

                } else {
                    combineAction(objectAction, fncAll, actionsHooks);
                }
            }

            // form
            if (formValue) {
                if (action.type === 'to') {
                    let {objectAction} = setObjectAction(action, undefined);
                    combineAction(objectAction, fncAll, actionsHooks);
                }

                if (action.type === 'proc') {
                    let newDsFilter = getAllReloadDs(allDsProject, action.reloadDS, dsBtnForm);
                    let {objectAction} = setObjectAction(action, formValue, true);
                    combineAction(objectAction, fncAll, actionsHooks, newDsFilter);
                }

                if (action.type === 'dl') {
                    let {objectAction} = setObjectAction(action, formValue, true);
                    combineAction(objectAction, fncAll, undefined);
                }

                if (action.type === 'get') {
                    let {objectAction} = setObjectAction(action, formValue, true);
                    combineAction(objectAction, fncAll, undefined);
                }
            }
        })
    }

    let ready = true

    return {onClick, ready}
}
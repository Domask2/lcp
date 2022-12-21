import {FncActionsEnum, FncExecuteType, FncRegisterType, FncUpdateType} from "./fnc.action.types";
import {IFnc} from "./fnc.initial";

const fncActionCreators = {
    registerFnc: (fnc: IFnc): FncRegisterType => ({type: FncActionsEnum.REGISTER_FNC, fnc}),
    executeFnc: (fnc_key: string, param: any): FncExecuteType =>
        ({type: FncActionsEnum.EXECUTE_FNC, fnc_key, param}),
    updateFnc: (fnc_key: string, param: any, need_to_execute: boolean): FncUpdateType =>
        ({type: FncActionsEnum.UPDATE_FNC, fnc_key, param, need_to_execute}),
}

export default fncActionCreators
import {IFnc} from "./fnc.initial";

export enum FncActionsEnum {
    REGISTER_FNC = "REGISTER_FNC",
    EXECUTE_FNC = "EXECUTE_FNC",
    UPDATE_FNC = "UPDATE_FNC",
}

export type FncRegisterType = { type: typeof FncActionsEnum.REGISTER_FNC, fnc: IFnc }
export type FncExecuteType = { type: typeof FncActionsEnum.EXECUTE_FNC, fnc_key: string, param: string | number }
export type FncUpdateType = { type: typeof FncActionsEnum.UPDATE_FNC, fnc_key: string, param: any, need_to_execute: boolean }


export type FncActionCreatorsType = FncRegisterType | FncExecuteType | FncUpdateType

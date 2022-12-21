export type FncTypes = "LoadData" | "MoveTo" | "ExecProc"
export interface IFnc {
    key: string
    type: FncTypes
    cache?: boolean
    source?: string
    target?: string
    param?: string | number
    need_to_execute?: boolean
}
export interface IFncInitialized {
    fnc: Array<IFnc>
}

export const initialStateFnc: IFncInitialized = {
    fnc: [],
}
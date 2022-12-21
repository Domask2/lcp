import {IFnc, initialStateFnc} from "./fnc.initial";
import {FncActionCreatorsType} from "./fnc.action.types";

const fncReducer = (state = initialStateFnc, action: FncActionCreatorsType) => {
    let arrFnc: Array<IFnc>
    let newArrFnc: Array<IFnc> = []
    let curFnc: IFnc
    // let executeReload: boolean

    switch (action.type) {
        case "REGISTER_FNC":
            let add = true
            arrFnc = [...state.fnc]
            arrFnc.forEach(fnc => {
                if (fnc.key === action.fnc.key) {
                    newArrFnc.push(action.fnc)
                    add = false
                }
                else
                    newArrFnc.push(fnc)
            })
            if (add)
                newArrFnc.push(action.fnc)

            return {...state, fnc: newArrFnc}
        case "EXECUTE_FNC":
            arrFnc = [...state.fnc]

            arrFnc.forEach(fnc => {
                if (fnc.key === action.fnc_key) {
                    curFnc = {...fnc}
                    curFnc.need_to_execute = true
                    curFnc.param = action.param

                    newArrFnc.push(curFnc)
                } else newArrFnc.push(fnc)
            })

            return {...state, fnc: newArrFnc}
        case "UPDATE_FNC":
            arrFnc = [...state.fnc]

            arrFnc.forEach(fnc => {
                if (fnc.key === action.fnc_key) {
                    curFnc = {...fnc}
                    curFnc.need_to_execute = action.need_to_execute
                    curFnc.param = action.param

                    newArrFnc.push(curFnc)
                } else newArrFnc.push(fnc)
            })

            return {...state, fnc: newArrFnc}

        default:
            return state
    }
}

export default fncReducer
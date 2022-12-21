import {RootState} from "../redux.store";
import {IFnc} from "./fnc.initial";

export const getFncAll = (state: RootState): Array<IFnc> => state.fnc.fnc
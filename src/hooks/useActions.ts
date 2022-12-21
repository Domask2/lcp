import {useDispatch} from "react-redux";
import {bindActionCreators} from "redux"
import {allActionCreators} from "../redux/action.creators";
import {AppDispatch} from "../redux/redux.store";

export const useActions = () => {
    const dispatch = useDispatch() as AppDispatch
    return bindActionCreators(allActionCreators, dispatch)
}
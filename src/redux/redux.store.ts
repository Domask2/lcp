import {createStore, combineReducers, applyMiddleware} from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import createMiddleware from 'redux-saga';
import mySaga from "../saga/sagas";

import reducers from "./reducers";

const reducer = combineReducers(reducers)
const sagaMiddleware = createMiddleware()
const store = createStore(reducer, composeWithDevTools(applyMiddleware( sagaMiddleware)))
sagaMiddleware.run(mySaga)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
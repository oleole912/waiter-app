import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import initialState from "./initialState";
import tablesReducer from "./tablesRedux";

const subreducers = {
    tables: tablesReducer,
}

const reducer = combineReducers(subreducers);

const store = createStore(
    reducer,
    initialState,
    compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENTION__ ? window.__REDUX_DEVTOOLS_EXTENTION__() : f => f
    )
);

export default store;
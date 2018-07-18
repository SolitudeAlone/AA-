import { createStore, combineReducers, applyMiddleware } from "redux";
import list from "./list.js"
import promiseMiddleware from "redux-promise";

let reducer = combineReducers({
    list
});
var store = createStore(reducer, applyMiddleware(promiseMiddleware));
window.store = store;
export default store;
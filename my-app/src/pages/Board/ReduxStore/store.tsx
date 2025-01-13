import { createStore, combineReducers } from "redux";
import { counterReducer } from "./reduce";
import { cReducer } from "./reduce";

const reduce = combineReducers({
  counter: counterReducer,
  count: cReducer,
});

const store = createStore(reduce);

export default store;

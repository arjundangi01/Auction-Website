import { legacy_createStore, combineReducers, applyMiddleware } from "redux";

import thunk from "redux-thunk";
import { userReducer } from "./user/user.reducer";
import { productReducer } from "./product/product.reducer";
const rootReducer = combineReducers({ userReducer,productReducer });
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

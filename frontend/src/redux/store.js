import { legacy_createStore, combineReducers, applyMiddleware } from "redux";

import thunk from "redux-thunk";
import { userReducer } from "./user/user.reducer";
import { productReducer } from "./product/product.reducer";
import { bidReducer } from "./bids/bid.reducer";
const rootReducer = combineReducers({ userReducer,productReducer,bidReducer });
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

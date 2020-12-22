import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productsListReducer } from "../reducers/productsReducers";

const reducer = combineReducers({
  productList: productsListReducer,
});

const initialState = {};

const middleware = [thunk];

console.log(middleware);

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

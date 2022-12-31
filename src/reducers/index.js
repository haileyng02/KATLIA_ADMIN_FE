import { combineReducers } from "redux";
import authReducer from './authReducer';
import productReducer from "./productReducer";

const allReducers = combineReducers({
  user: authReducer,
  products: productReducer
});

export default allReducers;
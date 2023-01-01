import { combineReducers } from "redux";
import authReducer from './authReducer';
import productReducer from "./productReducer";
import colorsReducer from './colorsReducer';
import categoriesReducer from "./categoriesReducer";

const allReducers = combineReducers({
  user: authReducer,
  products: productReducer,
  colors: colorsReducer,
  categories: categoriesReducer
});

export default allReducers;
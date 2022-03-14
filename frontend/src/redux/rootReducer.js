import { combineReducers } from "redux";
import productsReducer from "./reducer";

const rootReducer = combineReducers({
  data: productsReducer,
});
export default rootReducer;

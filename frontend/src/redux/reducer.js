import * as types from "./actionTypes";

const initialState = {
  products: [],
  loading: false,
  error: null,
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_DATA_START:
    case types.CREATE_DATA_START:
      return {
        ...state,
        loading: true,
      };
    case types.LOAD_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload,
      };
    case types.CREATE_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case types.LOAD_DATA_ERROR:
    case types.CREATE_DATA_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default productsReducer;

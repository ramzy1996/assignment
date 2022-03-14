import * as types from "./actionTypes";

// load
export const loadDataStart = () => ({
  type: types.LOAD_DATA_START,
});
export const loadDataSuccess = (products) => ({
  type: types.LOAD_DATA_SUCCESS,
  payload: products,
});
export const loadDataError = (error) => ({
  type: types.LOAD_DATA_ERROR,
  payload: error,
});

// create
export const createDataStart = (product) => ({
  type: types.CREATE_DATA_START,
  payload: product,
});
export const createDataSuccess = () => ({
  type: types.CREATE_DATA_SUCCESS,
});
export const createDataError = (error) => ({
  type: types.CREATE_DATA_ERROR,
  payload: error,
});


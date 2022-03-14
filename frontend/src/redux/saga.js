import {
  take,
  takeEvery,
  takeLatest,
  put,
  all,
  delay,
  fork,
  call,
} from "redux-saga/effects";
import {
  loadDataError,
  loadDataSuccess,
  createDataSuccess,
  createDataError,
} from "./actions";
import * as types from "./actionTypes";
import {
  loadProductsApi,
  createProductsApi,
} from "./product/api";

// load
export function* onLoadDataStartAsync() {
  try {
    const response = yield call(loadProductsApi);
    if (response.status === 200) {
      yield delay(500);
      yield put(loadDataSuccess(response.data));
    }
  } catch (error) {
    yield put(loadDataError(error.response.data));
  }
}

export function* onLoadData() {
  yield takeEvery(types.LOAD_DATA_START, onLoadDataStartAsync);
}

// create
export function* onCreateDataStartAsync({ payload }) {
  try {
    const response = yield call(createProductsApi, payload);
    if (response.status === 200) {
      yield put(createDataSuccess(response.data));
    }
  } catch (error) {
    yield put(createDataError(error.response.data));
  }
}

export function* onCreateData() {
  yield takeLatest(types.CREATE_DATA_START, onCreateDataStartAsync);
}

const productSagas = [fork(onLoadData), fork(onCreateData)];
export default function* rootSaga() {
  yield all([...productSagas]);
}

import { call, put, takeLatest } from 'redux-saga/effects';
import { LoginCredentialsState } from '../../types/login';
import { PayloadAction } from '@reduxjs/toolkit';
import { loginFailure, loginSuccess, loginTrigger } from './loginSlice';
import loginApi from './api';

function* login(action: PayloadAction<LoginCredentialsState>) {
  const { response, error } = yield call(loginApi, action.payload);
  if (response) {
    yield put(loginSuccess(response));
  } else {
    yield put(loginFailure(error));
  }
}

function* loginSaga() {
  yield takeLatest(loginTrigger.type, login);
}

export default loginSaga;

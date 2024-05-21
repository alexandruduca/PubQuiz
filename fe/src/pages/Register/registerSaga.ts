import { PayloadAction } from '@reduxjs/toolkit';
import { RegisterCredentialsState } from '../../types/register';
import { registerFailure, registerSuccess, registerTrigger } from './registerSlice';
import { call, put, takeLatest } from 'redux-saga/effects';
import { setSnackbar } from '../../providers/snackbarProviderSlice';
import { SnackbarType } from '../../types/common';
import registerApi from './api';

function* register(action: PayloadAction<RegisterCredentialsState>) {
  const { response, error } = yield call(registerApi, action.payload);
  if (response) {
    yield put(registerSuccess());
    yield put(setSnackbar({ message: response, type: SnackbarType.success }));
  } else {
    yield put(registerFailure(error));
    yield put(setSnackbar({ message: error, type: SnackbarType.error }));
  }
}

function* registerSaga() {
  yield takeLatest(registerTrigger.type, register);
}

export default registerSaga;

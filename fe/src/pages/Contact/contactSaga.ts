import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { contactFailure, contactSuccess, contactTrigger } from './contactSlice';
import contactApi from './api';
import { ContactState } from '../../types/contact';
import { setSnackbar } from '../../providers/snackbarProviderSlice';
import { SnackbarType } from '../../types/common';

function* contact(action: PayloadAction<ContactState>) {
  const { response, error } = yield call(contactApi, action.payload);
  if (response) {
    yield put(contactSuccess());
    yield put(setSnackbar({ message: response, type: SnackbarType.success }));
  } else {
    yield put(contactFailure(error));
    yield put(setSnackbar({ message: error, type: SnackbarType.error }));
  }
}

function* contactSaga() {
  yield takeLatest(contactTrigger.type, contact);
}

export default contactSaga;

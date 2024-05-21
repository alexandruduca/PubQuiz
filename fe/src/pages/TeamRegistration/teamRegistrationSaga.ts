import { call, put, select, takeLatest } from 'redux-saga/effects';
import { getReservationsApi, reserveTableApi, resetReservationsApi, updateTableApi } from './api';
import {
  getReservationsFailure,
  getReservationsSuccess,
  getReservationsTrigger,
  reserveTableFailure,
  reserveTableSuccess,
  reserveTableTrigger,
  resetReservationsFailure,
  resetReservationsSuccess,
  resetReservationsTrigger,
  updateTableFailure,
  updateTableSuccess,
  updateTableTrigger,
} from './teamRegistrationSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import { Landmark, ReserveTableParams } from '../../types/teamRegistration';
import { setSnackbar } from '../../providers/snackbarProviderSlice';
import { SnackbarType } from '../../types/common';
import { selectSelectedTable } from './selectors';

function* getReservations() {
  const { response } = yield call(getReservationsApi);
  if (response) {
    yield put(getReservationsSuccess(response));
  } else {
    yield put(getReservationsFailure());
    yield put(setSnackbar({ type: SnackbarType.error }));
  }
}

export function* getReservationsSaga() {
  yield takeLatest(getReservationsTrigger.type, getReservations);
}

function* reserveTable(action: PayloadAction<ReserveTableParams>) {
  const { response } = yield call(reserveTableApi, action.payload);
  if (response) {
    yield put(reserveTableSuccess());
    yield put(getReservationsTrigger());
    yield put(setSnackbar({ message: response, type: SnackbarType.success }));
  } else {
    yield put(reserveTableFailure());
    yield put(setSnackbar({ type: SnackbarType.error }));
  }
}

export function* reserveTableSaga() {
  yield takeLatest(reserveTableTrigger.type, reserveTable);
}

function* updateTable() {
  const landmarkPayload: Landmark = yield select(selectSelectedTable);
  const { response } = yield call(updateTableApi, landmarkPayload);
  if (response) {
    yield put(updateTableSuccess());
    yield put(getReservationsTrigger());
    yield put(setSnackbar({ message: response, type: SnackbarType.success }));
  } else {
    yield put(updateTableFailure());
    yield put(setSnackbar({ type: SnackbarType.error }));
  }
}

export function* updateTableSaga() {
  yield takeLatest(updateTableTrigger.type, updateTable);
}

function* resetReservations() {
  const { response } = yield call(resetReservationsApi);
  if (response) {
    yield put(resetReservationsSuccess());
    yield put(getReservationsTrigger());
    yield put(setSnackbar({ message: response, type: SnackbarType.success }));
  } else {
    yield put(resetReservationsFailure());
    yield put(setSnackbar({ type: SnackbarType.error }));
  }
}

export function* resetReservationsSaga() {
  yield takeLatest(resetReservationsTrigger.type, resetReservations);
}

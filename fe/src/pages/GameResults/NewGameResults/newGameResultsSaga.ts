import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import postNewGameResults from './api';
import {
  newGameResultsFailure,
  newGameResultsSuccess,
  newGameResultsTrigger,
} from './newGameResultsSlice';
import { NewGameResultsPayload } from '../../../types/gameResults';
import { setSnackbar } from '../../../providers/snackbarProviderSlice';
import { SnackbarType } from '../../../types/common';

function* newGameResults(action: PayloadAction<NewGameResultsPayload>) {
  const { response, error } = yield call(postNewGameResults, action.payload);
  if (response) {
    yield put(newGameResultsSuccess());
    yield put(setSnackbar({ message: response, type: SnackbarType.success }));
  } else {
    yield put(newGameResultsFailure());
    yield put(setSnackbar({ message: error, type: SnackbarType.error }));
  }
}

function* newGameResultsSaga() {
  yield takeLatest(newGameResultsTrigger.type, newGameResults);
}

export default newGameResultsSaga;

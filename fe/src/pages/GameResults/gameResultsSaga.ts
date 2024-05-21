import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  deleteGameResultsFailure,
  deleteGameResultsSuccess,
  deleteGameResultsTrigger,
  getGameResultsFailure,
  getGameResultsFiltersFailure,
  getGameResultsFiltersSuccess,
  getGameResultsFiltersTrigger,
  getGameResultsSuccess,
  getGameResultsTrigger,
  updateGameResultsFailure,
  updateGameResultsSuccess,
  updateGameResultsTrigger,
} from './gameResultsSlice';
import { GameResultsFiltersState } from '../../types/gameResults';
import {
  getGameResults,
  updateGameResults as updateGame,
  deleteGameResults as deleteGame,
  getGameResultsFilters as getFilters,
} from './api';
import { setSnackbar } from '../../providers/snackbarProviderSlice';
import { SnackbarType } from '../../types/common';

function* gameResults(action: PayloadAction<GameResultsFiltersState>) {
  const { response } = yield call(getGameResults, action.payload);
  if (response) {
    yield put(getGameResultsSuccess(response));
  } else {
    yield put(getGameResultsFailure());
    yield put(setSnackbar({ type: SnackbarType.error }));
  }
}

function* gameResultsSaga() {
  yield takeLatest(getGameResultsTrigger.type, gameResults);
}

function* updateGameResults(action: PayloadAction<GameResultsFiltersState>) {
  const { response, error } = yield call(updateGame, action.payload);
  if (response) {
    yield put(updateGameResultsSuccess());
    yield put(getGameResultsFiltersTrigger());
    yield put(setSnackbar({ message: response, type: SnackbarType.success }));
  } else {
    yield put(updateGameResultsFailure());
    yield put(setSnackbar({ message: error, type: SnackbarType.error }));
  }
}

function* updateGameResultsSaga() {
  yield takeLatest(updateGameResultsTrigger.type, updateGameResults);
}

function* deleteGameResults(action: PayloadAction<GameResultsFiltersState>) {
  const { response, error } = yield call(deleteGame, action.payload);
  if (response) {
    yield put(deleteGameResultsSuccess());
    yield put(getGameResultsFiltersTrigger());
    yield put(setSnackbar({ message: response, type: SnackbarType.success }));
  } else {
    yield put(deleteGameResultsFailure());
    yield put(setSnackbar({ message: error, type: SnackbarType.error }));
  }
}

function* deleteGameResultsSaga() {
  yield takeLatest(deleteGameResultsTrigger.type, deleteGameResults);
}

function* getGameResultsFilters() {
  const { response } = yield call(getFilters);
  if (response) {
    yield put(getGameResultsFiltersSuccess(response));
  } else {
    yield put(getGameResultsFiltersFailure());
    yield put(setSnackbar({ type: SnackbarType.error }));
  }
}

function* getGameResultsFiltersSaga() {
  yield takeLatest(getGameResultsFiltersTrigger.type, getGameResultsFilters);
}

export { gameResultsSaga, updateGameResultsSaga, deleteGameResultsSaga, getGameResultsFiltersSaga };

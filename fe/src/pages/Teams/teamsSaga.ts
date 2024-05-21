import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
  deleteTeamFailure,
  deleteTeamSuccess,
  deleteTeamTrigger,
  getTeamByIdFailure,
  getTeamByIdSuccess,
  getTeamByIdTrigger,
  getTeamsFailure,
  getTeamsSuccess,
  getTeamsTrigger,
  joinTeamRequestFailure,
  joinTeamRequestSuccess,
  joinTeamRequestTrigger,
  kickMemberFailure,
  kickMemberSuccess,
  kickMemberTrigger,
  leaveTeamFailure,
  leaveTeamSuccess,
  leaveTeamTrigger,
  postTeamFailure,
  postTeamSuccess,
  postTeamTrigger,
  updateJoinRequestFailure,
  updateJoinRequestSuccess,
  updateJoinRequestTrigger,
  updateLeaderFailure,
  updateLeaderSuccess,
  updateLeaderTrigger,
} from './teamsSlice';
import {
  deleteTeamApi,
  getTeamByIdApi,
  getTeamsApi,
  joinTeamRequestApi,
  kickMemberApi,
  leaveTeamApi,
  postTeamApi,
  updateJoinRequestApi,
  updateLeaderApi,
} from './api';
import { setSnackbar } from '../../providers/snackbarProviderSlice';
import { SnackbarType } from '../../types/common';
import {
  CreateTeamPayload,
  DeleteTeamPayload,
  JoinTeamPayload,
  KickMemberPayload,
  LeaveTeamPayload,
  UpdateJoinRequestPayload,
  UpdateLeaderPayload,
} from '../../types/teams';
import { selectId } from '../Login/selectors';

function* getTeams(action: PayloadAction<string>) {
  const { response } = yield call(getTeamsApi, action.payload);
  if (response) {
    yield put(getTeamsSuccess(response));
  } else {
    yield put(getTeamsFailure());
    yield put(setSnackbar({ type: SnackbarType.error }));
  }
}

function* getTeamsSaga() {
  yield takeLatest(getTeamsTrigger.type, getTeams);
}

function* getTeamById(action: PayloadAction<string>) {
  const { response } = yield call(getTeamByIdApi, action.payload);
  if (response) {
    yield put(getTeamByIdSuccess(response));
  } else {
    yield put(getTeamByIdFailure());
    yield put(setSnackbar({ type: SnackbarType.error }));
  }
}

function* getTeamByIdSaga() {
  yield takeLatest(getTeamByIdTrigger.type, getTeamById);
}

function* postTeam(action: PayloadAction<CreateTeamPayload>) {
  const { response, error } = yield call(postTeamApi, action.payload);
  if (response) {
    const id: string = yield select(selectId);
    yield put(postTeamSuccess());
    yield put(getTeamsTrigger(id));
    yield put(setSnackbar({ message: response, type: SnackbarType.success }));
  } else {
    yield put(postTeamFailure());
    yield put(setSnackbar({ message: error, type: SnackbarType.error }));
  }
}

function* postTeamSaga() {
  yield takeLatest(postTeamTrigger.type, postTeam);
}

function* joinTeamRequest(action: PayloadAction<JoinTeamPayload>) {
  const { response, error } = yield call(joinTeamRequestApi, action.payload);
  if (response) {
    yield put(joinTeamRequestSuccess());
    yield put(setSnackbar({ message: response, type: SnackbarType.success }));
  } else {
    yield put(joinTeamRequestFailure());
    yield put(setSnackbar({ message: error, type: SnackbarType.error }));
  }
}

function* joinTeamRequestSaga() {
  yield takeLatest(joinTeamRequestTrigger.type, joinTeamRequest);
}

function* deleteTeam(action: PayloadAction<DeleteTeamPayload>) {
  const { response, error } = yield call(deleteTeamApi, action.payload);
  const id: string = yield select(selectId);
  if (response) {
    yield put(deleteTeamSuccess());
    yield put(setSnackbar({ message: response, type: SnackbarType.success }));
    yield put(getTeamsTrigger(id));
  } else {
    yield put(deleteTeamFailure());
    yield put(setSnackbar({ message: error, type: SnackbarType.error }));
  }
}

function* deleteTeamSaga() {
  yield takeLatest(deleteTeamTrigger.type, deleteTeam);
}

function* updateJoinRequest(action: PayloadAction<UpdateJoinRequestPayload>) {
  const { response, error } = yield call(updateJoinRequestApi, action.payload);
  if (response) {
    yield put(updateJoinRequestSuccess());
    yield put(setSnackbar({ message: response, type: SnackbarType.success }));
  } else {
    yield put(updateJoinRequestFailure());
    yield put(setSnackbar({ message: error, type: SnackbarType.error }));
  }
  yield put(getTeamByIdTrigger(action.payload.teamId));
}

function* updateJoinRequestSaga() {
  yield takeLatest(updateJoinRequestTrigger.type, updateJoinRequest);
}

function* leaveTeam(action: PayloadAction<LeaveTeamPayload>) {
  const { response } = yield call(leaveTeamApi, action.payload);
  const id: string = yield select(selectId);
  if (response) {
    yield put(leaveTeamSuccess());
    yield put(setSnackbar({ message: response, type: SnackbarType.success }));
    yield put(getTeamsTrigger(id));
    yield put(getTeamByIdTrigger(action.payload.teamId));
  } else {
    yield put(leaveTeamFailure());
    yield put(setSnackbar({ type: SnackbarType.error }));
  }
}

function* leaveTeamSaga() {
  yield takeLatest(leaveTeamTrigger.type, leaveTeam);
}

function* kickMember(action: PayloadAction<KickMemberPayload>) {
  const { response } = yield call(kickMemberApi, action.payload);
  if (response) {
    yield put(kickMemberSuccess());
    yield put(setSnackbar({ message: response, type: SnackbarType.success }));
    yield put(getTeamByIdTrigger(action.payload.teamId));
  } else {
    yield put(kickMemberFailure());
    yield put(setSnackbar({ type: SnackbarType.error }));
  }
}

function* kickMemberSaga() {
  yield takeLatest(kickMemberTrigger.type, kickMember);
}

function* updateLeader(action: PayloadAction<UpdateLeaderPayload>) {
  const { response } = yield call(updateLeaderApi, action.payload);
  if (response) {
    yield put(updateLeaderSuccess());
    yield put(setSnackbar({ message: response, type: SnackbarType.success }));
    yield put(getTeamByIdTrigger(action.payload.teamId));
  } else {
    yield put(updateLeaderFailure());
    yield put(setSnackbar({ type: SnackbarType.error }));
  }
}

function* updateLeaderSaga() {
  yield takeLatest(updateLeaderTrigger.type, updateLeader);
}

export {
  getTeamsSaga,
  getTeamByIdSaga,
  postTeamSaga,
  joinTeamRequestSaga,
  deleteTeamSaga,
  updateJoinRequestSaga,
  leaveTeamSaga,
  kickMemberSaga,
  updateLeaderSaga,
};

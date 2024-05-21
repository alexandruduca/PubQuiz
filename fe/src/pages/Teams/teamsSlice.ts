import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  CreateTeamPayload,
  DeleteTeamPayload,
  JoinTeamPayload,
  KickMemberPayload,
  LeaveTeamPayload,
  TeamsState,
  UpdateJoinRequestPayload,
  UpdateLeaderPayload,
} from '../../types/teams';

const initialState: TeamsState = {
  myTeam: null,
  teams: [],
  currentTeamId: null,
  currentTeam: null,
  loading: false,
  updateMemberLoading: false,
  deleteLoading: false,
};

export const teamsSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {
    getTeamsTrigger: (state, _action: PayloadAction<string>) => {
      state.loading = true;
    },
    getTeamsSuccess: (state, action) => {
      state.loading = false;
      const { myTeam, teams } = action.payload;
      state.myTeam = myTeam;
      state.teams = teams;
      state.currentTeamId = myTeam ? myTeam._id : teams[0]?._id;
    },
    getTeamsFailure: (state) => {
      state.loading = false;
    },
    getTeamByIdTrigger: (state, _action: PayloadAction<string>) => {
      state.loading = true;
    },
    getTeamByIdSuccess: (state, action) => {
      state.loading = false;
      state.currentTeam = action.payload;
    },
    getTeamByIdFailure: (state) => {
      state.loading = false;
    },
    postTeamTrigger: (state, _action: PayloadAction<CreateTeamPayload>) => {
      state.loading = true;
    },
    postTeamSuccess: (state) => {
      state.loading = false;
    },
    postTeamFailure: (state) => {
      state.loading = false;
    },
    setCurrentTeamId: (state, action) => {
      state.currentTeamId = action.payload;
    },
    joinTeamRequestTrigger: (state, _action: PayloadAction<JoinTeamPayload>) => {
      state.updateMemberLoading = true;
    },
    joinTeamRequestSuccess: (state) => {
      state.updateMemberLoading = false;
    },
    joinTeamRequestFailure: (state) => {
      state.updateMemberLoading = false;
    },
    deleteTeamTrigger: (state, _action: PayloadAction<DeleteTeamPayload>) => {
      state.deleteLoading = true;
    },
    deleteTeamSuccess: (state) => {
      state.deleteLoading = false;
    },
    deleteTeamFailure: (state) => {
      state.deleteLoading = false;
    },
    updateJoinRequestTrigger: (state, _action: PayloadAction<UpdateJoinRequestPayload>) => {
      state.updateMemberLoading = true;
    },
    updateJoinRequestSuccess: (state) => {
      state.updateMemberLoading = false;
    },
    updateJoinRequestFailure: (state) => {
      state.updateMemberLoading = false;
    },
    leaveTeamTrigger: (state, _action: PayloadAction<LeaveTeamPayload>) => {
      state.deleteLoading = true;
    },
    leaveTeamSuccess: (state) => {
      state.deleteLoading = false;
    },
    leaveTeamFailure: (state) => {
      state.deleteLoading = false;
    },
    kickMemberTrigger: (state, _action: PayloadAction<KickMemberPayload>) => {
      state.updateMemberLoading = true;
    },
    kickMemberSuccess: (state) => {
      state.updateMemberLoading = false;
    },
    kickMemberFailure: (state) => {
      state.updateMemberLoading = false;
    },
    updateLeaderTrigger: (state, _action: PayloadAction<UpdateLeaderPayload>) => {
      state.updateMemberLoading = true;
    },
    updateLeaderSuccess: (state) => {
      state.updateMemberLoading = false;
    },
    updateLeaderFailure: (state) => {
      state.updateMemberLoading = false;
    },
  },
});

export const {
  getTeamsTrigger,
  getTeamsSuccess,
  getTeamsFailure,
  getTeamByIdTrigger,
  getTeamByIdSuccess,
  getTeamByIdFailure,
  postTeamTrigger,
  postTeamSuccess,
  postTeamFailure,
  setCurrentTeamId,
  joinTeamRequestTrigger,
  joinTeamRequestSuccess,
  joinTeamRequestFailure,
  deleteTeamTrigger,
  deleteTeamSuccess,
  deleteTeamFailure,
  updateJoinRequestTrigger,
  updateJoinRequestSuccess,
  updateJoinRequestFailure,
  leaveTeamTrigger,
  leaveTeamSuccess,
  leaveTeamFailure,
  kickMemberTrigger,
  kickMemberSuccess,
  kickMemberFailure,
  updateLeaderTrigger,
  updateLeaderSuccess,
  updateLeaderFailure,
} = teamsSlice.actions;

export default teamsSlice.reducer;

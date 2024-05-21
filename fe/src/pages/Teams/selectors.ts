import { RootState } from '../../store/types';

const selectMyTeam = (state: RootState) => state.teams.myTeam;

const selectTeams = (state: RootState) => state.teams.teams;

const selectLoading = (state: RootState) => state.teams.loading;

const selectCurrentTeamId = (state: RootState) => state.teams.currentTeamId;

const selectCurrentTeam = (state: RootState) => state.teams.currentTeam;

export { selectMyTeam, selectTeams, selectLoading, selectCurrentTeamId, selectCurrentTeam };

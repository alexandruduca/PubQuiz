import endpoints from '../../common/endpoints';
import { deleteRequest, getRequest, patchRequest, postRequest } from '../../http';
import {
  CreateTeamPayload,
  DeleteTeamPayload,
  JoinTeamPayload,
  KickMemberPayload,
  LeaveTeamPayload,
  UpdateJoinRequestPayload,
  UpdateLeaderPayload,
} from '../../types/teams';

const getTeamsApi = (id: string) => getRequest(endpoints.teams, { id });

const getTeamByIdApi = (teamId: string) => getRequest(endpoints.teams + `/${teamId}`);

const postTeamApi = (params: CreateTeamPayload) => postRequest(endpoints.teams, params);

const joinTeamRequestApi = (params: JoinTeamPayload) => postRequest(endpoints.joinTeam, params);

const deleteTeamApi = (params: DeleteTeamPayload) => deleteRequest(endpoints.teams, params);

const updateJoinRequestApi = (params: UpdateJoinRequestPayload) => {
  const { teamId, ...payload } = params;
  return patchRequest(endpoints.teams + `/${teamId}`, payload);
};

const leaveTeamApi = (params: LeaveTeamPayload) => deleteRequest(endpoints.leaveTeam, params);

const kickMemberApi = (params: KickMemberPayload) => deleteRequest(endpoints.kick, params);

const updateLeaderApi = (params: UpdateLeaderPayload) => {
  const { teamId, ...payload } = params;
  return patchRequest(endpoints.teams + `/${teamId}` + '/update-leader', payload);
};

export {
  getTeamsApi,
  postTeamApi,
  getTeamByIdApi,
  joinTeamRequestApi,
  deleteTeamApi,
  updateJoinRequestApi,
  leaveTeamApi,
  kickMemberApi,
  updateLeaderApi,
};

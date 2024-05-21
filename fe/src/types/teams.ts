export interface TeamsState {
  myTeam: Team | null;
  teams: Team[];
  currentTeamId: string | null;
  currentTeam: TeamWithStatistics | null;
  loading: boolean;
  updateMemberLoading: boolean;
  deleteLoading: boolean;
}

export type CreateTeamPayload = {
  id: string;
  username: string;
  name: string;
};

export type JoinTeamPayload = {
  teamId: string;
  id: string;
  username: string;
};

export type DeleteTeamPayload = {
  teamId: string;
  id: string;
};

export type UpdateJoinRequestPayload = JoinTeamPayload & {
  isAccepted: boolean;
};

export type LeaveTeamPayload = JoinTeamPayload;

export type KickMemberPayload = JoinTeamPayload;

export type UpdateLeaderPayload = JoinTeamPayload;

export type Team = {
  _id: string;
  name: string;
  leader: User;
  members: User[];
  joinRequests: User[];
};

type TeamNamePoints = {
  teamName: string;
  points: string;
};

type TopTeams = {
  firstTeamName: string;
  secondTeamName: string;
  thirdTeamName: string;
};

export type TeamWithStatistics = Team & {
  statistics: {
    firstPlace: string;
    secondPlace: string;
    thirdPlace: string;
    averagePlace: string;
    bestConnectionTeam: TeamNamePoints;
    bestJokerTeam: TeamNamePoints;
    leaderboard: TopTeams;
  };
};

type User = {
  _id: string;
  username: string;
};

export enum TeamModalActions {
  deleteTeam = 'deleteTeam',
  leaveTeam = 'leaveTeam',
  kickMember = 'kickMember',
  assignLeader = 'assignLeader',
  acceptMember = 'acceptMember',
  declineMember = 'declineMember',
}

export type SelectedUser = {
  id: string;
  username: string;
};

import { RootState } from '../../store/types';
import { Roles } from '../../types/login';

const selectCredentials = (state: RootState) => state.login.credentials;

const selectLoading = (state: RootState) => state.login.loading;

const selectIsAdmin = (state: RootState) => state.login.role === Roles.admin;

const selectIsLeader = (state: RootState) => state.login.role === Roles.leader;

const selectRole = (state: RootState) => state.login.role;

const selectError = (state: RootState) => state.login.error;

const selectId = (state: RootState) => state.login.id;

export {
  selectCredentials,
  selectLoading,
  selectIsAdmin,
  selectIsLeader,
  selectRole,
  selectError,
  selectId,
};

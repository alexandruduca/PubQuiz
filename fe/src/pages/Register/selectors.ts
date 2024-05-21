import { RootState } from '../../store/types';

const selectCredentials = (state: RootState) => state.register.credentials;

const selectLoading = (state: RootState) => state.register.loading;

export { selectCredentials, selectLoading };

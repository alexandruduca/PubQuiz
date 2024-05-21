import { RootState } from '../../store/types';

const selectName = (state: RootState) => state.contact.name;

const selectEmail = (state: RootState) => state.contact.email;

const selectMessage = (state: RootState) => state.contact.message;

const selectLoading = (state: RootState) => state.contact.loading;

const selectError = (state: RootState) => state.contact.error;

export { selectName, selectEmail, selectMessage, selectLoading, selectError };

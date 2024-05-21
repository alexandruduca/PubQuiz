import { RootState } from '../store/types';

const selectMessage = (state: RootState) => state.snackbar.message;

const selectType = (state: RootState) => state.snackbar.type;

export { selectMessage, selectType };

import { RootState } from '../../store/types';

const selectMode = (state: RootState) => state.theme.mode;

export { selectMode };

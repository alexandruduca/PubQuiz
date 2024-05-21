import { RootState } from '../../../store/types';

const selectNewGameFields = (state: RootState) => state.newGameResults.fields;

const selectNewGameLoading = (state: RootState) => state.newGameResults.loading;

export { selectNewGameFields, selectNewGameLoading };

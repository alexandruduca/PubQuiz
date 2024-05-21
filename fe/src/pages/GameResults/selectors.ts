import { RootState } from '../../store/types';

const selectCurrentGameData = (state: RootState) => state.gameResults.currentGameData;

const selectUpdatedGameData = (state: RootState) => state.gameResults.updatedGameData;

const selectLoading = (state: RootState) => state.gameResults.loading;

const selectFilters = (state: RootState) => state.gameResults.filters;

const selectFiltersData = (state: RootState) => state.gameResults.filtersData;

const selectFiltersLoading = (state: RootState) => state.gameResults.filtersLoading;

export {
  selectCurrentGameData,
  selectUpdatedGameData,
  selectLoading,
  selectFilters,
  selectFiltersData,
  selectFiltersLoading,
};

/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { GameResultsFiltersState, GameResultsState } from '../../types/gameResults';

const initialState: GameResultsState = {
  filters: {
    season: null,
    game: null,
  },
  filtersData: [],
  currentGameData: {
    game: '',
    season: '',
    numberOfTeams: '',
    rounds: [],
    results: [],
    _id: null,
  },
  updatedGameData: {
    game: '',
    season: '',
    numberOfTeams: '',
    rounds: [],
    results: [],
    _id: null,
  },
  loading: false,
  deleteLoading: false,
  filtersLoading: false,
};

export const gameResultsSlice = createSlice({
  name: 'gameResults',
  initialState,
  reducers: {
    getGameResultsTrigger: (state, _action: PayloadAction<GameResultsFiltersState>) => {
      state.loading = true;
    },
    getGameResultsSuccess: (state, action) => {
      state.loading = false;
      state.currentGameData = action.payload;
      state.updatedGameData = action.payload;
    },
    getGameResultsFailure: (state) => {
      state.loading = false;
    },
    updateGameResults: (state, action) => {
      state.updatedGameData = { ...state.updatedGameData, ...action.payload };
    },
    updateGameResultsTrigger: (state, _action: PayloadAction<GameResultsFiltersState>) => {
      state.loading = true;
    },
    updateGameResultsSuccess: (state) => {
      state.loading = false;
    },
    updateGameResultsFailure: (state) => {
      state.loading = false;
    },
    deleteGameResultsTrigger: (state, _action: PayloadAction<GameResultsFiltersState>) => {
      state.deleteLoading = true;
    },
    deleteGameResultsSuccess: (state) => {
      state.deleteLoading = false;
    },
    deleteGameResultsFailure: (state) => {
      state.deleteLoading = false;
    },
    getGameResultsFiltersTrigger: (state) => {
      state.filtersLoading = true;
    },
    getGameResultsFiltersSuccess: (state, action) => {
      state.filtersLoading = false;
      state.filtersData = action.payload;
      state.filters.season = action.payload[0].season;
      state.filters.game = action.payload[0].games[0];
    },
    getGameResultsFiltersFailure: (state) => {
      state.filtersLoading = false;
    },
    setGameResultsFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
});

export const {
  getGameResultsTrigger,
  getGameResultsSuccess,
  getGameResultsFailure,
  updateGameResults,
  updateGameResultsTrigger,
  updateGameResultsSuccess,
  updateGameResultsFailure,
  deleteGameResultsTrigger,
  deleteGameResultsSuccess,
  deleteGameResultsFailure,
  getGameResultsFiltersTrigger,
  getGameResultsFiltersSuccess,
  getGameResultsFiltersFailure,
  setGameResultsFilters,
} = gameResultsSlice.actions;

export default gameResultsSlice.reducer;

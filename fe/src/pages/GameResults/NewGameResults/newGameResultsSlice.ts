/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { NewGameResultState, NewGameResultsPayload } from '../../../types/gameResults';

const initialState: NewGameResultState = {
  fields: { game: '', season: '', numberOfTeams: '', rounds: [], results: [] },
  loading: false,
};

export const newGameResultsSlice = createSlice({
  name: 'newGameResults',
  initialState,
  reducers: {
    newGameResultsTrigger: (state, _action: PayloadAction<NewGameResultsPayload>) => {
      state.loading = true;
    },
    newGameResultsSuccess: (state) => {
      state.loading = false;
    },
    newGameResultsFailure: (state) => {
      state.loading = false;
    },
    updateNewGameResultsField: (state, action) => {
      state.fields = { ...state.fields, ...action.payload };
    },
  },
});

export const {
  newGameResultsTrigger,
  newGameResultsSuccess,
  newGameResultsFailure,
  updateNewGameResultsField,
} = newGameResultsSlice.actions;

export default newGameResultsSlice.reducer;

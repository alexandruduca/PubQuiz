/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { TeamRegistrationState, UpdateTableAction } from '../../types/teamRegistration';

const initialState: TeamRegistrationState = {
  reservationLayout: null,
  selectedTable: null,
  loading: false,
};

export const teamRegistrationSlice = createSlice({
  name: 'teamRegistration',
  initialState,
  reducers: {
    updateSelectedTable: (state, action: PayloadAction<UpdateTableAction>) => {
      state.selectedTable = action.payload.landmark;
    },
    reserveTableTrigger: (state, _action) => {
      state.loading = true;
    },
    reserveTableSuccess: (state) => {
      state.loading = false;
      state.selectedTable = null;
    },
    reserveTableFailure: (state) => {
      state.loading = false;
    },
    getReservationsTrigger: (state) => {
      state.loading = true;
    },
    getReservationsSuccess: (state, action) => {
      state.loading = false;
      state.reservationLayout = action.payload;
    },
    getReservationsFailure: (state) => {
      state.loading = false;
    },
    updateTableTrigger: (state) => {
      state.loading = true;
    },
    updateTableSuccess: (state) => {
      state.loading = false;
      state.selectedTable = null;
    },
    updateTableFailure: (state) => {
      state.loading = false;
    },
    resetReservationsTrigger: (state) => {
      state.loading = true;
    },
    resetReservationsSuccess: (state) => {
      state.loading = false;
    },
    resetReservationsFailure: (state) => {
      state.loading = false;
    },
    modifySelectedTable: (state, action) => {
      state.selectedTable = { ...state.selectedTable, ...action.payload };
    },
  },
});

export const {
  updateSelectedTable,
  reserveTableTrigger,
  reserveTableSuccess,
  reserveTableFailure,
  getReservationsTrigger,
  getReservationsSuccess,
  getReservationsFailure,
  updateTableTrigger,
  updateTableSuccess,
  updateTableFailure,
  resetReservationsTrigger,
  resetReservationsSuccess,
  resetReservationsFailure,
  modifySelectedTable,
} = teamRegistrationSlice.actions;

export default teamRegistrationSlice.reducer;

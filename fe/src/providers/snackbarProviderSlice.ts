import { createSlice } from '@reduxjs/toolkit';
import { SnackbarState } from '../types/common';

const initialState: SnackbarState = {
  message: null,
  type: null,
};

export const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    setSnackbar: (state, action) => {
      const { message, type } = action.payload;
      state.message = message;
      state.type = type;
    },
    clearSnackbar: () => ({ ...initialState }),
  },
});

export const { setSnackbar, clearSnackbar } = snackbarSlice.actions;

export default snackbarSlice.reducer;

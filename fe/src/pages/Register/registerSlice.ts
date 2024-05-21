import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RegisterCredentialsState, RegisterState } from '../../types/register';

const initialState: RegisterState = {
  credentials: {
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
  },
  loading: false,
  error: null,
};

export const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    registerTrigger: (state, _action: PayloadAction<RegisterCredentialsState>) => {
      state.loading = true;
    },
    registerSuccess: (state) => {
      state.loading = false;
    },
    registerFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateCredentials: (state, action) => {
      state.credentials = { ...state.credentials, ...action.payload };
      state.error = null;
    },
  },
});

export const { registerTrigger, registerSuccess, registerFailure, updateCredentials } =
  registerSlice.actions;

export default registerSlice.reducer;

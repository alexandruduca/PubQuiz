/* eslint-disable @typescript-eslint/no-unused-vars */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { LoginCredentialsState, LoginState } from '../../types/login';

const initialState: LoginState = {
  credentials: { username: '', password: '' },
  id: null,
  role: null,
  loading: false,
  error: null,
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    loginTrigger: (state, _action: PayloadAction<LoginCredentialsState>) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.role = action.payload.role;
      state.id = action.payload.id;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateCredentials: (state, action) => {
      state.credentials = { ...state.credentials, ...action.payload };
      state.error = null;
    },
    logout: (_state) => {
      return initialState;
    },
  },
});

export const { loginTrigger, loginSuccess, loginFailure, updateCredentials, logout } =
  loginSlice.actions;

export default loginSlice.reducer;

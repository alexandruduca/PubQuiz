import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ContactParamsState, ContactState } from '../../types/contact';

const initialState: ContactState = {
  name: '',
  email: '',
  message: '',
  loading: false,
};

export const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    contactTrigger: (state, _action: PayloadAction<ContactParamsState>) => {
      state.loading = true;
    },
    contactSuccess: (state) => {
      state.loading = false;
    },
    contactFailure: (state) => {
      state.loading = false;
    },
    updateName: (state, action) => {
      state.name = action.payload;
    },
    updateEmail: (state, action) => {
      state.email = action.payload;
    },
    updateMessage: (state, action) => {
      state.message = action.payload;
    },
  },
});

export const {
  contactTrigger,
  contactSuccess,
  contactFailure,
  updateName,
  updateEmail,
  updateMessage,
} = contactSlice.actions;

export default contactSlice.reducer;

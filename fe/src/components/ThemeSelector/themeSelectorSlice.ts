import { createSlice } from '@reduxjs/toolkit';
import { ThemeSelectorState, Themes } from '../../types/common';

const initialState: ThemeSelectorState = {
  mode: Themes.light,
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    changeTheme: (state) => {
      state.mode = state.mode === Themes.light ? Themes.dark : Themes.light;
    },
  },
});

export const { changeTheme } = themeSlice.actions;

export default themeSlice.reducer;

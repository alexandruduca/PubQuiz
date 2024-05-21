import React from 'react';
import { ThemeProvider as MuiThemeProvider } from '@emotion/react';
import { useAppSelector } from '../store/hooks';
import { selectMode } from '../components/ThemeSelector/selectors';
import { Themes } from '../types/common';
import { lightTheme, darkTheme } from '../common';

const ThemeProvider = ({ children }: any) => {
  const mode = useAppSelector(selectMode);

  return (
    <MuiThemeProvider theme={mode === Themes.light ? lightTheme : darkTheme}>
      {children}
    </MuiThemeProvider>
  );
};

export default ThemeProvider;

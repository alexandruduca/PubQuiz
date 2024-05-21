import { createTheme } from '@mui/material';
import { blue, purple } from '@mui/material/colors';
import { Themes } from '../types/common';

const lightTheme = createTheme({
  palette: {
    mode: Themes.light,
    primary: {
      main: blue[700],
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#FFFFFF',
    },
    text: {
      primary: '#000000',
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: Themes.dark,
    primary: {
      main: purple[400],
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#000000',
    },
    text: {
      primary: '#FFFFFF',
    },
  },
});

export { lightTheme, darkTheme };

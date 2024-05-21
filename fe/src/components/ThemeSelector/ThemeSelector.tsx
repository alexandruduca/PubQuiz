import React from 'react';
import { makeStyles } from 'tss-react/mui';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { IconButton, Theme, useMediaQuery } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { changeTheme } from './themeSelectorSlice';
import { selectMode } from './selectors';
import { Themes } from '../../types/common';
import clsx from 'clsx';

const useStyles = makeStyles()((theme: Theme) => ({
  button: {
    color: theme.palette.primary.contrastText,
  },
  buttonColorMobile: {
    color: `${theme.palette.text.primary}`,
  },
}));

const ThemeSelector = () => {
  const dispatch = useAppDispatch();
  const mode = useAppSelector(selectMode);
  const { classes } = useStyles();
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down(1100));

  return (
    <div>
      <IconButton sx={{ ml: 1 }} onClick={() => dispatch(changeTheme())} color="inherit">
        {mode === Themes.dark ? (
          <Brightness4Icon className={classes.button} />
        ) : (
          <Brightness7Icon
            className={clsx(classes.button, { [classes.buttonColorMobile]: isMobile })}
          />
        )}
      </IconButton>
    </div>
  );
};

export default ThemeSelector;

import { Button, Menu, MenuItem, Theme, Typography, useMediaQuery } from '@mui/material';
import React, { useState } from 'react';
import { makeStyles } from 'tss-react/mui';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectCredentials } from '../../pages/Login/selectors';
import { useTranslation } from 'react-i18next';
import { logout } from '../../pages/Login/loginSlice';
import clsx from 'clsx';

const useStyles = makeStyles()((theme: Theme) => ({
  button: {
    color: theme.palette.primary.contrastText,
    boxShadow: 'none',
    position: 'relative',
    minWidth: 'unset',
    height: '40px',
    '&:hover': {
      backgroundColor: 'transparent',
      boxShadow: 'none',
    },
  },
  buttonColorMobile: {
    color: `${theme.palette.text.primary}`,
  },
  menuItem: {
    minWidth: '130px',
  },
  menu: {
    marginLeft: '16px',
  },
}));

const Profile = () => {
  const dispatch = useAppDispatch();
  const { classes } = useStyles();
  const { username } = useAppSelector(selectCredentials);
  const { t } = useTranslation('home');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down(1100));

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        className={clsx(classes.button, { [classes.buttonColorMobile]: isMobile })}
        onClick={handleClick}
      >
        {username}
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose} className={classes.menu}>
        <MenuItem onClick={() => dispatch(logout())} className={classes.menuItem}>
          <Typography>{t('logout')}</Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default Profile;

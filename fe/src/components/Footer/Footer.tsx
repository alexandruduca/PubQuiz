import { Theme, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme: Theme) => ({
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '40px',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
}));

const Footer = () => {
  const { classes } = useStyles();
  const { t } = useTranslation('home');
  return (
    <footer className={classes.footer}>
      <Typography>{`${t('footer')} ${new Date().getFullYear()}`}</Typography>
    </footer>
  );
};

export default Footer;

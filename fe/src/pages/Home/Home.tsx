import React from 'react';
import { Theme, Typography } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles()((theme: Theme) => ({
  title: {
    fontSize: '21px',
    color: theme.palette.primary.main,
  },
}));

const Home = () => {
  const { t } = useTranslation('home');
  const { classes } = useStyles();
  return (
    <>
      <Typography className={classes.title}>{t('helloMessage')}</Typography>;
    </>
  );
};

export default Home;

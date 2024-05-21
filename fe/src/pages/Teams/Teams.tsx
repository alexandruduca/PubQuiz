import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from 'tss-react/mui';
import TeamsList from './TeamsList';
import TeamDashboard from './TeamDashboard';
import { Theme } from '@mui/material';

const useStyles = makeStyles()((theme: Theme) => ({
  container: {
    display: 'flex',
    gap: '20px',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
}));

const Teams = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.container}>
      <TeamsList />
      <TeamDashboard />
    </div>
  );
};

export default Teams;

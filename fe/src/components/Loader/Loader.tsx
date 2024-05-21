import { CircularProgress } from '@mui/material';
import React from 'react';
import { makeStyles } from 'tss-react/mui';
import { LoaderProps } from '../../types/common';

const useStyles = makeStyles()(() => ({
  loader: {
    position: 'absolute',
    top: '45%',
    left: '49%',
    transform: 'translateX(-50%)',
  },
}));

const Loader = ({ children, loading }: LoaderProps) => {
  const { classes } = useStyles();

  if (loading) {
    return <CircularProgress className={classes.loader} size={60} />;
  }
  return <>{children}</>;
};

export default Loader;

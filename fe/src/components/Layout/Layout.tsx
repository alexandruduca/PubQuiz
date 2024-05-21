import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar';
import ProtectedPath from './ProtectedPath';
import Footer from '../Footer';
import { makeStyles } from 'tss-react/mui';
import { Theme } from '@mui/material';

const useStyles = makeStyles()((theme: Theme) => ({
  content: {
    position: 'relative',
    flex: 1,
    padding: '0 20vh',
    [theme.breakpoints.down('md')]: {
      padding: '0',
    },
  },
  body: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
}));

const Layout = () => {
  const { classes } = useStyles();
  return (
    <div className={classes.body}>
      <Navbar />
      <main className={classes.content}>
        <ProtectedPath>
          <Outlet />
        </ProtectedPath>
      </main>
      <Footer />
    </div>
  );
};
export default Layout;

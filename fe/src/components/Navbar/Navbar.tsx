import {
  Button,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Theme,
  useMediaQuery,
} from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { paths } from '../../common';
import { makeStyles } from 'tss-react/mui';
import logo from 'src/assets/logo.png';
import LanguageSelector from '../LanguageSelector';
import { useAppSelector } from '../../store/hooks';
import { selectRole } from '../../pages/Login/selectors';
import Profile from '../Profile';
import MenuIcon from '@mui/icons-material/Menu';
import ThemeSelector from '../ThemeSelector';
import clsx from 'clsx';

const useStyles = makeStyles()((theme: Theme) => ({
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr 3fr 1fr',
    gridTemplateRows: '1fr',
    gridColumnGap: '0px',
    gridRowGap: '0px',
    backgroundColor: theme.palette.primary.main,
    [theme.breakpoints.down(1100)]: {
      display: 'flex',
      justifyContent: 'space-between',
      paddingRight: '10px',
    },
  },
  navbar: {
    justifySelf: 'center',
  },
  logo: {
    height: '33px',
    marginLeft: '3px',
    alignSelf: 'center',
  },
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
  userActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    [theme.breakpoints.down(1100)]: {
      flexDirection: 'column',
    },
  },
  userContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  selectorsContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: '100px',
  },
  drawerContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
}));

const Navbar = () => {
  const role = useAppSelector(selectRole);
  const { t } = useTranslation('home', { keyPrefix: 'navbar' });
  const { classes } = useStyles();
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down(1100));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <header className={classes.container}>
      <Link to={paths.about} className={classes.logo}>
        <img className={classes.logo} src={logo} alt="logo" />
      </Link>
      {!isMobile ? (
        <>
          <nav className={classes.navbar}>
            <Link to={paths.about}>
              <Button className={classes.button} variant="text">
                {t('about')}
              </Button>
            </Link>
            <Link to={paths.teamRegistration}>
              <Button className={classes.button}>{t('teamRegistration')}</Button>
            </Link>
            <Link to={paths.gameResults}>
              <Button className={classes.button}>{t('gameResults')}</Button>
            </Link>
            <Link to={paths.teams}>
              <Button className={classes.button}>{t('teams')}</Button>
            </Link>
            <Link to={paths.faq}>
              <Button className={classes.button}>{t('faq')}</Button>
            </Link>
            <Link to={paths.contact}>
              <Button className={classes.button}>{t('contact')}</Button>
            </Link>
          </nav>
          <div className={classes.userActions}>
            {!role ? (
              <>
                <Link to={paths.login}>
                  <Button className={classes.button}>{t('login')}</Button>
                </Link>
                <Link to={paths.register}>
                  <Button className={classes.button}>{t('register')}</Button>
                </Link>
              </>
            ) : (
              <Profile />
            )}
            <ThemeSelector />
            <LanguageSelector />
          </div>
        </>
      ) : (
        <>
          <MenuIcon onClick={handleDrawerToggle} className={classes.button}></MenuIcon>
          <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerToggle}>
            <List className={classes.drawerContainer}>
              <div>
                <ListItemButton component={Link} to={paths.about} onClick={handleDrawerToggle}>
                  <ListItemText primary={t('about')} />
                </ListItemButton>
                <ListItemButton
                  component={Link}
                  to={paths.teamRegistration}
                  onClick={handleDrawerToggle}
                >
                  <ListItemText primary={t('teamRegistration')} />
                </ListItemButton>
                <ListItemButton
                  component={Link}
                  to={paths.gameResults}
                  onClick={handleDrawerToggle}
                >
                  <ListItemText primary={t('gameResults')} />
                </ListItemButton>
                <ListItemButton component={Link} to={paths.teams} onClick={handleDrawerToggle}>
                  <ListItemText primary={t('teams')} />
                </ListItemButton>
                <ListItemButton component={Link} to={paths.faq} onClick={handleDrawerToggle}>
                  <ListItemText primary={t('faq')} />
                </ListItemButton>
                <ListItemButton component={Link} to={paths.contact} onClick={handleDrawerToggle}>
                  <ListItemText primary={t('contact')} />
                </ListItemButton>
              </div>
              <div className={classes.userActions}>
                <div className={classes.userContainer}>
                  {!role ? (
                    <>
                      <Link to={paths.login}>
                        <Button
                          className={clsx(classes.button, {
                            [classes.buttonColorMobile]: isMobile,
                          })}
                        >
                          {t('login')}
                        </Button>
                      </Link>
                      <Link to={paths.register}>
                        <Button
                          className={clsx(classes.button, {
                            [classes.buttonColorMobile]: isMobile,
                          })}
                        >
                          {t('register')}
                        </Button>
                      </Link>
                    </>
                  ) : (
                    <Profile />
                  )}
                </div>
                <div className={classes.selectorsContainer}>
                  <ThemeSelector />
                  <LanguageSelector />
                </div>
              </div>
            </List>
          </Drawer>
        </>
      )}
    </header>
  );
};

export default Navbar;

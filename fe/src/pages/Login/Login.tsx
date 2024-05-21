import { Alert, TextField, Typography } from '@mui/material';
import { clsx } from 'clsx';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from 'tss-react/mui';
import { LoginFields } from '../../types/login';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';
import { loginTrigger, updateCredentials } from './loginSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectCredentials, selectError, selectLoading, selectRole } from './selectors';
import { paths } from '../../common';

const useStyles = makeStyles()(() => ({
  loginForm: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    width: '300px',
    height: '500px',
    margin: '200px auto 0 auto',
  },
  title: {
    marginBottom: '30px',
  },
  input: {
    width: '100%',
  },
  password: {
    margin: '28px 0',
  },
  loginButton: {
    width: '100%',
  },
  errorMessage: {
    marginBottom: '30px',
  },
}));

const Login = () => {
  const dispatch = useAppDispatch();
  const credentials = useAppSelector(selectCredentials);
  const loading = useAppSelector(selectLoading);
  const role = useAppSelector(selectRole);
  const error = useAppSelector(selectError);
  const { classes } = useStyles();
  const { t } = useTranslation('login');
  const buttonIsDisabled = !Object.values(credentials).every((value) => !!value);
  const navigate = useNavigate();
  const updateLoginCredentials = (key: keyof typeof LoginFields, value: string) => {
    dispatch(updateCredentials({ [key]: value }));
  };

  useEffect(() => {
    if (role) {
      navigate(paths.about);
    }
  }, [navigate, role]);

  const login = () => {
    dispatch(loginTrigger(credentials));
  };

  return (
    <div className={classes.loginForm}>
      <Typography className={classes.title} variant="h5">
        {t('title')}
      </Typography>
      <TextField
        value={credentials.username}
        className={classes.input}
        label={t('username')}
        onChange={(e) => updateLoginCredentials(LoginFields.username, e.target.value)}
      />
      <TextField
        value={credentials.password}
        className={clsx(classes.input, classes.password)}
        label={t('password')}
        type="password"
        onChange={(e) => updateLoginCredentials(LoginFields.password, e.target.value)}
      />
      {error && (
        <Alert severity="error" className={classes.errorMessage}>
          {t(`errors.${error}`)}
        </Alert>
      )}
      <LoadingButton
        disabled={buttonIsDisabled}
        className={classes.loginButton}
        loading={loading}
        variant="contained"
        onClick={login}
      >
        {t('loginButton')}
      </LoadingButton>
    </div>
  );
};

export default Login;

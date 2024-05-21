import React, { useState } from 'react';
import { Alert, TextField, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { makeStyles } from 'tss-react/mui';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectCredentials, selectLoading } from './selectors';
import { RegisterFields } from '../../types/register';
import { registerTrigger, updateCredentials } from './registerSlice';

const useStyles = makeStyles()(() => ({
  registerForm: {
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
    marginBottom: '28px',
  },
  registerButton: {
    width: '100%',
    marginTop: '28px',
  },
  errorMessage: {
    marginBottom: '30px',
  },
}));

const Register = () => {
  const [error, setError] = useState<RegisterFields | null>(null);
  const dispatch = useAppDispatch();
  const credentials = useAppSelector(selectCredentials);
  const loading = useAppSelector(selectLoading);
  const { classes } = useStyles();
  const { t } = useTranslation('register');
  const buttonIsDisabled = !Object.values(credentials).every((value) => !!value);
  const updateRegisterCredentials = (key: keyof typeof RegisterFields, value: string) => {
    setError(null);
    dispatch(updateCredentials({ [key]: value }));
  };

  const register = () => {
    const { confirmPassword, ...registerCredentials } = credentials;
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (confirmPassword !== registerCredentials.password) {
      setError(RegisterFields.password);
    } else if (!emailRegex.test(registerCredentials.email)) {
      setError(RegisterFields.email);
    } else {
      dispatch(registerTrigger(registerCredentials));
    }
  };

  return (
    <div className={classes.registerForm}>
      <Typography className={classes.title} variant="h5">
        {t('title')}
      </Typography>
      <TextField
        value={credentials.username}
        className={classes.input}
        label={t('username')}
        onChange={(e) => updateRegisterCredentials(RegisterFields.username, e.target.value)}
      />
      <TextField
        value={credentials.password}
        className={classes.input}
        label={t('password')}
        type="password"
        onChange={(e) => updateRegisterCredentials(RegisterFields.password, e.target.value)}
      />
      <TextField
        value={credentials.confirmPassword}
        className={classes.input}
        label={t('confirmPassword')}
        type="password"
        onChange={(e) => updateRegisterCredentials(RegisterFields.confirmPassword, e.target.value)}
      />
      <TextField
        value={credentials.email}
        className={classes.input}
        label={t('email')}
        onChange={(e) => updateRegisterCredentials(RegisterFields.email, e.target.value)}
      />
      {error && (
        <Alert severity="error" className={classes.errorMessage}>
          {t(`errors.${error}`)}
        </Alert>
      )}
      <LoadingButton
        disabled={buttonIsDisabled}
        className={classes.registerButton}
        loading={loading}
        variant="contained"
        onClick={register}
      >
        {t('registerButton')}
      </LoadingButton>
    </div>
  );
};

export default Register;

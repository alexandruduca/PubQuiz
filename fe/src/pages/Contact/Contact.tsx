import React from 'react';
import { Typography, TextField, Theme } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { useTranslation } from 'react-i18next';
import LoadingButton from '@mui/lab/LoadingButton';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectEmail, selectLoading, selectMessage, selectName } from './selectors';
import { contactTrigger, updateEmail, updateMessage, updateName } from './contactSlice';

const useStyles = makeStyles()((theme: Theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '100px 0',
    gap: '20px',
    [theme.breakpoints.down(1100)]: {
      width: 'calc(100% - 60px)',
      margin: '100px 30px',
    },
  },
  form: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '40%',
    gap: '20px',
    marginTop: '30px',
    [theme.breakpoints.down(1100)]: {
      width: '80%',
    },
  },
}));

export const Contact = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectLoading);
  const name = useAppSelector(selectName);
  const email = useAppSelector(selectEmail);
  const message = useAppSelector(selectMessage);
  const { t } = useTranslation('contact');
  const { classes } = useStyles();

  const handleSubmit = () => {
    dispatch(contactTrigger({ name, email, message }));
  };

  return (
    <div className={classes.container}>
      <Typography variant="h4" textAlign="center">
        {t('title')}
      </Typography>
      <Typography variant="h6" textAlign="center" width="60%">
        {t('subtitle')}
      </Typography>
      <div className={classes.form}>
        <TextField
          required
          label={t('name')}
          type="text"
          value={name}
          onChange={(e) => dispatch(updateName(e.target.value))}
        />
        <TextField
          required
          label={t('email')}
          type="text"
          value={email}
          onChange={(e) => dispatch(updateEmail(e.target.value))}
        />
        <TextField
          placeholder={t('message')}
          multiline
          rows={5}
          maxRows={8}
          onChange={(e) => dispatch(updateMessage(e.target.value))}
        />
        <LoadingButton variant="contained" loading={loading} onClick={handleSubmit}>
          {t('submit')}
        </LoadingButton>
      </div>
    </div>
  );
};

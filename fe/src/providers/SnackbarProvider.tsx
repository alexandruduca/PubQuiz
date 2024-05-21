import React from 'react';
import { Alert, Snackbar } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ProviderProps } from '../types/common';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectMessage, selectType } from './selectors';
import { clearSnackbar } from './snackbarProviderSlice';

const SnackbarProvider = ({ children }: ProviderProps) => {
  const dispatch = useAppDispatch();
  const message = useAppSelector(selectMessage);
  const type = useAppSelector(selectType);
  const { t } = useTranslation('common', { keyPrefix: 'snackbarMessage' });

  return (
    <>
      {children}
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={Boolean(type)}
        onClose={() => dispatch(clearSnackbar())}
        autoHideDuration={5000}
      >
        {type && <Alert severity={type}>{t(message ?? type)}</Alert>}
      </Snackbar>
    </>
  );
};

export default SnackbarProvider;

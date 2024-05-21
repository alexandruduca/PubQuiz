import { Autocomplete, Button, Checkbox, FormControlLabel, TextField } from '@mui/material';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectReservedTeams, selectSelectedTable } from './selectors';
import { Landmark } from '../../types/teamRegistration';
import { useTranslation } from 'react-i18next';
import {
  modifySelectedTable,
  resetReservationsTrigger,
  updateSelectedTable,
  updateTableTrigger,
} from './teamRegistrationSlice';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  reservationForm: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    width: '300px',
    height: '500px',
  },
  tableName: {
    width: '100%',
    margin: '20px 0',
    '& :hover': {
      cursor: 'not-allowed',
    },
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '20px',
    gap: '20px',
  },
  resetButton: {
    marginTop: '60px',
    marginBottom: '100px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}));

const AdminReservationForm = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation('teamRegistration', { keyPrefix: 'adminReservationForm' });
  const { classes } = useStyles();
  const reservedTeams: Landmark[] = useAppSelector(selectReservedTeams);
  const selectedTable: Landmark = useAppSelector(selectSelectedTable);
  console.log('🚀  selectedTable:', selectedTable);
  const isSubmitDisabled = !selectedTable;

  const triggerUpdateRecurrence = () => {
    dispatch(updateTableTrigger());
  };

  const removeReservation = () => {
    dispatch(modifySelectedTable({ recurrentReservation: false, teamName: null }));
    dispatch(updateTableTrigger());
  };

  const resetReservationForm = () => {
    dispatch(resetReservationsTrigger());
  };

  return (
    <div className={classes.container}>
      <Button onClick={resetReservationForm} variant="contained" className={classes.resetButton}>
        {t('reset')}
      </Button>
      <div className={classes.reservationForm}>
        <Autocomplete
          fullWidth
          options={reservedTeams}
          renderInput={(params) => <TextField label={t('reservedTeam')} {...params} />}
          value={selectedTable}
          onChange={(_, landmark) => {
            dispatch(updateSelectedTable({ landmark }));
          }}
          getOptionLabel={(option: Landmark) => option.teamName ?? ''}
        />
        <TextField
          value={selectedTable?.tableName}
          disabled={true}
          className={classes.tableName}
          label={t('tableName')}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={Boolean(selectedTable?.recurrentReservation) ?? false}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(modifySelectedTable({ recurrentReservation: event.target.checked }));
              }}
            />
          }
          label={t('recurrentReservation')}
        />
        <div className={classes.buttonContainer}>
          <Button variant="outlined" disabled={isSubmitDisabled} onClick={removeReservation}>
            {t('removeReservation')}
          </Button>
          <Button variant="contained" onClick={triggerUpdateRecurrence} disabled={isSubmitDisabled}>
            {t('submit')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminReservationForm;

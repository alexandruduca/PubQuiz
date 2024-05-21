import { Autocomplete, Button, TextField } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from 'tss-react/mui';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectMyTeam } from '../Teams/selectors';
import { reserveTableTrigger, updateSelectedTable } from './teamRegistrationSlice';
import { selectAvailableTables, selectSelectedTable } from './selectors';
import { Landmark } from '../../types/teamRegistration';

const useStyles = makeStyles()(() => ({
  reservationForm: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    width: '300px',
    height: '500px',
    margin: '200px auto 0 auto',
  },
  submitButton: {
    marginTop: '20px',
  },
  team: {
    width: '100%',
    marginBottom: '20px',
    '& :hover': {
      cursor: 'not-allowed',
    },
  },
}));

const ReservationForm = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation('teamRegistration', { keyPrefix: 'reservationForm' });
  const { classes } = useStyles();
  const team = useAppSelector(selectMyTeam);
  const selectedTable = useAppSelector(selectSelectedTable);
  const availableTables: Landmark[] = useAppSelector(selectAvailableTables);
  const isSubmitDisabled = !selectedTable;

  const reserveTable = () => {
    dispatch(reserveTableTrigger({ tableId: selectedTable._id, teamName: team.name }));
  };

  return (
    <div className={classes.reservationForm}>
      <TextField value={team.name} disabled={true} className={classes.team} />
      <Autocomplete
        fullWidth
        options={availableTables}
        renderInput={(params) => <TextField label={t('availableTables')} {...params} />}
        value={selectedTable}
        onChange={(_, landmark) => {
          dispatch(updateSelectedTable({ landmark }));
        }}
        getOptionLabel={(option: Landmark) => option.tableName ?? ''}
      />
      <Button
        variant="contained"
        className={classes.submitButton}
        onClick={reserveTable}
        disabled={isSubmitDisabled}
      >
        {t('submit')}
      </Button>
    </div>
  );
};

export default ReservationForm;

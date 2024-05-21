import React, { useEffect, useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { selectCurrentTeamId, selectLoading, selectMyTeam, selectTeams } from '../selectors';
import { makeStyles } from 'tss-react/mui';
import { useTranslation } from 'react-i18next';
import { Team } from '../../../types/teams';
import {
  getTeamByIdTrigger,
  getTeamsTrigger,
  postTeamTrigger,
  setCurrentTeamId,
} from '../teamsSlice';
import { selectCredentials, selectId } from '../../Login/selectors';
import Loader from '../../../components/Loader';
import clsx from 'clsx';
import ActionModal from '../../../components/ActionModal';

const useStyles = makeStyles()(() => ({
  container: {
    width: '200px',
    marginTop: '50px',
  },
  button: {
    marginTop: '10px',
    width: '100%',
  },
  myTeamButton: {
    marginBottom: '10px',
  },
  teamName: {
    marginTop: '10px',
  },
}));

const TeamsList = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newTeamName, setNewTeamName] = useState<string>('');
  const dispatch = useAppDispatch();
  const myTeam: Team = useAppSelector(selectMyTeam);
  const teams: Team[] = useAppSelector(selectTeams);
  const loading = useAppSelector(selectLoading);
  const id = useAppSelector(selectId);
  const { username } = useAppSelector(selectCredentials);
  const currentTeamId = useAppSelector(selectCurrentTeamId);
  const { classes } = useStyles();
  const { t } = useTranslation('teams');
  const changeCurrentTeam = (id: string) => {
    dispatch(setCurrentTeamId(id));
    dispatch(getTeamByIdTrigger(id));
  };

  useEffect(() => {
    dispatch(getTeamsTrigger(id));
  }, [dispatch, id]);

  return (
    <Loader loading={loading}>
      <div className={classes.container}>
        <Typography variant="h6" align="center">
          {t('myTeam')}
        </Typography>
        {myTeam ? (
          <>
            <Button
              className={clsx(classes.button, classes.myTeamButton)}
              variant={currentTeamId === myTeam._id ? 'contained' : 'outlined'}
              onClick={() => changeCurrentTeam(myTeam._id)}
            >
              {myTeam.name}
            </Button>
          </>
        ) : (
          <>
            <Button
              className={clsx(classes.button, classes.myTeamButton)}
              variant="outlined"
              onClick={() => setModalOpen(true)}
            >
              {t('buttons.createTeam')}
            </Button>
            <ActionModal
              modalOpen={modalOpen}
              setModalOpen={setModalOpen}
              action={() => dispatch(postTeamTrigger({ id, username, name: newTeamName }))}
              title={t('createTeam.title')}
              content={t('createTeam.content')}
              actionName={t('createTeam.actionName')}
            >
              <TextField
                value={newTeamName}
                label={t('createTeam.label')}
                className={classes.teamName}
                onChange={(e) => setNewTeamName(e.target.value)}
              ></TextField>
            </ActionModal>
          </>
        )}
        <Typography variant="h6" align="center">
          {t('teams')}
        </Typography>
        {teams.length > 0 ? (
          <>
            {teams.map((team) => (
              <Button
                className={classes.button}
                variant={currentTeamId === team._id ? 'contained' : 'outlined'}
                key={team._id}
                onClick={() => changeCurrentTeam(team._id)}
              >
                {team.name}
              </Button>
            ))}
          </>
        ) : (
          <Typography align="center">{t('noTeams')}</Typography>
        )}
      </div>
    </Loader>
  );
};

export default TeamsList;

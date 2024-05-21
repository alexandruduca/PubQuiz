import LoadingButton from '@mui/lab/LoadingButton';
import { Button, Paper, Table, TableBody, TableContainer, Theme, Typography } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from 'tss-react/mui';
import { MAX_SCORE_JOKER, MIN_SCORE, NUMBER_OF_ROUNDS } from '../../types/common';
import { NewGameStep, ResultsTableProps } from '../../types/gameResults';
import ResultsRow from './ResultsRow';
import ResultsTableHead from './ResultsTableHead';
import ActionModal from '../ActionModal';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectId, selectIsAdmin } from '../../pages/Login/selectors';
import { getTeamsTrigger } from '../../pages/Teams/teamsSlice';
import TableTooltip from './TableTooltip';
import clsx from 'clsx';

const useStyles = makeStyles()((theme: Theme) => ({
  container: {
    marginTop: '160px',
    textAlign: 'center',
  },
  gameName: {
    marginBottom: '80px',
  },
  buttonsContainer: {
    margin: '100px 0 160px 0',
  },
  secondaryActionButton: {
    marginRight: '40px',
  },
  table: {
    [theme.breakpoints.down(1100)]: {
      margin: '0 30px',
      width: 'auto',
    },
  },
  titleAndTooltip: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
}));

const ResultsTable: FC<ResultsTableProps> = ({
  gameInfo,
  changeStep,
  results,
  updateResults,
  submit,
  deleteGame,
  isAdmin,
  loading,
  submitTranslationPath,
  children,
}) => {
  const { t } = useTranslation('gameResults');
  const { classes } = useStyles();
  const { game, season, numberOfTeams, rounds } = gameInfo;
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const id = useAppSelector(selectId);

  useEffect(() => {
    if (isAdmin) {
      dispatch(getTeamsTrigger(id));
    }
  }, [dispatch, id]);

  const isSubmitButtonEnabled =
    season &&
    game &&
    numberOfTeams &&
    Number(numberOfTeams) > 0 &&
    rounds.length === NUMBER_OF_ROUNDS &&
    rounds.every((round) => round !== undefined && round !== '') &&
    results.every(({ teamName, joker, points }) =>
      Boolean(
        teamName !== '' &&
          joker !== null &&
          points.length === NUMBER_OF_ROUNDS &&
          Object.values(points).length === points.length &&
          points.every((point) => point <= MAX_SCORE_JOKER && point >= MIN_SCORE)
      )
    );

  return (
    <div className={classes.container}>
      <div className={clsx(!isAdmin && classes.titleAndTooltip)}>
        <Typography variant="h4" className={classes.gameName}>
          {t('gameName', {
            season,
            game,
          })}
        </Typography>
        {!isAdmin && <TableTooltip />}
      </div>
      {children}
      <TableContainer component={Paper} className={classes.table}>
        <Table>
          <ResultsTableHead rounds={rounds} isAdmin={isAdmin} />
          {numberOfTeams && (
            <TableBody>
              {[...Array(Number(numberOfTeams))].map((_, index) => (
                <ResultsRow
                  isAdmin={isAdmin}
                  key={index}
                  teamIndex={index}
                  results={results}
                  updateResults={updateResults}
                  rounds={rounds}
                />
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
      <div className={classes.buttonsContainer}>
        {changeStep && (
          <Button
            className={classes.secondaryActionButton}
            variant="outlined"
            onClick={() => changeStep(NewGameStep.gameInfo)}
          >
            {t('backButton')}
          </Button>
        )}
        {deleteGame && (
          <>
            <Button
              className={classes.secondaryActionButton}
              variant="outlined"
              onClick={() => setModalOpen(true)}
            >
              {t(`buttons.deleteGame`)}
            </Button>
            <ActionModal
              modalOpen={modalOpen}
              setModalOpen={setModalOpen}
              action={() => deleteGame(Number(season), Number(game))}
              title={t('deleteModal.title')}
              content={t('deleteModal.content', { season, game })}
              actionName={t('deleteModal.delete')}
            />
          </>
        )}
        {submit && submitTranslationPath && (
          <LoadingButton
            variant="contained"
            disabled={!isSubmitButtonEnabled}
            loading={loading}
            onClick={submit}
          >
            {t(`buttons.${submitTranslationPath}`)}
          </LoadingButton>
        )}
      </div>
    </div>
  );
};

export default ResultsTable;

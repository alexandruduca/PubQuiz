import { Button, TextField } from '@mui/material';
import React, { FC } from 'react';
import { makeStyles } from 'tss-react/mui';
import { useTranslation } from 'react-i18next';
import { GameInfoProps, GameInfoFields, NewGameStep } from '../../../types/gameResults';
import { NUMBER_OF_ROUNDS } from '../../../types/common';
import clsx from 'clsx';

const useStyles = makeStyles()(() => ({
  form: {
    display: 'grid',
    marginTop: '160px',
    gridTemplateColumns: '300px 300px',
    gap: '24px 16px',
    justifyContent: 'center',
  },
  numberOfTeams: {
    gridColumnStart: 1,
    gridColumnEnd: 3,
    width: '300px',
    justifySelf: 'end',
    marginBottom: '40px',
  },
  nextButton: {
    gridColumnStart: 2,
    gridColumnEnd: 3,
    width: '140px',
    justifySelf: 'end',
  },
}));

export const GameInfo: FC<GameInfoProps> = ({
  gameInfo: { game, season, numberOfTeams, rounds },
  changeGameInfo,
  changeStep,
  className,
}) => {
  const { classes } = useStyles();
  const { t } = useTranslation('gameResults');
  const isNextEnabled =
    season &&
    game &&
    numberOfTeams &&
    Number(numberOfTeams) > 0 &&
    rounds.length === NUMBER_OF_ROUNDS &&
    rounds.every((round) => round !== undefined);

  return (
    <form className={clsx(classes.form, className)}>
      <TextField
        required
        label={t('labels.season')}
        value={season}
        type="number"
        inputProps={{ min: 1 }}
        onChange={(e) => changeGameInfo(e, GameInfoFields.season)}
      ></TextField>
      <TextField
        required
        label={t('labels.game')}
        value={game}
        type="number"
        inputProps={{ min: 1 }}
        onChange={(e) => changeGameInfo(e, GameInfoFields.game)}
      ></TextField>
      <TextField
        required
        label={t('labels.numberOfTeams')}
        value={numberOfTeams}
        className={classes.numberOfTeams}
        inputProps={{ min: 1 }}
        type="number"
        onChange={(e) => changeGameInfo(e, GameInfoFields.numberOfTeams)}
      ></TextField>
      {[...Array(NUMBER_OF_ROUNDS)].map((_, index) => (
        <TextField
          required
          label={`${t('labels.round')} ${index + 1}`}
          value={rounds[index] || ''}
          onChange={(e) => changeGameInfo(e, GameInfoFields.rounds, index)}
          key={index}
        ></TextField>
      ))}
      {changeStep && (
        <Button
          variant="contained"
          className={classes.nextButton}
          disabled={!isNextEnabled}
          onClick={() => changeStep(NewGameStep.gameResults)}
        >
          {t('nextButton')}
        </Button>
      )}
    </form>
  );
};

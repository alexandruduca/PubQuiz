import React from 'react';
import {
  GameInfoState,
  Result,
  UpdateGameResultsProps,
  UpdateResultsFn,
} from '../../../types/gameResults';
import ResultsTable from '../../../components/ResultsTable';
import { GameInfo } from '../NewGameResults/GameInfo';
import { makeStyles } from 'tss-react/mui';
import { changeGameInfo } from '../helpers';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  deleteGameResultsTrigger,
  updateGameResults,
  updateGameResultsTrigger,
} from '../gameResultsSlice';
import { selectLoading, selectUpdatedGameData } from '../selectors';

const useStyles = makeStyles()(() => ({
  gameInfo: { marginTop: '0px', marginBottom: '100px' },
}));

const UpdateGameResults = ({ isAdmin }: UpdateGameResultsProps) => {
  const dispatch = useAppDispatch();
  const gameResults = useAppSelector(selectUpdatedGameData);
  const loading = useAppSelector(selectLoading);
  const { classes } = useStyles();
  const gameInfo = {
    game: gameResults.game,
    season: gameResults.season,
    rounds: gameResults.rounds,
    numberOfTeams: gameResults.numberOfTeams,
  };

  const updateResults: UpdateResultsFn = (teamIndex, roundIndex, value, field?) => {
    const results: Result[] = [...gameResults.results];

    if (field) {
      results[teamIndex] = { ...results[teamIndex], [field]: value };
    } else {
      const tempPoints = [...results[teamIndex].points];
      tempPoints[roundIndex] = Number(value);
      results[teamIndex] = { ...results[teamIndex], points: tempPoints };
    }

    dispatch(updateGameResults({ results }));
  };

  const updateArray = (numberOfTeamsDelta: number) => {
    let tempResults = [...gameResults.results];
    if (numberOfTeamsDelta > 0) {
      for (let i = 0; i < numberOfTeamsDelta; i++) {
        tempResults.push({
          teamName: '',
          points: [],
        });
      }
    } else {
      tempResults = tempResults.slice(0, numberOfTeamsDelta);
    }
    dispatch(updateGameResults({ results: tempResults }));
  };

  const submit = () => {
    dispatch(updateGameResultsTrigger(gameResults));
  };

  const deleteGame = (season: number, game: number) => {
    dispatch(deleteGameResultsTrigger({ season, game }));
  };

  const setGameInfo = (field: keyof GameInfoState, value: string | string[]) => {
    dispatch(updateGameResults({ [field]: value }));
  };

  return (
    <>
      <ResultsTable
        gameInfo={gameInfo}
        results={gameResults.results}
        updateResults={updateResults}
        submit={submit}
        submitTranslationPath="updateGame"
        deleteGame={deleteGame}
        loading={loading}
        isAdmin={isAdmin}
      >
        <GameInfo
          className={classes.gameInfo}
          gameInfo={gameInfo}
          changeGameInfo={(e, field, roundIndex) => {
            changeGameInfo(e, field, gameInfo, setGameInfo, updateArray, roundIndex);
          }}
        />
      </ResultsTable>
    </>
  );
};

export default UpdateGameResults;

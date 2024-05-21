import React from 'react';
import ResultsTable from '../../../components/ResultsTable';
import { useAppSelector } from '../../../store/hooks';
import { selectCurrentGameData } from '../selectors';

const ViewGameResults = () => {
  const gameResults = useAppSelector(selectCurrentGameData);
  return (
    <ResultsTable
      gameInfo={{
        game: gameResults.game,
        season: gameResults.season,
        rounds: gameResults.rounds,
        numberOfTeams: gameResults.numberOfTeams,
      }}
      results={gameResults.results}
    />
  );
};

export default ViewGameResults;

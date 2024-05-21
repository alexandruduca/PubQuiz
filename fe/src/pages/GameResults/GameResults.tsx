import React from 'react';
import GameResultsFilters from './GameResultsFilters';
import ViewGameResults from './ViewGameResults';
import UpdateGameResults from './UpdateGameResults/UpdateGameResults';
import { useAppSelector } from '../../store/hooks';
import { selectIsAdmin } from '../Login/selectors';

export const GameResults = () => {
  const isAdmin = useAppSelector(selectIsAdmin);

  return (
    <>
      <GameResultsFilters />
      {isAdmin ? <UpdateGameResults isAdmin={isAdmin} /> : <ViewGameResults />}
    </>
  );
};

import React, { useState } from 'react';
import ResultsTable from '../../../components/ResultsTable';
import { GameInfoState, NewGameStep, Result, UpdateResultsFn } from '../../../types/gameResults';
import { GameInfo } from './GameInfo';
import { changeGameInfo } from '../helpers';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { newGameResultsTrigger, updateNewGameResultsField } from './newGameResultsSlice';
import { selectNewGameFields, selectNewGameLoading } from './selectors';
import { selectIsAdmin } from '../../Login/selectors';

export const NewGameResults = () => {
  const dispatch = useAppDispatch();
  const isAdmin = useAppSelector(selectIsAdmin);
  const { results, ...gameInfo } = useAppSelector(selectNewGameFields);
  const loading = useAppSelector(selectNewGameLoading);
  const [step, setStep] = useState<NewGameStep>(NewGameStep.gameInfo);

  const updateResults: UpdateResultsFn = (teamIndex, roundIndex, value, field?) => {
    const tempResults: Result[] = [...results];
    if (field) {
      tempResults[teamIndex] = { ...tempResults[teamIndex], [field]: value };
    } else {
      const tempPoints = [...tempResults[teamIndex].points];
      tempPoints[roundIndex] = Number(value);
      tempResults[teamIndex] = { ...tempResults[teamIndex], points: tempPoints };
    }
    dispatch(updateNewGameResultsField({ results: tempResults }));
  };

  const updateArray = (numberOfTeamsDelta: number) => {
    let tempResults = [...results];
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
    dispatch(updateNewGameResultsField({ results: tempResults }));
  };

  const changeStep = (step: NewGameStep) => {
    setStep(step);
  };

  const submit = () => {
    dispatch(newGameResultsTrigger({ ...gameInfo, results }));
  };

  const setGameInfo = (field: keyof GameInfoState, value: string | string[]) => {
    dispatch(updateNewGameResultsField({ [field]: value }));
  };

  return (
    <>
      {step === NewGameStep.gameInfo && (
        <GameInfo
          gameInfo={gameInfo}
          changeGameInfo={(e, field, roundIndex) => {
            changeGameInfo(e, field, gameInfo, setGameInfo, updateArray, roundIndex);
          }}
          changeStep={changeStep}
        />
      )}
      {step === NewGameStep.gameResults && (
        <ResultsTable
          gameInfo={gameInfo}
          changeStep={changeStep}
          results={results}
          isAdmin={isAdmin}
          updateResults={updateResults}
          submit={submit}
          submitTranslationPath="newGame"
          loading={loading}
        />
      )}
    </>
  );
};

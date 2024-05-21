import { Autocomplete, TableCell, TableRow, TextField, Theme, Typography } from '@mui/material';
import clsx from 'clsx';
import React from 'react';
import { makeStyles } from 'tss-react/mui';
import { GameResultsFields, ResultsRowProps } from '../../types/gameResults';

import { grey } from '@mui/material/colors';
import { NUMBER_OF_ROUNDS, Themes } from '../../types/common';
import RoundScore from './RoundScore';
import RewardIcon from './RewardIcon';
import { useAppSelector } from '../../store/hooks';
import { selectTeams } from '../../pages/Teams/selectors';
import { Team } from '../../types/teams';
import { selectMode } from '../ThemeSelector/selectors';

const useStyles = makeStyles()((theme: Theme) => ({
  tableRow: {
    ':nth-child(2n)': {
      backgroundColor: grey[300],
    },
  },
  tableRowDark: {
    ':nth-child(2n)': {
      backgroundColor: grey[700],
    },
  },
  jokerCell: {
    width: '200px',
  },
  teamNameContainer: {
    position: 'relative',
  },
  teamIndex: {
    position: 'absolute',
    top: 0,
    left: 0,
    [theme.breakpoints.down('xl')]: {
      display: 'none',
    },
  },
  totalScore: {
    position: 'relative',
    paddingRight: '32px',
  },
}));

const ResultsRow = ({ teamIndex, isAdmin, rounds, updateResults, results }: ResultsRowProps) => {
  const { classes } = useStyles();
  const teamName = results[teamIndex].teamName;
  const teams = useAppSelector(selectTeams);
  const teamsList = teams.map((team: Team) => team.name);
  const mode = useAppSelector(selectMode);

  return (
    <TableRow
      className={clsx(
        { [classes.tableRow]: !isAdmin },
        { [classes.tableRowDark]: mode === Themes.dark }
      )}
      key={teamIndex}
    >
      <TableCell>
        {isAdmin ? (
          <Autocomplete
            fullWidth
            options={teamsList}
            renderInput={(params) => <TextField {...params} />}
            value={teamName}
            onChange={(_, value) => {
              updateResults && updateResults(teamIndex, 0, value, GameResultsFields.teamName);
            }}
          />
        ) : (
          <div className={classes.teamNameContainer}>
            <Typography className={classes.teamIndex}>{teamIndex + 1}</Typography>
            <Typography textAlign="center">{teamName}</Typography>
          </div>
        )}
      </TableCell>
      {isAdmin && (
        <TableCell className={classes.jokerCell}>
          <Autocomplete
            options={rounds}
            renderInput={(params) => <TextField {...params} />}
            value={rounds[results[teamIndex].joker]}
            onChange={(_, value) => {
              updateResults &&
                updateResults(
                  teamIndex,
                  0,
                  value ? rounds.indexOf(value) : null,
                  GameResultsFields.joker
                );
            }}
          />
        </TableCell>
      )}
      {[...Array(NUMBER_OF_ROUNDS)].map((_, index) => (
        <RoundScore
          key={index}
          isAdmin={isAdmin}
          teamIndex={teamIndex}
          roundNumber={index}
          updateResults={updateResults}
          results={results}
        />
      ))}
      <TableCell align="right" className={clsx({ [classes.totalScore]: !isAdmin })}>
        <Typography>
          {results[teamIndex].points.reduce((acc, curr) => (curr ? acc + curr : acc), 0)}
        </Typography>
        {!isAdmin && <RewardIcon results={results} teamIndex={teamIndex} />}
      </TableCell>
    </TableRow>
  );
};

export default ResultsRow;

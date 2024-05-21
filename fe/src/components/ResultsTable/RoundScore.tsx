import { TableCell, TextField, Typography } from '@mui/material';
import { yellow } from '@mui/material/colors';
import React from 'react';
import { makeStyles } from 'tss-react/mui';
import { RoundScoreProps } from '../../types/gameResults';
import StarIcon from '@mui/icons-material/Star';
import { MAX_SCORE_JOKER, MIN_SCORE } from '../../types/common';

const useStyles = makeStyles()(() => ({
  jokerContainer: {
    position: 'relative',
  },
  jokerIcon: {
    position: 'absolute',
    bottom: '70%',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '20px',
    color: yellow[700],
  },
}));

const RoundScore = ({
  isAdmin,
  teamIndex,
  updateResults,
  results,
  roundNumber,
}: RoundScoreProps) => {
  const { classes } = useStyles();
  const teamScore = results[teamIndex].points[roundNumber];

  return (
    <TableCell align="center">
      {isAdmin ? (
        <TextField
          type="number"
          error={teamScore > MAX_SCORE_JOKER || teamScore < MIN_SCORE}
          inputProps={{
            min: MIN_SCORE,
            max: MAX_SCORE_JOKER,
            style: {
              textAlign: 'center',
              width: '70px',
            },
          }}
          value={teamScore}
          onChange={(e) => {
            updateResults && updateResults(teamIndex, roundNumber, e.target.value);
          }}
        />
      ) : (
        <div className={classes.jokerContainer}>
          <Typography>{teamScore}</Typography>
          {roundNumber === results[teamIndex].joker && <StarIcon className={classes.jokerIcon} />}
        </div>
      )}
    </TableCell>
  );
};

export default RoundScore;

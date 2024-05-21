import React from 'react';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import clsx from 'clsx';
import { makeStyles } from 'tss-react/mui';
import { yellow, grey, orange } from '@mui/material/colors';
import { RewardIconProps } from '../../types/gameResults';
import { useAppSelector } from '../../store/hooks';
import { selectMode } from '../ThemeSelector/selectors';
import { Themes } from '../../types/common';

const useStyles = makeStyles()(() => ({
  rewardIcon: {
    position: 'absolute',
    top: '27%',
    right: '3%',
    width: '22px',
  },
  firstPlace: {
    color: yellow[700],
  },
  secondPlace: {
    color: grey[700],
  },
  secondPlaceDark: {
    color: grey[300],
  },
  thirdPlace: {
    color: orange[700],
  },
}));

const RewardIcon = ({ teamIndex, results }: RewardIconProps) => {
  const { classes } = useStyles();
  const mode = useAppSelector(selectMode);

  return (
    <>
      {teamIndex === 0 && (
        <EmojiEventsIcon className={clsx(classes.rewardIcon, classes.firstPlace)} />
      )}
      {teamIndex === 1 && (
        <EmojiEventsIcon
          className={clsx(classes.rewardIcon, classes.secondPlace, {
            [classes.secondPlaceDark]: mode === Themes.dark,
          })}
        />
      )}
      {teamIndex === 2 && (
        <EmojiEventsIcon className={clsx(classes.rewardIcon, classes.thirdPlace)} />
      )}
      {teamIndex === results.length - 1 && <LocalBarIcon className={classes.rewardIcon} />}
    </>
  );
};

export default RewardIcon;

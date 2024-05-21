import React from 'react';
import { IconButton, Theme, Tooltip, Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import StarIcon from '@mui/icons-material/Star';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import { useTranslation } from 'react-i18next';
import { makeStyles } from 'tss-react/mui';
import { grey, orange, yellow } from '@mui/material/colors';
import clsx from 'clsx';

const useStyles = makeStyles()((theme: Theme) => ({
  tooltip: {
    height: '40px',
  },
  iconSize: {
    width: '20px',
  },
  joker: {
    color: yellow[700],
  },
  firstPlace: {
    color: yellow[700],
  },
  secondPlace: {
    color: grey[300],
  },
  thirdPlace: {
    color: orange[700],
  },
  lastPlace: {
    color: theme.palette.text.primary,
  },
  tooltipInfo: {
    display: 'flex',
  },
}));

const TableTooltip = () => {
  const { t } = useTranslation('gameResults');
  const { classes } = useStyles();

  return (
    <Tooltip
      className={classes.tooltip}
      title={
        <>
          <Typography className={classes.tooltipInfo} textAlign="center">
            <StarIcon className={clsx(classes.iconSize, classes.joker)} />
            {t('tooltip.joker')}
          </Typography>
          <Typography className={classes.tooltipInfo} textAlign="center">
            <EmojiEventsIcon className={clsx(classes.iconSize, classes.firstPlace)} />
            {t('tooltip.first')}
          </Typography>
          <Typography className={classes.tooltipInfo} textAlign="center">
            <EmojiEventsIcon className={clsx(classes.iconSize, classes.secondPlace)} />
            {t('tooltip.second')}
          </Typography>
          <Typography className={classes.tooltipInfo} textAlign="center">
            <EmojiEventsIcon className={clsx(classes.iconSize, classes.thirdPlace)} />
            {t('tooltip.third')}
          </Typography>
          <Typography className={classes.tooltipInfo} textAlign="center">
            <LocalBarIcon className={clsx(classes.iconSize, classes.lastPlace)} />
            {t('tooltip.last')}
          </Typography>
        </>
      }
    >
      <IconButton>
        <InfoIcon />
      </IconButton>
    </Tooltip>
  );
};

export default TableTooltip;

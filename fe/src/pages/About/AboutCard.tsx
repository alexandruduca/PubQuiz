import React from 'react';
import { Link, Theme, Typography } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { AboutCardProps } from '../../types/about';
import clsx from 'clsx';
import { Themes } from '../../types/common';
import { useAppSelector } from '../../store/hooks';
import { selectMode } from '../../components/ThemeSelector/selectors';
import { grey, orange, yellow } from '@mui/material/colors';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const useStyles = makeStyles()((theme: Theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  image: {
    width: '100px',
    margin: '20px 0',
  },
  imageWhite: {
    filter: 'invert(1)',
  },
  title: {
    textAlign: 'center',
    marginBottom: '30px',
  },
  description: {
    textAlign: 'center',
  },
  iconSize: {
    width: '50px',
  },
  joker: {
    color: yellow[700],
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
  lastPlace: {
    color: theme.palette.text.primary,
  },
  prizes: {
    display: 'flex',
    flexDirection: 'column',
  },
  iconContainer: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const AboutCard = ({
  img,
  title,
  description,
  address,
  isPrizeSection,
  firstPlace,
  secondPlace,
  thirdPlace,
  lastPlace,
}: AboutCardProps) => {
  const { classes } = useStyles();
  const mode = useAppSelector(selectMode);

  return (
    <div className={classes.container}>
      <img
        className={clsx(classes.image, { [classes.imageWhite]: mode === Themes.dark })}
        src={img}
        alt="card-image"
      />
      <Typography variant="h4" className={classes.title}>
        {title}
      </Typography>
      <Typography variant="h6" className={classes.description}>
        {description}
      </Typography>
      <Link
        href="https://maps.app.goo.gl/T3syHBkiqhwK3GB16"
        target="_blank"
        underline="none"
        rel="noopener noreferrer"
      >
        <Typography variant="h6" className={classes.description}>
          {address}
        </Typography>
      </Link>
      {isPrizeSection && (
        <div className={classes.prizes}>
          <Typography variant="h6" className={classes.iconContainer}>
            <EmojiEventsIcon className={clsx(classes.iconSize, classes.firstPlace)} />
            {firstPlace}
          </Typography>
          <Typography variant="h6" className={classes.iconContainer}>
            <EmojiEventsIcon
              className={clsx(classes.iconSize, classes.secondPlace, {
                [classes.secondPlaceDark]: mode === Themes.dark,
              })}
            />
            {secondPlace}
          </Typography>
          <Typography variant="h6" className={classes.iconContainer}>
            <EmojiEventsIcon className={clsx(classes.iconSize, classes.thirdPlace)} />
            {thirdPlace}
          </Typography>
          <Typography variant="h6" className={classes.iconContainer}>
            <LocalBarIcon className={clsx(classes.iconSize, classes.lastPlace)} />
            {lastPlace}
          </Typography>
        </div>
      )}
    </div>
  );
};

export default AboutCard;

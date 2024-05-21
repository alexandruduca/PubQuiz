import React from 'react';
import { Theme, Typography } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { useAppSelector } from '../../store/hooks';
import { selectMode } from '../../components/ThemeSelector/selectors';
import { Themes } from '../../types/common';
import clsx from 'clsx';
import { AboutGameRoundsProps } from '../../types/about';

const useStyles = makeStyles()(() => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  image: {
    width: '50px',
    alignSelf: 'start',
  },
  imageWhite: {
    filter: 'invert(1)',
  },
  title: {
    marginBottom: '10px',
  },
  description: {},
}));

const AboutGameRound = ({ img, title, description }: AboutGameRoundsProps) => {
  const { classes } = useStyles();
  const mode = useAppSelector(selectMode);

  return (
    <div className={classes.container}>
      <img
        className={clsx(classes.image, { [classes.imageWhite]: mode === Themes.dark })}
        src={img}
        alt="card-image"
      />
      <div>
        <Typography className={classes.title} variant="h5">
          {title}
        </Typography>
        <Typography className={classes.description} variant="h6">
          {description}
        </Typography>
      </div>
    </div>
  );
};

export default AboutGameRound;

import React from 'react';
import { LandmarkType, LayoutIconProps } from '../../types/teamRegistration';
import table from 'src/assets/table.png';
import tv from 'src/assets/television.png';
import presenter from 'src/assets/presenter.png';
import entrance from 'src/assets/entrance.png';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()(() => ({
  table: {
    width: '100%',
    height: '100%',
  },
  tv: {
    width: '80%',
  },
  entrance: {
    height: '70%',
    width: '60%',
  },
}));

const LayoutIcon = ({ type }: LayoutIconProps) => {
  const { classes } = useStyles();

  const attributesBasedOnType = {
    [LandmarkType.table]: {
      src: table,
      alt: 'table',
      className: classes.table,
    },
    [LandmarkType.tv]: {
      src: tv,
      alt: 'tv',
      className: classes.tv,
    },
    [LandmarkType.presenter]: {
      src: presenter,
      alt: 'presenter',
      className: classes.tv,
    },
    [LandmarkType.entrance]: {
      src: entrance,
      alt: 'entrance',
      className: classes.entrance,
    },
  };
  const attributes = attributesBasedOnType[type];

  return (
    <>
      <img src={attributes.src} alt={attributes.alt} className={attributes.className} />
    </>
  );
};

export default LayoutIcon;

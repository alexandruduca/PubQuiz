import { Box, Typography } from '@mui/material';
import clsx from 'clsx';
import React from 'react';
import { makeStyles } from 'tss-react/mui';
import { useAppSelector } from '../../store/hooks';
import { GridProps, Landmark, LandmarkType } from '../../types/teamRegistration';
import LayoutIcon from './LayoutIcon';
import { selectLayout } from './selectors';

const useStyles = makeStyles<GridProps>()((theme, { numberOfColumns, numberOfRows }) => ({
  layout: {
    marginTop: '100px',
    padding: '10px',
    border: `10px groove ${theme.palette.primary.main}`,
    display: 'grid',
    gridTemplateColumns: `repeat(${numberOfColumns}, 1fr)`,
    gridTemplateRows: `repeat(${numberOfRows}, 1fr)`,
    columnGap: '1%',
    rowGap: '50px',
  },
  table: {
    width: '100%',
    height: '100%',
    display: 'flex',
    position: 'relative',
  },
  alignIconCenter: {
    justifyContent: 'center',
  },
  alignIconStart: {
    justifyContent: 'flex-start',
  },
  tableContent: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    color: 'white',
    textAlign: 'center',
    maxWidth: '80%',
    padding: '10px',
  },
}));

const TablesLayout = () => {
  const { numberOfRows, numberOfColumns, landmarks } = useAppSelector(selectLayout);
  const { classes } = useStyles({ numberOfRows, numberOfColumns });

  return (
    <div className={classes.layout}>
      {landmarks?.map(({ row, column, tableName, teamName, type }: Landmark) => (
        <Box
          sx={{ gridColumn: `${column} / span 1`, gridRow: `${row} / span 1` }}
          key={`${row}${column}`}
          className={clsx(
            classes.table,
            type === LandmarkType.entrance ? classes.alignIconStart : classes.alignIconCenter
          )}
        >
          {type === LandmarkType.table && (
            <Typography className={classes.tableContent}>
              {teamName ? teamName : tableName}
            </Typography>
          )}
          <LayoutIcon type={type} />
        </Box>
      ))}
    </div>
  );
};

export default TablesLayout;

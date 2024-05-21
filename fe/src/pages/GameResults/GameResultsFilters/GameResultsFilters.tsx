import React, { useEffect } from 'react';
import { Autocomplete, Button, TextField, Theme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { GameResultsFiltersKeys, Season } from '../../../types/gameResults';
import { makeStyles } from 'tss-react/mui';
import clsx from 'clsx';
import { paths } from '../../../common';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  getGameResultsFiltersTrigger,
  getGameResultsTrigger,
  setGameResultsFilters,
} from '../gameResultsSlice';
import { selectFilters, selectFiltersData } from '../selectors';
import { selectIsAdmin } from '../../Login/selectors';

const useStyles = makeStyles()((theme: Theme) => ({
  filtersContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '100px',
    [theme.breakpoints.down('md')]: {
      marginLeft: '50px',
      marginRight: '50px',
    },
  },
  filter: {
    width: '300px',
  },
  gameFilter: {
    marginLeft: '16px',
  },
  button: {
    marginLeft: '30px',
  },
}));

const GameResultsFilters = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectFilters);
  const filtersData: Season[] = useAppSelector(selectFiltersData);
  const { season, game } = useAppSelector(selectFilters);
  const { t } = useTranslation('gameResults');
  const { classes } = useStyles();
  const isAdmin = useAppSelector(selectIsAdmin);

  useEffect(() => {
    if (filters.game) {
      dispatch(getGameResultsTrigger(filters));
    }
  }, [filters.game, filters.season, dispatch, filters]);

  useEffect(() => {
    dispatch(getGameResultsFiltersTrigger());
  }, [dispatch]);

  const getSeasons = () => filtersData.map((obj) => obj.season);
  const getGames = () => filtersData.find((obj) => obj.season === Number(season))?.games ?? [];

  const handleChange = (value: number | null, key: keyof typeof GameResultsFiltersKeys) => {
    if (key === GameResultsFiltersKeys.season) {
      dispatch(setGameResultsFilters({ [GameResultsFiltersKeys.game]: null }));
    }
    dispatch(setGameResultsFilters({ [key]: value }));
  };

  return (
    <div className={classes.filtersContainer}>
      <Autocomplete
        className={classes.filter}
        options={getSeasons()}
        renderInput={(params) => <TextField {...params} label={t('filters.season')} />}
        onChange={(_, value) => handleChange(value, GameResultsFiltersKeys.season)}
        value={season}
        noOptionsText={t('filters.noSeasons')}
        getOptionLabel={(option) => String(option)}
      />
      <Autocomplete
        className={clsx(classes.filter, classes.gameFilter)}
        options={getGames()}
        renderInput={(params) => <TextField {...params} label={t('filters.game')} />}
        onChange={(_, value) => handleChange(value, GameResultsFiltersKeys.game)}
        value={game}
        noOptionsText={t('filters.noGames')}
        getOptionLabel={(option) => String(option)}
      />
      {isAdmin && (
        <Link to={paths.newGame}>
          <Button className={classes.button} variant="contained">
            {t('buttons.newGame')}
          </Button>
        </Link>
      )}
    </div>
  );
};

export default GameResultsFilters;

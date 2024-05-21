import React from 'react';
import { Theme, Typography } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { useTranslation } from 'react-i18next';
import ask from '../../assets/ask.png';
import play from '../../assets/play.png';
import price from '../../assets/price.png';
import location from '../../assets/location.png';
import clock from '../../assets/clock.png';
import prize from '../../assets/prize.png';
import number1 from '../../assets/number1.png';
import number2 from '../../assets/number2.png';
import number3 from '../../assets/number3.png';
import number4 from '../../assets/number4.png';
import number5 from '../../assets/number5.png';
import AboutCard from './AboutCard';
import AboutGameRound from './AboutGameRounds';

const useStyles = makeStyles()((theme: Theme) => ({
  container: {
    margin: '100px 0',
    [theme.breakpoints.down(1100)]: {
      width: 'calc(100% - 100px)',
      margin: '50px 50px',
    },
  },
  cardsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridTemplateRows: 'repeat(2, 1fr)',
    columnGap: '30px',
    [theme.breakpoints.down(1100)]: {
      gridTemplateRows: 'repeat(6, 1fr)',
      gridTemplateColumns: 'repeat(1, 1fr)',
    },
  },
  gameRoundsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
  },
  gameRoundsHeader: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    gap: '15px',
    marginBottom: '30px',
  },
  separator: {
    display: 'block',
    height: '1px',
    border: '0',
    borderTop: '1px solid #ccc',
    margin: '50px 10%',
    padding: '0',
    width: '80%',
    justifyContent: 'center',
  },
}));

export const About = () => {
  const { t } = useTranslation('about');
  const { classes } = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.cardsContainer}>
        <AboutCard img={ask} title={t('ask.title')} description={t('ask.description')} />
        <AboutCard img={play} title={t('play.title')} description={t('play.description')} />
        <AboutCard img={price} title={t('price.title')} description={t('price.description')} />
        <AboutCard
          img={location}
          title={t('location.title')}
          description={t('location.description')}
          address={t('location.address')}
        />
        <AboutCard img={clock} title={t('clock.title')} description={t('clock.description')} />
        <AboutCard
          img={prize}
          title={t('prize.title')}
          isPrizeSection={true}
          firstPlace={t('prize.firstPlace')}
          secondPlace={t('prize.secondPlace')}
          thirdPlace={t('prize.thirdPlace')}
          lastPlace={t('prize.lastPlace')}
        />
      </div>
      <hr className={classes.separator} />
      <div className={classes.gameRoundsContainer}>
        <div className={classes.gameRoundsHeader}>
          <Typography variant="h4">{t('gameRounds.title')}</Typography>
          <Typography variant="h6">{t('gameRounds.description')}</Typography>
        </div>
        <AboutGameRound
          img={number1}
          title={t('gameRounds.matrix.title')}
          description={t('gameRounds.matrix.description')}
        />
        <AboutGameRound
          img={number2}
          title={t('gameRounds.musicFilm.title')}
          description={t('gameRounds.musicFilm.description')}
        />
        <AboutGameRound
          img={number3}
          title={t('gameRounds.connection.title')}
          description={t('gameRounds.connection.description')}
        />
        <AboutGameRound
          img={number4}
          title={t('gameRounds.themed.title')}
          description={t('gameRounds.themed.description')}
        />
        <AboutGameRound
          img={number5}
          title={t('gameRounds.mixed.title')}
          description={t('gameRounds.mixed.description')}
        />
      </div>
    </div>
  );
};

export default About;

import { Theme, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from 'tss-react/mui';
import FAQItem from './FAQItem';

const useStyles = makeStyles()((theme: Theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '100px 0',
    gap: '20px',
    [theme.breakpoints.down(1100)]: {
      width: 'calc(100% - 100px)',
      margin: '100px 50px',
    },
  },
}));

export const FAQ = () => {
  const { classes } = useStyles();
  const { t } = useTranslation('faq');

  return (
    <div className={classes.container}>
      <Typography variant="h4" textAlign="center">
        {t('title')}
      </Typography>
      <Typography variant="h6" textAlign="center">
        {t('description')}
      </Typography>
      <FAQItem question={t('first.question')} answer={t('first.answer')} />
      <FAQItem question={t('second.question')} answer={t('second.answer')} />
      <FAQItem question={t('third.question')} answer={t('third.answer')} />
      <FAQItem question={t('fourth.question')} answer={t('fourth.answer')} />
      <FAQItem question={t('fifth.question')} answer={t('fifth.answer')} />
    </div>
  );
};

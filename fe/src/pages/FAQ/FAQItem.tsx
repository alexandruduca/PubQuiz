import React from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Paper, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { makeStyles } from 'tss-react/mui';
import { FAQProps } from '../../types/common';

const useStyles = makeStyles()(() => ({
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridTemplateRows: 'repeat(5, auto)',
    width: '60%',
  },
}));

const FAQItem = ({ question, answer }: FAQProps) => {
  const { classes } = useStyles();

  return (
    <div className={classes.container}>
      <Accordion component={Paper}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">{question}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{answer}</Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default FAQItem;

import React from 'react';
import { Button, Modal, Theme, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { makeStyles } from 'tss-react/mui';
import { ActionModalProps } from '../../types/common';

const useStyles = makeStyles()((theme: Theme) => ({
  container: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '600px',
    minHeight: '300px',
    backgroundColor: theme.palette.secondary.main,
    border: `2px solid ${theme.palette.primary.main}`,
    borderRadius: '10px',
    boxShadow: '10px 10px 48px 0px rgba(0,0,0,0.65)',
  },
  title: {
    margin: '40px 0px',
  },
  buttons: {
    marginTop: '80px',
    marginBottom: '30px',
  },
  cancelButton: {
    marginRight: '20px',
  },
}));

const ActionModal = ({
  modalOpen,
  setModalOpen,
  action,
  title,
  content,
  actionName,
  children,
}: ActionModalProps) => {
  const { t } = useTranslation('common');
  const { classes } = useStyles();

  const closeModal = () => setModalOpen(false);

  return (
    <Modal open={modalOpen} onClose={closeModal}>
      <div className={classes.container}>
        <Typography variant="h4" className={classes.title}>
          {title}
        </Typography>
        <Typography variant="h6">{content}</Typography>
        {children}
        <div className={classes.buttons}>
          <Button variant="outlined" className={classes.cancelButton} onClick={closeModal}>
            {t('modal.cancel')}
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              action();
              closeModal();
            }}
          >
            {actionName}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ActionModal;

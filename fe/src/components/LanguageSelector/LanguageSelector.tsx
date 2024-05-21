import LanguageIcon from '@mui/icons-material/Language';
import { Button, Menu, MenuItem, Theme, Typography, useMediaQuery } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from 'tss-react/mui';
import enFlag from 'src/assets/gb.svg';
import roFlag from 'src/assets/ro.svg';
import { Languages, Logos } from '../../types/common';
import clsx from 'clsx';

const useStyles = makeStyles()((theme: Theme) => ({
  flagIcon: {
    height: '16px',
    marginRight: '8px',
  },
  languageText: {
    textTransform: 'none',
    width: '70px',
  },
  menuItem: {
    minWidth: '150px',
  },
  menu: {
    marginLeft: '16px',
  },
  languageButton: {
    '& .MuiButton-startIcon': { margin: '0px' },
    height: '100%',
    color: 'white',
  },
  buttonColorMobile: {
    color: `${theme.palette.text.primary}`,
  },
}));

export const LanguageSelector = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down(1100));

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    handleClose();
  };

  const { t, i18n } = useTranslation('home');
  const { classes } = useStyles();

  const logos: Logos = {
    ro: roFlag,
    en: enFlag,
  };
  return (
    <div>
      <Button
        variant="text"
        disableElevation
        onClick={handleClick}
        startIcon={<LanguageIcon />}
        className={clsx(classes.languageButton, {
          [classes.buttonColorMobile]: isMobile,
        })}
      ></Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose} className={classes.menu}>
        {Object.keys(Languages).map((language) => (
          <MenuItem
            onClick={() => changeLanguage(language)}
            key={language}
            className={classes.menuItem}
          >
            <img
              className={classes.flagIcon}
              src={logos[language as keyof Logos]}
              alt={`${language} flag`}
            />
            <Typography>{t(`languageButtons.${language}`)}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

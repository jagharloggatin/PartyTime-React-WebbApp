import { AppBar, Toolbar } from '@mui/material';
import React from 'react';
import AppAvatar from './AppAvatar';
import AppLogo from './AppLogo';
import AppMenu from './AppMenu';
import styles from './styles/AppHeader.module.scss';

const AppHeader = (props) => {
  return (
    <AppBar sx={{ bgcolor: '#ffffff00', boxShadow: '1px 5px 20px rgba(21, 103, 185, 0.57)' }} position="sticky">
      <Toolbar className={styles.header}>
        <div></div>
        <AppLogo />
        <AppAvatar />
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;

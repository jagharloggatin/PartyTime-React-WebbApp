import React from 'react';
import AppAvatar from './AppAvatar';
import AppLogo from './AppLogo';
import AppMenu from './AppMenu';

const AppHeader = (props) => {
  return (
    <div className="header">
      <AppMenu />
      <AppLogo />
      <AppAvatar />
    </div>
  );
};

export default AppHeader;

import React from 'react';
import AppMenuItem from './AppMenuItem';

const AppMenu = (props) => {
  return (
    <ul>
      <AppMenuItem name="Home" url="/"></AppMenuItem>
      <AppMenuItem name="Map" url="/map"></AppMenuItem>
    </ul>
  );
};

export default AppMenu;

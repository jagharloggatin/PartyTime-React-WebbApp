import React from 'react';
import MenuItem from './MenuItem';

const Menu = (props) => {
  return (
    <ul>
      <MenuItem name="Home" url="/"></MenuItem>
      <MenuItem name="Map" url="/map"></MenuItem>
    </ul>
  );
};

export default Menu;

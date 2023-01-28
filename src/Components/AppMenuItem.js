import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const AppMenuItem = ({ name, url = null, icon = null, onClick = null }) => {
  if (!onClick) {
    return (
      <ListItem key={name} disablePadding component={Link} to={url}>
        <ListItemButton>
          {icon && <ListItemIcon>{icon}</ListItemIcon>}
          <ListItemText primary={name} />
        </ListItemButton>
      </ListItem>
    );
  }

  return (
    <ListItem onClick={onClick} key={name} disablePadding>
      <ListItemButton>
        {icon && <ListItemIcon>{icon}</ListItemIcon>}
        <ListItemText primary={name} />
      </ListItemButton>
    </ListItem>
  );
};

export default AppMenuItem;

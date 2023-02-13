import FastfoodIcon from '@mui/icons-material/Fastfood';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import { Avatar, Divider, List, SwipeableDrawer } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import UserContext from 'store/UserContext';
import AppMenuItem from './AppMenuItem';
import styles from './styles/AppAvatar.module.scss';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function AppAvatar() {
  const [open, setOpen] = useState(false);
  const userCtx = useContext(UserContext);
  const location = useLocation();
  const navigateTo = useNavigate();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    handleClose();
  }, [location]);

  const logout = () => {
    userCtx.LogOutUser();
    navigateTo('/');
  };

  const drawer = (
    <SwipeableDrawer anchor="right" open={open} onClose={handleClose} onOpen={handleOpen}>
      <div className={styles.drawer}>
        <List>
          {userCtx.IsLoggedIn() && (
            <div>
              <AppMenuItem icon={<PersonIcon />} name="Profile" url="/profile"></AppMenuItem>
              <AppMenuItem icon={<SettingsIcon />} name="Settings" url="/settings"></AppMenuItem>
            </div>
          )}
          {!userCtx.IsLoggedIn() && (
            <div>
              <AppMenuItem icon={<LoginIcon />} name="Log in" url="/login"></AppMenuItem>
              <AppMenuItem icon={<FastfoodIcon />} name="Sign up" url="/signup"></AppMenuItem>
            </div>
          )}
        </List>
        {userCtx.IsLoggedIn() && (
          <div>
            <Divider />
            <List>
              <AppMenuItem icon={<LogoutIcon />} name="Logout" onClick={logout}></AppMenuItem>
            </List>
          </div>
        )}
      </div>
    </SwipeableDrawer>
  );

  return (
    <>
      <Avatar onClick={handleOpen}></Avatar>
      {drawer}
    </>
  );
}

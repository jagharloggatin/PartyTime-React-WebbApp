import MailIcon from '@mui/icons-material/Mail';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import { Avatar, Divider, List, SwipeableDrawer } from '@mui/material';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
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
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const location = useLocation();

  useEffect(() => {
    handleClose();
  }, [location]);

  const logout = () => {
    console.log('Logga ut');
  };

  const drawer = (
    <SwipeableDrawer anchor="right" open={open} onClose={handleClose} onOpen={handleOpen}>
      <div className={styles.drawer}>
        <List>
          <AppMenuItem icon={<MailIcon></MailIcon>} name="Profile" url="/profile"></AppMenuItem>
          <AppMenuItem name="Settings" url="/settings"></AppMenuItem>
          <AppMenuItem name="Log in" url="/login"></AppMenuItem>
          <AppMenuItem name="Sign up" url="/signup"></AppMenuItem>
        </List>
        <Divider />
        <List>
          <AppMenuItem name="Logout" onClick={logout}></AppMenuItem>
        </List>
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

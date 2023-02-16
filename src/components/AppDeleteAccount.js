import { Avatar, Box, Button, TextField } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import { style } from '@mui/system';
import ENDPOINTS from 'Endpoints';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import RequestContext from 'store/RequestContext';
import ProfileTabs from './ProfileTabs';
import styles from './styles/AppProfile.module.scss';

export default function AppDeleteAccount({ userId, displaySuccess, displayError }) {
  const reqCtx = useContext(RequestContext);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e) => {
    try {
      setIsLoading(true);

      e.preventDefault();
      const currentPassword = e.target.password.value;
      const newPassword = e.target.newpassword.value;
      const body = {
        userId,
        currentPassword,
        newPassword,
      };

      const res = await reqCtx.putRequest(ENDPOINTS.changePassword, body, false);
      if (res?.ok) {
        displaySuccess.current.update((await res.json()).msg);
      } else {
        displayError.current.update((await res.json()).msg);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <Box>
        <Button disabled={isLoading} variant="contained" type="submit" size="large" color="error" sx={{ mt: 2 }}>
          Delete account
        </Button>
      </Box>
    </form>
  );
}

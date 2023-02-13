import { Avatar, Box, Button, TextField } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import { style } from '@mui/system';
import ENDPOINTS from 'Endpoints';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import RequestContext from 'store/RequestContext';
import ProfileTabs from './ProfileTabs';
import styles from './styles/AppProfile.module.scss';

export default function AppEditPassword({ userId, displaySuccess, displayError }) {
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

      const res = await reqCtx.putRequest(ENDPOINTS.changePassword, body);

      if (res.ok) {
        displaySuccess('Successfully changed password!');
      } else {
        displayError('Failed to change password!');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <Box>
        <TextField id="password" label="Old password" type="password" margin="normal" fullWidth />
      </Box>
      <Box>
        <TextField id="newpassword" label="New password" type="password" margin="normal" fullWidth />
      </Box>
      <Box>
        <Button disabled={isLoading} variant="contained" type="submit" size="large" sx={{ mt: 2 }}>
          Change password
        </Button>
      </Box>
    </form>
  );
}

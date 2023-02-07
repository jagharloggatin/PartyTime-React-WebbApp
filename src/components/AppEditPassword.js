import { Avatar, Box, Button, TextField } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import { style } from '@mui/system';
import ENDPOINTS from 'Endpoints';
import React, { useEffect, useRef, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { getRequest, postRequest, putRequest } from 'RequestService';
import ProfileTabs from './ProfileTabs';
import styles from './styles/AppProfile.module.scss';

export default function AppEditPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const id = 1;

  const onSubmit = async (e) => {
    try {
      setIsLoading(true);

      e.preventDefault();
      const currentPassword = e.target.password.value;
      const newPassword = e.target.newpassword.value;
      const body = {
        userId: id,
        currentPassword,
        newPassword,
      };

      const res = await putRequest(ENDPOINTS.changePassword, body);

      console.log('här är mitt res', res);

      if (res.ok) {
        alert('Password was changed');
      } else {
        alert('Password change failed');
      }

      const data = await res.json();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
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
    </>
  );
}

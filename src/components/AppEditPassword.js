import { Avatar, Box, Button, TextField } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import { style } from '@mui/system';
import ENDPOINTS from 'Endpoints';
import React, { useEffect, useRef, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { getRequest } from 'RequestService';
import ProfileTabs from './ProfileTabs';
import styles from './styles/AppProfile.module.scss';

export default function AppEditPassword() {
  const [user, setUser] = useState(null);
  const [tempUser, setTempUser] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const id = 7;

    async function fetchData() {
      try {
        setIsLoading(true);
        const res = await getRequest(ENDPOINTS.getUser(id));
        console.log('här är mitt res', res);
        const data = await res.json();

        setUser(data);
        setTempUser(data);
      } finally {
        setIsLoading(false);
      }

      console.log('hej', user);
      console.log('hejjjjjjj', tempUser);
    }
    fetchData();
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(tempUser);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>No user</div>;
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <Box>
          <TextField
            id="password"
            label="Old password"
            type={'oldPassword'}
            margin="normal"
            fullWidth
            onChange={(e) => {
              setTempUser({ ...tempUser, password: e.target.value });
            }}
          />
        </Box>
        <Box>
          <TextField
            id="password"
            label="New password"
            type={'newPassword'}
            margin="normal"
            fullWidth
            onChange={(e) => {
              setTempUser({ ...tempUser, password: e.target.value });
            }}
          />
        </Box>
        <Box>
          <Button variant="contained" type="submit" size="large" sx={{ mt: 2 }}>
            Edit Profile
          </Button>
        </Box>
      </form>
    </>
  );
}

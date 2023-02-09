import { Avatar, Box, Button, Stack, TextField } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import { style } from '@mui/system';
import ENDPOINTS from 'Endpoints';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import RequestContext from 'store/RequestContext';
import ProfileTabs from './ProfileTabs';
import styles from './styles/AppProfile.module.scss';

export default function AppEditProfile() {
    const reqCtx = useContext(RequestContext);
  const [user, setUser] = useState(null);
  const [tempUser, setTempUser] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const id = 1;

    async function fetchData() {
      try {
        setIsLoading(true);
        const res = await reqCtx.getRequest(ENDPOINTS.getUser(id));
        console.log('här är mitt res', res);
        const data = await res.json();

        setUser(data);
        setTempUser(data);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const onCancel = async (e) => {
    e.preventDefault();
    setTempUser(user);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(tempUser);
    let resp = await reqCtx.putRequest(ENDPOINTS.editUser(tempUser.id), tempUser);
    let result = await resp.json()

    console.log(result);
    if (resp.ok === 200) {
      alert('OK');
    } else {
      alert('NOT OK');
    }
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
            id="username"
            value={tempUser.username}
            label="Username"
            margin="normal"
            fullWidth
            required
            onChange={(e) => {
              setTempUser({ ...tempUser, username: e.target.value });
            }}
          />
        </Box>
        <Box>
          <TextField
            id="firstname"
            value={tempUser.firstName}
            label="Firstname"
            margin="normal"
            fullWidth
            onChange={(e) => {
              setTempUser({ ...tempUser, firstName: e.target.value });
            }}
          />
        </Box>
        <Box>
          <TextField
            id="lastname"
            value={tempUser.lastName}
            label="Last name"
            margin="normal"
            fullWidth
            onChange={(e) => {
              setTempUser({ ...tempUser, lastName: e.target.value });
            }}
          />
        </Box>
        <Box>
          <TextField
            id="email"
            value={tempUser.email}
            label="Email"
            margin="normal"
            fullWidth
            required
            onChange={(e) => {
              setTempUser({ ...tempUser, email: e.target.value });
            }}
          />
        </Box>

        <Stack direction="row" spacing={2}>
          <Button onClick={onSubmit}variant="contained" type="submit">
            Save changes
          </Button>

          <Button onClick={onCancel} variant="outlined" type="button">
            Cancel
          </Button>
        </Stack>
      </form>
    </>
  );
}

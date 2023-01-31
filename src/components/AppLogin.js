import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import ENDPOINTS from 'Endpoints';
import * as React from 'react';
import { useRef } from 'react';
import { postRequest } from 'RequestService';
import ErrorAlert from './ErrorAlert';
import SuccessAlert from './SuccessAlert';

export default function AppSignup() {
  // Needed to access our ErrorAlert and update state
  const errorAlertRef = useRef(null);
  const successAlertRef = useRef(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    const Username = e.target.username.value;
    const Password = e.target.password.value;
    let resp = await postRequest(ENDPOINTS.login, { Username, Password });

    if (resp.status !== 200) {
      errorAlertRef.current.update('Wrong Username or Password!');
    } else {
      successAlertRef.current.update('Successfully Logged in!');
    }
  };

  return (
    <>
      <form onSubmit={handleLogin}>
        <ErrorAlert ref={errorAlertRef}></ErrorAlert>
        <SuccessAlert ref={successAlertRef}></SuccessAlert>
        <Box>
          <TextField
            helperText="Please enter your username"
            id="username"
            label="Username"
            margin="dense"
            fullWidth={true}
          />
        </Box>
        <Box>
          <TextField
            type="password"
            helperText="Please enter your password"
            id="password"
            label="Password"
            margin="dense"
            fullWidth={true}
          />
        </Box>
        <Box>
          <Button variant="contained" type="submit">
            Login
          </Button>
        </Box>
      </form>
    </>
  );
}

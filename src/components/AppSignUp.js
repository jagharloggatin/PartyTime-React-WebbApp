import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import ENDPOINTS from 'Endpoints';
import * as React from 'react';
import { useState } from 'react';
import { getRequest } from 'RequestService';
import ErrorAlert from './ErrorAlert';

function AppSignup() {
  const [usnCheck, setUsnCheck] = useState(false);

  const handleLogin = () => {};

  const checkUsername = async (e) => {
    const username = e.target.value;

    if (!username) return;

    let resp = await (await getRequest(ENDPOINTS.checkUsername(username))).json();
    if (resp.taken) setUsnCheck(true);
    else setUsnCheck(false);
  };

  return (
    <>
      <form>
        <Box>
          <TextField
            error={usnCheck}
            helperText={usnCheck ? 'Username already in use' : ''}
            id="username"
            label="User name"
            margin="normal"
            onChange={checkUsername}
            fullWidth
          />
        </Box>
        <Box>
          <TextField id="first" label="First name" margin="normal" fullWidth />
        </Box>
        <Box>
          <TextField id="last" label="Last name" margin="normal" fullWidth />
        </Box>
        <Box>
          <TextField
            id="birthday"
            margin="normal"
            label="Birthday"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />
        </Box>
        <Box>
          <TextField id="email" label="Email" margin="normal" fullWidth />
        </Box>
        <Box>
          <TextField id="email" label="Verify email" margin="normal" fullWidth />
        </Box>
        <Box>
          <TextField id="password" label="Password" type="password" margin="normal" fullWidth />
        </Box>
        <Box>
          <Button variant="contained" type="submit" size="large" sx={{ mt: 2 }} onSubmit={handleLogin}>
            Register
          </Button>
        </Box>
      </form>
    </>
  );
}

export default AppSignup;

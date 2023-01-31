import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import ErrorAlert from './ErrorAlert';

function AppSignup() {
  const handleLogin = () => {};

  return (
    <>
      <form>
        <Box>
          <TextField id="demo-helper-text-misaligned" label="User name" margin="dense" fullWidth={true} />
        </Box>
        <Box>
          <TextField id="demo-helper-text-misaligned" label="First name" margin="dense" fullWidth={true} />
        </Box>
        <Box>
          <TextField id="demo-helper-text-misaligned" label="Last name" margin="dense" fullWidth={true} />
        </Box>
        <Box>
          <TextField
            id="date"
            margin="dense"
            label="Birthday"
            type="date"
            fullWidth={true}
            sx={{ width: 220 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>
        <Box>
          <TextField id="demo-helper-text-misaligned" label="Email" margin="dense" fullWidth={true} />
        </Box>
        <Box>
          <TextField id="demo-helper-text-misaligned" label="Verify email" margin="dense" fullWidth={true} />
        </Box>
        <Box>
          <TextField
            id="demo-helper-text-misaligned"
            label="Password"
            type="password"
            margin="dense"
            fullWidth={true}
          />
        </Box>
        <Box>
          <Button variant="contained" onClick={handleLogin}>
            Register
          </Button>
        </Box>
      </form>
    </>
  );
}

export default AppSignup;

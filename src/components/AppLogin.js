import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import * as React from 'react';

export default function AppLogin() {
  return (
    <>
      <form>
        <Box>
          <TextField
            helperText="Please enter your username"
            id="demo-helper-text-misaligned"
            label="Username"
            margin="dense"
          />
        </Box>
        <Box>
          <TextField
            type="password"
            helperText="Please enter your password"
            id="demo-helper-text-misaligned"
            label="Password"
            margin="dense"
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

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import * as React from 'react';

export default function AppSignUp() {
  return (
    <>
      <Box>
        <TextField
          helperText="Please enter your user name"
          id="demo-helper-text-misaligned"
          label="User name"
          margin="dense"
        />
      </Box>
      <Box>
        <TextField
          helperText="Please enter your first name"
          id="demo-helper-text-misaligned"
          label="First name"
          margin="dense"
        />
      </Box>
      <Box>
        <TextField
          helperText="Please enter your last name"
          id="demo-helper-text-misaligned"
          label="Last name"
          margin="dense"
        />
      </Box>
      <Box>
        <TextField
          id="date"
          margin="dense"
          helperText="Please enter your birthday"
          label="Birthday"
          type="date"
          sx={{ width: 220 }}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Box>
      <Box>
        <TextField helperText="Please enter your email" id="demo-helper-text-misaligned" label="Email" margin="dense" />
      </Box>
      <Box>
        <TextField
          helperText="Please verify your email"
          id="demo-helper-text-misaligned"
          label="Verify email"
          margin="dense"
        />
      </Box>
      <Box>
        <TextField
          helperText="Please enter your password"
          id="demo-helper-text-misaligned"
          label="Password"
          margin="dense"
        />
      </Box>
    </>
  );
}

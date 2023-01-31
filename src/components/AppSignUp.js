import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import { useRef } from 'react';

export default function AppSignup() {
  const usernameRef = useRef(null);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const verifyEmailRef = useRef(null);
  const passwordRef = useRef(null);
  const dateOfBirthRef = useRef(null);

  const signup = async (e) => {
    e.preventDefault();
    console.log('SIGNUP', e);

    if (!usernameRef.current) {
      throw Error('No username');
    }

    if (emailRef.current.value !== verifyEmailRef.current.value) {
      throw Error('Emails do not look the same');
    }

    // if (usernameRef.current?.value.length < 2) {
    //   // show error
    // }

    const req = {
      username: usernameRef.current.value,
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      dateOfBirth: dateOfBirthRef.current.value,
    };

    console.log('min req', req);

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req),
    };

    const response = await fetch('https://localhost:7215/users', requestOptions);
    console.log('api response', response);

    const data = await response.json();

    if (data) {
      alert('Congrats you are now a member');
    } else {
      alert('Something didnt work');
    }
  };

  return (
    <>
      <form onSubmit={signup}>
        <Box>
          <TextField
            inputRef={usernameRef}
            helperText="Please enter your user name"
            id="demo-helper-text-misaligned"
            label="User name"
            margin="dense"
            required
          />
        </Box>
        <Box>
          <TextField
            inputRef={firstNameRef}
            helperText="Please enter your first name"
            id="demo-helper-text-misaligned"
            label="First name"
            margin="dense"
          />
        </Box>
        <Box>
          <TextField
            inputRef={lastNameRef}
            helperText="Please enter your last name"
            id="demo-helper-text-misaligned"
            label="Last name"
            margin="dense"
          />
        </Box>
        <Box>
          <TextField
            inputRef={dateOfBirthRef}
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
          <TextField
            inputRef={emailRef}
            helperText="Please enter your email"
            id="demo-helper-text-misaligned"
            label="Email"
            margin="dense"
          />
        </Box>
        <Box>
          <TextField
            inputRef={verifyEmailRef}
            helperText="Please verify your email"
            id="demo-helper-text-misaligned"
            label="Verify email"
            margin="dense"
          />
        </Box>
        <Box>
          <TextField
            inputRef={passwordRef}
            helperText="Please enter your password"
            id="demo-helper-text-misaligned"
            label="Password"
            type="password"
            margin="dense"
          />
        </Box>
        <Box>
          <Button variant="contained" type="submit">
            Register
          </Button>
        </Box>
      </form>
    </>
  );
}

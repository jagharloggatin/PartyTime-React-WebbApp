import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import ENDPOINTS from 'Endpoints';
import * as React from 'react';
import { useContext, useRef } from 'react';
import RequestContext from 'store/RequestContext';
import StorageContext from 'store/StorageContext';
import ErrorAlert from './ErrorAlert';
import SuccessAlert from './SuccessAlert';

export default function AppSignup() {
  const storageCtx = useContext(StorageContext);
  // Needed to access our ErrorAlert and update state
  const errorAlertRef = useRef(null);
  const successAlertRef = useRef(null);

  const reqCtx = React.useContext(RequestContext)

  const handleLogin = async (e) => {
    e.preventDefault();
    const Username = e.target.username.value;
    const Password = e.target.password.value;
    const resp = await reqCtx.postRequest(ENDPOINTS.login, { Username, Password });
    const json = await resp.json();
  

    if (resp.status !== 200) {
      errorAlertRef.current.update('Wrong Username or Password!');
    } else {
      storageCtx.SaveJWT(json.token, json.userId)
      successAlertRef.current.update('Successfully Logged in!');
    }
  };

  return (
    <>
      <form onSubmit={handleLogin}>
        <ErrorAlert ref={errorAlertRef}></ErrorAlert>
        <SuccessAlert ref={successAlertRef}></SuccessAlert>
        <Box>
          <TextField id="username" label="Username" margin="normal" fullWidth={true} />
        </Box>
        <Box>
          <TextField type="password" id="password" label="Password" margin="normal" fullWidth={true} />
        </Box>
        <Box>
          <Button variant="contained" type="submit" size="large" sx={{ mt: 2 }}>
            Login
          </Button>
        </Box>
      </form>
    </>
  );
}

import { Card } from '@mui/material';
import TextField from '@mui/material/TextField';
import AppActionAreaCard from 'components/AppActionAreaCard';
import AppCard from 'components/ui/AppCard';
import React, { useState } from 'react';
import List from '../components/List';

function HomeRoute() {
  const [inputText, setInputText] = useState('');

  const inputHandler = (event) => {
    //convert input text to lower case
    var lowerCase = event.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  return (
    <>
      <div className="page">
        <div className="search">
          <TextField
            id="outlined-basic"
            onChange={inputHandler}
            variant="filled"
            color="primary"
            fullWidth
            label="Where to?"
          />
        </div>
        <List input={inputText} />
      </div>
      <div>
        <AppActionAreaCard></AppActionAreaCard>
      </div>
    </>
  );
}

export default HomeRoute;

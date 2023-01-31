import TextField from '@mui/material/TextField';
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
  );
}

export default HomeRoute;

import TextField from '@mui/material/TextField';
import List from 'Components/List';
import React, { useState } from 'react';

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

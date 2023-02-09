
import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import classes from './styles/AppMap.module.scss';

import { LoadScript } from '@react-google-maps/api';
import { Autocomplete, TextField } from '@mui/material';
import React from 'react';
import RequestContext from 'store/RequestContext';
import gridIcon from '../icons/grid.svg';
import plusIcon from '../icons/plus.svg';
import searchIcon from '../icons/search.svg';
import Logo from './AppLogo';

function AutoComplete() {
  const autoCompleteRef = useRef();
  const inputRef = useRef();

  const libraries = ["places"] 

  const displaySuggestions = function (predictions, status) {

    predictions.forEach((prediction) => {
      console.log(prediction)
    });
  }


  // Create a new session token.

// Pass the token to the autocomplete service.
var autocompleteService = new window.google.maps.places.AutocompleteService();

var pred = autocompleteService.getPlacePredictions({
  input: 'stockholm',
}, displaySuggestions);

console.log("APSFPAPFKAPGG");


  
  return (
   <div>
    <label>enter address :</label>
    <input ref={inputRef} />
   </div>
  );
}


export default AutoComplete;
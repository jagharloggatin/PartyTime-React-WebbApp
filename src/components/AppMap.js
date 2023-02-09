import { Autocomplete, GoogleMap, useLoadScript } from '@react-google-maps/api';
import { useContext, useMemo, useState } from 'react';
import classes from './styles/AppMap.module.scss';

import { TextField } from '@mui/material';
import React from 'react';
import RequestContext from 'store/RequestContext';
import gridIcon from '../icons/grid.svg';
import plusIcon from '../icons/plus.svg';
import searchIcon from '../icons/search.svg';
import Logo from './AppLogo';
import AutoComplete from './AutoComplete';

const Core = () => {
  const center = useMemo(() => ({ lat: 59.32, lng: 18.06 }), []);

  return (
    <GoogleMap
      zoom={12}
      center={center}
      mapContainerClassName={classes['map-container']}
      options={{
        disableDefaultUI: true,
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#d59563' }],
          },
          {
            featureType: 'poi.park',
            elementType: 'geometry',
            stylers: [{ color: '#F1F3F4' }],
          },
          {
            featureType: 'poi.park',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#6b9a76' }],
          },
        ],
      }}
    ></GoogleMap>
  );
};

const Button = (props) => {
  return (
    <div className={classes.button} style={{ width: `${props.size}px`, height: `${props.size}px`, ...props.style }}>
      {props.children}
    </div>
  );
};

const AppMap = () => {
    const reqCtx = useContext(RequestContext);
  const [showSuggestions, setshowSuggestions] = useState(false);
  const [predictions, setPredictions] = useState({});
  const [inputText, setInputText] = useState("");

  const API_KEY = "AIzaSyAY85IYZfPLkT6EyiauSREDkc7ZhYJCPys";
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${inputText}&key=${API_KEY}`;

  const { isLoaded } = useLoadScript({ googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY });
  

    
  //let res = getRequest(url);
    

  async function handleChange(value) {
    //let res = await getRequest(url);
   // let data = await res.json;

    //setPredictions(data);

    if (value.length > 0) {
        setInputText(value)
        setshowSuggestions(true)
    } else {
        setshowSuggestions(false)
    }
  }

    for (const key in predictions) {

        console.log(`${key}: ${predictions[key]}`);
    }

  const predictionsarea = () => {
    if (showSuggestions) {
        return (
        <div className={classes.autocompletepredictions}>
            <div className={classes.autocompleteprediction}>
                <p className={classes.predictionname}></p>
            </div>  
            <div className={classes.autocompleteprediction}>
                <p className={classes.predictionname}>Stockholm</p>
            </div> 
            <div className={classes.autocompleteprediction}>
                <p className={classes.predictionname}>Stockholm</p>
            </div>   
        </div>
    )
    } else {
        return <div></div>
    }
  }

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <div>
        <div className={classes.autocompletewrapper}>
            <div className={classes.autocompleteinnerwrapper}>
                <TextField
                id="outlined-basic"
                color="primary"
                fullWidth
                label="Where to?"
                className={classes.autocompleteinput}
                onChange={e => handleChange(e.target.value)}
                />

                {predictionsarea()}

            </div>
          
        </div>
      <div className={classes['control-container']}>
        <Button size={60}>
          <img src={gridIcon} alt={'grid-view'} />
        </Button>
        <Button size={100} style={{ margin: '0 40px' }}>
          <img src={plusIcon} alt={'Search'} />
        </Button>
        <Button size={60}>
          <img src={searchIcon} alt={'Search'} />
        </Button>
      </div>
      <Core></Core>
    </div>
  );
};

export default AppMap;

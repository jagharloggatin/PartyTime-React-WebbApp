import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import classes from './styles/AutoCompleteInput.module.scss';

import RequestContext from 'store/RequestContext';
import gridIcon from '../icons/grid.svg';
import plusIcon from '../icons/plus.svg';
import searchIcon from '../icons/search.svg';
import AppNewEvent from './activities/AppNewEvent';
import AppSelectedEventItem from './activities/AppSelectedEventItem';
import Logo from './AppLogo';


function AutoCompleteInput(props) {
  const [predictionsResult, setPredictionsResult] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [inputText, setInputText] = useState("");


  const autoCompleteRef = useRef();
  const inputRef = useRef();

  const service = new window.google.maps.places.AutocompleteService();


  async function getPlaceResult(place_id) {

    const newmap = props.gmap
    const servicex = new window.google.maps.places.PlacesService(newmap)

    console.log(place_id);

    const request = {
      placeId: place_id,
    };

    servicex.getDetails(request, (place, status) => {
      if (
        status === window.google.maps.places.PlacesServiceStatus.OK &&
        place &&
        place.geometry &&
        place.geometry.location){

          //DATA FILTERING - CODE FROM GOOGLE
          // for (const component of place.address_components as google.maps.GeocoderAddressComponent[]) {
          //   // @ts-ignore remove once typings fixed
          //   const componentType = component.types[0];
        
          //   switch (componentType) {
          //     case "street_number": {
          //       address1 = `${component.long_name} ${address1}`;
          //       break;
          //     }
        
          //     case "route": {
          //       address1 += component.short_name;
          //       break;
          //     }
        
          //     case "postal_code": {
          //       postcode = `${component.long_name}${postcode}`;
          //       break;
          //     }
        
          //     case "postal_code_suffix": {
          //       postcode = `${postcode}-${component.long_name}`;
          //       break;
          //     }
        
          //     case "locality":
          //       (document.querySelector("#locality") as HTMLInputElement).value =
          //         component.long_name;
          //       break;
        
          //     case "administrative_area_level_1": {
          //       (document.querySelector("#state") as HTMLInputElement).value =
          //         component.short_name;
          //       break;
          //     }
        
          //     case "country":
          //       (document.querySelector("#country") as HTMLInputElement).value =
          //         component.long_name;
          //       break;
          //   }
          // }

          console.log(place);
          
          const lat = place.geometry.location.lat();
          const lng = place.geometry.location.lng();

          console.log(lat);
          console.log(lng);



          props.setMapState({center:{lat: lat, lng: lng}, zoom: 14 })
          setShowSuggestions(false)

        } else {
          console.log("apa");
        }
      }
      )
  }

  const displaySuggestions = function (predictions, status) {
    if (status !== window.google.maps.places.PlacesServiceStatus.OK || !predictions) {
      alert(status);
      return;
    }
    console.log(predictions)
    setPredictionsResult(predictions)
  };

  async function handleChange(value) {
    if (value.length > 2) {
        setInputText(value)
        setShowSuggestions(true)
        service.getQueryPredictions({ input: value }, displaySuggestions);

    } else {
        setShowSuggestions(false)
    }
  }

  function fillSearchBox(prediction) {
    inputRef.current.value = prediction.description;
    //document.getElementById("autoinput").value = prediction.description;
    getPlaceResult(prediction.place_id)
  }

  function Predictionsarea(props) {
    if (showSuggestions) {
      return(
        <div className={props.size === "small" ? classes.autocompletepredictionssmall : classes.autocompletepredictions }>
           {predictionsResult.map(x => {
            return (<div onClick={() => {fillSearchBox(x)}} className={classes.autocompletesingle}>{x.description}</div>)
           })}
        </div>
      ) 
    } else {
        return <div></div>
    }
  }

  return (
    <div className={classes.autocompletewrapper}>
            <div className={classes.autocompleteinnerwrapper}>
                <input
                  id="autoinput"
                  onChange={e => handleChange(e.target.value)}
                  ref={inputRef}
                  placeholder="Search address"
                  className={props.size === "small" ? classes.autocompleteinputsmall : classes.autocompleteinput}
                  disabled={props.disabled}
                />
                <Predictionsarea size={props.size}/>
            </div>
        </div>
  )
}

export default AutoCompleteInput
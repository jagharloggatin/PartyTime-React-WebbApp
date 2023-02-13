import { Autocomplete, GoogleMap, useLoadScript } from '@react-google-maps/api';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import classes from './styles/AppMap.module.scss';

import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import React from 'react';
import HomeRoute from 'routes/HomeRoute';
import RequestContext from 'store/RequestContext';
import gridIcon from '../icons/grid.svg';
import plusIcon from '../icons/plus.svg';
import searchIcon from '../icons/search.svg';
import AppNewActivityForm from './activities/AppNewActivityForm';
import AppSelectedEventItem from './activities/AppSelectedEventItem';
import Logo from './AppLogo';

const AppMap = () => {
  const reqCtx = useContext(RequestContext);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [predictionsResult, setPredictionsResult] = useState([]);
  const [inputText, setInputText] = useState("");
  const [mapState, setMapState] = useState({center:{lat: 59.330936, lng: 18.071644}, zoom: 14 });
  const [modalOpen, setModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState("");
  const [map, setMap] = useState(null);

  const CustomButton = (props) => {
    return (
      <div onClick={() => {setModalOpen(true); setModalContent(props.modal) }} className={classes.custombutton} style={{ width: `${props.size}px`, height: `${props.size}px`, ...props.style }}>
        {props.children}
      </div>
    );
  };



  const autoCompleteRef = useRef();
  const inputRef = useRef();

  const options = {
    fields: ["address_components", "geometry", "icon", "name"],
  }

  const API_KEY = "AIzaSyAY85IYZfPLkT6EyiauSREDkc7ZhYJCPys";
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${inputText}&key=${API_KEY}`;

  function initMap() {
    const map = new window.google.maps.Map(document.getElementById("mapDiv"), {
      zoom: mapState.zoom,
      center: mapState.center,
      disableDefaultUI: true,
      mapId:'bd0bdf809da55ccb',
    });

    return map
  }

  useEffect(() => {
    window.initMap = initMap.bind(this);


    setMap(initMap())
      
    const events = [
      {
        title: 'SvettigApa',
        description: 'balle',
        map: map,
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/2560px-Stadtbild_M%C3%BCnchen.jpg",
        position: {lat: 59.3294, lng: 18.0686},
      },
      {
        title: 'Borderdell',
        description: 'Kom hit och sug',
        map: map,
        image: "https://cdn.pixabay.com/photo/2016/03/26/22/47/motion-blur-1281675_960_720.jpg",
        position: {lat: 59.3192, lng: 18.0686},
      },
    ];

    // onClick={() => {setModalOpen(true)}
    events.forEach(x => {
      const contentString = `<div class="infoWindow">` +
        `<div class='infoWindow-left'><img src='${x.image}' alt='${x.title}'/></div>` +
        `<div class='infoWindow-right'>` +
          `<h2>${x.title}</h2>`+
          `<div>${x.description}</div>` +
        `</div>` +
        `</div>`
      const popUp = new window.google.maps.InfoWindow({
        content: contentString
      });
      const marker = new window.google.maps.Marker({
        position: x.position,
        content: contentString,
        map: x.map,
        icon: './assets/party.png',
      });

      // Add a click listener for each marker, and set up the info window.
      marker.addListener('mouseover', () => {
        popUp.setContent(contentString);
        popUp.open(marker.getMap(), marker);
      });

      marker.addListener('mouseout', () => {
        popUp.close();
      });

      // start modal
      marker.addListener('click', () => {
        setModalOpen(true)
        setModalContent("selected");
      });
    });
  }, [mapState])

  const displaySuggestions = function (predictions, status) {
    if (status != window.google.maps.places.PlacesServiceStatus.OK || !predictions) {
      alert(status);
      return;
    }
    console.log(predictions)
    setPredictionsResult(predictions)
  };

  const service = new window.google.maps.places.AutocompleteService();

  async function getPlaceResult(place_id) {
    const servicex = new window.google.maps.places.PlacesService(map)
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

          setMapState({center:{lat: lat, lng: lng}, zoom: 14 })
          setShowSuggestions(false)

        } else {

          console.log("apa");
        }
      }
      )
  }


      

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
    document.getElementById("autoinput").value = prediction.description;
    getPlaceResult(prediction.place_id)
  }


  function Predictionsarea() {
    if (showSuggestions) {
      return(
        <div className={classes.autocompletepredictions}>
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
    <div>
      <Modal
        open={modalOpen}
        onClose={() => {setModalOpen(false)}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className={classes.modalcontainer}>
            {modalContent === "grid" ? <HomeRoute/> : null}
            {modalContent === "add" ? <AppNewActivityForm/> : null}
            {modalContent === "search" ? <div/> : null}
            {modalContent === "selected" ? <AppSelectedEventItem/> : null}
        </div>
      </Modal>
        <div className={classes.autocompletewrapper}>
            <div className={classes.autocompleteinnerwrapper}>
                <input
                id="autoinput"
                className={classes.autocompleteinput}
                onChange={e => handleChange(e.target.value)}
                ref={inputRef}
                placeholder="Search address"
                />
                <Predictionsarea/>
            </div>
        </div>
      <div className={classes['control-container']}>
        <CustomButton size={40} modal={"grid"}>
          <img src={gridIcon} alt={'grid-view'} />
        </CustomButton>
        <CustomButton size={80} modal={"add"} style={{ margin: '0 40px' }}>
          <img src={plusIcon} alt={'AddActivity'} />
        </CustomButton>
        <CustomButton size={40} modal={"search"}>
          <img src={searchIcon} alt={'Search'} />
        </CustomButton>
      </div>
      <div id="mapDiv" className={classes.mapcontainer}></div>
    </div>
  );
};

export default AppMap;

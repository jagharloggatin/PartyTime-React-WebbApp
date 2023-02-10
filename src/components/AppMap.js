import { Autocomplete, GoogleMap, useLoadScript } from '@react-google-maps/api';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import classes from './styles/AppMap.module.scss';

import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import React from 'react';
import RequestContext from 'store/RequestContext';
import gridIcon from '../icons/grid.svg';
import plusIcon from '../icons/plus.svg';
import searchIcon from '../icons/search.svg';
import AppNewActivityForm from './activities/AppNewActivityForm';
import Logo from './AppLogo';

const AppMap = () => {
    const reqCtx = useContext(RequestContext);
  const [showSuggestions, setshowSuggestions] = useState(false);
  const [predictionsResult, setPredictionsResult] = useState([]);
  const [inputText, setInputText] = useState("");
  const [mapState, setMapState] = useState({center:{lat: 59.330936, lng: 18.071644}, zoom: 15 });
  const [modalOpen, setModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState("");

  const CustomButton = (props) => {
    return (
      <div onClick={() => {setModalOpen(true)}} className={classes.custombutton} style={{ width: `${props.size}px`, height: `${props.size}px`, ...props.style }}>
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


  useEffect(() => {
    const map = new window.google.maps.Map(document.getElementById("mapDiv"), {
      zoom: mapState.zoom,
      center: mapState.center,
      disableDefaultUI: true,
      mapId:'bd0bdf809da55ccb',
    });
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
        // anchor: marker,
        popUp.setContent(contentString);
        popUp.open(marker.getMap(), marker);
      });

      marker.addListener('mouseout', () => {
        // anchor: marker,
        popUp.close();
      });

      marker.addListener('click', () => {
        // anchor: marker,
      });
    });
  }, [mapState])

  function getPredictions() {

  }
  const displaySuggestions = function (predictions, status) {
    if (status != window.google.maps.places.PlacesServiceStatus.OK || !predictions) {
      alert(status);
      return;
    }
    console.log("WAWAWAWA");
    console.log(predictions)
    setPredictionsResult(predictions)
  };

  const service = new window.google.maps.places.AutocompleteService();


      

  async function handleChange(value) {
    //setPredictions(data);
    //console.log(autoCompleteRef)
    if (value.length > 2) {
        setInputText(value)
        setshowSuggestions(true)
        service.getQueryPredictions({ input: value }, displaySuggestions);

    } else {
        setshowSuggestions(false)
    }
  }


  function Predictionsarea() {
    if (showSuggestions) {
      return(
        <div className={classes.autocompletepredictions}>
           {predictionsResult.map(x => {
            return (<div className={classes.autocompletesingle}>{x.description}</div>)
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
            {modalContent === "grid" ? <div/> : null}
            {modalContent === "add" ? <AppNewActivityForm/> : null}
            {modalContent === "search" ? <div/> : null}
        </div>
      </Modal>
        <div className={classes.autocompletewrapper}>
            <div className={classes.autocompleteinnerwrapper}>
                <input
                id="outlined-basic"
                className={classes.autocompleteinput}
                onChange={e => handleChange(e.target.value)}
                ref={inputRef}
                placeholder="Search address"
                />

                <Predictionsarea/>

            </div>
        </div>
      <div className={classes['control-container']}>
        <CustomButton size={60} onClick={() => {setModalContent("grid")}}>
          <img src={gridIcon} alt={'grid-view'} />
        </CustomButton>
        <CustomButton size={100} onClick={() => {setModalContent("add")}} style={{ margin: '0 40px' }}>
          <img src={plusIcon} alt={'AddActivity'} />
        </CustomButton>
        <CustomButton size={60} onClick={() => {setModalContent("search")}}>
          <img src={searchIcon} alt={'Search'} />
        </CustomButton>
      </div>
      <div id="mapDiv" className={classes.mapcontainer}></div>
    </div>
  );
};

export default AppMap;

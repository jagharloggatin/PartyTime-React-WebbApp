import { Autocomplete, GoogleMap, useLoadScript } from '@react-google-maps/api';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import classes from './styles/AppMap.module.scss';

import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import ENDPOINTS from 'Endpoints';
import React from 'react';
import HomeRoute from 'routes/HomeRoute';
import RequestContext from 'store/RequestContext';
import gridIcon from '../icons/grid.svg';
import plusIcon from '../icons/plus.svg';
import searchIcon from '../icons/search.svg';
import AppNewEvent from './activities/AppNewEvent';
import AppSelectedEventItem from './activities/AppSelectedEventItem';
import Logo from './AppLogo';
import AutoCompleteInput from './AutoCompleteInput';

const AppMap = () => {
  const reqCtx = useContext(RequestContext);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [predictionsResult, setPredictionsResult] = useState([]);
  const [inputText, setInputText] = useState("");
  const [mapState, setMapState] = useState({center:{lat: 59.330936, lng: 18.071644}, zoom: 14 });
  const [modalOpen, setModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState("");
  const [map, setMap] = useState(null);

  const CustomButton = (props) => {
    return (
      <div onClick={() => {setModalOpen(true); setModalContent(props.modal)}} className={classes.custombutton} style={{ width: `${props.size}px`, height: `${props.size}px`, ...props.style }}>
        {props.children}
      </div>
    );
  };


  useEffect(() => {
    const newmap = new window.google.maps.Map(document.getElementById("mapDiv"), {
      zoom: mapState.zoom,
      center: mapState.center,
      disableDefaultUI: false,
      mapId:'bd0bdf809da55ccb',
    });

    setMap(newmap);
      
    // const events = [
    //   {
    //     title: 'SvettigApa',
    //     description: 'balle',
    //     map: newmap,
    //     image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/2560px-Stadtbild_M%C3%BCnchen.jpg",
    //     position: {lat: 59.3294, lng: 18.0686},
    //   },
    //   {
    //     title: 'Borderdell',
    //     description: 'Kom hit och sug',
    //     map: newmap,
    //     image: "https://cdn.pixabay.com/photo/2016/03/26/22/47/motion-blur-1281675_960_720.jpg",
    //     position: {lat: 59.3192, lng: 18.0686},
    //   },
    // ];


    const showMarkers = async () => {
      const req  = await reqCtx.getRequest(ENDPOINTS.getEvents)
      const res = await req.json()

      console.log(res);

      res.forEach(x => {
        const contentString = `<div class="infoWindow">` +
          `<div class='infoWindow-left'><img src='${x.image}' alt='${x.title}'/></div>` +
          `<div class='infoWindow-right'>` +
            `<h2>${x.title}</h2>`+
            `<div>${x.description}</div>` +
          `</div>` +
          `</div>`

        const pos = {lat: x.location.latitude, lng: x.location.longitude} 
        console.log("POSITISJTIAJT");
        console.log(x.title + x.description + x.image);

        console.log(pos);
        const popUp = new window.google.maps.InfoWindow({
          content: contentString
        });
        const marker = new window.google.maps.Marker({
          position: pos,
          content: contentString,
          map: newmap,
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
    }

    showMarkers().then((e => {
      
    }));





    
  }, [mapState])

  const displaySuggestions = function (predictions, status) {
    if (status != window.google.maps.places.PlacesServiceStatus.OK || !predictions) {
      alert(status);
      return;
    }
    console.log(predictions)
    setPredictionsResult(predictions)
  };

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
            {modalContent === "add" ? <AppNewEvent setMapState={setMapState} gmap={map}/> : null}
            {modalContent === "search" ? <div/> : null}
            {modalContent === "selected" ? <AppSelectedEventItem/> : null}
        </div>
      </Modal>
      <div className={classes.autocompletewrapper}>
        <AutoCompleteInput gmap={map} disabled={false} setMapState={setMapState}/>
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

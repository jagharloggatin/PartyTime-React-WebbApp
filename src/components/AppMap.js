import { Autocomplete, GoogleMap, useLoadScript } from '@react-google-maps/api';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import classes from './styles/AppMap.module.scss';

import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import ENDPOINTS from 'Endpoints';
import React from 'react';
import HomeRoute from 'routes/HomeRoute';
import GMapContext from 'store/GMapContext';
import RequestContext from 'store/RequestContext';
import UserContext from 'store/UserContext';
import gridIcon from '../icons/grid.svg';
import likeIcon from '../icons/heart.svg';
import plusIcon from '../icons/plus.svg';
import searchIcon from '../icons/search.svg';
import AppFavoriteEventsList from './activities/AppGetReviews';
import AppNewEvent from './activities/AppNewEvent';
import AppSelectedEventItem from './activities/AppSelectedEventItem';
import AppEvents from './AppEvents';
import Logo from './AppLogo';
import AutoCompleteInput from './AutoCompleteInput';

const AppMap = () => {
  const reqCtx = useContext(RequestContext);
  const gmapCtx = useContext(GMapContext);
  const userCtx = useContext(UserContext)
  
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [predictionsResult, setPredictionsResult] = useState([]);
  const [inputText, setInputText] = useState('');
  const [mapState, setMapState] = useState({ center: { lat: 59.330936, lng: 18.071644 }, zoom: 14 });
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [map, setMap] = useState({});

  const CustomButton = (props) => {
    const style = () => {
      if (userCtx.IsLoggedIn()) {
        return  { width: `${props.size}px`, height: `${props.size}px`, ...props.style }
      } else {
        return { filter: "grayscale(100%)", width: `${props.size}px`, height: `${props.size}px`, ...props.style }

      }
    }
    return (
      <div
        onClick={() => {
          if (userCtx.IsLoggedIn()) {
            setModalOpen(true);
            setModalContent(props.modal);
          }      
        }}
        className={classes.custombutton}
        style={style()}
      >
        {props.children}
        {userCtx.IsLoggedIn() === false && props.modal === "add" ? <p className={classes.loginprompt}>Log in to use these functions</p> : null}
      </div>
    );
  };

  function loadMap() {
    const newmap = new window.google.maps.Map(document.getElementById('mapDiv'), {
      zoom: mapState.zoom,
      center: mapState.center,
      disableDefaultUI: true,
      mapId: 'bd0bdf809da55ccb',
    });

    setMap(newmap);

    const showMarkers = async () => {
      const req = await reqCtx.getRequest(ENDPOINTS.getEvents);
      const res = await req.json();

      res.forEach((x) => {
        const contentString =
          `<div class="infoWindow">` +
          `<div class='infoWindow-left'><img src='${x.image}' alt='${x.title}'/></div>` +
          `<div class='infoWindow-right'>` +
          `<h2>${x.title}</h2>` +
          `<div>${x.description}</div>` +
          `</div>` +
          `</div>`;

        const pos = { lat: x.location.latitude, lng: x.location.longitude };

        const popUp = new window.google.maps.InfoWindow({
          content: contentString,
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
          localStorage.setItem('selectedId', JSON.stringify(x));
          setModalContent('selected');
          setModalOpen(true);
        });
      });
    };

    showMarkers();
  }

  useEffect(() => {
    if (gmapCtx.map === true) {
      loadMap();
    }
    
  }, [mapState, modalOpen, gmapCtx.map]);

  const displaySuggestions = function (predictions, status) {
    if (status != window.google.maps.places.PlacesServiceStatus.OK || !predictions) {
      alert(status);
      return;
    }
    console.log(predictions);
    setPredictionsResult(predictions);
  };

  return (
    <div>
      <Modal
        sx={{
          backgroundImage: 'linear-gradient(#1976d2 80, #ff9900 80)',
        }}
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className={classes.modalcontainer}>
          {modalContent === 'grid' ? <AppEvents></AppEvents> : null}
          {modalContent === 'add' ? (
            <AppNewEvent setMapState={setMapState} setModalOpen={setModalOpen} gmap={map} />
          ) : null}
          {modalContent === 'likes' ? <AppFavoriteEventsList mode={'favorites'} variant={'all'} /> : null}
          {modalContent === 'selected' ? <AppSelectedEventItem /> : null}
        </div>
      </Modal>
      
      {gmapCtx.map === true ? <div className={classes.autocompletewrapper}>
        <AutoCompleteInput gmap={map} disabled={false} setMapState={setMapState} />
      </div> : null }
      
      <div className={classes['control-container']}>
        <CustomButton size={55} modal={'grid'}>
          <img src={gridIcon} alt={'grid-view'} />
        </CustomButton>
        <CustomButton size={80} modal={'add'} style={{ margin: '0 40px' }}>
          <img src={plusIcon} alt={'AddActivity'} />
        </CustomButton>
        <CustomButton size={55} modal={'likes'}>
          <img src={likeIcon} alt={'likes'} />
        </CustomButton>
      </div>
      <div id="mapDiv" className={classes.mapcontainer}></div>
    </div>
  );
};

export default AppMap;

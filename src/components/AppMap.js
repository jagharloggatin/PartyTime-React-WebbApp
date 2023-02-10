import { Autocomplete, GoogleMap, useLoadScript } from '@react-google-maps/api';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import classes from './styles/AppMap.module.scss';

import { TextField } from '@mui/material';
import React from 'react';
import RequestContext from 'store/RequestContext';
import gridIcon from '../icons/grid.svg';
import plusIcon from '../icons/plus.svg';
import searchIcon from '../icons/search.svg';
import Logo from './AppLogo';
import AppSelectedEventItem from './activities/AppSelectedEventItem';
import appGetReviews from './activities/AppGetReviews';
import { useParams } from 'react-router-dom';

const Button = (props) => {
  return (
    <div className={classes.button} style={{
      width: `${props.size}px`,
      height: `${props.size}px`, ...props.style,
    }}>
      {props.children}
    </div>
  );
};

const AppMap = () => {
  const reqCtx = useContext(RequestContext);
  const [showSuggestions, setshowSuggestions] = useState(false);
  const [predictionsResult, setPredictionsResult] = useState([]);
  const [inputText, setInputText] = useState('');
  const [mapState, setMapState] = useState({
    center: {
      lat: 59.330936,
      lng: 18.071644,
    }, zoom: 15,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [loadedEvents, setLoadedEvents] = useState([]);


  const autoCompleteRef = useRef();
  const inputRef = useRef();

  const options = {
    fields: ['address_components', 'geometry', 'icon', 'name'],
  };

  const API_KEY = 'AIzaSyAY85IYZfPLkT6EyiauSREDkc7ZhYJCPys';
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${inputText}&key=${API_KEY}`;


  useEffect(() => {
    const map = new window.google.maps.Map(document.getElementById('mapDiv'), {
      zoom: mapState.zoom,
      center: mapState.center,
      disableDefaultUI: true,
      mapId: 'bd0bdf809da55ccb',
    });


    const events = [
      {
        title: 'SvettigApa',
        description: 'balle',
        map: map,
        position: {lat: 59.3294, lng: 18.0686},
      },
      {
        title: 'Borderdell',
        description: 'Kom hit och sug',
        map: map,
        position: {lat: 59.3192, lng: 18.0686},
      },
    ];


    events.forEach(x => {
      const contentString = `<div class="infoWindow">` +
                                `<h2>${x.title}</h2>`+
                                `<div>${x.description}</div>` +
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

    // const infowindow = new window.google.maps.InfoWindow({
    //   content: contentString,
    //   ariaLabel: 'Uluru',
    // });
    // // The marker, positioned at Uluru
    //
    // const marker = new window.google.maps.Marker({
    //   position: mapState.center,
    //   map: map,
    //   icon: './assets/party.png',
    // });
    //
    //
    // marker.addListener('click', () => {
    //   // localStorage.setItem('selectedId', JSON.stringify(e.target.value))
    //   infowindow.open({
    //     anchor: marker,
    //     map,
    //   });
    // });

    // const contentString =
    //   '<div id="content">' +
    //   '<div id="siteNotice">' +
    //   '</div>' +
    //   '<h1 id="firstHeading" class="firstHeading">Uluru</h1>' +
    //   '<div id="bodyContent">' +
    //   '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
    //   'sandstone rock formation in the southern part of the ' +
    //   'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) ' +
    //   'south west of the nearest large town, Alice Springs; 450&#160;km ' +
    //   '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major ' +
    //   'features of the Uluru - Kata Tjuta National Park. Uluru is ' +
    //   'sacred to the Pitjantjatjara and Yankunytjatjara, the ' +
    //   'Aboriginal people of the area. It has many springs, waterholes, ' +
    //   'rock caves and ancient paintings. Uluru is listed as a World ' +
    //   'Heritage Site.</p>' +
    //   '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
    //   'https://en.wikipedia.org/w/index.php?title=Uluru</a> ' +
    //   '(last visited June 22, 2009).</p>' +
    //   '</div>' +
    //   '</div>';
    //
    // // const tourStops = [google.maps.LatLngLiteral, string][] = [
    // //   [{ lat: 34.8791806, lng: -111.8265049 }, "Boynton Pass"],
    // //   [{ lat: 34.8559195, lng: -111.7988186 }, "Airport Mesa"],
    // //   [{ lat: 34.832149, lng: -111.7695277 }, "Chapel of the Holy Cross"],
    // //   [{ lat: 34.823736, lng: -111.8001857 }, "Red Rock Crossing"],
    // //   [{ lat: 34.800326, lng: -111.7665047 }, "Bell Rock"],
    // // ];
    //


  }, [mapState]);


  function getPredictions() {

  }

  const displaySuggestions = function(predictions, status) {
    if (status != window.google.maps.places.PlacesServiceStatus.OK || !predictions) {
      alert(status);
      return;
    }
    console.log('WAWAWAWA');
    console.log(predictions);
    setPredictionsResult(predictions);
  };

  const service = new window.google.maps.places.AutocompleteService();


  async function handleChange(value) {
    //setPredictions(data);
    //console.log(autoCompleteRef)
    if (value.length > 2) {
      setInputText(value);
      setshowSuggestions(true);
      service.getQueryPredictions({ input: value }, displaySuggestions);

    } else {
      setshowSuggestions(false);
    }
  }


  function Predictionsarea() {
    if (showSuggestions) {
      return (
        <div className={classes.autocompletepredictions}>
          {predictionsResult.map(x => {
            return (
              <div className={classes.autocompletesingle}>{x.description}</div>);
          })}
        </div>
      );
    } else {
      return <div></div>;
    }
  }

  return (
    <div>
      <div className={classes.autocompletewrapper}>
        <div className={classes.autocompleteinnerwrapper}>
          <input
            id='outlined-basic'
            className={classes.autocompleteinput}
            onChange={e => handleChange(e.target.value)}
            ref={inputRef}
            placeholder='Search address'
          />

          <Predictionsarea />

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
      <div id='mapDiv' className={classes.mapcontainer}></div>
    </div>
  );
};


export default AppMap;

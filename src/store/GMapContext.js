import { MapContext } from '@react-google-maps/api';
import React, { createContext, useContext, useEffect, useState } from 'react';
import StorageContext from './StorageContext';

//Refrenace methods to be shown in intellisense
const GMapContext = createContext({
  map: null
});

export function GMapContextProvider(props) {
  const [map, setMap] = useState(null)
  const [mapState, setMapState] = useState({center:{lat: 59.330936, lng: 18.071644}, zoom: 14 });


  

  //Reference methods in this object to be passed as value
  const context = {
    map: map
  };

  return <GMapContext.Provider value={context}>{props.children}</GMapContext.Provider>;
}

export default GMapContext;

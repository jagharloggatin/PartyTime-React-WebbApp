import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import { useMemo } from 'react';
import classes from './styles/AppMap.module.scss';

import React from 'react';
import gridIcon from '../icons/grid.svg';
import plusIcon from '../icons/plus.svg';
import searchIcon from '../icons/search.svg';
import Logo from './AppLogo';

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
  const { isLoaded } = useLoadScript({ googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY });

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <div>
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

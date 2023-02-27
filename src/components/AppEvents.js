import { CurrencyYenTwoTone } from '@mui/icons-material';
import TextField from '@mui/material/TextField';
import AppActionAreaCard from 'components/AppActionAreaCard';
import ENDPOINTS from 'Endpoints';
import React, { useContext, useEffect, useState } from 'react';
import RequestContext from 'store/RequestContext';
import uniqId from '../uniq';
import styles from './styles/AppEvents.module.css';

function AppEvents() {
  const [inputText, setInputText] = useState('');
  const reqCtx = useContext(RequestContext);

  const [cities, setCities] = useState([]);

  useEffect(() => {
    const cities = async () => {
      const res = await reqCtx.getRequest(ENDPOINTS.getCities);
      const json = await res.json();
      setCities(json);
    };
    cities();
  }, []);

  const getEventsInCity = async (cityId) => {
    const res = await reqCtx.getRequest(ENDPOINTS.getEventsInCity(cityId));
    const json = await res.json();
    return json;
  };

  function ShowCities() {
    const c = cities.map((city) => {
      return (
        <div className={styles.citywrapper}>
          <div
            className={styles.cityimage}
            style={{
              backgroundImage:
                'url("https://upload.wikimedia.org/wikipedia/commons/b/b2/Skyscrapers_of_Shinjuku_2009_January.jpg")',
            }}
          />
          <div className={styles.citynamewrapper}>
            <p className={styles.cityname}>{city.name}</p>
          </div>
        </div>
      );
    });

    return <div className={styles.citieswrapper}>{c}</div>;
  }

  const inputHandler = (event) => {
    //convert input text to lower case
    var lowerCase = event.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  // const getFilteredCities = () => {
  //   return cities.filter((city) => {
  //     return city.text.toLowerCase().includes(inputText.toLowerCase());
  //   });
  // };

  // const filteredCities = inputText === '' ? cities : getFilteredCities();

  return (
    <div className={styles.appeventswrapper}>
      <div className={styles.search}>
        <TextField onChange={inputHandler} color="primary" fullWidth label="Where to?" />
      </div>
      <ShowCities />
    </div>
  );
}

export default AppEvents;

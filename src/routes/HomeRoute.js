import TextField from '@mui/material/TextField';
import AppActionAreaCard from 'components/AppActionAreaCard';
import React, { useState } from 'react';
import uniqId from '../uniq';

function HomeRoute() {
  const [inputText, setInputText] = useState('');

  const inputHandler = (event) => {
    //convert input text to lower case
    var lowerCase = event.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  const cities = [
    {
      id: 1,
      text: 'Stockholm',
      image: '/assets/Images/stockholm.png',
      description: 'Cool town in Sweden',
    },
    {
      id: 2,
      text: 'Paris',
      image: '/assets/Images/paris.png',
      description: 'Cool town in France',
    },
    {
      id: 3,
      text: 'New York',
      image: '/assets/Images/ny.png',
      description: 'Cool town in the US',
    },
    {
      id: 4,
      text: 'Los Angeles ',
      image: '/assets/Images/la.png',
      description: 'Cool town in the US',
    },
    {
      id: 5,
      text: 'Tokyo',
      image: '/assets/Images/tokyo.png',
      description: 'Cool town in Japan',
    },
    {
      id: 6,
      text: 'Bangkok',
      image: '/assets/Images/bangkok.png',
      description: 'Cool town in Thailand',
    },
    {
      id: 7,
      text: 'Jakarta',
      image: '/assets/Images/tokyo.png',
      description: 'Cool town in the Philippines',
    },
    {
      id: 8,
      text: 'Venice',
      image: '/assets/Images/venice.png',
      description: 'Cool town in Italy',
    },
    {
      id: 9,
      text: 'Köpenhamn',
      image: '/assets/Images/tokyo.png',
      description: 'Cool town in Denmark',
    },
    {
      id: 10,
      text: 'Berlin',
      image: '/assets/Images/tokyo.png',
      description: 'Cool town in Germany',
    },
    {
      id: 11,
      text: 'London',
      image: '/assets/Images/tokyo.png',
      description: 'Cool town in England',
    },
    {
      id: 12,
      text: 'Milano',
      image: '/assets/Images/tokyo.png',
      description: 'Cool town in Italy',
    },
  ];

  const getFilteredCities = () => {
    return cities.filter((city) => {
      return city.text.toLowerCase().includes(inputText.toLowerCase());
    });
  };

  const filteredCities = inputText === '' ? cities : getFilteredCities();

  return (
    <>
      <div className="page">
        <div className="search">
          <TextField
            id="outlined-basic"
            onChange={inputHandler}
            variant="filled"
            color="primary"
            fullWidth
            label="Where to?"
          />
        </div>

        <div className="card-wrapper">
          {filteredCities.map((city) => (
            <AppActionAreaCard city={city} key={uniqId()}></AppActionAreaCard>
          ))}
        </div>
      </div>
    </>
  );
}

export default HomeRoute;

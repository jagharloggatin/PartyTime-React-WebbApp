import React, { useEffect, useState } from 'react';
import classes from '../components/styles/Headlines.module.css';
import MeetupList from '../components/activities/AppActivitiesList';

function FavoritesRoute() {

  const[isLoading, setIsLoading] = useState(true);
  const[loadedFavorites, setLoadedFavorites] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      'https://testagain-d4b54-default-rtdb.firebaseio.com/favorites.json',
    ).then(response => {
      return response.json();
    }).then(data => {
      const meetups = [];

      for(const key in data){
        const meetup = {
          id:key,
          ...data[key]
        };
        meetups.push(meetup);
      }
      setIsLoading(false);
      setLoadedFavorites(meetups);
    });
  }, []);

  if(isLoading){
    return <div className={classes.wrapper}>
      <h2 className={classes.content}>Loading...</h2>
    </div>
  }

  const content = <MeetupList meetups={loadedFavorites}/>;

  return <div>
    <h1>MyFavorites</h1>
    {content}
  </div>

}

export default FavoritesRoute;
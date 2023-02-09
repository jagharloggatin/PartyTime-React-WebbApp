import React, { useEffect, useState } from 'react';
import {useContext} from "react";
import FavoritesContext from '../../store/FavoritesContext';
import AppEventsList from './AppEventsList';
import classes from '../styles/Headlines.module.css';

function AppGetFavorites(){

  const[isLoading, setIsLoading] = useState(true);
  const[loadedFavorites, setLoadedFavorites] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      "https://localhost:7215/events/reviews/1"
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

  const content = <AppEventsList meetups={loadedFavorites}/>;

  return <section>
    <h1>My Favorites</h1>
    {content}
  </section>
}

export default AppGetFavorites;



// const favoritesCtx = useContext(FavoritesContext);
//
// let content;
// if(favoritesCtx.totalFavorites === 0){
//   content = <p>You got no favorites yet. Start adding some!</p>;
// }
// else {
//   content = <AppEventsList meetups={favoritesCtx.favorites}/>;
// }
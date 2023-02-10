import React, { useContext, useEffect, useState } from 'react';
import RequestContext from 'store/RequestContext';
import FavoritesContext from '../../store/FavoritesContext';
import uniqId from '../../uniq';
import classes from '../styles/Headlines.module.css';
import AppEventsItem from './AppEventsItem';
import AppEventsList from './AppEventsList';
import AppSelectedEventItem from './AppSelectedEventItem';

function AppGetReviews(){

  const reqCtx = useContext(RequestContext)
  const[isLoading, setIsLoading] = useState(true);
  const[loadedFavorites, setLoadedFavorites] = useState([]);

  useEffect(() => {
    const conv = async () => {
      setIsLoading(true);
      var response = await reqCtx.getRequest("https://localhost:7215/reviews/1")
      console.log(response);
      var converted = await reqCtx.convertResponse(response)
      console.log(converted);
      setLoadedFavorites(converted);
      setIsLoading(false);
    }
    conv();
  }, []);
  //
  // console.log("HAR AER FALOAD");
  //
  // console.log(loadedFavorites);
  // console.log("HAR AER FALOAD");
  if(isLoading){
    return <div className={classes.wrapper}>
      <h2 className={classes.content}>Loading...</h2>
    </div>
  }

  return (
    <ul>
      {loadedFavorites.map((event) => (
        <AppEventsItem
          key={uniqId()}
          id={event.id}
          image={event.image}
          title={event.title}
          city={event.city}
          address={event.address}
          description={event.description}
          comment={[event.comment]}
          date={[event.date]}
        />
      ))}
    </ul>
  );
}

export default AppGetReviews;

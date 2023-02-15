import ENDPOINTS from 'Endpoints';
import React, { useContext, useEffect, useState } from 'react';
import RequestContext from 'store/RequestContext';
import uniqId from '../../uniq';
import classes from '../styles/Headlines.module.css';
import AppEventsItem from './AppEventsItem';

function AppFavoriteEventsList() {
  const reqCtx = useContext(RequestContext);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedFavorites, setLoadedFavorites] = useState([]);

  useEffect(() => {
    const conv = async () => {
      setIsLoading(true);
      const userId = 1;
      const response = await reqCtx.getRequest(ENDPOINTS.getUserReviews(userId));
      console.log(response);
      const converted = await reqCtx.convertResponse(response);
      console.log(converted);
      setLoadedFavorites(converted);
      setIsLoading(false);
    };
    conv();
  }, []);
  // console.log("HAR AER FALOAD");
  //
  console.log(loadedFavorites);
  // console.log("HAR AER FALOAD");
  if (isLoading) {
    return (
      <div className={classes.wrapper}>
        <h2 className={classes.content}>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="card-wrapper">
      {loadedFavorites.map((event) => (
        <AppEventsItem key={uniqId()} event={event} />
      ))}
    </div>
  );
}

export default AppFavoriteEventsList;

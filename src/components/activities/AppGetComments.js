import React, { useEffect, useState } from 'react';
import classes from '../styles/Headlines.module.css';
import RequestService from '../../RequestService';

async function AppGetComments() {

  // const data = await RequestService.getRequest(`https://testagain-d4b54-default-rtdb.firebaseio.com/review.json`)
  const [isLoading, setIsLoading] = useState(true);
  const [loadedMeetups, setLoadedMeetups] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      'https://testagain-d4b54-default-rtdb.firebaseio.com/review.json',
    ).then(response => {
      return response.json();
    }).then(data => {
      const meetups = [];

      for (const key in data) {
        const meetup = {
          id: key,
          ...data[key],
        };
        meetups.push(meetup);
      }
      setIsLoading(false);
      setLoadedMeetups(meetups);
    });
  }, []);

  if (isLoading) {
    return <div className={classes.wrapper}>
      <h2 className={classes.content}>Loading...</h2>
    </div>;
  }
  return <div className={classes.wrapper}>
  </div>;
}

export default AppGetComments;
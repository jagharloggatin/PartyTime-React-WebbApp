import React, { useEffect, useState } from 'react';
import classes from '../styles/Headlines.module.css';
import RequestService, { getRequest } from '../../RequestService';
import ENDPOINTS from '../../Endpoints';
 function AppGetComments() {

  // const data = await RequestService.getRequest(`https://testagain-d4b54-default-rtdb.firebaseio.com/review.json`)
  const [isLoading, setIsLoading] = useState(false);
  const [loadedComments, setLoadedComments] = useState([]);

  const fetchData = async () => {
    let resp = await (await getRequest(
      `https://testagain-d4b54-default-rtdb.firebaseio.com/review.json`))
      .json();
    console.log(resp);
    return resp;
  }; fetchData();

  // useEffect(() => {
  //   setIsLoading(true);
  //   fetch(
  //     'https://testagain-d4b54-default-rtdb.firebaseio.com/review.json',
  //   ).then(response => {
  //     return response.json();
  //   }).then(data => {
  //     const meetups = [];
  //
  //     for (const key in data) {
  //       const meetup = {
  //         id: key,
  //         ...data[key],
  //       };
  //       meetups.push(meetup);
  //     }
  //     setIsLoading(false);
  //     setLoadedMeetups(meetups);
  //   });
  // }, []);

  // if (isLoading) {
  //   return <div className={classes.wrapper}>
  //     <h2 className={classes.content}>Loading...</h2>
  //   </div>;
  // }
  // return <div className={classes.wrapper}>
  // </div>;
}

export default AppGetComments;
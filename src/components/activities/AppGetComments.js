import React, { useContext, useEffect, useState } from 'react';
import RequestContext from 'store/RequestContext';
import ENDPOINTS from '../../Endpoints';
import classes from '../styles/Headlines.module.css';
 
function AppGetComments() {

    const reqCtx = useContext(RequestContext);
  // const data = await RequestService.getRequest(`https://testagain-d4b54-default-rtdb.firebaseio.com/review.json`)
  const [isLoading, setIsLoading] = useState(false);
  const [loadedComments, setLoadedComments] = useState([]);

  const fetchData = async () => {
    let res = await reqCtx.getRequest(`https://testagain-d4b54-default-rtdb.firebaseio.com/review.json`)
    let resp = await res.json()
    console.log(resp);
    return resp;
  }; 
  
  fetchData();

  return (<div>Apa</div>)

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
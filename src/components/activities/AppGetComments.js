import React, { useEffect, useState } from 'react';
import classes from '../styles/Headlines.module.css';
import MeetupList from './AppActivitiesList';
import RequestService from '../../RequestService';

function AppGetComments () {

  const appGetComments = async() => {
    const data = await RequestService.getRequest(`https://testagain-d4b54-default-rtdb.firebaseio.com/review`)
    return data;
  };

  const reviews = appGetComments();

  for (const reviewsKey in reviews) {
    console.log(reviewsKey);
  }
  return <div>{reviews}</div>
}

export default AppGetComments;
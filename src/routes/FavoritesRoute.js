import React, { useEffect, useState } from 'react';
import classes from '../components/styles/Headlines.module.css';
import AppEventsList from '../components/activities/AppEventsList';
import AppFavorites from '../components/activities/AppGetFavorites';

function FavoritesRoute() {

  return <AppFavorites />
}

export default FavoritesRoute;
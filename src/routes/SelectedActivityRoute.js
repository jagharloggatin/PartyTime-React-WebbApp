import React from 'react'
import {useContext} from "react";
import FavoritesContext from '../store/ActivitiesContext';
import AppSelectedActivityList
  from '../components/activities/AppSelectedActivityList';

function SelectedActivityRoute(){
  const selectedActivityCtx = useContext(FavoritesContext);

  let content;

  console.log(selectedActivityCtx.activity);

    content = <AppSelectedActivityList meetups={selectedActivityCtx.activity}/>;

  return <section>
    <h1>Selected Activity</h1>
    {content}
  </section>

}

export default SelectedActivityRoute;
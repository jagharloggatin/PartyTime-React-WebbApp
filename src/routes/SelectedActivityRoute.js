import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ENDPOINTS from '../Endpoints';
import classes from '../components/styles/Headlines.module.css';
import AppSelectedActivityItem  from '../components/activities/AppSelectedActivityItem';

function SelectedActivityRoute(){

  const params = useParams();
  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // console.log(params.id);

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       setIsLoading(true);
  //       const res = await fetch(`https://testagain-d4b54-default-rtdb.firebaseio.com/meetups/${params.id}.json`);
  //       // console.log('här är mitt res', res);
  //       const data = await res.json();
  //
  //       setEvent(data);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }
  //   fetchData();
  // }, []);

  // if(isLoading) {
  //   return <div className={classes.wrapper}>
  //     <h2 className={classes.content}>Loading...</h2>
  //   </div>
  // }

  return <section>
    <h1 className={classes.wrapper}>Selected Activity</h1>
    <AppSelectedActivityItem/>
    {/*<AppSelectedActivityItem props={event}/>*/}
  </section>
}

export default SelectedActivityRoute;


// fetch(
//   `https://testfirebase-again-default-rtdb.firebaseio.com/meetups.json/${props}`,
// )
// console.log("PROPS" + props);
// const selectedActivityCtx = useContext(FavoritesContext);
//
// let content;
//
// console.log(selectedActivityCtx.activity);
//
//   content = <AppSelectedActivityList meetups={selectedActivityCtx.activity}/>;
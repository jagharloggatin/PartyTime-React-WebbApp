import React, { useContext, useEffect, useState } from 'react';
import uniqId from '../../uniq';
import classes from '../styles/AppActivitiesList.module.css';
import AppEventsItem from './AppEventsItem';
import RequestContext from '../../store/RequestContext';
import { useParams } from 'react-router-dom';

function AppEventsList() {

  const reqCtx = useContext(RequestContext);
  const [isLoading, setIsLoading] = useState(false);
  const [loadedEvents, setLoadedEvents] = useState([]);
  const Params = useParams();

  console.log(Params.id);

  useEffect(() => {
    const conv = async () => {
      setIsLoading(true);
      const response = await reqCtx.getRequest(`https://localhost:7215/events/location/{locationid}?id=${Params.id}`)
      const converted = await reqCtx.convertResponse(response)
      setLoadedEvents(converted);
      setIsLoading(false);
    }
    conv();
  }, []);

  if (isLoading) {
    return <div >
      <h2>Loading...</h2>
    </div>;
  }
  return (

  <ul className={classes.list}>
    {loadedEvents.map((event) => (
        <AppEventsItem
          key={uniqId()}
          id={event.id}
          image={event.image}
          title={event.title}
          city={event.city}
          address={event.address}
          description={event.description}
          comment={[event.comments]}
        />
      ))}
    </ul>
  );
}

export default AppEventsList;


// useEffect(() => {
//   const getData = async () => {
//     try {
//       let res = await fetch(`https://testagain-d4b54-default-rtdb.firebaseio.com/meetups.json`);
//       let json = await res.json();
//       return json;
//     } catch (e) {}
//   };
//   getData().then((r) => {
//     setData(Object.values(r));
//   });
// }, []);

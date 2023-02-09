import React, { useEffect, useState } from 'react';
import uniqId from '../../uniq';
import classes from '../styles/AppActivitiesList.module.css';
import AppEventsItem from './AppEventsItem';

function AppEventsList() {

  const [data, setData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        let res = await fetch('https://testagain-d4b54-default-rtdb.firebaseio.com/meetups.json');
        let json = await res.json();
        return json;
      } catch (e) {}
    };
    getData().then((r) => {
      setData(Object.values(r));
    });
  }, []);

  return (
    <ul className={classes.list}>
      {data.map((event) => (
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

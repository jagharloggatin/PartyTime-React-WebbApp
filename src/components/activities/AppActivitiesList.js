import React, { useEffect, useState } from 'react';
import uniqId from '../../uniq';
import classes from '../styles/AppActivitiesList.module.css';
import AppActivitiesItem from './AppActivitiesItem';

function MeetupList(props) {
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
      {data.map((meetup) => (
        <AppActivitiesItem
          key={uniqId()}
          id={meetup.id}
          image={meetup.image}
          title={meetup.title}
          city={meetup.city}
          address={meetup.address}
          description={meetup.description}
          comment={[meetup.comments]}
        />
      ))}
    </ul>
  );
}

export default MeetupList;

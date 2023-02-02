import classes from '../styles/AppActivitiesList.module.css'
import AppSelectedActivityItem from './AppSelectedActivityItem';

function AppSelectedActivityList(props) {
  return <ul className={classes.list}>
    {props.meetups.map(meetup => (
      <AppSelectedActivityItem
        key={meetup.id} id={meetup.id}
        image={meetup.image}
        title={meetup.title}
        city={meetup.city}
        address={meetup.address}
        description={meetup.description}
      />
    ))}
  </ul>
}

export default AppSelectedActivityList;
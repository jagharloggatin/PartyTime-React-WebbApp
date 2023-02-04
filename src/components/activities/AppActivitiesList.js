import classes from '../styles/AppActivitiesList.module.css'
import AppActivitiesItem from './AppActivitiesItem';

function MeetupList(props) {
  return <ul className={classes.list}>
    {props.meetups.map(meetup => (
      <AppActivitiesItem
        key={meetup.id} id={meetup.id}
        image={meetup.image}
        title={meetup.title}
        city={meetup.city}
        address={meetup.address}
        description={meetup.description}
        rating={meetup.rating}
        comment={[meetup.comments]}
      />
    ))}
  </ul>
}

export default MeetupList;
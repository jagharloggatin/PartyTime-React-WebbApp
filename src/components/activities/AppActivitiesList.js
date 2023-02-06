import classes from '../styles/AppActivitiesList.module.css'
import AppActivitiesItem from './AppActivitiesItem';

function MeetupList({ loadedData }) {
  return <ul className={classes.list}>
    {loadedData.map(meetup => (
      <AppActivitiesItem
        key={meetup.id} id={meetup.id}
        image={meetup.image}
        title={meetup.title}
        city={meetup.city}
        address={meetup.address}
        description={meetup.description}
        comment={[meetup.comments]}
      />
    ))}
  </ul>
}

export default MeetupList;
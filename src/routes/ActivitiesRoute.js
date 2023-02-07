import MeetupList from '../components/activities/AppActivitiesList';
import classes from '../components/styles/Headlines.module.css';

//https://testagain-d4b54-default-rtdb.firebaseio.com/meetups

function AllMeetups() {

  return (
    <div className={classes.wrapper}>
      <h1 className={classes.content}>All Activities</h1>
      <MeetupList />
    </div>
  );
}

export default AllMeetups;

// const DUMMY_DATA = [
//   {
//     id: 'm1',
//     title: 'This is a first meetup',
//     image:
//       'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/2560px-Stadtbild_M%C3%BCnchen.jpg',
//     address: 'Meetupstreet 5, 12345 Meetup City',
//     description:
//       'This is a first, amazing meetup which you definitely should not miss. It will be a lot of fun!',
//   },
//   {
//     id: 'm2',
//     title: 'This is a second meetup',
//     image:
//       'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/2560px-Stadtbild_M%C3%BCnchen.jpg',
//     address: 'Meetupstreet 5, 12345 Meetup City',
//     description:
//       'This is a first, amazing meetup which you definitely should not miss. It will be a lot of fun!',
//   },
// ];

//Key needs to be set to unique meetup.id
//Renders the whole list above meetup.title
// const [isLoading, setIsLoading] = useState(true);
// const [loadedMeetups, setLoadedMeetups] = useState([]);
//
// // console.log(loadedMeetups);
//
// // if(isLoading){
// //   return <div className={classes.wrapper}>
// //     <h2 className={classes.content}>Loading...</h2>
// //   </div>
// // }
import React, { useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import RequestContext from 'store/RequestContext';
import FavoritesContext from '../../store/FavoritesContext';
import classes from '../styles/AppActivitiesItem.module.css';
import AppCard from '../ui/AppCard';

function AppEventsItem(props) {
  const favoritesCtx = useContext(FavoritesContext);
  const itemIsFavorite = favoritesCtx.itemIsFavorite(props.id);
  const navigateTo = useNavigate();

  const reqCtx = useContext(RequestContext)

  const goToEvent = () => {
    // console.log(props);
    // navigateTo(`/events/${props.id}`);
    localStorage.setItem('selectedId', JSON.stringify(props))
    navigateTo(`/events/selected`);
  };

  async function toggleFavoriteStatusHandler() {

    const data ={
      like: true,
      comment: "string",
      created: "2023-02-10T10:40:00.500Z"
    }

    // const data = {
    //   uId: userId,
    //   eId: props.id,
    //   eventIsNotFavorite: itemIsFavorite,
    // };
    await reqCtx.postRequest(`https://testagain-d4b54-default-rtdb.firebaseio.com/favorites.json`, data);
  }
  //○●
  //☆★
  return (
    <li className={classes.item}>
      <AppCard>
        <li className={classes.innerItem}>
          <div className={classes.image}>
            <img src={props.image} alt={props.title} />
          </div>
          <div className={classes.content}>
            <h3>Title: {props.title}</h3>
            <address>Address: {props.address}</address>
            <p>City: {props.city}</p>
            <p> Description: {props.description}</p>
          </div>
        </li>
        <div className={classes.actions}>
          <button onClick={toggleFavoriteStatusHandler}>{itemIsFavorite ? '♥' : '♡'}</button>
          <button onClick={goToEvent}>Go To Activity</button>
        </div>
      </AppCard>
    </li>
  );
}

export default AppEventsItem;

//
// const goToActivity = () => {
//   // console.log(props);
//   selectedActivityCtx.activitySelected({
//     id: props.id,
//     title: props.title,
//     description: props.description,
//     image: props.image,
//     address: props.address,
//     city: props.city,
//     rating: props.rating,
//   });
//   navigateTo('/event');
// };
// if (itemIsFavorite) {
//   favoritesCtx.removeFavorite(props.id);
// } else {
//   favoritesCtx.addFavorite({
//     id: props.id,
//     title: props.title,
//     description: props.description,
//     image: props.image,
//     address: props.address,
//     city: props.city,
//   });
// }
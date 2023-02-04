import classes from '../styles/AppActivitiesItem.module.css';
import { useContext } from 'react';
import FavoritesContext from '../../store/ActivitiesContext';
import AppCard from '../ui/AppCard';
import { Link, useNavigate, useParams } from 'react-router-dom';

function AppActivitiesItem(props) {
  const favoritesCtx = useContext(FavoritesContext);
  const itemIsFavorite = favoritesCtx.itemIsFavorite(props.id);
  const navigateTo = useNavigate();


  const goToEvent = () => {
    // console.log(props.id);
    navigateTo(`/events/${props.id}`);
  }

  async function toggleFavoriteStatusHandler() {
    const userId = 3

    const data = {
      uId: userId,
      eId: props.id,
      eventIsNotFavorite: itemIsFavorite
    }

    if (itemIsFavorite) {
      favoritesCtx.removeFavorite(props.id);

    } else {
      favoritesCtx.addFavorite({
        id: props.id,
        title: props.title,
        description: props.description,
        image: props.image,
        address: props.address,
        city: props.city,
      });
    }
    await fetch(
      'https://testagain-d4b54-default-rtdb.firebaseio.com/favorites.json',
      {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
  }
  //○●
  //☆★
  //onClick={goToActivity}
  //<SelectedActivityRoute id={true}/>
  return (
    <li className={classes.item}>
      <AppCard>
        <li className={classes.innerItem} >
          <div className={classes.image}>
            <img src={props.image} alt={props.title} />
          </div>
          <div className={classes.content}>
            <h3>Title: {props.title}</h3>
            <address>Address: {props.address}</address>
            <p>City: {props.city}</p>
            <p> Description: {props.description}</p>
            <p> Rating: {props.rating}</p>
          </div>
        </li>
        <div className={classes.actions}>
          <button onClick={toggleFavoriteStatusHandler}>
            {itemIsFavorite ? '♥' : '♡'}
          </button>
          <button onClick={goToEvent}>Go To Activity</button>
        </div>
      </AppCard>
    </li>
  );
}

export default AppActivitiesItem;


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

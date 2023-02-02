import classes from '../styles/AppActivitiesItem.module.css';
import { useContext } from 'react';
import FavoritesContext from '../../store/ActivitiesContext';
import AppCard from '../ui/AppCard';
import { useNavigate } from 'react-router-dom';

function MeetupItem(props) {
  const favoritesCtx = useContext(FavoritesContext);
  const selectedActivityCtx = useContext(FavoritesContext);
  const itemIsFavorite = favoritesCtx.itemIsFavorite(props.id);
  const navigateTo = useNavigate();

  const goToActivity = () => {
    // console.log(props);
    selectedActivityCtx.activitySelected({
      id: props.id,
      title: props.title,
      description: props.description,
      image: props.image,
      address: props.address,
      city: props.city,
    });
    navigateTo('/events/id');
  };

  function toggleFavoriteStatusHandler() {
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
  }

  return (
    <li className={classes.item}>
      <AppCard>
          <li className={classes.innerItem} onClick={goToActivity}>
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
          <button onClick={toggleFavoriteStatusHandler}>
            {itemIsFavorite ? '♥' : '♡'}
          </button>
          {/*<button onClick={goToActivity}>Go To Activity</button>*/}
        </div>
      </AppCard>
    </li>
  );
}

export default MeetupItem;
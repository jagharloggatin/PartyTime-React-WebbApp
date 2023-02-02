import { useContext, useState } from 'react';
import FavoritesContext from '../../store/ActivitiesContext';
import classes from '../styles/AppActivitiesItem.module.css';
import AppCard from '../ui/AppCard';
import AppGetComments from './AppGetComments';

function AppSelectedActivityItem(props) {
  const favoritesCtx = useContext(FavoritesContext);
  const itemIsFavorite = favoritesCtx.itemIsFavorite(props.id);
  const [show, setShow] = useState(true);

    const toggleFavoriteStatusHandler = () => {
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
        <div className={classes.image}>
          <img src={props.image} alt={props.title} />
        </div>
        {
          show?<li className={classes.innerItem}>
            <div className={classes.content}>
              <h3>Title: {props.title}</h3>
              <address>Address: {props.address}</address>
              <p>City: {props.city}</p>
              <p> Description: {props.description}</p>
            </div>
          </li>:null
        }
        {
          !show?<div className={classes.comments}>
            <h4>Comments</h4>
          <AppGetComments/>
          </div>:null
        }
        <li>
        </li>
        <div className={classes.actions}>
          <button onClick={toggleFavoriteStatusHandler}>
            {itemIsFavorite ? '♥' : '♡'}
          </button>
          <button onClick={() => setShow(!show)}>Comments</button>
        </div>
      </AppCard>
    </li>
  );
}
export default AppSelectedActivityItem;
import classes from '../styles/AppActivitiesItem.module.css'
import {useContext} from "react";
import FavoritesContext from "../../store/FavoriteContext";
import AppCard from '../ui/AppCard';

function MeetupItem(props) {
  const favoritesCtx = useContext(FavoritesContext);
  const itemIsFavorite = favoritesCtx.itemIsFavorite(props.id);

  function toggleFavoriteStatusHandler() {
    // console.log(props.id)
    // console.log("exist in favorites:" + itemIsFavorite)
    if (itemIsFavorite) {
      // console.log("1")
      favoritesCtx.removeFavorite(props.id)
    } else {
      // console.log("0")
      favoritesCtx.addFavorite({
        id: props.id,
        title: props.title,
        description: props.description,
        image: props.image,
        address: props.address,
      });
    }
  }

  return (
    <li className={classes.item}>
      <AppCard>
        <div className={classes.image}>
          <img src={props.image} alt={props.title}/>
        </div>
        <div className={classes.content}>
          <h3>{props.title}</h3>
          <address>{props.address}</address>
          <p>{props.description}</p>
        </div>
        <div className={classes.actions}>
          <button onClick={toggleFavoriteStatusHandler}>
            {itemIsFavorite ? 'Remove from Favorites' : 'To Favorites'}
          </button>
        </div>
      </AppCard>
    </li>
  );
}

export default MeetupItem;
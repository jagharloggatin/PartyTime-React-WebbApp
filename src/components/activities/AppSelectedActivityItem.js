import { useContext, useState } from 'react';
import FavoritesContext from '../../store/ActivitiesContext';
import classes from '../styles/AppActivitiesItem.module.css';
import AppCard from '../ui/AppCard';
import AppRating from './AppRating';
import { useParams } from 'react-router-dom';
import RequestService from '../../RequestService';
import AppGetComments from './AppGetComments';

function AppSelectedActivityItem({props}) {
  const favoritesCtx = useContext(FavoritesContext);
  const itemIsFavorite = favoritesCtx.itemIsFavorite(props.id);
  const [show, setShow] = useState(true);
  const [comment, setComment] = useState();
  const [comments, setComments] = useState([]);
  const Params = useParams();
  const userId = 3;

  async function onCommentSubmit(e) {
    e.preventDefault();
    setComments((comments) => [...comments, comment]);
    // console.log(Params.id);

    const data = {
      com: comment,
      uId: userId,
      eId: Params.id
    }
    await RequestService.postRequest(`https://testagain-d4b54-default-rtdb.firebaseio.com/review.json`, data);
  }

  const onCommentChange = (e) =>{
    e.preventDefault()
    setComment(e.target.value);
  }

  const toggleFavoriteStatusHandler = async() => {
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
        rating: props.rating,
      });
    }
    const data = {
      uId: userId,
      eId: Params.id,
      eventIsNotFavorite: itemIsFavorite
    }
    await RequestService.postRequest(`https://testagain-d4b54-default-rtdb.firebaseio.com/favorites.json`, data);
  };
  return (
    <li className={classes.item}>
      <AppCard>

        <div className={classes.image}>
          <img src={props.image} alt={props.title} />

        </div>
        {
          show ? <li className={classes.innerItem}>
            <div className={classes.content}>
              <h3>Title: {props.title}</h3>
              <address>Address: {props.address}</address>
              <p>City: {props.city}</p>
              <p> Description: {props.description}</p>
              <p> Rating: {props.rating}</p>
            </div>
          </li> : null
        }
        {
          !show ? <div className={classes.comments}>
            <h4>Comments</h4>
            {comments.map((text) => { return <div>{text}</div>; })}

            {/*<AppGetComments/>*/}

            <div className={classes.commentsContainer}>
              <div>
                  <textarea
                    value={comment}
                    onChange={onCommentChange}
                  />
              </div>
              <button onClick={(e) => {return onCommentSubmit(e)}}>Submit Comment</button>
            </div>
          </div> : null
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


/* await fetch(
      `https://testagain-d4b54-default-rtdb.firebaseio.com/review.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      },
    );*/
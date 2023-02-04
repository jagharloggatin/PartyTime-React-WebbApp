import { useContext, useState } from 'react';
import FavoritesContext from '../../store/ActivitiesContext';
import classes from '../styles/AppActivitiesItem.module.css';
import AppCard from '../ui/AppCard';
import AppRating from './AppRating';
import { useParams } from 'react-router-dom';

function AppSelectedActivityItem({props}) {
  const favoritesCtx = useContext(FavoritesContext);
  const itemIsFavorite = favoritesCtx.itemIsFavorite(props.id);
  const [show, setShow] = useState(true);
  const [comment, setComment] = useState();
  const [comments, setComments] = useState([]);
  const Params = useParams();

  const onCommentSubmit = async(e) => {
    e.preventDefault();
    setComments((comments) => [...comments, comment]);
    const max = 100;
    const min = 1;

    const userId = Math.random() * (max - min) + min;
    // console.log(Params.id);

    const data = {
      com: comment,
      uId: userId,
      eId: Params.id
    }
    await fetch(
      `https://testagain-d4b54-default-rtdb.firebaseio.com/review.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      },
    );
  };

  const onCommentChange = (e) =>{
    e.preventDefault()
    setComment(e.target.value);
  }

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
        rating: props.rating,
      });
    }
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

            <form onSubmit={onCommentSubmit}>
              <div className={classes.commentsContainer}>
                <div>
                  <textarea
                  value={comment}
                  onChange={onCommentChange}
                  />
                </div>
                <button>Submit Comment</button>
              </div>
            </form>
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
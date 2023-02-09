import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RequestContext from 'store/RequestContext';
import FavoritesContext from '../../store/FavoritesContext';
import uniqId from '../../uniq';
import classes from '../styles/AppActivitiesItem.module.css';
import AppCard from '../ui/AppCard';
import AppGetComments from './AppGetComments';
import AppRating from './AppRating';

function AppSelectedEventItem() {

    const reqCtx = useContext(RequestContext);
  // const favoritesCtx = useContext(FavoritesContext);
  // const itemIsFavorite = favoritesCtx.itemIsFavorite(props.id);
  const [show, setShow] = useState(true);
  const [comment, setComment] = useState();
  const [comments, setComments] = useState([]);
  // const Params = useParams();
  const userId = 3;
  const selectedId = JSON.parse(localStorage.getItem("selectedId")) || []


  async function onCommentSubmit(e) {
    e.preventDefault();
    setComments((comments) => [...comments, comment]);
    // console.log(Params.id);

    const data = {
      com: comment,
      uId: userId,
      eId: selectedId.id
    }
    await reqCtx.postRequest(`https://testagain-d4b54-default-rtdb.firebaseio.com/review.json`, data);
  }

  const getComments = () => {
    setShow(!show)
    const resp = <AppGetComments/>
    console.log(resp.props);
  }

  const onCommentChange = (e) =>{
    e.preventDefault()
    setComment(e.target.value);
  }

  const toggleFavoriteStatusHandler = async() => {

    const data = {
      uId: userId,
      eId: selectedId.id,
      // eventIsNotFavorite: itemIsFavorite
    }
    await reqCtx.postRequest(`https://testagain-d4b54-default-rtdb.firebaseio.com/favorites.json`, data);
  };
  return (
    <li className={classes.item}>
      <AppCard>
        <div className={classes.image}>
          <img src={selectedId.image} alt={selectedId.title} />

        </div>
        {
          show ? <li className={classes.innerItem}>
            <div className={classes.content}>
              <h3>Title: {selectedId.title}</h3>
              <address>Address: {selectedId.address}</address>
              <p>City: {selectedId.city}</p>
              <p> Description: {selectedId.description}</p>
              {/*<p> Rating: {props.rating}</p>*/}
            </div>
          </li> : null
        }
        {
          !show ? <div className={classes.comments}>
            <h4>Comments</h4>
            {comments.map((text) => { return <div>{text}</div>; })}

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
            {/*{itemIsFavorite ? '♥' : '♡'}*/}
          </button>
          <button onClick={getComments}>Comments</button>
        </div>
      </AppCard>
    </li>
  );
}
// setShow(!show)

export default AppSelectedEventItem;


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
//     // rating: props.rating,
//   });
// }
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RequestContext, { convertResponse } from 'store/RequestContext';
import classes from '../styles/AppSelectedEvent.module.css';
import AppGetComments from './AppGetComments';
import userContext from '../../store/UserContext';
import requestContext from 'store/RequestContext';
import ENDPOINTS from '../../Endpoints';

function AppSelectedEventItem() {

  const [show, setShow] = useState(true);
  const [review, setReview] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [comment, setComment] = useState();
  const [comments, setComments] = useState([]);
  const selectedId = JSON.parse(localStorage.getItem('selectedId')) || [];

  const userCtx = useContext(userContext);
  const reqCtx = useContext(requestContext);

  useEffect(() => {
    const conv = async () => {
      const response = await reqCtx.getRequest(`https://localhost:7215/reviews/${userCtx.ReadJWT().userID}`);
      const converted = await reqCtx.convertResponse(response);
      for (let i = 0; i < converted.length; i++) {

        // console.log(converted[i].likes);
        console.log(converted[i].title);
        console.log(converted[i].comment);
        setComments(converted[i].comment)
        if (converted[i].id === selectedId.id) {
          if (converted[i].likes === 1) {
            setFavorite(true);
          } else {
            setFavorite(false);
          }
        }
      }
    };
    conv();
  }, []);

  const toggleFavoriteStatusHandler = async () => {

    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);

    const data = {
      like: favorite,
      comment: "",
      created: today.toISOString(),
    };
    const res = await reqCtx.postRequest(ENDPOINTS.postReview(selectedId.id), data);
  };
  async function onCommentSubmit(e) {
    e.preventDefault();
    setComments((comments) => [...comments, comment]);
    // console.log(Params.id);

    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);

    const data = {
      comment: "Hej Ferridono Magatheridono",
      created: today.toISOString(),
    };
    await reqCtx.postRequest(ENDPOINTS.postReview(selectedId.id), data);
  }
  const getComments = () => {
    setShow(!show);
    // const resp = await <AppGetComments />;
    // setComments(resp.json())
  };

  const onCommentChange = (e) => {
    e.preventDefault();
    setComment(e.target.value);
  };

  return (
    <li className={classes.listItem}>
      <div>
      <div className={classes.imageContainer}>
        <img src={selectedId.image} alt={selectedId.title} />
      </div>
      {
        show ? <div className={classes.innerItem}>
          <h2>{selectedId.title}</h2>
          <div className={classes.placeInfo}>
            <address>{selectedId.address}</address>
            <p>{selectedId.planned}</p>
            {/*<p>{selectedId.attending}</p>*/}
          </div>
          <div className={classes.description}>{selectedId.description}</div>
          {/*<p> Rating: {props.rating}</p>*/}
        </div> : null
      }
      {
        !show ? <div>
          <h4>Comments</h4>
          {comments.map((text) => {
            return <div>comment</div>;
          })}

          <div className={classes.commentsContainer}>
            <div>
              <p>{selectedId.comment}</p>
              <textarea
                value={comment}
                onChange={onCommentChange}
              />
            </div>
            <button onClick={(e) => {
              return onCommentSubmit(e);
            }}>Submit Comment
            </button>
          </div>
        </div> : null
      }
      <li>
      </li>
      <div className={classes.actions}>
        <button onClick={toggleFavoriteStatusHandler}>
          {favorite ? 'Favorite' : 'UnFavorite'}
        </button>
        <button onClick={getComments}>Comments</button>
      </div>
      </div>
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
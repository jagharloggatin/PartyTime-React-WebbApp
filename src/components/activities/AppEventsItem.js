import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import RequestContext from 'store/RequestContext';
import FavoritesContext from '../../store/FavoritesContext';
import classes from '../styles/AppEvents.module.css';
import ENDPOINTS from '../../Endpoints';
import userContext from '../../store/UserContext';
import requestContext from '../../store/RequestContext';

function AppEventsItem(props) {
  const favoritesCtx = useContext(FavoritesContext);
  const itemIsFavorite = favoritesCtx.itemIsFavorite(props.id);
  const navigateTo = useNavigate();
  const [favorite, setFavorite] = useState(false);

  const selectedId = JSON.parse(localStorage.getItem('selectedId')) || [];

  const userCtx = useContext(userContext);
  const reqCtx = useContext(requestContext);

  useEffect(() => {
    const conv = async () => {
      const response = await reqCtx.getRequest(ENDPOINTS.getUserReviews(userCtx.ReadJWT().userID));
      console.log(response);
      const converted = await reqCtx.convertResponse(response);

      for (let i = 0; i < converted.length; i++) {
        // console.log(converted[i].title);
        // console.log(converted[i].comment);
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

  const goToEvent = () => {
    // console.log(props);
    navigateTo(`/events/${props.id}`);
    localStorage.setItem('selectedId', JSON.stringify(props));
    navigateTo(`/events/selected`);
  };

  const toggleFavoriteStatusHandler = async () => {

    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);

    const data = {
      like: favorite,
      comment: '',
      created: today.toISOString(),
    };
    const res = await reqCtx.postRequest(ENDPOINTS.postReview(selectedId.id), data);
    console.log(res);
  };

  return (
    <li className={classes.card}>
      <div className={classes.contentContainer}>
        <div className={classes.contentDirection}>
          <div className={classes.imageContainer}>
            <img src={props.image} />
          </div>
          <div className={classes.textContainer}>
            <h2>{props.title}</h2>
            <div>{props.description}</div>
            <p>{props.city}</p>
            <p>{props.address}</p>
            <p>{props.planned}</p>
          </div>
        </div>
        <div className={classes.buttonListItem}>
          <button onClick={toggleFavoriteStatusHandler}>
            {favorite ? 'Favorite' : 'UnFavorite'}
          </button>
          <button onClick={goToEvent}>Go To Event</button>
        </div>
      </div>
    </li>

    // <section>
    //
    //   <div className={classes.events}>
    //     <ul>
    //       <li>
    //         <div>
    //           <div className={classes.time}>
    //             <h2>24 <br /><span>June</span></h2>
    //           </div>
    //           <div className={classes.details}>
    //             <h3>{props.title}</h3>
    //             <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
    //               Aperiam consectetur excepturi incidunt labore, mollitia
    //               natus
    //               numquam obcaecati odio odit optio ratione rem sed vero.
    //               Blanditiis nisi sapiente tempore vero voluptate.</p>
    //

    //             <a href='/events'>Favorite</a>
    //             <a href='/events'>Favorite</a>
    //
    //
    //           </div>
    //         </div>
    //       </li>
    //     </ul>
    //   </div>
    //   {/*<div className={classes.events}>*/}
    //   {/*  <div className={classes.content}>*/}
    //   {/*    <h1>{props.title}</h1>*/}
    //   {/*    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis*/}
    //   {/*      fugit magnam maxime minus praesentium sequi sunt? Accusantium alias,*/}
    //   {/*      distinctio error odio omnis optio quam vero. Ad ea harum iure*/}
    //   {/*      non.</p>*/}
    //   {/*  </div>*/}
    //   {/*</div>*/}
    // </section>


    // <li className={classes.listItem}>
    //   {/*<AppCard>*/}
    //   <li className={classes.innerItem}>
    //     <div className={classes.image}>
    //       <img src={props.image} alt={props.title} />
    //     </div>
    //     <div className={classes.textContent}>
    //       <div className={classes.content}>
    //         <h3>Title: {props.title}</h3>
    //         <address>Address: {props.address}</address>
    //         <p>City: {props.city}</p>
    //         <p> Description: {props.description}</p>
    //       </div>
    //     </div>
    //   </li>
    //   <div className={classes.actions}>
    //     <button
    //       onClick={toggleFavoriteStatusHandler}>{itemIsFavorite ? '♥' : '♡'}</button>
    //     <button onClick={goToEvent}>Go To Activity</button>
    //   </div>
    //   {/*</AppCard>*/}
    // </li>
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
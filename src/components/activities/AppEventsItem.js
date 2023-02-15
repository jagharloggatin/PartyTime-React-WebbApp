import { ExpandMore, Favorite as FavoriteIcon } from '@mui/icons-material';
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import RequestContext from 'store/RequestContext';
import ENDPOINTS from '../../Endpoints';
import FavoritesContext from '../../store/FavoritesContext';
import requestContext from '../../store/RequestContext';
import userContext from '../../store/UserContext';
import classes from '../styles/AppEvents.module.css';

function AppEventsItem({ event }) {
  const favoritesCtx = useContext(FavoritesContext);
  const itemIsFavorite = favoritesCtx.itemIsFavorite(event.id);
  const navigateTo = useNavigate();
  const [favorite, setFavorite] = useState(false);

  const selectedId = JSON.parse(localStorage.getItem('selectedId')) || [];

  const userCtx = useContext(userContext);
  const reqCtx = useContext(requestContext);

  const date = new Date(event.planned).toLocaleDateString();

  useEffect(() => {
    const conv = async () => {
      const response = await reqCtx.getRequest(ENDPOINTS.getUserReviews(userCtx.ReadJWT().userID));
      const converted = await reqCtx.convertResponse(response);

      console.log('CONVERTERD', converted);

      for (let i = 0; i < converted.length; i++) {
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
    console.log(event);
    localStorage.setItem('selectedId', JSON.stringify(event));
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
    // console.log(res);
  };

  return (
    // component={Link} to={`/events/location/${city.id}`}
    <>
      <Card className="card-event">
        <CardActionArea onClick={goToEvent}>
          <CardMedia className="card-media" component="img" height="160" image={event.image} />
        </CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {event.title}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {event.description}
          </Typography>

          <p>{event.city}</p>
          <p>{event.address}</p>
          <p>{date}</p>
          <div className={classes.buttonListItem}>
            <button onClick={toggleFavoriteStatusHandler}>{favorite ? 'Favorite' : 'UnFavorite'}</button>
            <button onClick={goToEvent}>Go To Event</button>
          </div>
        </CardContent>

        <CardActions disableSpacing>
          <IconButton onClick={toggleFavoriteStatusHandler} aria-label="add to favorites">
            <FavoriteIcon color={favorite ? 'primary' : 'disabled'} />
          </IconButton>
          <Button size="small" onClick={goToEvent}>
            Go to event
          </Button>
        </CardActions>
      </Card>
    </>

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
    //             <h3>{event.title}</h3>
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
    //   {/*    <h1>{event.title}</h1>*/}
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
    //       <img src={event.image} alt={event.title} />
    //     </div>
    //     <div className={classes.textContent}>
    //       <div className={classes.content}>
    //         <h3>Title: {event.title}</h3>
    //         <address>Address: {event.address}</address>
    //         <p>City: {event.city}</p>
    //         <p> Description: {event.description}</p>
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
//   // console.log(event);
//   selectedActivityCtx.activitySelected({
//     id: event.id,
//     title: event.title,
//     description: event.description,
//     image: event.image,
//     address: event.address,
//     city: event.city,
//     rating: event.rating,
//   });
//   navigateTo('/event');
// };
// if (itemIsFavorite) {
//   favoritesCtx.removeFavorite(event.id);
// } else {
//   favoritesCtx.addFavorite({
//     id: event.id,
//     title: event.title,
//     description: event.description,
//     image: event.image,
//     address: event.address,
//     city: event.city,
//   });
// }

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
import AppGetComments from './AppGetComments';

function AppEventsItem({ event, variant }) {
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
    localStorage.setItem('selectedId', JSON.stringify(event));
    navigateTo(`/events/selected`);
  };

  const capText = (input, maxLength) => {
    return input.length > maxLength ? `${input.substring(0, maxLength - 3)}...` : input;
  };

  const toggleFavoriteStatusHandler = async () => {
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);

    if (favorite) {
    }

    const data = {
      like: favorite ? false : true,
      comment: '',
      created: today.toISOString(),
    };
    const res = await reqCtx.postRequest(ENDPOINTS.postReview(selectedId.id), data);

    setFavorite(favorite ? false : true);
  };

  return (
    <Card className="card-event">
      <CardActionArea onClick={goToEvent}>
        <CardMedia className="card-media" component="img" height="160" image={event.image} />
      </CardActionArea>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {event.title}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {capText(event.description, 40)}
        </Typography>
        <p>{event.city}</p>
        <p>{event.address}</p>
        <p>{date}</p>
      </CardContent>
      {variant === 'favorite' ? (
        <CardActions disableSpacing>
          <IconButton onClick={toggleFavoriteStatusHandler} aria-label="add to favorites">
            <FavoriteIcon color={'error'} />
          </IconButton>
          <Button size="small" onClick={goToEvent}>
            Go to event
          </Button>
        </CardActions>
      ) : (
        <div>
          {event.comments.map((event) => {
            return (
              <div className="card-review-comment">
                <p className="card-review-comment-title">{event.username}</p>
                <p className="card-review-comment">{event.comment}</p>
              </div>
            );
          })}
        </div>
      )}
    </Card>
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

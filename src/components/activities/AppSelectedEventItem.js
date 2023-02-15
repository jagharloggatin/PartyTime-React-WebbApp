import {
  Comment,
  CommentsDisabled,
  DataUsageSharp,
  DateRange, Description, EighteenUpRatingRounded,
  Favorite,
  HeartBroken, LocationCity, Pin, PinRounded, Place,
  Send,
} from '@mui/icons-material';

import { Button, TextField } from '@mui/material';
import React, { useContext, useEffect, useRef, useState } from 'react';
import RequestContext from 'store/RequestContext';
import ENDPOINTS from '../../Endpoints';
import userContext from '../../store/UserContext';
import classes from '../styles/AppSelectedEvent.module.css';
import AppGetComments from './AppGetComments';
import { useNavigate } from 'react-router-dom';
import ErrorAlert from '../SuccessAlert';
import SuccessAlert from '../ErrorAlert';


function AppSelectedEventItem(props) {
  const [show, setShow] = useState(true);
  const [favorite, setFavorite] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const selectedId = JSON.parse(localStorage.getItem('selectedId')) || [];
  let content = <AppGetComments />;
  const successAlertRef = useRef(null);
  const errorAlertRef = useRef(null);
  const userCtx = useContext(userContext);
  const reqCtx = useContext(RequestContext);
  const navigateTo = useNavigate();

  useEffect(() => {
    const conv = async () => {
      const response = await reqCtx.getRequest(ENDPOINTS.getUserReviews(userCtx.ReadJWT().userID));
      const converted = await response.json();
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

  const toggleFavoriteStatusHandler = async () => {
    if (favorite) {
      setFavorite(false);
    } else {
      setFavorite(true);
    }
    const today = new Date(Date.now());

    const data = {
      like: favorite,
      comment: '',
      created: today.toISOString(),
    };
    const res = await reqCtx.postRequest(ENDPOINTS.postReview(selectedId.id), data);
    console.log(res.status);
  };

  async function onCommentSubmit(e) {

    if(!userCtx.IsLoggedIn()){
      successAlertRef.current.update('You are not logged in and will be transferred to login page');
      setTimeout(() => {
      navigateTo('/login')
      },1500)
    }

    e.preventDefault();
    setComments((comments) => [...comments, comment]);

    const data = {
      Like: favorite,
      Comment: comment,
      Created: new Date(Date.now()).toISOString(),
    };
    const res = await reqCtx.postRequest(ENDPOINTS.postReview(selectedId.id), data);

    console.log(res.status);

    if(res.status !== 200){
      successAlertRef.current.update('Something Went Wrong! Hehe');
    }else {
      errorAlertRef.current.update('You Posted a Comment, What A Lad :O');
    }
  }

  const getComments = () => {
    setShow(!show);
  };

  const onCommentChange = (e) => {
    e.preventDefault();
    setComment(e.target.value);
  };

  return (
    <div className={classes.listItem}>
      <div className={classes.description}>
        <div className={classes.infoContainer}>
          <div className={classes.imageContainer}>
            <img src={selectedId.image} alt={selectedId.title} />
          </div>
          <SuccessAlert ref={successAlertRef}></SuccessAlert>
          <ErrorAlert ref={errorAlertRef}></ErrorAlert>
          <div className={classes.innerItem}>
            <h2>{selectedId.title}</h2>
            <div style={{ marginTop: '.2rem' }}>
              <Button
                onClick={toggleFavoriteStatusHandler}
                variant='contained'
                style={{ marginRight: '1rem' }}
                color='error'
              >
                {favorite ? <Favorite></Favorite> : <HeartBroken></HeartBroken>}
              </Button>
              <Button onClick={getComments} variant='contained'>
                {show ? <Comment></Comment> :
                  <CommentsDisabled></CommentsDisabled>}
              </Button>
            </div>
            <div className={classes.placeInfo}>
              <DateRange fontSize='large' />
              <p style={{ marginLeft: '5px' }}>{selectedId.planned}</p>
            </div>
            <div className={classes.placeInfo}>
              <Place fontSize='large' />
              <address>{selectedId.location.address}</address>
            </div>
            <div className={classes.placeInfo}>
              <Description fontSize='large' />
              <div className={classes.placeInfo}>{selectedId.description}</div>
            </div>
          </div>
        </div>

        {!show && (
          <div className={classes.commentsContainer}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                marginTop: '1rem',
                marginBottom: '1rem',
              }}
            >

              <TextField onChange={onCommentChange} variant='filled'
                         sx={{ width: '85%' }}></TextField>
              <Button onClick={onCommentSubmit} variant='contained'>
                <Send />
              </Button>
            </div>
            {content}
          </div>
        )}
      </div>
    </div>
  );
}

// setShow(!show)

export default AppSelectedEventItem;



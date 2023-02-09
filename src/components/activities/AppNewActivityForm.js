import React, { useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import RequestContext from 'store/RequestContext';
import ENDPOINTS from '../../Endpoints';
import uniqId from '../../uniq';
import classes from '../styles/AppNewActivityForm.module.css';
import AppCard from '../ui/AppCard';

function NewMeetupForm() {
    const reqCtx = useContext(RequestContext);
  const titleInputRef = useRef(null);
  const imageInputRef = useRef(null);
  const addressInputRef = useRef(null);
  const descriptionInputRef = useRef(null);
  const cityInputRef = useRef(null);
  // const ratingInputRef = useRef(null);
  const navigateTo = useNavigate();

  const addMeetupHandler = async meetupData => {

    let resp = await reqCtx.postRequest(ENDPOINTS.postEvent(),
      meetupData).then(() => navigateTo('/events'));

    console.log(resp);

    // let resp = await postRequest(ENDPOINTS.postEvent(meetupData)).then(() => navigateTo('/events'));
    // console.log(resp);
    //
    // if (resp.ok) {
    //   alert('OK');
    // } else {
    //   alert('NOT OK');
    // }
  };


  // const addMeetupHandler = meetupData => {
  //   // console.log(meetupData)
  //   fetch(
  //     ENDPOINTS.postEvent(),
  //     {
  //       method: 'POST',
  //       body: JSON.stringify(meetupData),
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     },
  //   ).then(() => navigateTo('/events'));
  //
  //   let resp = await postRequest(ENDPOINTS.postEvent(meetupData)).then(() => navigateTo('/events'));
  //
  // };

  function submitHandler(event) {
    event.preventDefault();

    const enteredTitle = titleInputRef.current.value;
    const enteredImage = imageInputRef.current.value;
    const enteredAddress = addressInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
    // const enteredRating = ratingInputRef.current.value;
    // const rating = undefined;

    // const loc = {
    //   id: uniqId(),
    //   name: "hej",
    //   longitude: 0,
    //   latitude: 0,
    //   city: { id: uniqId(), name: enteredCity,  }
    // }

    const meetupData = {
      title: enteredTitle,
      image: enteredImage,
      description: enteredDescription,
      planned: Date.now(),
      likes: 0,
      city: enteredCity,
      // rating: enteredRating,
    };
    addMeetupHandler(meetupData);
    // props.onAddMeetup(meetupData);
    // console.log(meetupData)
  }

  return <AppCard>
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='title'>Title</label>
        <input type='text' required id='title' ref={titleInputRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor='image'>Image</label>
        <input type='url' required id='image' ref={imageInputRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor='city'>City</label>
        <input type='text' required id='city' ref={cityInputRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor='address'>Address</label>
        <input type='text' required id='address' ref={addressInputRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor='description'>Description</label>
        <textarea id='description' required rows='5'
                  ref={descriptionInputRef} />
      </div>
      {/*<div className={classes.control}>*/}
      {/*  <label htmlFor='rating'>Rating(1-5)</label>*/}
      {/*  <input type='number' required id='number' ref={ratingInputRef} />*/}
      {/*</div>*/}
      <div className={classes.actions}>
        <button>Add Meetup</button>
      </div>
    </form>
  </AppCard>;
}

export default NewMeetupForm;
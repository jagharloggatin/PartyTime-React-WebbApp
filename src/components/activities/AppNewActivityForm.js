import AppLogo from 'components/AppLogo';
import React, { useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import RequestContext from 'store/RequestContext';
import ENDPOINTS from '../../Endpoints';
import StorageContext from '../../store/StorageContext';
import uniqId from '../../uniq';
import classes from '../styles/AppNewActivityForm.module.css';
import AppCard from '../ui/AppCard';

function NewMeetupForm() {
  const titleInputRef = useRef(null);
  const imageInputRef = useRef(null);
  const addressInputRef = useRef(null);
  const descriptionInputRef = useRef(null);
  const cityInputRef = useRef(null);
  // const ratingInputRef = useRef(null);
  const navigateTo = useNavigate();
  
  const reqCtx = useContext(RequestContext);
  // const storageCtx = useContext(StorageContext);
  
  // const user = storageCtx.ReadJWT();

  const addMeetupHandler = async eventData => {

    let resp = await reqCtx.postRequest(ENDPOINTS.postEvent(),
      eventData);
    // console.log(resp);

    if (resp.ok) {
      alert('OK');
    } else {
      alert('NOT OK');
    }
    navigateTo(`/events/location/${eventData.id}`);
  };

  // let resp = await postRequest(ENDPOINTS.postEvent(meetupData)).then(() => navigateTo('/events'));
  // console.log(resp);
  //


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

    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    console.log(today.toISOString());

    const eventData =
      {
        title: enteredTitle,
        description: enteredDescription,
        image: enteredImage,
        planned: today.toISOString(),
        likes: 7,
        city: enteredCity,
        comments: [
          {},
        ],
        location: {
          id: 8,
          name: 'string',
          address: enteredAddress,
          latitude: 30,
          longitude: 30,
          city: {
            id: 4,
            name: 'string',
            country: {
              id: 5,
              name: 'string',
              countryCode: 'string',
            },
          },
        },
      };
    // props.onAddMeetup(meetupData);
    // console.log(meetupData)
    addMeetupHandler(eventData);
  }

  return <div className={classes.addactivityouterwrapper}>
  <div className={classes.topbar}><AppLogo/></div>
  <div className={classes.addactivityinnerwrapper}>
    <div className={classes.addactivityleft}>
      <div className={classes.addactivityleftinner}>
        <div className={classes.chosenimage}></div>
        <input type="file"/>
      </div>
    </div>
    <div className={classes.addactivityright}>
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
          <textarea className={classes.description} id='description' required rows='5'
                    ref={descriptionInputRef} />
        </div>
        {/*<div className={classes.control}>*/}
        {/*  <label htmlFor='rating'>Rating(1-5)</label>*/}
        {/*  <input type='number' required id='number' ref={ratingInputRef} />*/}
        {/*</div>*/}
        <div className={classes.actions}>
        </div>
      </form>
    </div>
  </div>
  <div>
    <div className={classes.lower}><button className={classes.addbutton} type="submit">Create event</button></div>
  </div>
  </div>;
}

export default NewMeetupForm;
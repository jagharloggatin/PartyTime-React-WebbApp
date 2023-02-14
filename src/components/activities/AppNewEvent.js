import AppLogo from 'components/AppLogo';
import AutoCompleteInput from 'components/AutoCompleteInput';
import React, { useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import LocationContext from 'store/LocationContext';
import RequestContext from 'store/RequestContext';
import ENDPOINTS from '../../Endpoints';
import StorageContext from '../../store/StorageContext';
import uniqId from '../../uniq';
import classes from '../styles/AppNewEvent.module.css';
import AppCard from '../ui/AppCard';

function AppNewEvent(props) {
  const locCtx = useContext(LocationContext);
  const titleInputRef = useRef(null);
  const imageInputRef = useRef(null);
  const descriptionInputRef = useRef(null);
  const dateInputRef = useRef(null);
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

  async function submitHandler(e) {
    e.preventDefault();

    //Event to be posted
    const event = {
      "title": titleInputRef.current.value,
      "description": descriptionInputRef.current.value,
      "image": imageInputRef.current.value,
      "planned": dateInputRef.current.value,
      "likes": 0,
      "comments": [
        {}
      ],
      "location": locCtx.location
    } // End of event to be posted

    console.log(event);

    const res = await reqCtx.postRequest(ENDPOINTS.postEvent, event);
    console.log(res);

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
          <label htmlFor='city'>Planned Date</label>
          <input type='date' required id='date' ref={dateInputRef} />
        </div>

        <div className={classes.control}>
          <p>Address</p>
          <div className={classes.autoinput}>
            <AutoCompleteInput gmap={props.gmap} setMapState={props.setMapState} size="small"/>
          </div>
        </div>

        <div className={classes.control}>
          <label htmlFor='image'>Image</label>
          <input type='text' required id='image' ref={imageInputRef} />
        </div>

        

        <div className={classes.control}>
          <label htmlFor='description'>Description</label>z
          <textarea className={classes.description} id='description' required rows='5'
                    ref={descriptionInputRef} />
        </div>
        <div className={classes.actions}>
        </div>
      </form>
    </div>
  </div>
  <div>
    <div className={classes.lower}><button className={classes.addbutton} onClick={(e) => {console.log(locCtx.location); submitHandler(e)}} type="submit">Create event</button></div>
  </div>
  </div>;
}

export default AppNewEvent;
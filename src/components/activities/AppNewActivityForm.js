import classes from '../styles/AppNewActivityForm.module.css';
import { useRef } from 'react';
import AppCard from '../ui/AppCard';
import { useNavigate } from 'react-router-dom';

function NewMeetupForm(props) {

  const titleInputRef = useRef(null);
  const imageInputRef = useRef(null);
  const addressInputRef = useRef(null);
  const descriptionInputRef = useRef(null);
  const history = useNavigate();
  const addMeetupHandler = meetupData => {
    // console.log(meetupData)

    fetch(
      'https://testagain-d4b54-default-rtdb.firebaseio.com/meetups.json',
      {
        method: 'POST',
        body: JSON.stringify(meetupData),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    ).then(() => history('/activities'));
  };

  function submitHandler(event) {
    event.preventDefault();

    const enteredTitle = titleInputRef.current.value;
    const enteredImage = imageInputRef.current.value;
    const enteredAddress = addressInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;

    const meetupData = {
      title: enteredTitle,
      image: enteredImage,
      address: enteredAddress,
      description: enteredDescription,
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
        <label htmlFor='address'>Address</label>
        <input type='text' required id='address' ref={addressInputRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor='description'>Description</label>
        <textarea id='description' required rows='5'
                  ref={descriptionInputRef} />
      </div>
      <div className={classes.actions}>
        <button>Add Meetup</button>
      </div>
    </form>
  </AppCard>;
}

export default NewMeetupForm;
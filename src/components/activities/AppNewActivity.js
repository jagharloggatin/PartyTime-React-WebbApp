import React from 'react'
import NewMeetupForm from "./AppNewActivityForm";
import {useNavigate} from 'react-router-dom'

//Firebase
//https://react-getting-started-te-9ab5d-default-rtdb.firebaseio.com/

function NewMeetup() {

  const history = useNavigate();

  const addMeetupHandler = (meetupData) => {
    // console.log(meetupData)

    fetch(
      'https://testfirebase-again-default-rtdb.firebaseio.com/meetups.json',
      {
        method: 'POST',
        body: JSON.stringify(meetupData),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).then(() => history('/'));
  }

  return <section><h1>Add New Meetup</h1>
    <NewMeetupForm onAddActivity={addMeetupHandler}/>
  </section>
}


export default NewMeetup;
import { useEffect, useState } from 'react';
import classes from '../styles/Headlines.module.css';

function AppGetComments() {

  const[isLoading, setIsLoading] = useState(true);
  const[loadComments, setLoadComments] = useState([]);
  useEffect(() => {
    setIsLoading(true);
    fetch(
      'https://testagain-d4b54-default-rtdb.firebaseio.com/comments.json',
    ).then(response => {
      return response.json();
    }).then(data => {
      const meetups = [];

      for(const key in data){
        const meetup = {
          id:key,
          ...data[key]
        };
        meetups.push(meetup);
      }
      setIsLoading(false);
      setLoadComments(meetups);
    });
  }, []);

  // console.log(loadComments);

  if(isLoading){
    return <div className={classes.wrapper}>
      <h2 className={classes.content}>Loading...</h2>
    </div>
  }
  return <div className={classes.wrapper}>
    <div>comments</div>
    {/*{loadComments.map(comments => (*/}
    {/*  // <AppCommentItem com={comments}/>*/}
    {/*))}*/}
  </div>;
}
export default AppGetComments;
import React, { useContext, useEffect, useState } from 'react';
import RequestContext from 'store/RequestContext';
import ENDPOINTS from '../../Endpoints';
import classes from '../styles/Headlines.module.css';
import AppEventsItem from './AppEventsItem';
import uniqId from '../../uniq';
import AppCommentItem from './AppCommentItem';
 
function AppGetComments() {

  const reqCtx = useContext(RequestContext);
  const [isLoading, setIsLoading] = useState(false);
  const [loadedComments, setLoadedComments] = useState([]);

  useEffect(() => {
    const conv = async () => {
      setIsLoading(true);
      const response = await reqCtx.getRequest(`https://localhost:7215/reviews`)
      const converted = await reqCtx.convertResponse(response)
      setLoadedComments(converted);
      setIsLoading(false);
    }
    conv();
  }, []);
  if (isLoading) {
    return <div className={classes.wrapper}>
      <h2 className={classes.content}>Loading...</h2>
    </div>;
  }

  return (
    <ul>
      {loadedComments.map((event) => (
        <AppCommentItem
          key={uniqId()}
          id={event.id}
          comment={[event.comments]}
        />
      ))}
    </ul>)
  // return <div className={classes.wrapper}>
  // </div>;

  // const data = await RequestService.getRequest(`https://testagain-d4b54-default-rtdb.firebaseio.com/review.json`)
  // const [isLoading, setIsLoading] = useState(false);
  // const [loadedComments, setLoadedComments] = useState([]);
  //
  // const fetchData = async () => {
  //   let res = await reqCtx.getRequest(`https://testagain-d4b54-default-rtdb.firebaseio.com/review.json`)
  //   let resp = await res.json()
  //   console.log(resp);
  //   return resp;
  // }; fetchData();
  //
  // return (<div>Apa</div>)

}

export default AppGetComments;
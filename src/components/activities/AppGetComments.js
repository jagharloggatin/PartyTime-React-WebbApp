import React, { useContext, useEffect, useState } from 'react';
import RequestContext from 'store/RequestContext';
import userContext from '../../store/UserContext';
import uniqId from '../../uniq';
import classes from '../styles/Headlines.module.css';
import AppCommentItem from './AppCommentItem';

function AppGetComments() {
  const [isLoading, setIsLoading] = useState(false);
  const [loadedComments, setLoadedComments] = useState(null);

  const reqCtx = useContext(RequestContext);
  const userCtx = useContext(userContext);
  const selectedId = JSON.parse(localStorage.getItem('selectedId')) || [];

  useEffect(() => {
    const conv = async () => {
      setIsLoading(true);
      const response = await reqCtx.getRequest(`https://localhost:7215/events/${selectedId.id}`);
      // console.log("HEJ");
      // console.log(response);
      const converted = await response.json();
      // console.log("HEJ");
      // console.log(converted);

      setLoadedComments(converted);
      setIsLoading(false);
    };
    conv();
  }, []);
  if (isLoading) {
    return (
      <div className={classes.wrapper}>
        <h2 className={classes.content}>Loading...</h2>
      </div>
    );
  }

  if (!loadedComments?.comments ?? false) return <div>No data..</div>;

  return (
    <div>
      {loadedComments.comments.map((c) => (
        <AppCommentItem key={uniqId()} id={c.id} comment={c} />
      ))}
    </div>
  );
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

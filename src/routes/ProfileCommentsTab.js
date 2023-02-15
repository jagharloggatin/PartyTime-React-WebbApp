import ENDPOINTS from 'Endpoints';
import React, { useContext, useEffect, useState } from 'react';
import RequestContext from 'store/RequestContext';
import UserContext from 'store/UserContext';

function ProfileCommentsTab() {
  const userCtw = useContext(UserContext);
  const reqCtw = useContext(RequestContext);
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    async function getReviews() {
      let res = await reqCtw.getRequest(ENDPOINTS.getUserReviews(userCtw.ReadJWT().userID));
      console.log('Hej där');
      console.log(res);
    }
  }, []);

  return <div className="tab">{userCtw.ReadJWT().userID}</div>;
}

export default ProfileCommentsTab;

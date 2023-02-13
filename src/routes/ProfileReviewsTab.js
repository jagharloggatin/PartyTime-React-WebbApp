import { Card } from '@mui/material';
import AppProfile from 'components/AppProfile';
import ENDPOINTS from 'Endpoints';
import React, { useContext, useEffect, useState } from 'react';
import RequestContext from 'store/RequestContext';

function ProfileReviewsTab() {
  const reqCtx = useContext(RequestContext);
  const [reviews, setReviews] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const id = 1;

    async function fetchData() {
      try {
        setIsLoading(true);
        const res = await reqCtx.getRequest(ENDPOINTS.getUserReviews(id));
        console.log('här är mitt res', res);
        const data = await res.json();

        setReviews(data);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!reviews) {
    return <div>No reviews</div>;
  }

  return <Card>ok</Card>;
}

export default ProfileReviewsTab;

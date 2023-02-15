import { Card } from '@mui/material';
import ENDPOINTS from 'Endpoints';
import React, { useContext, useEffect, useState } from 'react';
import RequestContext from 'store/RequestContext';
import UserContext from 'store/UserContext';

function ProfileReviewsTab() {
  const reqCtx = useContext(RequestContext);
  const userCtx = useContext(UserContext);

  const [reviews, setReviews] = useState([{ title: '', comment: '' }]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const res = await reqCtx.getRequest(ENDPOINTS.getUserReviews(userCtx.ReadJWT().userID));
        console.log('här är mitt res', res);
        const data = await res.json();
        console.log(data);

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

  function ReviewList() {
    return (
      <div className="card-review">
        {reviews.map((x) => {
          return (
            <Card className="card-review-single">
              <div>
                <img src={x.image} height="160" width="200" />
              </div>
              <div className="card-review-single-right">
                <h2>{x.title}</h2>
                <div>
                  <p className="card-review-comment-title">Comment:</p>
                  <p className="card-review-comment">{x.description}</p>
                </div>
                <div>
                  {x.comments.map((x) => {
                    return (
                      <div className="card-review-comment">
                        <p className="card-review-comment-title">{x.username}</p>
                        <p className="card-review-comment">{x.comment}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    );
  }

  return <ReviewList />;
}

export default ProfileReviewsTab;

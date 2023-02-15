import AppCommentItem from 'components/activities/AppCommentItem';
import AppFavoriteEventsList from 'components/activities/AppGetReviews';
import React from 'react';

function ProfileFavoritesTab() {
  return (
    <div className="tab">
      <h2>Favorites</h2>
      <AppFavoriteEventsList variant={'favorite'} />
    </div>
  );
}

export default ProfileFavoritesTab;

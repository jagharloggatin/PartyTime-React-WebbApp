import React, { createContext, useState } from 'react';

const FavoritesContext = createContext({
  favorites: [],
  comments: [],
  totalFavorites: 0,
  addFavorite: (favoriteMeetup) => {},
  removeFavorite: (meetupId) => {},
  itemIsFavorite: (meetupId) => {},
});

// export const SelectedActivityContext = createContext({
//   activity: [],
//   activitySelected: (selectedActivity) => {}
// });

export function FavoritesContextProvider(props) {
  const [userFavorites, setUserFavorites] = useState([]);


  function addFavoriteHandler(user) {
    const key = "JWT";
    const JwtToken = localStorage.getItem(key);
    const JWTInfo = JSON.parse(JwtToken);
    console.log(JWTInfo)
    return JWTInfo;
  }
  // function addFavoriteHandler(favoriteMeetup) {
  //   setUserFavorites((prevUserFavorites) => {
  //     return prevUserFavorites.concat(favoriteMeetup);
  //
  //   });
  // }
  function removeFavoriteHandler(meetupId) {
    setUserFavorites((prevUserFavorites) => {
      return prevUserFavorites.filter((meetup) => meetup.id !== meetupId);
    });
  }
  function itemIsFavoriteHandler(meetupId) {
    return userFavorites.some((meetup) => meetup.id === meetupId);
  }

  const context = {
    favorites: userFavorites,
    totalFavorites: userFavorites.length,
    addFavorite: addFavoriteHandler,
    removeFavorite: removeFavoriteHandler,
    itemIsFavorite: itemIsFavoriteHandler,
  };

  return <FavoritesContext.Provider value={context}>{props.children}</FavoritesContext.Provider>;
}

export default FavoritesContext;

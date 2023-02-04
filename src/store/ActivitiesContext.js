import {createContext, useState} from "react";

const FavoritesContext = createContext({
  favorites: [],
  activity: [],
  comments: [],
  totalFavorites: 0,
  addFavorite: (favoriteMeetup) => {},
  removeFavorite: (meetupId) => {},
  itemIsFavorite: (meetupId) => {},
  activitySelected: (selectedActivity) => {}
});

// export const SelectedActivityContext = createContext({
//   activity: [],
//   activitySelected: (selectedActivity) => {}
// });

export function FavoritesContextProvider(props){

  const [userFavorites, setUserFavorites] = useState([]);
  const [userActivity, setActivity] = useState([]);

  function selectedUserActivity(selectedActivity) {
    setActivity((prevUserSelectedActivity) => {
      return prevUserSelectedActivity.concat(selectedActivity);
    });
  }

  function addFavoriteHandler(favoriteMeetup){
    setUserFavorites((prevUserFavorites) => {
      return prevUserFavorites.concat(favoriteMeetup);
    });
  }
  function removeFavoriteHandler(meetupId){
    setUserFavorites((prevUserFavorites) => {
      return prevUserFavorites.filter(meetup => meetup.id !== meetupId);
    });
  }
  function itemIsFavoriteHandler(meetupId){
    return userFavorites.some(meetup => meetup.id === meetupId);
  }

  const context = {
    favorites: userFavorites,
    activity: userActivity,
    totalFavorites: userFavorites.length,
    addFavorite: addFavoriteHandler,
    removeFavorite: removeFavoriteHandler,
    itemIsFavorite: itemIsFavoriteHandler,
    activitySelected: selectedUserActivity,
  };


  return <FavoritesContext.Provider value={context}>
    {props.children}
  </FavoritesContext.Provider>
}

export default FavoritesContext;


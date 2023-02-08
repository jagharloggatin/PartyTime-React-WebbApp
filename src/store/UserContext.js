import React, { createContext, useState } from 'react';

//Refrenace methods to be shown in intellisense
const UserContext = createContext({
    //itemIsFavorite: (meetupId) => {},
});

export function UserContextProvider(props) {
    
  function LogInUser(username, password) {
    //apicall with username and password
    //save token along with userid in localstorage
  }

  function LogOutUser() {
    //Remove JWT from userstorage and redirect to mappage
  }

  //Reference methods in this object to be passed as value
  const context = {
    LogInUser: LogInUser,
    LogOutUser: LogOutUser
  };

  return <UserContext.Provider value={context}>{props.children}</UserContext.Provider>;
}

export default UserContext;

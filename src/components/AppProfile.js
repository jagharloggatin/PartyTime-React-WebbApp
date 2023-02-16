import { Avatar } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import { style } from '@mui/system';
import ENDPOINTS from 'Endpoints';
import React, { useContext, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import RequestContext from 'store/RequestContext';
import UserContext from 'store/UserContext';
import ProfileTabs from './ProfileTabs';
import styles from './styles/AppProfile.module.scss';

export default function AppProfile() {
  const reqCtx = useContext(RequestContext);
  const userCtx = useContext(UserContext);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getUser() {
      setIsLoading(true);
      console.log('ANVÄNDARE');
      console.log(userCtx.ReadJWT().userID);
      const req = await reqCtx.getRequest(ENDPOINTS.getUser(userCtx.ReadJWT().userID));
      const json = await req.json();
      setUser(json);

      console.log(json);
      setIsLoading(false);

    }

    getUser();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>No user</div>;
  }

  const firstLetterInFirstName = user.firstName.charAt(0);
  const firstLetterILastnName = user.lastName.charAt(0);

  return (
    <div className={styles.wrapper}>
      <div style={{backgroundImage: `url(${user.profileImage})`}} 
      className="profile-background">
      </div>
        <div className={styles.headerContent}>
            <p className={styles.flname}>{user.firstName} {user.lastName}</p>
            <p className={styles.username}>@{user.username}</p>
        </div>
      <div></div>

      <div className="test">
        <ProfileTabs></ProfileTabs>
      </div>
    </div>
  );
}

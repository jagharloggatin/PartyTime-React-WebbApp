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
    async function fetchData() {
      try {
        setIsLoading(true);
        const res = await reqCtx.getRequest(ENDPOINTS.getUser(userCtx.ReadJWT().userId));
        const data = await res.json();
        setUser(data);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
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
    <div>
      <div className="profile-background"></div>
      <div className={styles.header}>
        <div className={styles.headerAvatar}>
          <Avatar sx={{ bgcolor: deepOrange[500], width: 120, height: 120 }}>
            {firstLetterInFirstName}
            {firstLetterILastnName}
          </Avatar>
        </div>
        <div className={styles.headerContent}>
          <h2>
            {user.firstName} {user.lastName}
          </h2>
          <h3>@{user.username}</h3>
        </div>
      </div>
      <div></div>

      <div className="test">
        <ProfileTabs></ProfileTabs>
      </div>
    </div>
  );
}

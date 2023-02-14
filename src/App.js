import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import UserList from 'routes/apiTest';
import ProfileActivitiesTab from 'routes/ProfileActivitiesTab';
import { default as ProfileCommentsTab, default as ProfileHomeTab } from 'routes/ProfileCommentsTab';
import ProfileFavoritesTab from 'routes/ProfileFavoritesTab';
import ProfileReviewsTab from 'routes/ProfileReviewsTab';
import SettingsRoute from 'routes/SettingsRoute';
import './App.scss';
import AppNewActivityForm from './components/activities/AppNewEvent';
import AppHeader from './components/AppHeader';
import ActivitiesRoute from './routes/ActivitiesRoute';
import FavoritesRoute from './routes/FavoritesRoute';
import HomeRoute from './routes/HomeRoute';
import LoginRoute from './routes/LoginRoute';
import MapRoute from './routes/MapRoute';
import ProfileRoute from './routes/ProfileRoute';
import SelectedActivityRoute from './routes/SelectedActivityRoute';
import { default as SigninRoute, default as SignupRoute } from './routes/SignupRoute';

function App() {
  function initMap() {
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8,
    });
  }

  window.initMap = initMap;


  useEffect(() => {
  });

  return (
    <div className="wrapper">
      <AppHeader></AppHeader>
      <Routes>
        <Route path="/" element={<HomeRoute />} />
        <Route path="/api" element={<UserList />} />
        <Route path="/map" element={<MapRoute />} />
        <Route path="/profile" element={<ProfileRoute />}>
          <Route index element={<ProfileActivitiesTab />} />
          <Route path="/profile/activities" element={<ProfileActivitiesTab />} />
          <Route path="/profile/favorites" element={<ProfileFavoritesTab />} />
          <Route path="/profile/comments" element={<ProfileCommentsTab />} />
          <Route path="/profile/review" element={<ProfileReviewsTab />} />
        </Route>
        <Route path="/login" element={<LoginRoute />} />
        <Route path="/settings" element={<SettingsRoute />} />
        <Route path="/signup" element={<SignupRoute />} />
        <Route path="/events/location/:id" element={<ActivitiesRoute />} />
        <Route path="/new-events" element={<AppNewActivityForm />} />
        <Route path="/favorites" element={<FavoritesRoute />} />
        <Route path="/events/selected" element={<SelectedActivityRoute />} />
      </Routes>
    </div>
  );
}

export default App;

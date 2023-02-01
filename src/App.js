import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UserList from 'routes/apiTest';
import './App.scss';
import AppHeader from './components/AppHeader';
import HomeRoute from './routes/HomeRoute';
import LoginRoute from './routes/LoginRoute';
import MapRoute from './routes/MapRoute';
import ProfileRoute from './routes/ProfileRoute';
import { default as SigninRoute, default as SignupRoute } from './routes/SignupRoute';
import ActivitiesRoute from './routes/ActivitiesRoute';
import AppNewActivityForm from './components/activities/AppNewActivityForm';
import AppFavorites from './components/activities/AppFavorites';

function App() {
  return (
    <div className="wrapper">
      <AppHeader></AppHeader>
      <Routes>
        <Route path="/" element={<HomeRoute />} />
        <Route path="/api" element={<UserList />} />
        <Route path="/map" element={<MapRoute />} />
        <Route path="/profile" element={<ProfileRoute />} />
        <Route path="/login" element={<LoginRoute />} />
        <Route path="/signup" element={<SignupRoute />} />
        <Route path="/activities" element={<ActivitiesRoute />} />
        <Route path="/new-activity" element={<AppNewActivityForm />} />
        <Route path="/favorites" element={<AppFavorites />} />
      </Routes>
    </div>
  );
}

export default App;

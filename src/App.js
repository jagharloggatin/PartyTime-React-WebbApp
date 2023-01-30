import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginRoute from 'routes/LoginRoute';
import ProfileRoute from 'routes/ProfileRoute';
import { default as SigninRoute, default as SignupRoute } from 'routes/SignupRoute';
import './App.scss';
import AppHeader from './components/AppHeader';
import HomeRoute from './routes/HomeRoute';
import MapRoute from './routes/MapRoute';

function App() {
  return (
    <div className="wrapper">
      <AppHeader></AppHeader>
      <Routes>
        <Route path="/" element={<HomeRoute />} />
        <Route path="/map" element={<MapRoute />} />
        <Route path="/profile" element={<ProfileRoute />} />
        <Route path="/login" element={<LoginRoute />} />
        <Route path="/signup" element={<SignupRoute />} />
      </Routes>
    </div>
  );
}

export default App;

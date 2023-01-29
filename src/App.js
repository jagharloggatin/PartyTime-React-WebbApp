import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import AppHeader from './Components/AppHeader';
import HomeRoute from './Routes/HomeRoute';
import LoginRoute from './Routes/LoginRoute';
import MapRoute from './Routes/MapRoute';
import ProfileRoute from './Routes/ProfileRoute';
import { default as SignupRoute } from './Routes/SignupRoute';

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

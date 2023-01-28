import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProfileRoute from 'routes/ProfileRoute';
import './App.scss';
import AppHeader from './components/AppHeader';
import HomeRoute from './routes/HomeRoute';
import MapRoute from './routes/MapRoute';

function App() {
  return (
    <div className="page">
      <AppHeader></AppHeader>
      <Routes>
        <Route path="/" element={<HomeRoute />} />
        <Route path="/map" element={<MapRoute />} />
        <Route path="/profile" element={<ProfileRoute />} />
      </Routes>
    </div>
  );
}

export default App;

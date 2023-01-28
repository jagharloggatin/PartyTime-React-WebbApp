import { Route, Routes } from 'react-router-dom';

import HomeRoute from './routes/HomeRoute';
import MapRoute from './routes/MapRoute';

import React from 'react';
import './App.css';
import AppHeader from './components/AppHeader';

function App() {
  return (
    <div className="page">
      <AppHeader></AppHeader>
      <Routes>
        <Route path="/" element={<HomeRoute />} />
        <Route path="/map" element={<MapRoute />} />
      </Routes>
    </div>
  );
}

export default App;

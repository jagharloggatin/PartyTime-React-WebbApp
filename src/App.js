import { Routes, Route } from "react-router-dom";

import HomeRoute from "./routes/HomeRoute";
import MapRoute from "./routes/MapRoute";

import "./App.css";
import Menu from "components/Menu";
import React from "react";

function App() {
  return (
    <div className="page">
      <div className="header">
        <Menu></Menu>
      </div>
      <Routes>
        <Route path="/" element={<HomeRoute />} />
        <Route path="/map" element={<MapRoute />} />
      </Routes>
    </div>
  );
}

export default App;

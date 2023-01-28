import { Routes, Route } from 'react-router-dom';

import HomeRoute from './Routes/HomeRoute';

import logo from './logo.svg';
import './App.css';

function App()
{
  return (
    <Routes>
      <Route path='/' element={<HomeRoute />}/>
    </Routes>
  );
}

export default App;

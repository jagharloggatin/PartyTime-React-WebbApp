import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { LocationContextProvider } from 'store/LocationContext';
import { RequestContextProvider } from 'store/RequestContext';
import { StorageContextProvider } from 'store/StorageContext';
import { UserContextProvider } from 'store/UserContext';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { FavoritesContextProvider } from './store/FavoritesContext';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <LocationContextProvider>
    <StorageContextProvider>
      <UserContextProvider>
        <RequestContextProvider>
          <FavoritesContextProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </FavoritesContextProvider>
        </RequestContextProvider>
      </UserContextProvider>
    </StorageContextProvider>
  </LocationContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux'
import appStore from './utils/appStore'
import { BrowserRouter as Router} from "react-router-dom";
import {LocationProvider} from './utils/LocationContext'
import {RestNameProvider} from './utils/RestNameContext'
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

let persistor = persistStore(appStore);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={appStore}>
    <PersistGate persistor={persistor}>
   <div className='min-h-[100vh] flex flex-col gap-[4rem]'>
   <RestNameProvider>
    <Router>
    <LocationProvider>
    <App />
   </LocationProvider>
   </Router>
  </RestNameProvider>
   </div>
   </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

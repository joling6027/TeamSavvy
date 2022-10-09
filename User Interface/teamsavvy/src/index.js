import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import "./assets/css/nucleo-icons.css";
// import "./react-notification-alert/dist/animate.css";
// import "./assets/scss/black-dashboard-pro-react.scss?v=1.2.0";
import "./assets/demo/demo.css";


import App from './App';
import Login from './components/Login';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Login/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

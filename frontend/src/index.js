import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './Redux/store'
import { Provider } from "react-redux";
import { getCurrentUser } from './Redux/Auth/authActions';
const persistedAuthState = localStorage.getItem('authState');
const initialState = persistedAuthState
  ? JSON.parse(persistedAuthState)
  : {
    user: null,
    isLoggedIn: false,
    loading: false,
    error: null
  };
if (initialState.isLoggedIn)
  store.dispatch(getCurrentUser());
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

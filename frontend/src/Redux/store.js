// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Auth/authSlicer';

const store = configureStore({
  reducer: {
    auth: authReducer // Pass the slice reducer as the value for the 'auth' key
  }
});

export default store;

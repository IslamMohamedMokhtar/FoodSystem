import { createSlice } from '@reduxjs/toolkit';
import {
    login,
    getCurrentUser,
    signup,
    signout
} from './authActions';

// Check local storage for persisted authentication state
const persistedAuthState = localStorage.getItem('authState');
const initialState = persistedAuthState
  ? JSON.parse(persistedAuthState)
  : {
      user: null,
      isLoggedIn: false,
      loading: false,
      error: null
    };
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.user = action.payload;
        localStorage.setItem('authState', JSON.stringify(state));
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.user = action.payload;
        if (action.payload.error === 'Unauthorized') {
          state.loading = false;
          state.isLoggedIn = false;
          state.user = null;
          localStorage.removeItem('authState');
        }
        else
          localStorage.setItem('authState', JSON.stringify(state));
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.user = action.payload;
        localStorage.setItem('authState', JSON.stringify(state));
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(signout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signout.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = false;
        state.user= null;
        localStorage.removeItem('authState');
      })
      .addCase(signout.rejected, (state, action) => {
        state.loading = false;
        state.isLoggedIn = false;
        state.user= null;
        state.error = action.payload;
        localStorage.removeItem('authState');
      });
  },
});

export default authSlice.reducer;

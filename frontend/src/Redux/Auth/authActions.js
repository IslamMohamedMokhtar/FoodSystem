// authActions.js
import axios from 'axios';
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCurentUserUrl, logInUrl, signOutUrl, signUpUrl } from "../../Common/constants";
import { toast } from 'react-toastify';
import HTMLResponseUtil from '../../Util/HttpResposeUtil';
const success = (message) => toast.success(message);
const error = (message) => toast.error(message);

export const login = createAsyncThunk("auth/login",

    async ({ email, password, callback }) => {
        const loginData = { email, password };
        const response = await axios.post(logInUrl, loginData, { withCredentials: true });
        localStorage.setItem('user', JSON.stringify(response.data.result.user));
        localStorage.setItem('isLoggedIn', true);
        callback();
        console.log(HTMLResponseUtil({Task: login, statusCode: response.status}));
        success(login);
        return response.data.result.user;
    }
);
export const getCurrentUser = createAsyncThunk(
    'auth/getCurrentUser',
    async () => {
        const response = await axios.get(getCurentUserUrl, { withCredentials: true });
        localStorage.setItem('user', JSON.stringify(response.data.result.user));
        localStorage.setItem('isLoggedIn', true);
        return response.data.result.user;
    }
);
export const signup = createAsyncThunk(
    'auth/signup',
    async ({ email, password, username, callback }) => {
        const signUpData = { email, password, username };
        const response = await axios.post(signUpUrl, signUpData, { withCredentials: true });
        localStorage.setItem('user', JSON.stringify(response.data.result.user));
        localStorage.setItem('isLoggedIn', true);
        callback();
        return response.data.result.user;
    }
);
export const signout = createAsyncThunk(
    'auth/signout',
    async () => {
        const response = await axios.get(signOutUrl, { withCredentials: true });
        localStorage.removeItem('jwt');
        localStorage.removeItem('user');
        localStorage.removeItem('isLoggedIn');
    }
);


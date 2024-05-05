// authActions.js
import axios from 'axios';
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCurentUserUrl, logInUrl, signOutUrl, signUpUrl } from "../../Common/constants";
import { toast } from 'react-toastify';
import HTMLResponseUtil from '../../Util/HttpResposeUtil';
import parseError from '../../Util/ErrorParserUtil';
import { useDispatch } from 'react-redux';
const success = (message) => toast.success(message);
const failed = (message) => toast.error(message);
export const login = createAsyncThunk("auth/login",

    async ({ email, password, callback }) => {
        try {
            const loginData = { email, password };
            const response = await axios.post(logInUrl, loginData, { withCredentials: true });
            callback();
            success(HTMLResponseUtil({ Task: 'login', statusCode: response.status }));
            return response.data.result.user;
        }
        catch (error) {
            console.log(HTMLResponseUtil({ Task: 'login', statusCode: (error.response?.status || 500) }));
            failed(HTMLResponseUtil({ Task: 'login', statusCode: error.response?.status || 500 , extraMessage: `incorrect username or password`}));
            throw new Error(error);
        }
    }
);
export const getCurrentUser = createAsyncThunk(
    'auth/getCurrentUser',
    async () => {
        try {
        const response = await axios.get(getCurentUserUrl, { withCredentials: true });
        return response.data.result.user;
    }
    catch (error) {
        if (error.response && error.response.status === 401) {
            console.log('error',error);
            if (error.response && error.response.status === 401) {
                // Dispatch the signout action if unauthorized
                return { error: 'Unauthorized' };
            }
        }
        throw new Error(error);
    }
    }
);
export const signup = createAsyncThunk(
    'auth/signup',
    async ({ email, password, username, callback }) => {
        try {
            const signUpData = { email, password, username };
            const response = await axios.post(signUpUrl, signUpData, { withCredentials: true });
            success(HTMLResponseUtil({ Task: 'signup', statusCode: response.status }));
            callback();
            return response.data.result.user;
        } catch (error) {
            failed(HTMLResponseUtil({ Task: 'signup', statusCode: (error.response?.status || 500) , extraMessage: parseError(error.response.data.error)}));
            throw new Error(error);
        }

    }
);
export const signout = createAsyncThunk(
    'auth/signout',
    async () => {
        await axios.get(signOutUrl, { withCredentials: true });
    }
);


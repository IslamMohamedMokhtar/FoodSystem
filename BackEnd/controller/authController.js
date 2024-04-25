var jwt = require('jsonwebtoken');
const { createToken } = require('../service/tokenService');
const Auth = require('../model/auth');
const Profile = require('../model/profile');
const { handleErrors } = require('../service/handleErrors');
const { responseBuilder } = require("../service/responseBuilder");
const { authErrors, userRoleEnum } = require('../constants');
const mongoose = require('mongoose');

const signUpGet = (req, res) => {
    res.send('sign_up')
}

const maxAge = 60 * 1000 * 60;
const signUpPost = async (req, res) => {
    const { email, password, userRole, username } = req.body;
    const session = await mongoose.startSession();
    try {
        await session.startTransaction();

        // Create a new user in the Auth collection
        const newUser = new Auth({ email, password, userRole });
        const user = await newUser.save({ session });

        // Create a new profile with the user's ID
        const newProfile = new Profile({ userName: username, userId: user._id });
        await newProfile.save({ session });

        // Commit the transaction
        await session.commitTransaction();
        session.endSession();

        // Generate JWT token
        const token = createToken(user._id, maxAge);
        console.log('Generated Token:', token);

        // Set JWT token in cookie
        res.cookie('jwt', token, {
            httpOnly: true,
            expires: new Date(Date.now() + maxAge),
        });

        // Send response with user data
        res.status(200).json(responseBuilder({ result: { user } }));
    } catch (error) {
        // Rollback transaction if there's an error
        await session.abortTransaction();
        session.endSession();

        // Send error response
        res.status(500).json(responseBuilder({ error: handleErrors(error, authErrors) }));
    }
};


const signInGet = (req, res) => {
    res.send('sign_in');
}

const signInPost = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await Auth.login(email, password);
        const token = createToken(user._id, maxAge);
        res.cookie('jwt', token, {
            expires: new Date(Date.now() + maxAge)
        });
        res.send(responseBuilder({ result: { user: user } }));
    } catch (error) {
        res.status(401).json(responseBuilder({error:handleErrors(error, authErrors)}));
    }
}
const signOut = (req, res) => {
    res.clearCookie('jwt');
    // Redirect to the home page or any other page after sign-out
    res.redirect('/');
}

module.exports = {
    signUpGet,
    signUpPost,
    signInGet,
    signInPost,
    signOut
};
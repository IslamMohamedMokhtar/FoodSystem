const express = require('express');
const authcontroller = require('../controller/authController');


const router = express.Router();
    
router.get('/signup',authcontroller.signUpGet);
router.post('/signup',authcontroller.signUpPost);
router.get('/login',authcontroller.signInGet);
router.post('/login',authcontroller.signInPost);
router.get('/signout',authcontroller.signOut);
module.exports = router;
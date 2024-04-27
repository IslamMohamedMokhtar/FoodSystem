const express = require('express');
const userController = require('../controller/userController');
const {verifyTokenWithCookie} = require('../middle_ware/authMiddleware');
const {checkRole} = require('../middle_ware/checkRoleMiddleware');
const {userRoleEnum} = require('../constants');

const router = express.Router();

router.get('/filter', verifyTokenWithCookie, checkRole(userRoleEnum.Admin), userController.userIndexByFilter);
router.get('/getCurentUser', verifyTokenWithCookie, userController.getCurentUser);
router.get('/:id', verifyTokenWithCookie, checkRole(userRoleEnum.Admin), userController.userDetails);

module.exports = router;

const express = require('express');
const menuController = require('../controller/menuController');
const {verifyTokenWithCookie} = require('../middle_ware/authMiddleware');
const {checkRole} = require('../middle_ware/checkRoleMiddleware');
const {userRoleEnum} = require('../constants');

const router = express.Router();

router.get('/', verifyTokenWithCookie, menuController.menuIndex);
router.post('/', verifyTokenWithCookie, checkRole(userRoleEnum.Admin), menuController.menuPost);
router.get('/filter', verifyTokenWithCookie, menuController.menuIndexByFilter);
router.get('/:id', verifyTokenWithCookie, menuController.menuDetails);
router.patch('/:id', verifyTokenWithCookie, checkRole(userRoleEnum.Admin),menuController.menuUpdate);
router.delete('/:id', verifyTokenWithCookie, checkRole(userRoleEnum.Admin),menuController.menuDelete);

module.exports = router;

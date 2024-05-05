const express = require('express');
const bookingController = require('../controller/bookingController');
const {verifyTokenWithCookie} = require('../middle_ware/authMiddleware');
const {checkRole} = require('../middle_ware/checkRoleMiddleware');
const {userRoleEnum} = require('../constants');

const router = express.Router();

router.get('/', verifyTokenWithCookie, bookingController.bookingIndex);
router.post('/', verifyTokenWithCookie, checkRole(userRoleEnum.Customer), bookingController.bookingPost);
router.get('/filter', verifyTokenWithCookie, bookingController.bookinIndexByFilter);
router.patch('/updateBookingStatus/:id', verifyTokenWithCookie, bookingController.bookingStatusUpdate);
router.get('/:id', verifyTokenWithCookie, bookingController.bookingDetails);
router.patch('/:id', verifyTokenWithCookie,bookingController.bookingUpdate);
router.delete('/:id', verifyTokenWithCookie,bookingController.bookingDelete);

module.exports = router;

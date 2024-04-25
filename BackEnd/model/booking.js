const mongoose = require('mongoose');
const { bookingStatusEnum } = require('../constants');
const {isMobilePhone} = require('validator');
const validator = require('validator');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    customerName: {
        type: String,
        required: true
    },
    customerPhone: {
        type: String,
        required: true,
        validate: [isMobilePhone, "please enter a valid mobile number"]
    },
    bookedTime:{
        type: String,
        validate: [validator.isTime, "please enter a valid time"],
        required: true
    },
    bookedDate:{
        type: Date,
        required: true
    },
    totalPerson:{
        type: Number,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Auth',
        required: true,
        validate: {
            validator: async function (value) {
                const auth = await mongoose.model('Auth').findById(value);
                return auth !== null;
            },
            message: 'Invalid createdBy value'
        }
    },
    bookingStatus:{
        type: String,
        enum: [bookingStatusEnum.Accepted, bookingStatusEnum.Pending, bookingStatusEnum.Rejected],
        default: bookingStatusEnum.Pending
    },
    acceptedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Auth',
        default: null
    }
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;

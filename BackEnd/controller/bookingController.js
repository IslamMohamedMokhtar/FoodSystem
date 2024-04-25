const { bookingErrors, bookingStatusEnum } = require('../constants');
const { handleErrors } = require('../service/handleErrors');
const { responseBuilder } = require('../service/responseBuilder');
const Booking = require('../model/booking');

const bookingPost = async (req, res) => {
    const createdBy = req.userID;
    const { customerName, customerPhone, bookedTime, bookedDate, totalPerson } = req.body;
    try {
        const response = await Booking.create({ customerName, customerPhone, bookedTime, bookedDate, totalPerson, createdBy });
        return res.status(200).json(responseBuilder({ result: { Booking: response } }));
    } catch (error) {
        return res.status(400).json(responseBuilder({ error: handleErrors(error, bookingErrors) }));
    }
};

const bookingDetails = (req, res) => {
  const id = req.params.id.toString();
  Booking.findById(id)
    .then(response => {
      if (response) {
        return res.json(responseBuilder({ result: { Booking: response } }));
      } else {
        return res.status(400).json(responseBuilder({ error: 'Booking not found' }));
      }
    })
    .catch(error => {
      return res.status(500).send(responseBuilder({ error: handleErrors(error, bookingErrors) }));
    });
};

const bookingStatusUpdate = async (req, res) => {
  const id = req.params.id.toString();
  const { bookingStatus } = req.body;
  const acceptedBy = req.userID;
  try {
    const response = await Booking.findByIdAndUpdate(id, { bookingStatus, acceptedBy }, {new: true, runValidators: true});
    if (response) {
        return res.json(responseBuilder({ result: { Booking: response } }));
      } else {
        return res.status(400).json(responseBuilder({ error: 'Booking not found' }));
      }  
    } catch (error) {
      console.log(error);
    return res.status(500).send(responseBuilder({ error: handleErrors(error, bookingErrors) }));
  }
};

const bookingUpdate = async (req, res) => {
  const id = req.params.id.toString();
  const { customerName, customerPhone, bookedTime, bookedDate, totalPerson } = req.body;
  
  const bookingStatus = bookingStatusEnum.Pending;
  try {
    const response = await Booking.findByIdAndUpdate(id, { customerName, customerPhone, bookedTime, bookedDate, totalPerson, bookingStatus }, { new: true });
    if (response) {
        return res.json(responseBuilder({ result: { Booking: response } }));
      } else {
        return res.status(400).json(responseBuilder({ error: 'booking not found' }));
      }  
    } catch (error) {
    return res.status(500).send(responseBuilder({ error: handleErrors(error, bookingErrors) }));
  }
};

const bookingDelete = async (req, res) => {
  const id = req.params.id.toString();

  try {
    const response =await Booking.findByIdAndDelete(id);
    return res.json(responseBuilder({ result: { Booking: response } }));
  } catch (error) {
    if (error?.status)
      return res.status(error.status).json(responseBuilder({ error: [{ errorMessage: error.error }] }));
    return res.status(500).json(responseBuilder({ error: handleErrors(error, bookingErrors) }));
  }
};



const bookingIndex = (req, res) => {
  Booking.find().sort({ createdAt: -1 })
    .then(response => {
      return res.json(responseBuilder({ result: { Booking: response } }));
    })
    .catch(error => {
      return res.status(500).send(responseBuilder({ error: handleErrors(error, bookingErrors) }));
    });
};



module.exports = {
  bookingPost,
  bookingDetails,
  bookingIndex,
  bookingUpdate,
  bookingDelete,
  bookingStatusUpdate
};
// BookingModel.js
export class BookingModel {
    constructor({_id = null, customerName = null, customerPhone = null, bookedTime = null, bookedDate = null, totalPerson = null, createdBy = null, acceptedBy = null, bookingStatus = null, error = null}) {
      this._id = _id;
      this.customerName = customerName;
      this.customerPhone = customerPhone;
      this.bookedTime = bookedTime;
      this.bookedDate = bookedDate;
      this.totalPerson = totalPerson;
      this.createdBy = createdBy;
      this.acceptedBy = acceptedBy;
      this.bookingStatus = bookingStatus;
      this.error = error;
    }
  }

  export default class BookingResponseListModel{
    constructor({ result = {Booking: [] }, error = null, message = null, totalSize = null }) {
        this.result = {
          Bookings: result.Booking ? result.Booking.map(bookingData => new BookingModel(bookingData)) : []
          };   
        this.error = error;
        this.message = message;
        this.totalSize = totalSize;
    }
  }
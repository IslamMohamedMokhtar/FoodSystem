import { useSelector } from 'react-redux';
import { BookingModel } from '../Models/BookingModel';
import DateTimeUtil from '../Util/DateTimeUtil';
import './Book.scss';
import AuthModel from '../Models/AuthModel';
import { bookingStatusEnum, userRoleEnum } from '../Common/constants';
import Dialog from '../Common/Dialog';
import { useState } from 'react';
import image from '../assets/image/default-profile-pic.jpg';
import useAddBooking from '../Service/useBooking';
import Loading from '../Common/Loading';
export default function BookingCard({ booking }) {
    const bookingModel = new BookingModel(booking);
    const { user } = useSelector((state) => state.auth);
    const authUser: AuthModel = user;
    const { updateBookingStatus, loading } = useAddBooking();
    const [showDialog, setOpenModal] = useState(false);
    const updateStatus = async ({ bookingStatus }) => {
        await updateBookingStatus({ bookingStatus, bookingId: bookingModel._id });
        window.location.reload();
    }
    const getColor = () => {
        let color = "gray";
        switch (bookingModel.bookingStatus) {
            case bookingStatusEnum.Accepted:
                color = "green";
                break;
            case bookingStatusEnum.Rejected:
                color = "red";
                break;
        }
        return color;
    }
    console.log("authUser", authUser);
    return (
        <>
            <div className="card rounded-5">
                <div className="px-8 my-7 d-flex">
                    <div className='col-6'>
                        <div className='d-flex gap-2 align-items-center'>
                            <img src={image} className='rounded-circle profilePic mb-4' alt="Profile Picture" />
                            {bookingModel.customerName && <p className="card-text text-dark fs-7 fw-bolder  mb-4">{bookingModel.customerName}</p>}
                        </div>
                        <div className=' mb-4'> {bookingModel.bookedDate && <span className="card-text text-lightskin me-2"> <i className="fa fa-calendar"></i> {DateTimeUtil.DateConvert(bookingModel.bookedDate)}</span>}
                            <span className="card-title text-secondary fw-bold">{bookingModel.bookedTime && <>{bookingModel.bookedTime}</>}</span></div>
                        {bookingModel.bookingStatus && <div className=' mb-4'> <h6 className={`card-text text-${getColor()}`}>{bookingModel.bookingStatus}</h6></div>}
                        <div>
                            <a className='text-dark' type="button" onClick={() => setOpenModal(true)}>
                                View details
                            </a>
                        </div>
                    </div>

                    <div className='col-6'>
                        {authUser.userRole === userRoleEnum.Admin &&
                            <> {!loading && <div className="d-flex justify-content-end align-items-end gap-3 h-100">
                                <a className='btn  custom-dialog-btn red' onClick={() => updateStatus({ bookingStatus: bookingStatusEnum.Rejected })}>
                                    <i className="fas fa-times icon" ></i>
                                </a>
                                <a className='btn custom-dialog-btn green' onClick={() => updateStatus({ bookingStatus: bookingStatusEnum.Accepted })}>
                                    <i className="fa fa-check"></i>
                                </a>
                            </div>}
                                {loading &&
                                    <div className="d-flex justify-content-end align-items-end gap-3 h-100">
                                        <Loading />
                                    </div>}
                            </>}
                    </div>
                    {showDialog && <Dialog setOpenModal={setOpenModal}>
                        <div className="d-flex flex-column">
                            <div className='d-flex gap-2 align-items-center'>
                                <img src={image} className='rounded-circle profilePic mb-4' alt="Profile Picture" />
                                <ul className='list-unstyled'>
                                    <li className="card-text text-dark fs-7 fw-bolder">{bookingModel.customerName}</li>
                                    <li><h6 className="card-text text-secondary mt-4"> <i className="fas fa-users"></i> {bookingModel.totalPerson}</h6></li>
                                    <li><h6 className="card-text text-dark mt-4"> <i className="fas fa-phone" style={{ transform: "scaleX(-1)" }}></i> {bookingModel.customerPhone}</h6></li>
                                </ul>
                            </div>
                            {bookingModel.bookedDate && <div className=' mb-4'> <h6 className="card-text text-lightskin"> <i className="fa fa-calendar"></i> {DateTimeUtil.DateConvert(bookingModel.bookedDate)}</h6></div>}
                            <span className="card-title text-secondary mb-4">Time: {bookingModel.bookedTime && <>{bookingModel.bookedTime}</>}</span>
                            {bookingModel.bookingStatus && <div className=' mb-4'> <h6 className={`card-text text-${getColor()}`}>{bookingModel.bookingStatus}</h6></div>}
                            {authUser.userRole === userRoleEnum.Admin &&
                                <>
                                    <hr />
                                    {!loading && <div className="d-flex justify-content-center gap-3 h-100">
                                        <a className='btn custom-dialog-btn red' onClick={() => { updateStatus({ bookingStatus: bookingStatusEnum.Rejected }); }}>
                                            <i className="fas fa-times icon"></i>
                                        </a>
                                        <a className='btn custom-dialog-btn green' onClick={() => { updateStatus({ bookingStatus: bookingStatusEnum.Accepted }); }}>
                                            <i className="fa fa-check"></i>
                                        </a>
                                    </div>}
                                    {loading && <div className="d-flex justify-content-center gap-3 h-100">
                                        <Loading />
                                    </div>}
                                </>}
                        </div>
                    </Dialog>}
                </div>
            </div>
        </>
    );
}

import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { bookingsUrl } from '../Common/constants.js';
import { useDispatch, useSelector } from 'react-redux';
import { signout } from '../Redux/Auth/authActions.js';
import HTMLResponseUtil from '../Util/HttpResposeUtil.js';
import parseError from '../Util/ErrorParserUtil.js';
import BookingResponseListModel from '../Models/BookingModel.js';
import AuthModel from '../Models/AuthModel.js';

const useAddBooking = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const successNotify = (message) => toast.success(message);
    const failedNotify = (message) => toast.warning(message);
    const addBooking = async (formData) => {
        console.log(formData, "formData");
        try {
            setLoading(true);
            // Make POST request to your backend API endpoint to add the booking
            const response = await axios.post(bookingsUrl, formData, {
                withCredentials: true
            });
            // Handle success response
            successNotify(HTMLResponseUtil({ Task: 'Booking', statusCode: response.status }));

            return response.data; // Return the response data
        } catch (error) {
            // Handle error
            if (axios.isCancel(error)) return;
            if (error.response && error.response.status === 401) {
                dispatch(signout());
            }
            failedNotify(HTMLResponseUtil({ Task: 'Booking', statusCode: (error.response?.status || 500), extraMessage: parseError(error.response.data.error) }));
        }
        finally {
            setLoading(false);
        }
    };
    const updateBookingStatus = async ({ bookingStatus, bookingId }) => {
        try {
            setLoading(true);
            const response = await axios.patch(bookingsUrl + `/updateBookingStatus/${bookingId}`, { bookingStatus }, {
                withCredentials: true
            });
            // Handle success response
            successNotify(HTMLResponseUtil({ Task: 'Booking', statusCode: response.status }));
            return;
        } catch (error) {
            // Handle error
            if (axios.isCancel(error)) return;
            if (error.response && error.response.status === 401) {
                dispatch(signout());
            }
            failedNotify(HTMLResponseUtil({ Task: 'Booking', statusCode: (error.response?.status || 500), extraMessage: parseError(error.response.data.error) }));
        }
        finally {
            setLoading(false);
        }
    };
    return { addBooking, updateBookingStatus, loading };
};

export default useAddBooking;

export function useBookingFetch(userID, pageNumber, isAdmin) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [booking, setBooking] = useState([]);
    const [hasMore, setHasMore] = useState(false);
    const { user } = useSelector((state) => state.auth);
    if (!isAdmin) {
        const authUser: AuthModel = user;
        userID = authUser._id;
    }
    const dispatch = useDispatch();
    var bookingList = new BookingResponseListModel([]);
    // const successNotify = (message) => toast.success(message);
    const failedNotify = (message) => toast.warning(message);
    useEffect(() => {
        setBooking([]); // Reset booking when userID changes
    }, [userID]);

    useEffect(() => {
        setLoading(true);
        setError(null);
        let cancel;
        let filterData = { pageNumber, pageSize: 20 };
        if (userID) {
            filterData = { userID, pageNumber, pageSize: 20 }
        }
        axios.get(bookingsUrl + "/filter", {
            params: filterData,
            withCredentials: true,
            cancelToken: new axios.CancelToken(c => (cancel = c)),
        })
            .then(res => {
                // Concatenate new booking items to the existing booking array
                bookingList = new BookingResponseListModel({ result: res.data.result, totalSize: res.data.totalSize });
                const updatedBookings = [...booking, ...bookingList.result.Bookings];
                setBooking(updatedBookings);
                setHasMore(booking.length < bookingList.totalSize);
            })
            .catch(error => {
                if (axios.isCancel(error)) return;
                setError(true);
                if (error.response && error.response.status === 401) {
                    dispatch(signout());
                }
                failedNotify(HTMLResponseUtil({ Task: 'booking', statusCode: (error.response?.status || 500), extraMessage: parseError(error.response.data.error) }));
            })
            .finally(() => setLoading(false)); // Update loading state to false

        return () => cancel(); // Cancel the axios request when component unmounts or dependency changes
    }, [userID, pageNumber]); // Include booking as a dependency

    return { loading, error, booking, hasMore };
}

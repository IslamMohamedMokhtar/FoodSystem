import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { bookingsUrl } from '../Common/constants';
import { useDispatch } from 'react-redux';
import { signout } from '../Redux/Auth/authActions';
import HTMLResponseUtil from '../Util/HttpResposeUtil';
import parseError from '../Util/ErrorParserUtil';

const useAddBooking = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const successNotify = (message) => toast.success(message);
    const failedNotify = (message) => toast.warning(message);
    const addBooking = async (formData) => {
        console.log(formData,"formData");
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
            failedNotify(HTMLResponseUtil({ Task: 'Booking', statusCode: (error.response?.status || 500) , extraMessage: parseError(error.response.data.error)}));
        }
        finally{
            setLoading(false);
        }
    };

    return {addBooking, loading};
};

export default useAddBooking;

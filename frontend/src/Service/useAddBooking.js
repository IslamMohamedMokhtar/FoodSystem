import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { bookingsUrl } from '../Common/constants';
import { useDispatch } from 'react-redux';
import { signout } from '../Redux/Auth/authActions';

const useAddBooking = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const successNotify = () => toast.success("success");
    const failedNotify = () => toast.warning("failed");
    const addBooking = async (formData) => {
        console.log(formData,"formData");
        try {
            setLoading(true);
            // Make POST request to your backend API endpoint to add the booking
            const response = await axios.post(bookingsUrl, formData, {
                withCredentials: true
            });
            // Handle success response
            successNotify();
            return response.data; // Return the response data
        } catch (error) {
            // Handle error
            if (axios.isCancel(error)) return;
            setError(true);
            if (error.response && error.response.status === 401) {
                dispatch(signout());
            }
            failedNotify();
        }
        finally{
            setLoading(false);
        }
    };

    return addBooking;
};

export default useAddBooking;

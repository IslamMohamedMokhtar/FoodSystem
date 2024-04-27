import axios from "axios";
import { useEffect, useState } from "react";
import { signout } from "../Redux/Auth/authActions";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import HTMLResponseUtil from "../Util/HttpResposeUtil";
import parseError from "../Util/ErrorParserUtil";
import { userUrl } from "../Common/constants";
import UserResponse from "../Models/UserModel";

export default function useUserFetch(pageNumber) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [users, setUsers] = useState([]);
    const [hasMore, setHasMore] = useState(false);
    const dispatch = useDispatch();
    var userResponse = new UserResponse({});
    // const successNotify = (message) => toast.success(message);
    const failedNotify = (message) => toast.warning(message);
    useEffect(() => {
        setUsers([]); // Reset menu when type changes
    }, []);
    useEffect(() => {
        setLoading(true);
        setError(null);
        let cancel;
        const filterData = { pageNumber, pageSize: 20 };
    
        axios.get(userUrl + "/filter", {
            params: filterData,
            withCredentials: true,
            cancelToken: new axios.CancelToken(c => (cancel = c)),
        })
        .then(res => {
            // Concatenate new users to the existing users array
            userResponse = new UserResponse({result: res.data.result, totalSize: res.data.totalSize});
            console.log('userResponse:::', userResponse);
            const updatedUsers = [...users, ...userResponse.result.users]; // Combine existing users with newly fetched users
            setUsers(updatedUsers); 
            // Set hasMore based on the length of the updatedUsers array
            setHasMore(updatedUsers.length < userResponse.totalSize);
        })
        .catch(error => {
            if (axios.isCancel(error)) return;
            setError(true);
            if (error.response && error.response.status === 401) {
                dispatch(signout());
            }
            failedNotify(HTMLResponseUtil({ Task: 'User', statusCode: (error.response?.status || 500), extraMessage: parseError(error.response.data.error) }));
        })
        .finally(() => setLoading(false)); // Update loading state to false
    
        return () => cancel(); // Cancel the axios request when component unmounts or dependency changes
    }, [pageNumber]); // Include pageNumber as a dependency
    

    return { loading, error, users, hasMore };
}

import axios from "axios";
import { useEffect, useState } from "react";
import { menuUrl } from "../Common/constants";
import { signout } from "../Redux/Auth/authActions";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import HTMLResponseUtil from "../Util/HttpResposeUtil";
import parseError from "../Util/ErrorParserUtil";

export default function useMenuFetch(type, pageNumber) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [menu, setMenu] = useState([]);
    const [hasMore, setHasMore] = useState(false);
    const dispatch = useDispatch();
    // const successNotify = (message) => toast.success(message);
    const failedNotify = (message) => toast.warning(message);
    useEffect(() => {
        setMenu([]); // Reset menu when type changes
    }, [type]);

    useEffect(() => {
        setLoading(true);
        setError(null);
        let cancel;
        const filterData = { type, pageNumber, pageSize: 20 };

        axios.get(menuUrl + "/filter", {
            params: filterData,
            withCredentials: true,
            cancelToken: new axios.CancelToken(c => (cancel = c)),
        })
        .then(res => {
            // Concatenate new menu items to the existing menu array
            setMenu(prevMenu => [...prevMenu, ...res.data.result.product]);
            setHasMore(menu.length < res.data.totalSize);
        })
        .catch(error => {
            if (axios.isCancel(error)) return;
            setError(true);
            if (error.response && error.response.status === 401) {
                dispatch(signout());
            }
            failedNotify(HTMLResponseUtil({ Task: 'Menu', statusCode: (error.response?.status || 500) , extraMessage: parseError(error.response.data.error)}));
        })
        .finally(() => setLoading(false)); // Update loading state to false

        return () => cancel(); // Cancel the axios request when component unmounts or dependency changes
    }, [type, pageNumber]); // Include menu as a dependency

    return { loading, error, menu, hasMore };
}

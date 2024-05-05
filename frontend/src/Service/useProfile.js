import axios from "axios";
import { useState } from "react";
import { profileUrl } from "../Common/constants.js";
import { signout } from "../Redux/Auth/authActions.js";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import ProfileModel from "../Models/ProfileModel.js";
import HTMLResponseUtil from "../Util/HttpResposeUtil.js";
import parseError from "../Util/ErrorParserUtil.js";

const successNotify = (message) => toast.success(message);
const failedNotify = (message) => toast.warning(message);
export function useProfileFetch() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [profile, setProfile] = useState([]);
    const dispatch = useDispatch();
    const profileModel = new ProfileModel();
    const commit=async()=>{
        setLoading(true);
        setError(null);
        try{
        const res = await axios.get(profileUrl + "/getByUser", {
            withCredentials: true,
        })
            // Concatenate new menu items to the existing menu array
            setProfile(res.data.result.profile);
            profileModel.profile = res.data.result.profile;
            console.log('profileModel'+profileModel.profile.userName);
        }catch(error){
            setError(true);
            if (error.response && error.response.status === 401) {
                dispatch(signout());
            }
            failedNotify(HTMLResponseUtil({ Task: 'Profile', statusCode: (error.response?.status || 500) , extraMessage: parseError(error.response.data.error)}));
            profileModel.error = error;
        }finally{setLoading(false)}; // Update loading state to false
        return profileModel;
    }

    return { loading, error, profile, commit };
}

export function useProfilePost() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [profile, setProfile] = useState([]);
    const dispatch = useDispatch();
    const commit=(formData)=>{
        if(formData!=null){
        setLoading(true);
        setError(null);
        let cancel;
        console.log("formData");
        console.log(formData);
        axios.patch(profileUrl + "/putByUser",formData, {
            withCredentials: true,
            cancelToken: new axios.CancelToken(c => (cancel = c)),
        })
        .then(res => {
            // Concatenate new menu items to the existing menu array
            setProfile(res.data.result.profile);
            successNotify(HTMLResponseUtil({ Task: 'uploading Profile', statusCode: res.status }));
        })
        .catch(error => {
            if (axios.isCancel(error)) return;
            setError(true);
            if (error.response && error.response.status === 401) {
                dispatch(signout());
            }
            failedNotify(HTMLResponseUtil({ Task: 'uploading Profile', statusCode: (error.response?.status || 500) , extraMessage: parseError(error.response.data.error)}));
        })
        .finally(() => setLoading(false)); // Update loading state to false

        return () => cancel(); // Cancel the axios request when component unmounts or dependency changes
    }
}
    return { loading, error, profile, commit };
}
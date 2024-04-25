import axios from "axios";
import { useEffect, useState } from "react";
import { profileUrl } from "../Common/constants";
import { signout } from "../Redux/Auth/authActions";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import ProfileModel from "../Models/ProfileModel";

const successNotify = () => toast.success("success");
const failedNotify = () => toast.warning("failed");
export  function useProfileFetch() {
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
            successNotify();
        })
        .catch(error => {
            if (axios.isCancel(error)) return;
            setError(true);
            if (error.response && error.response.status === 401) {
                dispatch(signout());
            }
        })
        .finally(() => setLoading(false)); // Update loading state to false

        return () => cancel(); // Cancel the axios request when component unmounts or dependency changes
    }
}
    return { loading, error, profile, commit };
}
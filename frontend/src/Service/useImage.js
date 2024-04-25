import axios from "axios";
import { useEffect, useState } from "react";
import { pictureUrl } from "../Common/constants";
import { signout } from "../Redux/Auth/authActions";
import { useDispatch } from "react-redux";
import PictureModel from "../Models/PictureModel";

export function useProfilePicPost() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [profilePictureUrl, setProfilePictureUrl] = useState(null);
    const dispatch = useDispatch();

    const commit = async (profilePicture) => {
        if (profilePicture != null) {
            const pictureModel = new PictureModel();
            setLoading(true);
            setError(null);
            const formData = new FormData();
            formData.append('Pic', profilePicture);
            try {
                const res = await axios.post(pictureUrl + `/uploadPic`, formData, {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                });
                pictureModel.picUrl = res.data.picUrl
            } catch (error) {
                if (axios.isCancel(error)) return;
                setError(true);
                pictureModel.error = error;
                if (error.response && error.response.status === 401) {
                    dispatch(signout());
                }
            } finally {
                setLoading(false);
            }
            return pictureModel;
        }
    };

    return { loading, error, profilePictureUrl, commit };
}

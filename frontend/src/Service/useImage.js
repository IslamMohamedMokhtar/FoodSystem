import axios from "axios";
import { useState } from "react";
import { pictureUrl } from "../Common/constants";
import { signout } from "../Redux/Auth/authActions";
import { useDispatch } from "react-redux";
import PictureModel from "../Models/PictureModel";
import HTMLResponseUtil from "../Util/HttpResposeUtil";
import parseError from "../Util/ErrorParserUtil";
import { toast } from "react-toastify";

export function useProfilePicPost() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    // const successNotify = (message) => toast.success(message);
    const failedNotify = (message) => toast.warning(message);

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
                failedNotify(HTMLResponseUtil({ Task: 'UploadingPicture', statusCode: (error.response?.status || 500) , extraMessage: parseError(error.response.data.error)}));
            } finally {
                setLoading(false);
            }
            return pictureModel;
        }
    };

    return { loading, error, commit };
}

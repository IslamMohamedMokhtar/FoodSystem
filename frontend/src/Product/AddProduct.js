import { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import imag from '../assets/image/default-profile-pic.jpg'
import { useProfileFetch, useProfilePost } from '../Service/useProfile';
import { useProfilePicPost } from '../Service/useImage';
import { baseUrl, menuTypeEnum } from '../Common/constants';
import Loading from '../Common/Loading';
import PictureModel from '../Models/PictureModel';
import ProfileModel from '../Models/ProfileModel';
import Select from 'react-select';

export default function AddProduct() {
    const [imagePreview, setImagePreview] = useState(imag);
    const { loading: profilePostLoading, commit } = useProfilePost();
    const { loading: imageLoading, commit: commitProfilePic } = useProfilePicPost();
    const [imageSrc, setImageSrc] = useState(null);
    const productType = [
        { value: menuTypeEnum.Breakfast, label: "Breakfast" },
        { value: menuTypeEnum.Desserts, label: "Desserts" },
        { value: menuTypeEnum.Drinks, label: "Drinks" },
        { value: menuTypeEnum.MainDish, label: "Main Dish" }
    ];
    const [formData, setFormData] = useState({
        name: '',
        type: productType[0],
        userProfilePicUrl: null
    });

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImageSrc(file);
        console.log(file);
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    const handleChange = (e, actionMeta, selectedOptions) => {
        console.log(e, actionMeta, selectedOptions);
        if (actionMeta && actionMeta.name) {
            const selectedValue = Array.isArray(selectedOptions) ?
                selectedOptions.map(option => option.value) :
                selectedOptions.value;
            setFormData(prevData => ({
                ...prevData,
                [actionMeta.name]: selectedValue
            }));
        } else if (actionMeta && actionMeta.target) {
            const { value, name } = actionMeta.target;
            setFormData(prevData => ({
                ...prevData,
                [name]: value
            }));
        } else {
            const { value, name } = e.target;
            setFormData(prevData => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e, additionalArg) => {
        e.preventDefault();
        if (imageSrc !== null) {
            const profilePictureUrl: PictureModel = await commitProfilePic(imageSrc);
            if (!profilePictureUrl.error) {
                console.log('profilePictureUrl: ' + profilePictureUrl.picUrl);
                const newFormData = {
                    name: '',
                    userProfilePicUrl: null
                };
                newFormData.name = formData.name;
                newFormData.userProfilePicUrl = profilePictureUrl.picUrl;
                if (profilePictureUrl.picUrl !== '')
                    await commit(newFormData);
            }
        }
        else {
            const newFormData = {
                name: ''
            };
            newFormData.name = formData.name;
            await commit(newFormData);
        }
    };
    return (
        <>
            <div className="bg-primary">
                <div className="d-flex justify-content-center">
                    <div className="col-lg-5 text-center px-lg-5 mb-80 mt-80">
                        <h1 className='fs-100 font-Playfair'>Add Product</h1>
                    </div>
                </div>
                <div className="d-flex flex-wrap justify-content-center">
                    <form className="col-xl-5 col-lg-6 col-11 bg-white shadow row g-3 p-9 rounded-5  mb-80" onSubmit={handleSubmit}>
                        <div className="col-md-12">
                            <div className=' d-flex justify-content-center'>
                                <div className="profile-picture-container">
                                    <img src={imagePreview} className='rounded-circle profilePic' alt="Profile Picture" />

                                    <label htmlFor="inputProfilePicture" className="profile-picture-label btn">
                                        <i className="fas fa-camera"></i>
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="form-control rounded-pill profile-picture-input"
                                        id="inputProfilePicture"
                                        name="profilePicture"
                                        onChange={handleFileChange}
                                        style={{ display: 'none' }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="inputname" className="form-label">name</label>
                            <input type="string"
                                className="form-control rounded-pill"
                                id="inputname"
                                placeholder="Enter name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange} required />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="inputType" className="form-label">Time</label>
                            <Select
                                styles={{
                                    control: (provided) => ({
                                        ...provided,
                                        borderRadius: '20px'
                                    }),
                                    singleValue: (provided) => ({
                                        ...provided,
                                        borderRadius: '20px'
                                    }),
                                    indicatorSeparator: (provided) => ({
                                        ...provided,
                                        display: 'none' // Hide the indicator separator
                                    })

                                }}
                                id="inputType" 
                                name="type" 
                                value={formData.type} 
                                onChange={(selectedOption, actionMeta) => handleChange(selectedOption, actionMeta, "type")} 
                                options={productType}  required/>
                        </div>
                        <div className="col-12">
                            {!profilePostLoading && !imageLoading && (<button type="submit" className="btn btn-secondary w-100 rounded-pill py-3">Save</button>)}
                            {(profilePostLoading || imageLoading) && (<Loading />)}
                        </div>
                    </form>
                </div>
                <div className="contact-us-background-container bg-white">
                </div>
            </div>
        </>
    );
}

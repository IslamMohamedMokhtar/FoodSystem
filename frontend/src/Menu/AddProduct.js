import { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import imag from '../assets/image/default-profile-pic.jpg'
import { useProfilePicPost } from '../Service/useImage';
import { baseUrl, menuTypeEnum } from '../Common/constants';
import Loading from '../Common/Loading';
import PictureModel from '../Models/PictureModel';
import Select from 'react-select';
import './Menu.scss';
import { useMenu } from '../Service/useMenuFetch';
import { useLocation } from 'react-router-dom';
import ProductModel from '../Models/MenuModel';
export default function AddProduct() {
    const location = useLocation();
    const menuId = location.state?.menuId || null;

    const [imagePreview, setImagePreview] = useState(imag);
    const { loading: menuPostLoading, addMenu, getMenu, updateMenu } = useMenu();

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
        picUrl: null,
        price: 0,
        description: ''
    });
    useEffect(() => {
        if (menuId) {
            getMenu({ menuId })
                .then((menuData) => {
                    var productModel = new ProductModel(menuData);
                    setImagePreview(baseUrl + "/" + productModel.picUrl);
                    const type = productType.find((productTypeItem) => productTypeItem.value === productModel.type);
                    productModel.type = type;
                    setFormData(productModel)
                })
        }
    }, [])

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
        setFormData(prevData => {
            if (selectedOptions) {
                return {
                    ...prevData,
                    [actionMeta.name]: e
                };
            }
            else if (actionMeta && actionMeta.name) {
                // Handle react-select component
                const selectedValue = Array.isArray(selectedOptions) ?
                    selectedOptions.map(option => option.value) :
                    selectedOptions.value;
                return {
                    ...prevData,
                    [actionMeta.name]: selectedValue
                };
            } else if (actionMeta && actionMeta.target) {
                // Handle regular input element
                const { value, name } = actionMeta.target;
                return {
                    ...prevData,
                    [name]: value
                };
            } else {
                // Handle other cases, such as direct input change without actionMeta
                const { value, name } = e.target;
                return {
                    ...prevData,
                    [name]: value
                };
            }
        });
        console.log(formData);
    };
    const uploadPic = async () => {
        const pictureUrl: PictureModel = await commitProfilePic(imageSrc);
        return pictureUrl
    }
    const initializeForm = () => {
        return {
            name: '',
            type: null,
            picUrl: '',
            price: 0,
            description: ''
        };
    }
    const fillForm = (newFormData, formData, pictureUrl) => {
        newFormData.name = formData.name;
        newFormData.type = formData.type.value;
        newFormData.picUrl = pictureUrl.picUrl;
        newFormData.price = formData.price;
        newFormData.description = formData.description;
        return newFormData;
    }
    const handleSubmit = async (e, additionalArg) => {
        e.preventDefault();
        if (menuId !== null) {
            if (imageSrc !== null) {
                const pictureUrl = await uploadPic();
                if (!pictureUrl.error) {
                    console.log('profilePictureUrl: ' + pictureUrl.picUrl);
                    var newFormData = initializeForm();
                    newFormData = fillForm(newFormData, formData, pictureUrl);
                    if (newFormData.picUrl !== '')
                        await updateMenu({ formData: newFormData, menuId: menuId });
                    window.location.reload();
                }
            } else {
                var newFormData = initializeForm();
                newFormData = fillForm(newFormData, formData, formData.picUrl);
                await updateMenu({ formData: newFormData, menuId: menuId });
                window.location.reload();
            }

        }
        else {
            if (imageSrc !== null) {
                const pictureUrl = await uploadPic();
                if (!pictureUrl.error) {
                    console.log('profilePictureUrl: ' + pictureUrl.picUrl);
                    var newFormData = initializeForm();
                    newFormData = fillForm(newFormData, formData, pictureUrl);
                    if (newFormData.picUrl !== '')
                        await addMenu(newFormData);
                }
            }
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
                                        style={{ display: 'none' }} />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <label htmlFor="inputName" className="form-label">Name</label>
                            <input type="string"
                                className="form-control rounded-pill"
                                id="inputName"
                                placeholder="Enter name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange} required />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="inputType" className="form-label">Type</label>
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
                                options={productType} required />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="inputPrice" className="form-label">price in $</label>
                            <input type="number"
                                className="form-control rounded-pill"
                                id="inputPrice"
                                placeholder='0'
                                name="price"
                                value={formData.price}
                                onChange={handleChange} required />
                        </div>
                        <div className="col-md-12">
                            <label htmlFor="inputDescription" className="form-label">Description</label>
                            <textarea type="string"
                                className="form-control rounded-pill resize-none"
                                id="inputDescription"
                                placeholder="Enter Description"
                                name="description"
                                value={formData.description}
                                rows={3}
                                onChange={handleChange} required />
                        </div>
                        <div className="col-12">
                            {!menuPostLoading && !imageLoading && (<button type="submit" className="btn btn-secondary w-100 rounded-pill py-3">Save</button>)}
                            {(menuPostLoading || imageLoading) && (<Loading />)}
                        </div>
                    </form>
                </div>
                <div className="contact-us-background-container bg-white">
                </div>
            </div>
        </>
    );
}

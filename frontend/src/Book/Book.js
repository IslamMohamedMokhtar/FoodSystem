import { useState } from 'react';
import './Book.scss';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCalendar } from 'react-icons/fa';
import Select from 'react-select';
import useAddBooking from '../Service/useAddBooking';
import Loading from '../Common/Loading';


export default function Book() {
    const {addBooking, loading} = useAddBooking();
    const yearOptions = [
        { value: '18:30', label: '06:30 PM' },
        { value: '06:30', label: '06:30 AM' }
    ];
    const totalPersonOptions = [
        { value: '1', label: '1 Person' },
        { value: '2', label: '2 Person' }
    ];
    const [formData, setFormData] = useState({
        customerPhone: '',
        customerName: '',
        totalPerson: totalPersonOptions[0],
        bookedTime: yearOptions[0],
        bookedDate: new Date()
    });
    const handleChange = (e, actionMeta, selectedOptions) => {
        console.log("hena",e, actionMeta, selectedOptions);
        setFormData(prevData => {
            if(selectedOptions){
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


    const handleDateChange = date => {
        setFormData(prevData => ({
            ...prevData,
            bookedDate: date
        }));
    };

    const handleSubmit = async (e, additionalArg) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form submitted:', formData);
        const newFormData = {
            customerPhone: '',
            customerName: '',
            totalPerson: '',
            bookedTime: '',
            bookedDate: ''
        };
        newFormData.customerName = formData.customerName;
        newFormData.totalPerson = formData.totalPerson.value;
        newFormData.customerPhone = formData.customerPhone;
        newFormData.bookedDate = formData.bookedDate;
        newFormData.bookedTime = formData.bookedTime.value;
        console.log(newFormData);
        await addBooking(newFormData);
    };
    const CustomInput = ({ value, onClick }) => (
        <div className="date-picker-container form-control rounded-pill">
            <input
                className="border-0 bg-transparent"
                id="inputDate"
                value={value}
                onClick={onClick}
                readOnly
                disabled
            />
            <FaCalendar className="calendar-icon" onClick={onClick} />
        </div>
    );
    return (
        <>
            <div className="bg-primary">
                <div className="d-flex justify-content-center">
                    <div className="col-lg-5 text-center px-lg-5 mb-80 mt-80">
                        <h1 className='fs-100 font-Playfair'>Book A Table</h1>
                        <p className='fs-7 px-lg-10'>We consider all the drivers of change gives you the components you need to change to create a truly happens.</p>
                    </div>
                </div>
                <div className="d-flex justify-content-center">
                    <form className="col-xl-5 col-lg-6 col-11 bg-white shadow row g-3 p-9 rounded-5" onSubmit={handleSubmit}>
                        <div className="col-md-6 d-flex flex-column">
                            <label htmlFor="col-12 inputDate" className="form-label">Date</label>
                            <DatePicker
                                selected={formData.bookedDate}
                                onChange={handleDateChange}
                                dateFormat="MM/dd/yyyy"
                                showPopperArrow={false}
                                customInput={<CustomInput />}
                             required/>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="inputBookedTime" className="form-label">Time</label>
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
                                id="inputBookedTime" 
                                name="bookedTime" 
                                value={formData.bookedTime} 
                                onChange={(selectedOption, actionMeta) => handleChange(selectedOption, actionMeta, "bookedTime")} 
                                options={yearOptions}  required/>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="inputCustomerName" className="form-label">Name</label>
                            <input type="text" 
                            className="form-control rounded-pill" 
                            id="inputCustomerName" 
                            placeholder="Enter your name" 
                            name="customerName" 
                            value={formData.customerName} 
                            onChange={handleChange}  required/>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="inputCustomerPhone" className="form-label">Phone</label>
                            <input type="tel" 
                            pattern="[0-9]{1}[0-9]{3}[0-9]{3}[0-9]{4}"
                            className="form-control rounded-pill" 
                            id="inputCustomerPhone" 
                            placeholder="x-xxx-xxx-xxxx" 
                            name="customerPhone" 
                            value={formData.customerPhone} 
                            onChange={handleChange} 
                            title="Please enter a valid mobile phone number in the format x-xxx-xxx-xxxx" required/>
                        </div>
                        <div className="col-md-12">
                            <label htmlFor="inputCity" className="form-label">City</label>
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

                                }} id="inputTotalPerson" 
                                name="totalPerson" 
                                value={formData.totalPerson} 
                                onChange={(selectedOption, actionMeta) => handleChange(selectedOption, actionMeta, "totalPerson")}
                                options={totalPersonOptions} required/>
                        </div>
                        <div className="col-12">
                            {!loading&&<button type="submit" className="btn btn-secondary w-100 rounded-pill py-3">Book A Table</button>}
                            {loading&&<Loading/>}
                        </div>
                    </form>
                </div>
                <div className="book-background-container">
                </div>
            </div>
            
        </>
    );
}

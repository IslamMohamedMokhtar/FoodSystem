import { useState } from 'react';
import './ContactUs.scss';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCalendar } from 'react-icons/fa';
import Select from 'react-select';


export default function ContactUs() {
    const [formData, setFormData] = useState({
        customerEmail: '',
        customerName: '',
        customerMessage: '',
        customerSubject: '',
    });
    const handleChange = (e, actionMeta, selectedOptions) => {
        console.log(e, actionMeta, selectedOptions);
        if (actionMeta && actionMeta.name) {
            // Handle react-select component
            const selectedValue = Array.isArray(selectedOptions) ?
                selectedOptions.map(option => option.value) :
                selectedOptions.value;
            setFormData(prevData => ({
                ...prevData,
                [actionMeta.name]: selectedValue
            }));
        } else if (actionMeta && actionMeta.target) {
            // Handle regular input element
            const { value, name } = actionMeta.target;
            setFormData(prevData => ({
                ...prevData,
                [name]: value
            }));
        } else {
            // Handle other cases, such as direct input change without actionMeta
            const { value, name } = e.target;
            setFormData(prevData => ({
                ...prevData,
                [name]: value
            }));
        }
    };


    const handleSubmit = async (e, additionalArg) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form submitted:', formData);
        const newFormData = {
            customerEmail: '',
            customerName: '',
            customerMessage: '',
            customerSubject: '',
        };
        newFormData.customerEmail = formData.customerEmail;
        newFormData.customerName = formData.customerName;
        newFormData.customerMessage = formData.customerMessage;
        newFormData.customerSubject = formData.customerSubject;
    };
    return (
        <>
            <div class="bg-primary">
                <div class="d-flex justify-content-center">
                    <div class="col-lg-5 text-center px-lg-5 mb-80 mt-80">
                        <h1 className='fs-100 font-Playfair'>Contact Us</h1>
                        <p className='fs-7 px-lg-10'>We consider all the drivers of change gives you the components you need to change to create a truly happens.</p>
                    </div>
                </div>
                <div class="d-flex flex-wrap justify-content-center">
                    <form className="col-xl-5 col-lg-6 col-11 bg-white shadow row g-3 p-9 rounded-5" onSubmit={handleSubmit}>
                        <div className="col-md-6">
                            <label htmlFor="inputCustomerName" className="form-label">Name</label>
                            <input type="text"
                                className="form-control rounded-pill"
                                id="inputCustomerName"
                                placeholder="Enter your name"
                                name="customerName"
                                value={formData.customerName}
                                onChange={handleChange} required />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="inputCustomerEmail" className="form-label">Email</label>
                            <input type="email"
                                className="form-control rounded-pill"
                                id="inputCustomerEmail"
                                placeholder="Enter email address"
                                name="customerEmail"
                                value={formData.customerEmail}
                                onChange={handleChange} required />
                        </div>
                        <div className="col-md-12">
                            <label htmlFor="inputCustomerSubject" className="form-label">Subject</label>
                            <input type="string"
                                className="form-control rounded-pill"
                                id="inputCustomerSubject"
                                placeholder="Write a subject"
                                name="customerSubject"
                                value={formData.customerSubject}
                                onChange={handleChange} required />
                        </div>
                        <div className="col-md-12">
                            <label htmlFor="inputCustomerMessage" className="form-label">Message</label>
                            <textarea type="text-area"
                                className="form-control rounded-5"
                                id="inputCustomerMessage"
                                placeholder="Write your message"
                                name="customerMessage"
                                value={formData.customerMessage}
                                onChange={handleChange}
                                rows="4" cols="50"
                                required />
                        </div>
                        <div className="col-12">
                            <button type="submit" className="btn btn-secondary w-100 rounded-pill py-3">Send</button>
                        </div>
                    </form>
                    <div class="col-12 d-flex flex-wrap justify-content-center align-items-center gap-5 mt-80">
                        <div className="col-auto">
                            <div className='fw-bold mb-2'>Call Us:</div>
                            <p className='text-secondary fw-bold'>+1-234-567-8900</p>
                        </div>
                        <div className="col-auto">
                            <div className='fw-bold mb-2'>Hours:</div>
                            <ul className='list-group list-unstyled'>
                                <li className=''>Mon-Fri: 11am - 8pm </li>
                                <li className=''>Sat, Sun: 9am - 10pm</li>
                            </ul>
                        </div>
                        <div className="col-auto">
                            <div className='fw-bold mb-2'>Our Location:</div>
                            <ul className='list-group list-unstyled'>
                                <li>123 Bridge Street</li>
                                <li>Nowhere Land, LA 12345</li>
                                <li>United States</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="contact-us-background-container bg-white">

                </div>
            </div>

        </>
    );
}

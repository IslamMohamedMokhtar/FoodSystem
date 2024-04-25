import './Footer.scss';
import logo from '../assets/image/logo-white.png'
import image1 from '../assets/image/footer-image1.png'
import image2 from '../assets/image/footer-image2.png'
import image3 from '../assets/image/footer-image3.png'
import image4 from '../assets/image/footer-image4.png'
import { Link, NavLink } from 'react-router-dom';
import Token from '../Token/Token';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signout } from '../Redux/Auth/authActions';

function Footer() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(prevShow => !prevShow);

    const { isLoggedIn } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    return (
        <>
            <div className="mh-778 bg-gray">
                <div className='container px-md-5 px-lg-0 d-flex'>
                    <div className='d-flex flex-wrap justify-content-between pt-120 gap-5'>
                        <div className='col-lg-3 d-flex flex-column pe-9'>
                            <NavLink  exact={true} to="/" className="navbar-brand d-flex align-items-center justify-content-center log-btn text-light logo2-btn" href="#">
                                <img src={logo} alt='logo' className='logo-aspect-ratio me-5' />
                                <h2 className='fst-italic fw-bolder logo-font mb-0'>Bistro Bliss</h2>
                            </NavLink>
                            <span className='mt-7 text-lightskin'>
                                In the new era of technology we look a in the future with certainty and pride to for our company and.
                            </span>
                            <ul className="list-unstyled gap-2 d-flex align-items-end social-nav2 mt-7">
                                <li>
                                    <a href="https://twitter.com/?lang=en" className='twitter'>
                                        <i className="fab fa-twitter icon"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="https://web.facebook.com/?_rdc=1&_rdr" className='facebook'>
                                        <i className="fab fa-facebook-f icon"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.instagram.com/" className='instagram'>
                                        <i className="fab fa-instagram icon"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="https://github.com/" className='github'>
                                        <i className="fab fa-github icon"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className='col-lg-1 d-flex flex-column align-items-center text-start'>
                            <ul className='list-unstyled '>
                                <li className='text-white'>
                                    Pages
                                </li>
                                <li className=' mt-9'>
                                    <Link to='/' type='button' className='btn item-lightgray' exact={true}>
                                        Home
                                    </Link>
                                </li>
                                <li >
                                    <Link to='/about' type='button' className='btn item-lightgray' exact={true}>
                                        About
                                    </Link>
                                </li>
                                <li >
                                    <Link to='/menu' type='button' className='btn item-lightgray' exact={true}>
                                        Menu
                                    </Link>
                                </li>
                                <li >
                                    <Link to='/pricing' type='button' className='btn item-lightgray' exact={true}>
                                        Pricing
                                    </Link>
                                </li>
                                <li >
                                    <Link to='/blog' type='button' className='btn item-lightgray' exact={true}>
                                        Blog
                                    </Link>
                                </li>
                                <li >
                                    <Link to='/contactus' type='button' className='btn item-lightgray' exact={true}>
                                        Contact
                                    </Link>
                                </li>
                                <li >
                                    <Link to='/delivery' type='button' className='btn item-lightgray' exact={true}>
                                        Delivery
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        {/* Utility Pages */}
                        <div className='col-lg-2 '>
                            <ul className='list-unstyled '>
                                <li className=' text-white'>
                                    Utility Pages
                                </li>
                                <li className=' mt-9'>
                                    <Link to='/' type='button' className='btn item-lightgray' exact={true}>
                                        Start Here
                                    </Link>
                                </li>
                                <li >
                                    <Link to='/help' type='button' className='btn item-lightgray' exact={true}>
                                        Styleguide
                                    </Link>
                                </li>
                                <li >
                                    <Link to='/password-protection' type='button' className='btn item-lightgray text-start' exact={true}>
                                        Password Protected
                                    </Link>
                                </li>
                                <li >
                                    <Link to='*' type='button' className='btn item-lightgray text-start' exact={true}>
                                        404 Not Found
                                    </Link>
                                </li>
                                <li >
                                    <Link to='/licenses' type='button' className='btn item-lightgray' exact={true}>
                                        Licenses
                                    </Link>
                                </li>
                                <li >
                                    <Link to='/changelog' type='button' className='btn item-lightgray' exact={true}>
                                        Changelog
                                    </Link>
                                </li>
                                <li >
                                    <Link to='/view-more' type='button' className='btn item-lightgray' exact={true}>
                                        View More
                                    </Link>
                                </li>
                                {!isLoggedIn && <>
                                    <li>
                                        <a type='button' href='#' className='btn item-lightgray' onClick={handleShow}>
                                            Login
                                        </a>
                                    </li>
                                </>}
                                {isLoggedIn && <>
                                    <li>
                                        <a type='button' href='#' className='btn item-lightgray' onClick={() => dispatch(signout())}>
                                            sign out
                                        </a>
                                    </li>
                                    <li>
                                        <Link type='button' className='btn item-lightgray' to='profile' exact={true}>
                                            profile
                                        </Link>
                                    </li>
                                </>}
                            </ul>
                        </div>
                        <div className='col-lg-4 text-white align-items-end'>
                            Follow Us On Instagram
                            <div className='d-flex flex-wrap gap-3 mt-9'>
                                <a href='#' className='col-auto'>
                                    <img src={image1} alt='footer-image-1' className='rounded-4 footer-image' />
                                </a>
                                <a href='#' className='col-auto'>
                                    <img src={image2} alt='footer-image-2' className='rounded-4 footer-image' />
                                </a>
                                <a href='#' className='col-auto'>
                                    <img src={image3} alt='footer-image-3' className='rounded-4 footer-image' />
                                </a>
                                <a href='#' className='col-auto'>
                                    <img src={image4} alt='footer-image-4' className='rounded-4 footer-image' />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-center text-lightskin pt-130">
                    Copyright © 2023 Hashtag Developer. All Rights Reserved
                </div>
            </div>
            <Token handleShow={show} handleClose={handleClose} />
        </>
    );
}

export default Footer;
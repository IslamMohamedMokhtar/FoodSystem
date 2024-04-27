import './Nav.scss';
import logo from '../assets/image/logo.png';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AuthModel from '../Models/AuthModel';
import { userRoleEnum } from '../Common/constants';

function Nav2() {
    const { isLoggedIn, user } = useSelector((state) => state.auth);
    const authUser: AuthModel = user;
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-primary mh-100" aria-label="Main navigation">
            <div className="container">
                <div className="d-flex flex-wrap w-100 pe-64">
                    <button className="navbar-toggler me-10" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="col-5">
                        <NavLink exact={true} to="/" className="navbar-brand d-flex align-items-center log-btn" href="#">
                            <img src={logo} alt='logo' className='logo-aspect-ratio' />
                            <h2 className='fst-italic fw-bolder text-gray logo-font ms-2 mb-0'>Bistro Bliss</h2>
                        </NavLink>
                    </div>

                    <div className="col-6 collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink exact={true} to="/" className="nav-link px-4 py-1" activeClassName="active">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/about" className="nav-link px-4 py-1" activeClassName="active">About</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/menu" className="nav-link px-4 py-1" activeClassName="active">Menu</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/pages" className="nav-link px-4 py-1" activeClassName="active">Pages</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/contactus" className="nav-link px-4 py-1" activeClassName="active">Contact</NavLink>
                            </li>
                            {authUser&&
                                authUser.userRole === userRoleEnum.Admin && <>
                                    <li className="nav-item">
                                        <NavLink to="/dashboard" className="nav-link px-4 py-1" activeClassName="active">Dashboard</NavLink>
                                    </li>
                                </>
                            }
                        </ul>
                        <NavLink to="/booking" className="btn btn-outline-dark fw-bold rounded-pill px-4 py-2" type="submit">Book A Table</NavLink>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Nav2;

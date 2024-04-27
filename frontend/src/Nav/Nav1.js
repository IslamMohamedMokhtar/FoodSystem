import { useState } from 'react';
import './Nav.scss';
import Token from '../Token/Token';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signout } from '../Redux/Auth/authActions';
function Nav1() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(prevShow => !prevShow);
    const { isLoggedIn } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    return (
        <>
            <div className="nav-scroller bg-gray shadow-sm" id='secondary-nav'>
                <nav className="nav navbar-expand-lg" aria-label="Secondary navigation">
                    <div className='container collapse navbar-collapse'>
                        <ul className="nav me-auto gap-2">
                            <li className="nav-item">
                                <a className="nav-link text-primary " href="tel:+14148570107">
                                    <i className="fas fa-phone me-3"></i>
                                    <span>(414) 857 - 0107</span></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-primary" href="mailto:yummy@bistrobliss">
                                    <i className="far fa-envelope me-3"></i>
                                    <span>yummy@bistrobliss</span>
                                </a>
                            </li>
                        </ul>
                        <ul className="nav gap-2 d-flex align-items-end social-nav">
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
                            {!isLoggedIn && <>
                                <li>
                                    <a type='button' className='github' onClick={handleShow}>
                                        <i className="fas fa-sign-in-alt icon"></i>
                                    </a>
                                </li>
                            </>}
                            {isLoggedIn && <>
                                <li>
                                    <a type='button' className='signout' onClick={() => dispatch(signout())}>
                                        <i class="fas fa-times icon"></i>
                                    </a>
                                </li>
                                <li>
                                    <NavLink type='button' className='profile' to='profile'>
                                        <i class="fa fa-user icon"></i>
                                    </NavLink>
                                </li>
                            </>}
                        </ul>
                    </div>
                </nav>
                <Token handleShow={show} handleClose={handleClose} />
            </div>
        </>
    );
}

export default Nav1;

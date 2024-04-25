import './Token.scss';
import { useState } from 'react';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye';
import Icon from 'react-icons-kit';
import Loading from '../Common/Loading';
import ReCAPTCHA from 'react-google-recaptcha';
import {login} from '../Redux/Auth/authActions';
import { useDispatch, useSelector } from 'react-redux';
function Login({ setIsSignup, setOpenModal }) {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [icon, setIcon] = useState(eye);
    const [type, setType] = useState('password');
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[\w\d\S]{6,}$/;
    const emailRegex = /\S+@\S+\.\S+/;

    const [isVerified, setIsVerified] = useState(false);

    const handleRecaptchaChange = (value) => {
        setIsVerified(true);
    };
    console.log(isVerified);
    // const { isPending, login } = useAuth();
    const {loading} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const handleToggle = () => {
        if (type === 'password') {
            setIcon(eyeOff);
            setType('text');
        } else {
            setIcon(eye);
            setType('password');
        }
    }

    const Submit = async (e) => {
        e.preventDefault();
        const passwordtest = passwordRegex.test(password);
        const emailtest = emailRegex.test(email);
        setIsPasswordValid(passwordtest);
        setIsEmailValid(emailtest);
        if (password !== "", email !== "") {
            if (isEmailValid !== false && isPasswordValid !== false) {
                dispatch(login({ email, password, callback: () => { setOpenModal(false); } }));
            }
        }
    }
    return (
        <>
                    <p className="title">Login</p>
                    <form className="form" onSubmit={(e) => { console.log("asdsd"); Submit(e); }}>
                        <div className="input-group">
                            <label htmlFor="username">Username</label>
                            <input type="text" id="username" placeholder="username" className='rounded-4'
                                name='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoComplete='current email'
                            />
                        </div>
                        {!isEmailValid && <div className='text-danger'><p>email is not valid</p></div>}
                        <div className="input-group inputPasswordDiv">
                            <label htmlFor="password">Password</label>
                            <input name="password" className='rounded-4'
                                id="inputPassword"
                                type={type}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="current-password" />
                            <span className="showPasswordIcon" onClick={handleToggle}>
                                <Icon icon={icon} />
                            </span>
                        </div>
                        {!isPasswordValid && <div className='text-danger'><p>Password is not valid</p></div>}
                            <div className='mt-3'>
                            <ReCAPTCHA
                                sitekey="6LcWkLgpAAAAAPA6LJ8MBAtRCpVQQursIMxsetn9"
                                onChange={handleRecaptchaChange}
                            />
                            </div>
                            <div className="forgot">
                                <a rel="noopener noreferrer" href="#">Forgot Password ?</a>
                            </div>
                        {!loading && <button type='submit' className="sign" disabled={!isVerified}>Sign in</button>}
                        {loading && <Loading />}
                    </form>
                    <ul className="nav gap-2 d-flex align-items-end social-nav social-message">
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
                    <p className="signup">Don't have an account?
                    <a type='button' onClick={() => { setIsSignup(true) }} class="flip">Sign up</a>
                    </p>
        </>
    );
}

export default Login;

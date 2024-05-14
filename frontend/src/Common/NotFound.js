import { Link } from 'react-router-dom';
import image from '../assets/image/not-found.png'
import './NotFound.scss'
function NotFound() {
    return (
        <>
            <div className="NotFoundpage d-flex font-Playfair justify-content-center align-items-center">
                <div className='d-flex flex-column align-items-center'>
                    <h1 className="text-secondary fs-100 fw-bold mb-10"> 404 <br/> Error</h1>
                    <Link className='btn btn-lightgray col-7 rounded-pill' to='/'>Back To Home</Link>
                </div>
                <div>
                    <img src={image} alt='not found image'></img>
                </div>
            </div>
        </>
    );
}

export default NotFound;

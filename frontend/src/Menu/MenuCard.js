import { useSelector } from 'react-redux';
import AuthModel from '../Models/AuthModel';
import { userRoleEnum } from "../Common/constants.js";
import './Menu.scss';
export default function MenuCard({ imageUrl, title, body, price }) {
    const { user } = useSelector((state) => state.auth);
    const authUser: AuthModel = user;
    return (
        <>
            <div className="card text-center rounded-5">
                {authUser.userRole == userRoleEnum.Admin &&
                    <div className='d-flex justify-content-end w-100'>
                        <a className='btn btn-darkgray edit-btn'>
                            <i class="fa fa-pen"></i>
                        </a>
                    </div>}
                {imageUrl && <img src={imageUrl} className="card-image mb-7" alt={`image of ${title}`} />}
                <div className="px-8 mb-7">
                    {price && <div className=' mb-4'> <h5 className="card-title text-secondary fw-bold">$ {price}</h5></div>}
                    {title && <div className=' mb-4'><h5 className="card-title text-black fw-bold">{title}</h5></div>}
                    {body && <p className="card-text text-dark fs-7">{body}</p>}
                </div>
                {authUser.userRole == userRoleEnum.Admin &&
                    <div className='d-flex justify-content-center gap-3 mb-7'>
                        <button className='btn btn-outline-red rounded-pill'>Delete</button>
                        <button className='btn btn-outline-green rounded-pill'>Update</button>
                    </div>
                }
            </div>

        </>
    );
}

import { Link } from 'react-router-dom';
import { baseUrl } from '../Common/constants';
import { UserWithProfileModel } from '../Models/UserModel';
import imag from '../assets/image/default-profile-pic.jpg';
import './Dashboard.scss';
export default function MenuCard({ userPreview }) {
    let userWithProfileModel:UserWithProfileModel = userPreview;
    let user = userWithProfileModel.auth;
    let profile = userWithProfileModel.profile;
    let profilePic = profile.userProfilePicUrl? `${baseUrl}/${profile.userProfilePicUrl}`:imag;
    return (
        <>
        <Link to={`/booking/${user._id}`} className='text-decoration-none'>
            <div className="card user-card text-center rounded-5 py-5 border-secondary d-flex align-items-center minh-500" key={user._id}>
            <img src={profilePic} className='rounded-circle profilePic' alt="Profile Picture" />
                <div className="px-8 mt-5 mb-7">
                    {profile.userName &&<div className=' mb-4'> <h4 className="card-title text-secondary fw-bold font-Playfair fs-2">{profile.userName}</h4></div>}
                    {user.userRole && <div className=' mb-4'><h5 className="card-title text-black fw-bolder">{user.userRole}</h5></div>}
                    <hr/>
                    {user.email &&<div className=' mb-4'> <h4 className="card-title text-darkgray fw-bolder font-Playfair">{user.email}</h4></div>}
                    {user.createdAt && <p className="card-text text-dark fs-7">createdAt: {user.createdAt}</p>}
                    {user.updatedAt && <div className="card-text text-dark fs-7">updatedAt: {user.updatedAt}</div>}
                </div>
            </div>
            </Link>
        </>
    );
}

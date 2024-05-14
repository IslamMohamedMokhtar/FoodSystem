import { useSelector } from 'react-redux';
import AuthModel from '../Models/AuthModel';
import { userRoleEnum } from "../Common/constants.js";
import './Menu.scss';
import { useMenu } from '../Service/useMenuFetch.js';
import { Link } from 'react-router-dom';
import Dialog from '../Common/Dialog.js';
import { useState } from 'react';
import Loading from '../Common/Loading.js';
export default function MenuCard({ _id, imageUrl, title, body, price }) {
    const { user } = useSelector((state) => state.auth);
    const { loading, deleteMenu } = useMenu();
    const [showDialog, setOpenModal] = useState(false);
    const authUser: AuthModel = user;
    const handleDelete = async () => {
        await deleteMenu({ menuId: _id });
        window.location.reload();
    }
    return (
        <>
            <div className="card text-center rounded-5">
                {authUser.userRole == userRoleEnum.Admin &&
                    <>{!loading && <div className='d-flex w-100 option-btn'>
                        <div className=''><a className='btn btn-red text-white rounded-circle' onClick={setOpenModal}>
                            <i className="fa fa-trash"></i>
                        </a></div>
                        <div className=''>
                            <Link className='btn btn-darkgray rounded-circle' to="/add-product" state={{ menuId: _id }}>
                                <i className="fa fa-pen"></i>
                            </Link></div>
                    </div>}</>}
                {imageUrl && <img src={imageUrl} className="card-image mb-7" alt={`image of ${title}`} />}
                <div className="px-8 mb-7">
                    {price && <div className=' mb-4'> <h5 className="card-title text-secondary fw-bold">$ {price}</h5></div>}
                    {title && <div className=' mb-4'><h5 className="card-title text-black fw-bold">{title}</h5></div>}
                    {body && <p className="card-text text-dark fs-7">{body}</p>}
                </div>
                {authUser.userRole == userRoleEnum.Admin &&
                    <div className='mb-7'>

                    </div>
                }
            </div>
            {showDialog && <Dialog setOpenModal={setOpenModal}>
                <hr />
                <div className='d-flex justify-content-between gap-3'>
                    {!loading && <><button className='btn btn-lightgray text-white' onClick={() => setOpenModal(false)}>cancel</button>
                    <button className='btn btn-secondary' onClick={handleDelete}>confirm</button></>}
                    {loading && <Loading />}
                </div>
            </Dialog>
            }
        </>
    );
}

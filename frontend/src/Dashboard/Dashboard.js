import { useState, lazy, Suspense } from 'react';
import Loading from '../Common/Loading';
import { menuTypeEnum } from '../Common/constants';
import { Link } from 'react-router-dom';
const MenuSectionOne = lazy(() => import('../Menu/MenuSectionOne'));
const DashboardSectionOne = lazy(() => import('./DashboardSectionOne'));

export default function Dashboard() {
    const [activeButton, setActiveButton] = useState('All');
    const [type, setType] = useState(null);

    const handleClick = (buttonName) => {
        setActiveButton(activeButton === buttonName ? '' : buttonName);
    };


    return (
        <>
            <Suspense fallback={<Loading />}>
                <DashboardSectionOne />
            </Suspense>
            <div className="d-flex flex-wrap flex-column justify-content-center align-items-center w-100">
                <div className="container-fluid px-lg-410">
                    <div className="d-flex justify-content-center mx-130 px-2">
                        <div className="font-Playfair text-center">
                            <h1 className="fs-100">Our Menu</h1>
                            <p>We consider all the drivers of change gives you the components you need to change to create a truly happens.</p>
                        </div>
                    </div>
                </div>
                <div className="d-flex gap-3 flex-wrap ">
                    <button className={`rounded-pill btn btn-outline-lightgray-custom ${activeButton === 'All' ? 'active' : ''}`} onClick={() => { handleClick('All'); setType(null) }}>All</button>
                    <button className={`rounded-pill btn btn-outline-lightgray-custom ${activeButton === 'Breakfast' ? 'active' : ''}`} onClick={() => { handleClick('Breakfast'); setType(menuTypeEnum.Breakfast) }}>Breakfast</button>
                    <button className={`rounded-pill btn btn-outline-lightgray-custom ${activeButton === 'Main Dishes' ? 'active' : ''}`} onClick={() => { handleClick('Main Dishes'); setType(menuTypeEnum.MainDish) }}>Main Dishes</button>
                    <button className={`rounded-pill btn btn-outline-lightgray-custom ${activeButton === 'Drinks' ? 'active' : ''}`} onClick={() => { handleClick('Drinks'); setType(menuTypeEnum.Drinks) }}>Drinks</button>
                    <button className={`rounded-pill btn btn-outline-lightgray-custom ${activeButton === 'Desserts' ? 'active' : ''}`} onClick={() => { handleClick('Desserts'); setType(menuTypeEnum.Desserts) }}>Desserts</button>
                </div>
            </div>
            <Suspense fallback={<div><Loading /></div>}>
                <MenuSectionOne type={type} />
            </Suspense>
            <div className="container mb-10 d-flex justify-content-end">
                <Link to="/add-product" className="btn icon-btn add-btn d-flex justify-content-center align-items-center">
                    <div className="add-icon"></div>
                    <div className="btn-txt">Add Product</div>
                </Link>
            </div>

        </>
    );
}

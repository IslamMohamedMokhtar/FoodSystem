import { useState, useRef, useEffect } from 'react';
import './Dashboard.scss';
import useUserFetch from '../Service/useUserFetch';
import { UserWithProfileModel } from '../Models/UserModel';
import UserCard from './UserCard';
import { Link } from 'react-router-dom';
import LoadingCard from '../Common/LoadingCard';

const Menu = () => {
    const scrollRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [pageNumber, setPageNumber] = useState(1);
    const [userPreview, setUserPreview] = useState([new UserWithProfileModel({})]);
    const { loading, users } = useUserFetch(pageNumber);

    useEffect(() => setPageNumber(1), []);

    useEffect(() => {
        console.log(users);
        if (!loading && users) {
            setUserPreview(users);
        }
    }, [users, loading]);

    const handleMouseDown = (e) => {
        e.preventDefault();
        setIsDragging(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft);
    };

    const handleTouchStart = (e) => {
        e.preventDefault();
        setIsDragging(true);
        setStartX(e.touches[0].pageX - scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft);
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX) * 1;
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleTouchMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.touches[0].pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX) * 1;
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    return (
        <div className='bg-primary py-2'>
            <div className='container'>
                <div
                    className="scrollView"
                    ref={scrollRef}
                    onMouseDown={handleMouseDown}
                    onTouchStart={handleTouchStart}
                    onMouseLeave={handleMouseLeave}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleMouseUp}
                >
                    {!loading && userPreview.length > [new UserWithProfileModel({})].length && (
                        <>
                            {userPreview.map((user) => {
                                return (
                                    <div className='item'><UserCard userPreview={user} /></div>
                                )
                            })}
                            <div className="card-center user-card item text-center rounded-5 py-5 border-dark">
                                <div className="px-8 mb-7">
                                    <div className='mb-4 '> 
                                    <Link to='/dashboard/users' className='btn '>
                                        <h3 className="card-title text-secondary fw-bold font-Playfair fs-3 d-flex align-items-center">view more
                                        <i className="fa fa-arrow-right ps-2"></i>
                                    </h3></Link></div>
                                </div>
                            </div>
                        </>
                    )}
                    {loading && Array.from({ length: 20 }).map((_, index) => (
                        <div className="card is-loading item rounded-5 border-secondary minh-500">
                            <LoadingCard>
                                <div className="image rounded-circle"></div>
                                <h3> </h3>
                                <h4> </h4>
                                <h2> </h2>
                                <h2> </h2>
                                <h2> </h2>
                            </LoadingCard>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Menu;

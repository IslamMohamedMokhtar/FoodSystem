import { useEffect, useRef, useState, useCallback } from "react";
import LoadingCard from "../Common/LoadingCard.js";
import { useBookingFetch } from "../Service/useBooking.js";
import './Book.scss'
import BookingCard from "./BookingCard.js";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import AuthModel from "../Models/AuthModel.js";
import { userRoleEnum } from "../Common/constants.js";

export default function BookingDisplay() {
    const { user } = useSelector((state) => state.auth);
    const authUser: AuthModel = user;
    const{userID} = useParams();
    const isAdmin = authUser.userRole == userRoleEnum.Admin;
    const [pageNumber, setPageNumber] = useState(1);
    useEffect(() => setPageNumber(1), [userID]);
    const { loading, booking, hasMore } = useBookingFetch(userID, pageNumber, isAdmin);
    const observer = useRef();
    useEffect(() => { }, [loading])
    const lastBookingCallRef = useCallback(node => {
        if (loading) return;
        if (observer.current) {
            observer.current.disconnect();
        }
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPageNumber(prevPageNumber => prevPageNumber + 1);
            }
        });
        if (node) observer.current.observe(node);
    }, [loading, hasMore]);

    return (
        <>
            <div className="container mt-90 mb-133 scroll-Y">
                <div className="d-flex flex-wrap gap-2">
                    {booking.map((bookingItem, index) => {
                        if (booking.length === index + 1) {
                            return <div ref={lastBookingCallRef} className="col-xl-5 col-12 mb-6">
                                <BookingCard booking={bookingItem} key={bookingItem._id} />
                            </div>;
                        } else {
                            return <div className="col-xl-5 col-12 mb-6">
                                <BookingCard booking={bookingItem} key={bookingItem._id} />
                            </div>;
                        }
                    })}
                    {loading &&
                        Array.from({ length: 3 }).map((_, index) => (
                            <div className="col-xl-5 col-12 mb-4 px-3">
                                <div className=" card rounded-5 is-loading">
                                    <LoadingCard>
                                        <h4> </h4>
                                        <h3> </h3>
                                        <h2 className="p-7"> </h2>
                                    </LoadingCard>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </>
    );
}

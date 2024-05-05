import { useEffect, useRef, useState, useCallback } from "react";
import useUserFetch from "../Service/useUserFetch.js";
import LoadingCard from "../Common/LoadingCard.js";
import UserCard from '../Dashboard/UserCard';

export default function User() {
    const [pageNumber, setPageNumber] = useState(1);
    useEffect(() => setPageNumber(1), []);

    const { hasMore, loading, users } = useUserFetch(pageNumber);

    const observer = useRef();
    const lastUserCallRef = useCallback(
        (node) => {
            if (loading) return;

            if (observer.current) {
                observer.current.disconnect();
            }

            observer.current = new IntersectionObserver((entries) => {
                console.log("hena:", hasMore);
                if (entries[0].isIntersecting && hasMore) {
                    setPageNumber((prevPageNumber) => prevPageNumber + 1);
                    console.log("prevPageNumber", pageNumber);
                }
            });

            if (node) observer.current.observe(node);
        },
        [loading, hasMore] // Include 'loading' and 'hasMore' as dependencies
    );

    return (
        <>
            <div className="container mt-90 mb-133">
                <div className="row">
                            {users.map((user, index) => (
                                <div
                                    ref={lastUserCallRef}
                                    key={user._id}
                                    className="col-xl-3 col-lg-4 col-12 mb-6"
                                >
                                    <div className="item">
                                        <UserCard userPreview={user} />
                                    </div>
                                </div>
                            ))}
                    {loading &&
                        Array.from({ length: 20 }).map((_, index) => (
                            <div
                                key={index}
                                className="card is-loading item rounded-5 border-secondary col-xl-3 col-lg-4 col-12 mb-6 mx-3"
                            >
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
        </>
    );
}

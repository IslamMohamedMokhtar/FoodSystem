import { useEffect, useRef, useState, useCallback } from "react";
import './Menu.scss';
import useMenuFetch from "../Service/useMenuFetch.js";
import { baseUrl } from "../Common/constants";
import MenuCard from "./MenuCard";
import LoadingCard from "../Common/LoadingCard.js";

export default function MenuSectionOne({ type }) {
    const [pageNumber, setPageNumber] = useState(1);
    useEffect(() => setPageNumber(1), [type]);
    const { loading, menu, hasMore } = useMenuFetch(type, pageNumber);
    const observer = useRef();
    useEffect(()=>{},[loading])
    const lastMenuCallRef = useCallback(node => {
        if (loading) return;
        if (observer.current) {
            observer.current.disconnect();
        }
        observer.current = new IntersectionObserver(entries => {
            console.log("hena:", hasMore);
            if (entries[0].isIntersecting && hasMore) {
                setPageNumber(prevPageNumber => prevPageNumber + 1);
                console.log("prevPageNumber", pageNumber);
            }
        });
        if (node) observer.current.observe(node);
    }, [loading, hasMore]);

    return (
        <>
            <div className="container mt-90 mb-133 scroll-Y">
                <div className="d-flex flex-wrap">
                    {menu.map((menuItem, index) => {
                        if (menu.length === index + 1) {
                            return <div ref={lastMenuCallRef} key={menuItem._id} className="col-xl-3 col-lg-4 col-12 mb-6 px-3">
                                <MenuCard imageUrl={`${baseUrl}/${menuItem.picUrl}`} title={menuItem.name} body={menuItem.description} price={menuItem.price} />
                            </div>;
                        } else {
                            return <div key={menuItem._id} className="col-xl-3 col-lg-4 col-12 mb-6 px-3">
                                <MenuCard imageUrl={`${baseUrl}/${menuItem.picUrl}`} title={menuItem.name} body={menuItem.description} price={menuItem.price} />
                            </div>;
                        }
                    })}
                    {loading &&
                        Array.from({ length: 3 }).map((_, index) => (
                            <div className="col-xl-3 col-lg-4 mb-4  px-3">
                    <div className=" card rounded-5 is-loading ">
                        <LoadingCard>
                            <div key={index} className="image img-100 mb-7"></div>
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

import { useEffect, useRef, useState, useCallback } from "react";
import './Menu.scss';
import Loading from "../Common/Loading";
import useMenuFetch from "../Service/useMenuFetch";
import { baseUrl } from "../Common/constants";
import MenuCard from "./MenuCard";

export default function MenuSectionOne({ type }) {
    const [pageNumber, setPageNumber] = useState(1);
    useEffect(() => setPageNumber(1), [type]);
    const { loading, menu, hasMore } = useMenuFetch(type, pageNumber);
    const observer = useRef();
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
            {loading && <Loading />}
            <div className="container mt-90 mb-133">
                <div className="row">
                    {menu.map((menuItem, index) => {
                        if (menu.length === index + 1) {
                            return <div ref={lastMenuCallRef} key={menuItem._id} className="col-xl-3 col-lg-4 col-12 mb-6">
                                <MenuCard imageUrl={`${baseUrl}/${menuItem.picUrl}`} title={menuItem.name} body={menuItem.description} price={menuItem.price} />
                            </div>;
                        } else {
                            return <div key={menuItem._id} className="col-xl-3 col-lg-4 col-12 mb-6">
                                <MenuCard imageUrl={`${baseUrl}/${menuItem.picUrl}`} title={menuItem.name} body={menuItem.description} price={menuItem.price} />
                            </div>;
                        }
                    })}
                </div>
            </div>
        </>
    );
}

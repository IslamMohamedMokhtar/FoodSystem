import './Menu.scss';
export default function MenuCard({ imageUrl, title, body, price }) {
    return (
        <>
            <div className="card text-center rounded-5">
                {imageUrl && <img src={imageUrl} className="card-image mb-7" alt={`image of ${title}`} />}
                <div className="px-8 mb-7">
                    {price &&<div className=' mb-4'> <h5 className="card-title text-secondary fw-bold">$ {price}</h5></div>}
                    {title && <div className=' mb-4'><h5 className="card-title text-black fw-bold">{title}</h5></div>}
                    {body && <p className="card-text text-dark fs-7">{body}</p>}
                </div>
            </div>

        </>
    );
}

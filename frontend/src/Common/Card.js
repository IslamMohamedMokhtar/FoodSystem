function Card({ imageUrl, title, body, toUrl }) {
    return (
        <>
            <div className="card text-center ">
                {imageUrl && <img src={imageUrl} className="card-img-top" alt="..." />}
                <div className="card-body">
                    {title && <h2 className="card-title text-dark font-Playfair fs-55">{title}</h2>}
                    {body && <p className="card-text text-dark">{body}</p>}
                    {toUrl && <a href={toUrl} className="btn btn-secondary">Go somewhere</a>}
                </div>
            </div>

        </>
    );
}

export default Card;

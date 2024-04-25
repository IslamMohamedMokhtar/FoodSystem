function HomeCard({ icon, title, body, toUrl, btnText }) {
    return (
        <div className="card rounded-4 border-2 border-lightgray">
            <div className="card-body d-flex flex-column align-items-center text-center gap-2">
                {icon && <>
                        {icon}</>
                    
                }
                {title && <h5 className="card-title text-black mt-7">{title}</h5>}
                {body && <p className="card-text text-dark">{body}</p>}
                {toUrl && <a href={toUrl} className="btn btn-outline-secondary border-0">{btnText}</a>}
            </div>
        </div>
    );
}

export default HomeCard;

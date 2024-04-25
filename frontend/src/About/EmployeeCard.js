import './About.scss';
export default function EmployeeCard({ imageUrl, title, body, employeeName, employeeLocation }) {
    return (
        <>
            <div className="card bg-primary border-0 rounded-5 employeeCard">
                <div className="card-body">
                    {title && <h6 className="card-title text-secondary font-Playfair fw-bold">“{title}”</h6>}
                    {body && <p className="card-text text-dark">{body}</p>}
                    <hr className="text-lightgray"/>
                    <div className="d-flex align-items-center gap-3">
                    {imageUrl && <img src={imageUrl} class="img-fluid rounded-circle circular-image employeeImage" alt="..." />}
                    <ul className="list-group list-unstyled">
                        <li className="fw-bold">{employeeName}</li>
                        <li>{employeeLocation}</li>
                    </ul>
                    </div>
                </div>
            </div>

        </>
    );
}


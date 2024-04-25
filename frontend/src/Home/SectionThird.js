import { Link } from 'react-router-dom';
import './Home.scss';

function SectionThird({ image }) {
    return (
        <div className='bg-primary'>
            <div className='d-flex container'>
                <div className='d-flex align-items-center flex-wrap mt-120 gap-5 justify-content-center'>
                    <div className='col-lg-7 col-12 pb-120 col-12'>
                        <div className=''>
                            <img src={image} className='section3-img img-fluid rounded-5' alt='food card background' />
                            <div className='card-body bg-gray rounded-4 p-9 p-md-5 position-absolute start-50 translate-middle' style={{ marginTop: "-7%", marginLeft: "-11%", minWidth: '20vw', maxHeight: '310px', maxWidth: '350px' }}>
                                <h5 className='card-title text-white fw-bold fs-6'>Come and visit us</h5>
                                <ul className='list-unstyled'>
                                    <li className="mt-8">
                                        <a className="btn text-primary d-flex align-items-center section3-card-btn" href="tel:+1414857-0107">
                                            <i className="fas fa-phone me-2"></i>
                                            <span>(414) 857 - 0107</span>
                                        </a>
                                    </li>
                                    <li className="mt-3">
                                        <a className="btn text-primary d-flex align-items-center section3-card-btn" href="mailto:yummy@bistrobliss">
                                            <i className="far fa-envelope me-2"></i>
                                            <span>yummy@bistrobliss</span>
                                        </a>
                                    </li>
                                    <li className="mt-3">
                                        <a className="btn text-primary d-flex align-items-center section3-card-btn" href="https://maps.app.goo.gl/qhgGqzhBH2wTeG616">
                                            <i className="fas fa-map-marker-alt me-2"></i>
                                            <span>837 W. Marshall Lane Marshalltown, IA 50158, Los Angeles</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-4 col-12 pb-120 col-12'>
                        <div className='ms-lg-5 mt-5 mt-lg-0'>
                            <h2 className='fw-bolder font-Playfair fs-2'>
                                We provide healthy food for your family.
                            </h2>
                            <div className='text-black fw-bolder mt-4'>
                                Our story began with a vision to create a unique dining experience that merges fine dining, exceptional service, and a vibrant ambiance. Rooted in the city's rich culinary culture, we aim to honor our local roots while infusing a global palate.
                            </div>
                            <div className='text-lightbrown mt-4'>
                                At place, we believe that dining is not just about food, but also about the overall experience. Our staff, renowned for their warmth and dedication, strives to make every visit an unforgettable event.
                            </div>
                            <div className='mt-6'>
                                <Link to="/about" className="btn btn-outline-dark fw-bold rounded-pill px-6 py-3" type="submit">More About Us</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SectionThird;

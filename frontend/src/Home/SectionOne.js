import { Link } from 'react-router-dom';
import './Home.scss'
function SectionOne() {
    return (
        <>
            <div class="background-container d-flex justify-content-center align-items-center">
    <div class="card bg-transparent border-0 card-container text-center">
        <div class="card-body d-flex flex-column align-items-center">
            <h1 class="font-Playfair fs-1 card-title">Best food for your taste</h1>
            <p class="card-text w-75">Discover delectable cuisine and unforgettable moments in our welcoming, culinary haven.</p>
            <div class="card-body d-flex gap-4">
                <Link to='booking' className='btn btn-secondary rounded-pill py-5 px-9 fw-bold'>Book A Table</Link>
                <Link to='menu' className='btn btn-outline-dark rounded-pill py-5 px-9 fw-bold'>Explore Menu</Link>
            </div>
        </div>
    </div>
</div>
        </>
    );
}

export default SectionOne;

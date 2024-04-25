import './Home.scss'
import HomeCard from './HomeCard';
function SectionSecond() {
    return (
        <>
            <div className="d-flex flex-column justify-content-center align-items-center bg-white m-0">
                <h2 className="font-Playfair fs-55 mt-90 mb-64">Browse Our Menu</h2>
                <div className="d-flex flex-wrap justify-content-center align-items-center gap-3 mb-120">
                    <div className='col-xl-2 col-lg-6 col-12 HomeCard'>
                        <HomeCard icon={<div className='card-icon-background'><i className="fa fa-mug-hot fa-3x"></i></div>} title={"Breakfast"} body={"In the new era of technology we look in the future with certainty and pride for our life."} toUrl={'breakfast'} btnText={"Explore Menu"} />
                    </div>
                    <div className='col-xl-2 col-lg-6 col-12 HomeCard'>
                        <HomeCard icon={<div className='card-icon-background'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="3em" height="3em">
                                <path d="M0 192c0-35.3 28.7-64 64-64c.5 0 1.1 0 1.6 0C73 91.5 105.3 64 144 64c15 0 29 4.1 40.9 11.2C198.2 49.6 225.1 32 256 32s57.8 17.6 71.1 43.2C339 68.1 353 64 368 64c38.7 0 71 27.5 78.4 64c.5 0 1.1 0 1.6 0c35.3 0 64 28.7 64 64c0 11.7-3.1 22.6-8.6 32H8.6C3.1 214.6 0 203.7 0 192zm0 91.4C0 268.3 12.3 256 27.4 256H484.6c15.1 0 27.4 12.3 27.4 27.4c0 70.5-44.4 130.7-106.7 154.1L403.5 452c-2 16-15.6 28-31.8 28H140.2c-16.1 0-29.8-12-31.8-28l-1.8-14.4C44.4 414.1 0 353.9 0 283.4z" />
                            </svg>
                        </div>} title={"Main Dishes"} body={"In the new era of technology we look in the future with certainty and pride for our life."} toUrl={'main-dishes'} btnText={"Explore Menu"} />
                    </div>
                    <div className='col-xl-2 col-lg-6 col-12 HomeCard'>
                        <HomeCard icon={<div className='card-icon-background'><i className="fas fa-glass-whiskey fa-3x"></i></div>} title={"Drinks"} body={"In the new era of technology we look in the future with certainty and pride for our life."} toUrl={'drinks'} btnText={"Explore Menu"} />
                    </div>
                    <div className='col-xl-2 col-lg-6 col-12 HomeCard'>
                        <HomeCard  icon={<div className='card-icon-background'><i className="fas fa-birthday-cake fa-3x"></i></div>} title={"Desserts"} body={"In the new era of technology we look in the future with certainty and pride for our life."} toUrl={'desserts'} btnText={"Explore Menu"} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default SectionSecond;

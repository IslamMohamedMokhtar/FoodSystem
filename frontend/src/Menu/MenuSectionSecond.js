import './Menu.scss';
import uberEats from '../assets/image/uber_eats.png';
import grubHub from '../assets/image/crub-hub.png';
import postMates from '../assets/image/post-mates.png';
import doorDash from '../assets/image/door-dash.png';
import foodPanda from '../assets/image/food-panda.png';
import deliveroo from '../assets/image/deliveroo.png';
import instaCart from '../assets/image/insta-cart.png';
import justEat from '../assets/image/just-eat.png';
import didiFood from '../assets/image/didi-food.png';

export default function MenuSectionSecond() {
    return (
        <div className='bg-primary'>
            <div className='container py-120'>
                <div className='d-flex gap-5 justify-content-between'>
                    <div className='col-lg-4 col-12'>
                        <h5 className='fs-55 fw-bolder font-Playfair mb-5'>You can order through apps</h5>
                        <p className='fs-7 me-64'>Lorem ipsum dolor sit amet consectetur adipiscing elit enim bibendum sed et aliquet aliquet risus tempor semper.</p>
                    </div>
                    <div className='col-lg-7 col-12'>
                        <div className='d-flex px-9  container gap-3 mb-9'>
                            <a className='btn btn-white border border-primary rounded-4 col shadow delivery-btn' href='https://www.ubereats.com/'>
                                <img src={uberEats} alt="uber Eats" className='py-4' />
                            </a>
                            <a className='btn btn-white border border-primary rounded-4 col shadow delivery-btn' href='https://www.grubhub.com/'>
                                <img src={grubHub} alt="GRUBHUB" className='py-4' />
                            </a>
                            <a className='btn btn-white border border-primary rounded-4 col shadow delivery-btn' href='https://postmates.com/'>
                                <img src={postMates} alt="Postmates" className='py-4' />
                            </a>
                        </div>
                        <div className='d-flex gap-3  mb-9'>
                            <a className='btn btn-white border border-primary rounded-4 col shadow d-flex align-items-center delivery-btn' href='https://www.doordash.com/'>
                                <img src={doorDash} alt="DOORDASH" className='py-2 mx-auto' />
                            </a>
                            <a className='btn btn-white border border-primary rounded-4 col shadow d-flex align-items-center delivery-btn' href='https://www.foodpanda.com/about-foodpanda/'>
                                <img src={foodPanda} alt="foodpanda" className='py-2 mx-auto' />
                            </a>
                            <a className='btn btn-white border border-primary rounded-4 col shadow d-flex align-items-center delivery-btn' href='https://deliveroo.co.uk/'>
                                <img src={deliveroo} alt="deliveroo" className='py-2 mx-auto' />
                            </a>
                        </div>
                        <div className='d-flex px-9  container gap-3'>
                            <a className='btn btn-white border border-primary rounded-4 col shadow delivery-btn' href='https://www.instacart.com/'>
                                <img src={instaCart} alt="instacart" className='py-4' />
                            </a>
                            <a className='btn btn-white border border-primary rounded-4 col shadow delivery-btn' href='https://www.just-eat.co.uk/'>
                                <img src={justEat} alt="JUST EAT" className='py-4' />
                            </a>
                            <a className='btn btn-white border border-primary rounded-4 col shadow delivery-btn' href='https://www.didi-food.com/en-US'>
                                <img src={didiFood} alt="DiDi food" className='py-4' />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

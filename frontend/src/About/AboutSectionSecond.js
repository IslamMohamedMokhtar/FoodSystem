import React, { useEffect, useState } from 'react';
import './About.scss';
import AboutCard from './AboutCard';
import image1 from '../assets/image/restaurant-menu1.png';
import image2 from '../assets/image/restaurant-menu2.png';
import image3 from '../assets/image/restaurant-menu3.png';

export default function AboutSectionSecond() {
  return (
    <div className='d-flex flex-wrap flex-column'>
      <div className='col-lg-8 about-background-container w-100 d-flex flex-column align-items-center justify-content-center'>
        <div className='col-5 text-center'>
          <div className="d-flex justify-content-center align-items-center">
            <a href="#" type="button" className="btn btn-white rounded-circle d-flex justify-content-center align-items-center text-secondary" style={{ width: '106px', height: '106px' }}>
              <i className="fa fa-play fa-lg"></i>
            </a>
          </div>
          <span className='text-white mt-8 fw-bolder fs-55 font-Playfair'>
            Feel the authentic & original taste from us
          </span>
        </div>
      </div>
      <div className='col-lg-4 container w-100'>
        <div className='d-flex flex-wrap gap-5 my-80'>
          <div className='col'>
            <AboutCard cardIcon={<img src={image1} alt='image1'></img>} title={"Multi Cuisine"} body={"In the new era of technology we look in the future with certainty life."}/>
          </div>
          <div className='col'>
            <AboutCard cardIcon={<img src={image2} alt='image2'></img>} title={"Easy To Order"} body={"In the new era of technology we look in the future with certainty life."}/>
          </div>
          <div className='col'>
            <AboutCard cardIcon={<img src={image3} alt='image3'></img>} title={"Fast Delivery"} body={"In the new era of technology we look in the future with certainty life."}/>
          </div>
          
        </div>
      </div>
    </div>
  )
}
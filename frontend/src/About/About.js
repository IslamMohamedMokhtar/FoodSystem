import { useState, lazy, Suspense } from 'react';
import Loading from '../Common/Loading';
import Image from '../assets/image/section3-image2.png';
import AboutSectionThird from './AboutSectionThird';
import AboutSectionFourth from './AboutSectionFourth';
const SectionThird = lazy(() => import('../Home/SectionThird'));
const AboutSectionSecond = lazy(() => import('./AboutSectionSecond'));

function About() {
    return (
        <>
            <Suspense fallback={<div><Loading /></div>}>
                <SectionThird image={Image} />
                <AboutSectionSecond/>
                <AboutSectionThird />
                <AboutSectionFourth />
            </Suspense>
        </>
    );
}

export default About;

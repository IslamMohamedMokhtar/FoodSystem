import {lazy, Suspense } from 'react';
import Loading from '../Common/Loading'
import Image from '../assets/image/section3-image.png';

function Home() {

    const LazySectionOne = lazy(() => import('./SectionOne'));
    const LazySectionSecond = lazy(() => import('./SectionSecond'));
    const LazySectionThird = lazy(() => import('./SectionThird'));
    return (
        <Suspense fallback={<div><Loading/></div>}>
            <LazySectionOne />
            <LazySectionSecond />
            <LazySectionThird image={Image}/>
        </Suspense>
    );
}

export default Home;

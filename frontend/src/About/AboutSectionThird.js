import Card from '../Common/Card';
import './About.scss';
import aboutImage2 from '../assets/image/about-image2.png';

export default function AboutSectionThird() {
  return (
    <>
    <div className='bg-primary'>
    <div className='container'>
      <div className='d-flex flex-wrap justify-content-center py-130 gap-5'>
        <div className='col-lg-6'>
          <div className='container'>
          <h3 className='font-Playfair fs-55 me-lg-130'>A little information for our valuable guest</h3>
          <p className='me-lg-120 fs-8'>At place, we believe that dining is not just about food, but also about the overall experience. Our staff, renowned for their warmth and dedication, strives to make every visit an unforgettable event.</p>
          <div className='d-flex flex-wrap gap-3'>
            <div className='col-5'>
            <Card title={"3"} body={"Locations"}/>
            </div>
            <div className='col-5'>
            <Card title={"1995"} body={"Founded"}/>
            </div>
            <div className='col-5'>
            <Card title={"65+"} body={"Staff Members"}/>
            </div>
            <div className='col-5'>
            <Card title={"100%"} body={"Satisfied Customers"}/>
            </div>
          </div>
          </div>
        </div>
        <div className='col-lg-5'>
          <img src={aboutImage2} alt='aboutImage2' className='aboutImage2'/>
        </div>
      </div>
    </div>
    </div>
    </>
  )
}
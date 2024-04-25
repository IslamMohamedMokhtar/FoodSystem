import Card from '../Common/Card';
import './About.scss';
import employeeImage1 from '../assets/image/employee1.png';
import employeeImage2 from '../assets/image/employee2.png';
import employeeImage3 from '../assets/image/employee3.png';
import EmployeeCard from './EmployeeCard';

export default function AboutSectionFourth() {
  return (
    <>
      <div className='bg-white'>
        <div className='container'>
          <div className='d-flex flex-wrap justify-content-center py-130 gap-5'>
            <h3 className='text-center col-12 fs-55 font-Playfair'>What Our Customers Say</h3>
            <div className='col-xl-3 col-md-5 col-12'>
            <EmployeeCard body={"Last night, we dined at place and were simply blown away. From the moment we stepped in, we were enveloped in an inviting atmosphere and greeted with warm smiles."}
            title={"The best restaurant"}
            imageUrl={employeeImage1}
            employeeName={"Sophire Robson"}
            employeeLocation={"Los Angeles, CA"}
            />
            </div>
            <div className='col-xl-3 col-md-5 col-12'>
            <EmployeeCard body={"Place exceeded my expectations on all fronts. The ambiance was cozy and relaxed, making it a perfect venue for our anniversary dinner. Each dish was prepared and beautifully presented."}
            title={"Simply delicious”"}
            imageUrl={employeeImage2}
            employeeName={"Sophire Robson"}
            employeeLocation={"Los Angeles, CA"}
            />
            </div>
            <div className='col-xl-3 col-md-5 col-12'>
            <EmployeeCard body={"The culinary experience at place is first to none. The atmosphere is vibrant, the food - nothing short of extraordinary. The food was the highlight of our evening. Highly recommended."}
            title={"One of a kind restaurant"}
            imageUrl={employeeImage3}
            employeeName={"Sophire Robson"}
            employeeLocation={"Los Angeles, CA"}
            />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
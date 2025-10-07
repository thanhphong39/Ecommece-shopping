import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const Contact = () => {
  return (
    <div>

      <div className=' text-center text-2xl pt-10 border-t text-gray-300'>
        <Title text1={"CONTACT"} text2={"US"} />
      </div>

      <div className='my-10  flex flex-col sm:flex-row gap-10 justify-center items-center mb-28'>
        <img src={assets.contact_img} className='w-full rounded-lg md:max-w-[450px]' alt='' />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p className='font-semibold text-xl text-gray-600'>Our Store</p>
          <p className='text-gray-500'>Address: 1234 Market St, San Francisco, CA 94103</p>
          <p className='text-gray-500'>Tel: (123) 456-7890 <br/> Email: admin@forever.com</p>
          <p className='text-gray-500'>Business Hours: Mon-Fri 9am - 6pm</p>
          
          <p className='font-semibold text-xl text-gray-600'>Careers at Forever</p>
          <p className='text-gray-500'>We are always looking for talented individuals to join our team. </p>
          <button className='bg-black text-white px-6 py-2 font-medium w-36'>Explore Jobs</button>
          
        </div>
      </div>

      <NewsletterBox />
    </div>
  )
}

export default Contact
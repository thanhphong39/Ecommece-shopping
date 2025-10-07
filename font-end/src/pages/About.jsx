import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t text-gray-600'>
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      <div className='my-10 flex flex-col sm:flex-row gap-6 justify-center items-center'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt=''/>
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p> Our Store, we are passionate about providing you with the best shopping experience. Our mission is to offer high-quality products that meet your needs and exceed your expectations.</p>
          <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          <p className='font-medium text-gray-800'>The Our Store Team</p>
          <p>Thank you for choosing Our Store. We look forward to serving you and making your shopping experience enjoyable and memorable.</p>
    
        </div>
      </div>

      <div className='text-4xl py-4'>
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>

      <div className='flex flex-col sm:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b className='font-medium text-gray-800'>Quality Products</b>
          <p className='text-gray-600'>We are committed to offering products that meet the highest standards of quality and durability. Our team carefully selects each item to ensure it meets our strict quality criteria.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b className='font-medium text-gray-800'>Exceptional Customer Service</b>
          <p className='text-gray-600'>Our dedicated customer service team is here to assist you with any questions or concerns you may have. We strive to provide prompt and helpful support to ensure your satisfaction.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b className='font-medium text-gray-800'>Fast and Reliable Shipping</b>
          <p className='text-gray-600'>We understand the importance of timely delivery. That's why we work with trusted shipping partners to ensure your orders arrive quickly and in perfect condition. Fast and Reliable Shipping</p>
        </div>
      </div>
      
      <NewsletterBox />

    </div>
  )
}

export default About
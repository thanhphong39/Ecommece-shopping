import React from 'react'

const NewsletterBox = () => {
  const onSubmitHandler = (event) => {
    event.preventDefault();
  }

  return (
    <div className='text-center'>
        <p className='text-2xl font-medium text-gray-800'>Subcribe now & get 20% off</p>
        <p className='text-gray-400 mt-3'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo.
        </p>
        <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto mt-6 border border-gray-300 pl-4'>
           <input type="email" placeholder='Enter Your email' className='w-full sm:flex-1 outline-none' required/>
           <button type='submit' className='bg-black text-white text-xs px-10 py-4 '>SUBCRIBE</button>
        </form>
    </div>
  )
}

export default NewsletterBox
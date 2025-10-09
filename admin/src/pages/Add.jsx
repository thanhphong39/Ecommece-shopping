import React from 'react'
import { assets } from '../assets/assets'

const Add = () => {
  return (
    <div className="flex flex-col gap-4 pt-20 pl-[25%] text-[15px]">
      <form className='flex flex-col w-full items-start gap' action="">
        <div>
          <p className='mb-2'>Upload Image</p>

          <div className='flex gap-2 '>
            <label htmlFor="image1">
              <img className='w-20 ' src={assets.upload_area} />
              <input type="file" id="image1" hidden />
            </label>
            <label htmlFor="image2">
              <img className='w-20 ' src={assets.upload_area} />
              <input type="file" id="image2" hidden />
            </label>
            <label htmlFor="image3">
              <img className='w-20 ' src={assets.upload_area} />
              <input type="file" id="image3" hidden />
            </label>
            <label htmlFor="image4">
              <img className='w-20 ' src={assets.upload_area} />
              <input type="file" id="image4" hidden />
            </label>

          </div>

          <div>
            <p className='w-full pt-5'>Product name</p>
            <input className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Type here' required/>

          </div>
        </div>
      </form>
    </div>
  );
}

export default Add
import axios from 'axios';
import React, { use, useEffect, useState } from 'react'
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';

const List = ({token}) => {

  const [list, setList] = useState([]);

  const fetchList = async() => {
     try {
      const response = await axios.get( backendUrl + '/api/product/list');
      
      if(response.data.success){
        setList(response.data.products);
      }else{
        toast.error(response.data.message);
      }
     } catch (error) {
      console.log(error);
      toast.error(error.message);
     }
  }

  const removeProduct = async(id) => {
    try {
      const response = await axios.post( backendUrl + '/api/product/remove' ,{id}, {headers:{token}});
      if(response.data.success){
        toast.success(response.data.message);
        await fetchList();
      }else{
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    fetchList();
  },[])

  return (
    <div className="flex flex-col gap-4 pt-16 pl-[25%] text-[15px] w-[90vw] max-w-[1500px] mx-auto">
      <p className="mb-2 text-lg">All Product List</p>
      <div className="flex flex-col gap-3">

        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2  bg-gray-200 text-base font-medium">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center'>Action</b>
        </div>

        {
          list.map((item,index)=>(
            <div key={index} className="grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2  text-base">
              <img className='w-20 h-20 object-cover' src={item.image[0]} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{currency}{item.price}</p>
              <div className='flex gap-2 justify-center'>
              <button className='bg-pink-300 text-white px-4 py-2 rounded text-base hover:bg-pink-500 transition'>Edit</button>
              <button onClick={()=>removeProduct(item._id)} className='bg-black text-white px-4 py-2 rounded text-base hover:bg-slate-600 transition'>Delete</button>
              </div>
            </div>
          ))
        }

      </div>
    </div>
  );
}

export default List
import React, { useState } from 'react'
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = ({setToken}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
   
    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.post( backendUrl + '/api/user/admin', { email, password });
            if(response.data.success){
                setToken(response.data.token);
            }else{
                toast.error(response.data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

  return (
    <div className='min-h-screen flex items-center justify-center w-full bg-gray-100'>
      <div className='bg-white shadow-md rounded-md p-6 w-[90vw] max-w-md mx-auto'>
        <h1 className='text-2xl font-bold mb-4 text-center'>Admin Panel</h1>
        <form onSubmit={onSubmitHandler}>
            <div className='mb-3 min-w-72'>
                <p className='text-sm font-medium text-gray-700 mb-2'>Email Address</p>
                <input onChange={(e)=>setEmail(e.target.value)} value={email} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type="email" placeholder='Enter your@email.com' />
            </div>
            <div className='mb-3 min-w-72 relative'>
                <p className='text-sm font-medium text-gray-700 mb-2'>Password</p>
                <input onChange={(e)=>setPassword(e.target.value)} value={password} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type={showPassword ? "text" : "password"} placeholder='Enter your password' />
                <div className='absolute right-3 top-[38px] cursor-pointer text-gray-500' onClick={() => setShowPassword(!showPassword)}>{showPassword ? <FaEyeSlash /> : <FaEye />}</div>
            </div>
            <div>
                <button className='mt-2 w-full py-2 px-4 rounded-md text-white bg-black' type='submit'>Login</button>
            </div>
        </form>
      </div>
    </div>
  );
}

export default Login
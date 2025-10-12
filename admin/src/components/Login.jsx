// import React, { useState } from 'react'
// import axios from 'axios';
// import { backendUrl } from '../App';
// import { toast } from "react-toastify";
// import { FaEye, FaEyeSlash } from "react-icons/fa";

// const Login = ({setToken}) => {

//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [showPassword, setShowPassword] = useState(false);
   
//     const onSubmitHandler = async (e) => {
//         try {
//             e.preventDefault();
//             const response = await axios.post( backendUrl + '/api/user/admin', { email, password });
//             if(response.data.success){
//                 setToken(response.data.token);
//             }else{
//                 toast.error(response.data.message);
//             }

//         } catch (error) {
//             console.log(error);
//             toast.error(error.message);
//         }
//     }

//   return (
//     <div className='min-h-screen flex items-center justify-center w-full bg-gray-100'>
//       <div className='bg-white shadow-md rounded-md p-6 w-[90vw] max-w-md mx-auto'>
//         <h1 className='text-2xl font-bold mb-4 text-center'>Admin Panel</h1>
//         <form onSubmit={onSubmitHandler}>
//             <div className='mb-3 min-w-72'>
//                 <p className='text-sm font-medium text-gray-700 mb-2'>Email Address</p>
//                 <input onChange={(e)=>setEmail(e.target.value)} value={email} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type="email" placeholder='Enter your@email.com' />
//             </div>
//             <div className='mb-3 min-w-72 relative'>
//                 <p className='text-sm font-medium text-gray-700 mb-2'>Password</p>
//                 <input onChange={(e)=>setPassword(e.target.value)} value={password} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type={showPassword ? "text" : "password"} placeholder='Enter your password' />
//                 <div className='absolute right-3 top-[38px] cursor-pointer text-gray-500' onClick={() => setShowPassword(!showPassword)}>{showPassword ? <FaEyeSlash /> : <FaEye />}</div>
//             </div>
//             <div>
//                 <button className='mt-2 w-full py-2 px-4 rounded-md text-white bg-black' type='submit'>Login</button>
//             </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Login


import React, { useState, useEffect } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = ({ setToken }) => {
  // Thay đổi giá trị mặc định của state
  const [email, setEmail] = useState("admin@forever.com");
  const [password, setPassword] = useState("qwerty123");
  const [showPassword, setShowPassword] = useState(false);
  const [isAutoFilled, setIsAutoFilled] = useState(true);

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(backendUrl + "/api/user/admin", {
        email,
        password,
      });
      if (response.data.success) {
        toast.success("Đăng nhập thành công!");
        setToken(response.data.token);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-full bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="bg-white shadow-md rounded-lg p-8 w-[90vw] max-w-md mx-auto border border-gray-100">
        <h1 className="text-3xl font-bold mb-2 text-center text-gray-800">
          Admin Panel
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Đăng nhập để quản lý cửa hàng
        </p>

        <form onSubmit={onSubmitHandler}>
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Email Address
            </p>
            <div className="relative">
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="rounded-lg w-full px-4 py-3 border border-gray-300 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                type="email"
                placeholder="admin@forever.com"
              />
              {isAutoFilled && (
                <div className="absolute right-3 top-3">
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    Auto-filled
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="mb-5 relative">
            <p className="text-sm font-medium text-gray-700 mb-2">Password</p>
            <div className="relative">
              <input
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (e.target.value !== "qwerty123") setIsAutoFilled(false);
                }}
                value={password}
                className="rounded-lg w-full px-4 py-3 border border-gray-300 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
              />
              <div
                className="absolute right-3 top-3 cursor-pointer text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </div>
            </div>
          </div>

          <div>
            <button
              className="w-full py-3 px-4 rounded-lg text-white bg-black hover:bg-pink-400 transition-colors font-medium shadow-sm"
              type="submit"
            >
              Login to Dashboard
            </button>
          </div>

          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">
              Thông tin đăng nhập đã được điền sẵn.
              <br />
              Chỉ cần nhấn nút Login.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
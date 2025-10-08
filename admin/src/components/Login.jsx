import React, { use, useState } from 'react'

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
   
    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();
            
        } catch (error) {
            
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
            <div className='mb-3 min-w-72'>
                <p className='text-sm font-medium text-gray-700 mb-2'>Password</p>
                <input onChange={(e)=>setPassword(e.target.value)} value={password} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type="password" placeholder='Enter your password' />
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
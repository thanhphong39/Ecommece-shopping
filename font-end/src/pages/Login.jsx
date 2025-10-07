import React, { useState } from 'react'


const Login = () => {
  
  const [currentState, setCurrentState] = useState("Login")

  const onSubmitHandler = async (event) => {
    event.preventDefault();
  }

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800">
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="w-16 border border-gray-400" />
      </div>
      {currentState === "Login" ? (
        ""
      ) : (
        <input
          type="text"
          placeholder="Full Name"
          required
          className="border border-gray-400 rounded py-1.5 px-3.5 w-full"
        />
      )}
      <input
        type="email"
        placeholder="Email Address"
        required
        className="border border-gray-400 rounded py-1.5 px-3.5 w-full"
      />
      <input
        type="password"
        placeholder="Password"
        required
        className="border border-gray-400 rounded py-1.5 px-3.5 w-full"
      />
      <div className="w-full flex justify-between text-sm text-gray-600">
        <p className="cursor-pointer">Forgot Your Password ?</p>
        {currentState === "Login" ? (
          <p onClick={()=>setCurrentState("Sign Up")} className="cursor-pointer">Create Account</p>
        ) : (
          <p onClick={()=>setCurrentState("Login")} className="cursor-pointer">Login Here</p>
        )}
      </div>
      <button className="bg-black text-white px-6 py-2 font-medium w-full mt-2">
        {currentState === "Login" ? "Login In" : "Sign Up"}
      </button>
    </form>
  );
}

export default Login
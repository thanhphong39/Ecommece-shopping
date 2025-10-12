import React, { use, useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios';
import { toast } from 'react-toastify';


const Login = () => {
  
  const [currentState, setCurrentState] = useState("Login") 
  const {token,setToken,navigate, backendUrl} = useContext(ShopContext);

  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if(currentState === "Sign Up"){
        const response = await axios.post(backendUrl+"/api/user/register",{name,email,password});
        if(response.data.success){
          setToken(response.data.token);
          localStorage.setItem("token",response.data.token);
        }else{
          toast.error(response.data.message); 
        }
      }else{
        const response = await axios.post(backendUrl+"/api/user/login",{email,password});
        if(response.data.success){
          setToken(response.data.token);
          localStorage.setItem("token",response.data.token);
        }else{
          toast.error(response.data.message); 
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      
    }
  }

  useEffect(() => {
    if(token){
      navigate("/");
    }
  }, [token])

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
          onChange={(e)=>setName(e.target.value)}
          value={name}
          type="text"
          placeholder="Full Name"
          required
          className="border border-gray-400 rounded py-1.5 px-3.5 w-full"
        />
      )}
      <input
        onChange={(e)=>setEmail(e.target.value)}
        value={email}
        type="email"
        placeholder="Email Address"
        required
        className="border border-gray-400 rounded py-1.5 px-3.5 w-full"
      />
      <input
        onChange={(e)=>setPassword(e.target.value)}
        value={password}
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
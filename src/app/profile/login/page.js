"use client"
import React, { useState } from 'react'
import { formDataHandle } from '../../api/post'
import { useRouter } from 'next/navigation'

const Login = () => {
  const router = useRouter();
  const [inputData, setInputData] = useState('');
  const [otp, setOTP] = useState(0);
  const [userRegister, setUserRegister] = useState(false);

  const handleInputChange = (e) => {
    setInputData(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await formDataHandle("/auth/sign" , inputData);
    setOTP(response.data.OTP);
    setUserRegister(response.data.isRegistered);

    // Navigate to /profile/verify with state
    router.push({
      pathname: "/profile/verify",
      query: { isRegistered: response.data.isRegistered },
      state: { otp: response.data.OTP }
    });
    
    // if isRegisterd false -> ask name, verfiy, else verify only 

  }

  return (
    <div className='w-1/2 block m-auto my-10'>
      <p className='text-2xl font-bold'>Login or Register</p>
      <p className='text-gray-400 my-4'>Get access to your Orders, WishList and Recommendations.</p>
      <form onSubmit={handleSubmit} method='POST'>
          <input value={inputData} onChange={handleInputChange} className='mt-2 p-4 w-7/12 bg-gray-200 outline-none' type='number' placeholder='Enter Mobile Number' required />
          <button type="submit" className="w-7/12 text-center my-8 cursor-pointer bg-gray-500 hover:bg-gray-300 text-white py-2 px-12 rounded-lg">Send OTP</button>
      </form>
    </div>
  )
}
export default Login;
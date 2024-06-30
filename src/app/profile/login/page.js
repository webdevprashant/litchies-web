"use client"
import React, { useState } from 'react'
import { userDetails, auth } from '../../utils/Constant'
import { formDataHandle } from '../../api/post'
import { useRouter } from 'next/navigation'
import { ParseJWT } from "../../utils/utils";

const Login = () => {
  const router = useRouter();
  const [inputMobile, setMobile] = useState('');

  const handleInputChange = (e) => {
    setMobile(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await formDataHandle("/auth/sign" , { mobile: inputMobile });
      if (typeof window != "undefined" && window.localStorage) {
        if (response.data.isRegistered) {
          const user = ParseJWT(response.data.token);
          window.localStorage.setItem(userDetails, JSON.stringify(user));
        }
        // Save auth details in Local
        const userData = { otp: response.data.OTP, isRegistered: response.data.isRegistered, mobile: inputMobile };
        window.localStorage.setItem(auth, JSON.stringify(userData));
      }
      router.push("/profile/verify")
  }

  return (
    <div className='text-center lg:w-1/2 sm:w-full my-10'>
      <p className='text-2xl font-bold'>Login or Register</p>
      <p className='text-gray-400 my-4'>Get access to your Orders, WishList and Recommendations.</p>
      <form onSubmit={handleSubmit} method='POST'>
          <input value={inputMobile} onChange={handleInputChange} className='mt-2 p-3 w-7/12 bg-gray-200 outline-none rounded-lg' type='number' placeholder='Enter Mobile Number' maxLength={10} required />
          <button type="submit" className="w-7/12 text-center my-8 cursor-pointer bg-gray-500 hover:bg-gray-300 text-white py-2 px-12 rounded-lg">Send OTP</button>
      </form>
    </div>
  )
}
export default Login;
"use client"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { auth } from '../../utils/Constant';

const Verify = () => {
  const [userInputOTP, setUserInputOTP] = useState('');
  const router = useRouter();
  let otp, mobile, userRegister;
    if (typeof window !== undefined && window.localStorage)  {
      const userData = JSON.parse(window.localStorage.getItem(auth)); 
      otp = userData.otp;
      userRegister = userData.isRegistered;
      mobile = userData.mobile;
    }
  
  const handleInputChange = (e) => {
    setUserInputOTP(e.target.value);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp == userInputOTP) {
      toast.success('OTP Verification Successfull.')
      if (userRegister) {
        router.push("/profile/me");
      } else {
        router.push("/profile/register");
      }
    } else {
      toast.error('Invalid OTP.');
    }
  }
  return (
      <div className='my-10 text-center lg:w-1/2 sm:w-full'>
        <p className='text-2xl font-bold'>OTP Verification</p>
        <p className='text-gray-400 my-4'>OTP has sent to +91 {mobile} </p>
          <form onSubmit={handleSubmit}>
            <input
                type="number" onChange={handleInputChange}
                className="mt-2 p-3 w-7/12 bg-gray-200 outline-none rounded-lg"
                maxLength="4" /> <br />
            <button type="submit" onClick={handleSubmit} className="w-7/12 text-center my-8 cursor-pointer bg-gray-500 hover:bg-gray-300 text-white py-2 px-12 rounded-lg">Continue</button>
          </form>
      </div>
  )
}
export default Verify;
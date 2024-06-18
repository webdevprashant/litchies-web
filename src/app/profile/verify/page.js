"use client"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Verify = () => {
  const [userInputOTP, setUserInputOTP] = useState('');
  const router = useRouter();
  const otp = useSelector((store) => store.user.otp);
  const mobile = useSelector((store) => store.user.mobile);
  const userRegister = useSelector((store) => store.user.isUserRegistered);
  // const dispatch = useDispatch();
  
  const handleInputChange = (e) => {
    setUserInputOTP(e.target.value);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp == userInputOTP) {
      alert("OTP Verification Successfull.");
      if (userRegister) {
        console.log("HI", userRegister);
        router.push("/profile/me");
      } else {
        console.log("Hello", userRegister);
        router.push("/profile/register");
      }
    // dispatch(removeOTP());
    } else {
      alert("Invalid OTP.");
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
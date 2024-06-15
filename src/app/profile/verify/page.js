"use client"
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { removeOTP } from '../../redux/slice';
import { useRouter } from 'next/navigation';

const Verify = () => {
  const [userInputOTP, setUserInputOTP] = useState('');
  const [userMobile, setUserMobile ] = useState();
  const router = useRouter();
  const otp = useSelector((store) => store.storeOTP.otp);
  const mobile = useSelector((store) => store.storeOTP.mobile);
  const userRegister = useSelector((store) => store.storeOTP.isUserRegistered);
  // const dispatch = useDispatch();
  
  const handleInputChange = (e) => {
    setUserInputOTP(e.target.value);
  }
  console.log("OTP Verify Data" , otp , mobile, userRegister , userInputOTP);
  const handleSubmit = () => {
    // setUserMobile(mobile);
    if (otp == userInputOTP) {
      alert("OTP Verification Successfull.");
      if (userRegister) {
        router.push("/profile/me");
      } else {
        router.push("/profile/register");
      }
    // dispatch(removeOTP());
    } else {
      alert("Invalid OTP.");
    }
  }
  return (
    <div className='w-1/2 block m-auto my-10'>
      <p className='text-2xl font-bold'>OTP Verification</p>
      <p className='text-gray-400 my-4'>OTP has sent to +91 {mobile} </p>
          <div className="flex gap-3">
              <input
                  type="number" onChange={handleInputChange}
                  className="w-1/3 h-14 text-2xl font-extrabold text-slate-900 bg-gray-200 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                  maxLength="4" />
          </div>
        <button type="submit" onClick={handleSubmit} className="w-4/12 text-center my-8 cursor-pointer bg-gray-500 hover:bg-gray-300 text-white py-2 px-12 rounded-lg">Continue</button>
    </div>
  )
}
export default Verify;
"use client"
import React, { useState } from 'react'
import { userDetails } from '../../utils/Constant'
import { formDataHandle } from '../../api/post'
import { useRouter } from 'next/navigation'
import { setUserMobile, setOTP, setUserRegistered } from '../../redux/slice';
import { useDispatch } from 'react-redux';
import { ParseJWT } from "../../utils/utils";
import { setUserId } from '../../redux/slice';

const Login = () => {
  // Step 3 - Dispatch and action call Reducer fn (Action)
  const dispatch = useDispatch();
  const router = useRouter();
  const [inputMobile, setMobile] = useState('');

  const handleInputChange = (e) => {
    setMobile(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await formDataHandle("/auth/sign" , { mobile: inputMobile });
    dispatch(setOTP(response.data.OTP));
    dispatch(setUserMobile(inputMobile));
    dispatch(setUserRegistered(response.data.isRegistered));
    if (response.data.isRegistered) {
      const user = ParseJWT(response.data.token);
      if (typeof window != "undefined") {
        window.localStorage.setItem(userDetails, JSON.stringify(user));
      }
      dispatch(setUserId(user._id));
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
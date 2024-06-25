"use client"
import React, { useState } from 'react'
import { browserCookie } from '../../utils/Constant'
import { formDataHandle } from '../../api/post'
import { useRouter } from 'next/navigation'
import { setUserMobile, setOTP, setUserRegistered } from '../../redux/slice';
import { useDispatch } from 'react-redux';
import { ParseJWT } from "../../utils/utils";
import Cookies from "js-cookie";
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
    // const response = await formDataHandle("/auth/sign" , { mobile: inputMobile });
    const response = {
      "status": true,
      "message": "User Logging.",
      "data": {
          "isRegistered": true,
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjdiMDNlMjY2N2I2OTAyNzM5ZmI3ZjQiLCJpbWFnZVVSTCI6bnVsbCwiZmlyc3ROYW1lIjoiU2t1bWFyIiwibGFzdE5hbWUiOm51bGwsImdlbmRlciI6bnVsbCwiZG9iIjpudWxsLCJlbWFpbCI6bnVsbCwiaW1hZ2VVcmwiOm51bGwsIm90cCI6bnVsbCwiaXNWZXJpZmllZCI6dHJ1ZSwibW9iaWxlIjo4OTM4MDMzOTU2LCJub3RpZnkiOnRydWUsImZvbGxvd2VkU2hvcHMiOltdLCJsaWtlZFByb2R1Y3RzIjpbXSwid2lzaExpc3QiOltdLCJjYXJ0IjpbXSwicGFzc3dvcmQiOm51bGwsInNuc0VuZHBvaW50IjoiIiwiaXNEZWxldGVkIjpmYWxzZSwiYWRkcmVzcyI6W10sImNyZWF0ZWRBdCI6MTcxOTMzNzk1NDM2OCwidXBkYXRlZEF0IjoxNzE5MzM3OTU0MzY4LCJfX3YiOjAsImlhdCI6MTcxOTMzNzk3OSwiZXhwIjoxNzI5NzA1OTc5fQ.d9VnlBQFhp5zVjLVhGk9KJsBx2vxg0f_z89MYkb9pvo",
          "OTP": 3862
      }
    }
    dispatch(setOTP(response.data.OTP));
    dispatch(setUserMobile(inputMobile));
    dispatch(setUserRegistered(response.data.isRegistered));
    if (response.data.isRegistered) {
      const user = ParseJWT(response.data.token);
      Cookies.set(browserCookie , response.data.token);             // Set token in Cookie
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
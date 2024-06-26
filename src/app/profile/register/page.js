"use client";
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { formDataHandle } from '../../api/post';
import { useRouter } from 'next/navigation';
import { userDetails } from '../../utils/Constant'
import { setUserId } from '../../redux/slice';
import toast from 'react-hot-toast';

const Register = () => {
  const mobile = useSelector((store) => store.user.mobile);
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState(null);
  const router = useRouter();
  const [check, setCheck] = useState(false);
  const handleInputChange = (e) => {
    setFirstName(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await formDataHandle("/auth/register" , { firstName: firstName, notify: check, mobile: mobile });
    if (response.status) {
      dispatch(setUserId(response.data._id));
      localStorage.setItem(userDetails, response.data);
      toast.success("User Registered Successfully.");
      router.push("/profile/me");
    } else {
      toast.error("Something got wrong try again later....");
    }
  }
  return (
    <div className='w-1/2 block m-auto my-10'>
      <p className='text-2xl font-bold'>Login Successfully</p>
      <p className='text-gray-400 my-4'>Please provide some more information for better communication.</p>
      <form onSubmit={handleSubmit} method='POST'>
          <input value={`+91` + mobile} disabled className='mt-2 p-4 w-7/12 bg-gray-200 outline-none' type='number' placeholder='Enter Mobile Number' required />
          <input onChange={handleInputChange} className='mt-2 p-4 w-7/12 bg-gray-200 outline-none' type='text' placeholder='Name' required />
          <div className='flex items-center m-4'>
            <input type='checkbox' className='size-5' value={check} onChange={() => setCheck(!check)} />
            <p className='px-4'>Send me updates on Whatsapp</p>
          </div>
          <button type="submit" className="w-7/12 text-center my-8 cursor-pointer bg-red-500 hover:bg-red-300 text-white py-2 px-12 rounded-lg">Continue</button>
      </form>
    </div>
  )
}

export default Register;
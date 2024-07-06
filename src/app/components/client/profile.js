"use client";
import { useRouter } from 'next/navigation';
import React from 'react'
import { FaShareAltSquare } from "react-icons/fa";
import { IoIosHelpCircle } from "react-icons/io";
import { TbMessage } from "react-icons/tb";

const Profile = () => {
  const router = useRouter();
  return (
    <div>
      <div className='my-8'>
          <p className='text-2xl font-semibold text-center '>Profile Information</p>
      </div>

      <div>
      <button type="button" onClick={() => router.push("/profile/login")} className="w-1/2 text-center block m-auto my-8 cursor-pointer bg-red-500 hover:bg-red-400 text-white py-2 px-12 rounded-lg">Login</button>
      </div>

      <div className='lg:w-1/2 sm:w-full block m-auto rounded-xl shadow-lg my-8 p-4 font-serif text-xl'>
          <div className='flex items-center mx-10 my-4 cursor-pointer'>
          <FaShareAltSquare className='text-red-500' size={30} /> <p className='mx-8'>Share</p>
          </div>
          <div className='flex items-center mx-10 my-4 cursor-pointer'>
          <IoIosHelpCircle className='text-red-500' size={30} /> <p className='mx-8'>Help Center</p>
          </div>
          <div className='flex items-center mx-10 my-4 cursor-pointer'>
          <TbMessage  className='text-red-500' size={30} /> <p className='mx-8'>Feedback</p>
          </div>
      </div>
    </div>
  )
}

export default Profile;
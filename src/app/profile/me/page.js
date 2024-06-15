"use client";
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { fetchDataId } from '../../api/get';
import { LiaStoreSolid } from "react-icons/lia";
import { BiLike } from "react-icons/bi";
import { FaShoppingCart } from "react-icons/fa";
import { FaShareAltSquare } from "react-icons/fa";
import { IoIosHelpCircle } from "react-icons/io";
import { TbMessage } from "react-icons/tb";
import Image from 'next/image';
import { IoIosCall } from "react-icons/io";

const User = () => {
  const userId = useSelector((store) => store.storeOTP.userId);
  const [user, setUser] = useState(null);
  useEffect(()=> {
    const fetchUser = async () => {
      const userData = await fetchDataId("/users/" , userId);
      setUser(userData.data);
  };
  fetchUser();
}, []);
  console.log("User : " , user, userId);
  return (
    <>
      <h1 className='text-center text-2xl my-8'>Profile Information</h1>
    <div>
        <div>
                <div className='w-1/4 m-auto flex flex-row items-center justify-around'>
                    <div> <Image
                    width={100}
                    height={100}
                    src="/images/user.jpg"
                    alt="User"
                  />
                  </div>
                    <div> 
                          <p>{user?.firstName}</p>
                          <div className='flex justify-center items-center'>
                            <IoIosCall size={20} />
                            <p>{user?.mobile}</p>
                          </div>
                    </div>
                </div>

                <hr />

                <div className='w-1/4 block m-auto rounded-xl shadow-lg my-8 p-4 font-serif text-xl'>
                      <div className='flex items-center mx-10 my-4 cursor-pointer'>
                      <LiaStoreSolid size={30} /> <p className='mx-8'>My Followed Stores</p>
                      </div>

                      <div className='flex items-center mx-10 my-4 cursor-pointer'>
                      <BiLike size={30} /> <p className='mx-8'>My Liked Products</p>
                      </div>

                      <div className='flex items-center mx-10 my-4 cursor-pointer'>
                      <FaShoppingCart size={30} /> <p className='mx-8'>My Orders</p>
                      </div>

                      <div className='flex items-center mx-10 my-4 cursor-pointer'>
                      <FaShareAltSquare size={30} /> <p className='mx-8'>Share</p>
                      </div>

                      <div className='flex items-center mx-10 my-4 cursor-pointer'>
                      <IoIosHelpCircle size={30} /> <p className='mx-8'>Help Center</p>
                      </div>

                      <div className='flex items-center mx-10 my-4 cursor-pointer'>
                      <TbMessage size={30} /> <p className='mx-8'>Feedback</p>
                      </div>

                </div>
        </div>
    </div>
    </>
  )
}

export default User;
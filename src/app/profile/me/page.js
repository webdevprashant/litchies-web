"use client";
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { fetchDataId } from '../../api/get';
import { browserCookie } from '../../utils/Constant';
import { LiaStoreSolid } from "react-icons/lia";
import { BiLike } from "react-icons/bi";
import { FaShoppingCart } from "react-icons/fa";
import { FaShareAltSquare } from "react-icons/fa";
import { IoIosHelpCircle } from "react-icons/io";
import { TbMessage } from "react-icons/tb";
import Image from 'next/image';
import { IoIosCall } from "react-icons/io";
import { useRouter } from 'next/navigation';
import { getCookie } from "../../api/cookie";
import { ParseJWT } from "../../utils/utils";

const User = () => {
  const router = useRouter();
  const userId = useSelector((store) => store.user.userId);
  // const fetchToken = async () => {
  //   const hasTokenInCookie = await getCookie(browserCookie);
  //   console.log("hasTokenInCookie me : " , hasTokenInCookie);
  //   if (hasTokenInCookie) {
  //     const parseJWT = ParseJWT(hasTokenInCookie);
  //     userId = parseJWT._id;
  //   } else {
  //     router.push("/profile/login");
  //   }
  // }
  // useEffect(() => {
  //   fetchToken();
  // }, []);

  const [user, setUser] = useState(null);
  useEffect(()=> {
    const fetchUser = async () => {
      if (userId) {
        const userData = await fetchDataId("/users/" , userId);
        setUser(userData.data);
      } else {
        router.push("/profile/login");
      }
  };
  fetchUser();
}, [userId]);
  return (
    <>
      <h1 className='text-center text-2xl my-8'>Profile Information</h1>
    <div>
        <div>
                <div className='lg:w-1/4 sm:w-full m-auto flex flex-row items-center justify-evenly'>
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

                <hr className="lg:w-1/4 m-auto border border-gray-300 my-4" />

                <div className='lg:w-1/4 sm:w-full block m-auto rounded-xl shadow-lg lg:my-8 sm:my-4 lg:p-4 font-serif text-xl'>
                      <div className='flex items-center mx-10 my-4 cursor-pointer'>
                      <LiaStoreSolid className='text-red-500' size={30} /> <p className='mx-8'>My Followed Stores</p>
                      </div>

                      <div className='flex items-center mx-10 my-4 cursor-pointer'>
                      <BiLike className='text-red-500' size={30} /> <p className='mx-8'>My Liked Products</p>
                      </div>

                      <div className='flex items-center mx-10 my-4 cursor-pointer'>
                      <FaShoppingCart className='text-red-500' size={30} /> <p className='mx-8'>My Orders</p>
                      </div>

                      <div className='flex items-center mx-10 my-4 cursor-pointer'>
                      <FaShareAltSquare className='text-red-500' size={30} /> <p className='mx-8'>Share</p>
                      </div>

                      <div className='flex items-center mx-10 my-4 cursor-pointer'>
                      <IoIosHelpCircle className='text-red-500' size={30} /> <p className='mx-8'>Help Center</p>
                      </div>

                      <div className='flex items-center mx-10 my-4 cursor-pointer'>
                      <TbMessage className='text-red-500' size={30} /> <p className='mx-8'>Feedback</p>
                      </div>

                </div>

                <div className='lg:w-1/4 m-auto sm:w-full'>
                <button type="button" className="w-full cursor-pointer bg-red-600 text-white m-2 py-2 lg:px-12 xsm:px-8 rounded-lg">Logout</button>
                </div>
        </div>
    </div>
    </>
  )
}

export default User;
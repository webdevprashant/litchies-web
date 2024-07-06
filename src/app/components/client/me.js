"use client";
import React, { useEffect, useState } from 'react'
import { userDetails, auth } from '../../utils/Constant';
import { LiaStoreSolid } from "react-icons/lia";
import { BiLike } from "react-icons/bi";
import { FaShoppingCart } from "react-icons/fa";
import { FaShareAltSquare } from "react-icons/fa";
import { IoIosHelpCircle } from "react-icons/io";
import { TbMessage } from "react-icons/tb";
import Image from 'next/image';
import { IoIosCall } from "react-icons/io";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { fetchDataId } from '../../api/get';

const User = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const handleLogOut = () => {
    if (typeof window !== undefined && window.localStorage) {
      window.localStorage.removeItem(userDetails);
      window.localStorage.removeItem(auth);
      router.push("/profile/login");
    }
  }
  useEffect(() => {
    const fetchUser = async () => {
      if (typeof window !== undefined && window.localStorage) {
        const user = JSON.parse(window.localStorage.getItem(userDetails));
        if (user) {
          const response = await fetchDataId(`/users/`, user._id);
          setUser(response.data);
          window.localStorage.setItem(userDetails, JSON.stringify(response.data));
          window.localStorage.removeItem(auth);
        } else {
          router.push("/profile/login");
        }
      }
    }
    fetchUser();
  }, []);
  return (
    <>
      <h1 className='text-center text-2xl my-2'>Profile Information</h1>
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
                    <Link href={`/shops/${user?._id}`} as={`/shops/`}>
                      <div className='flex items-center mx-10 my-4 cursor-pointer'>
                    <LiaStoreSolid className='text-red-500' size={30} /> <p className='mx-8'>My Followed Stores</p>
                      </div>
                    </Link>

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
                  <button onClick={() => handleLogOut()} type="button" className="w-full cursor-pointer bg-red-600 text-white m-2 py-2 lg:px-12 xsm:px-8 rounded-lg">Logout</button>
                </div>
        </div>
    </div>
    </>
  )
}

export default User;
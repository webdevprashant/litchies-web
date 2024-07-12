"use client"
import React, { useEffect, useState } from 'react'
import { usePathname } from "next/navigation"
import { fetchDataId } from "../../../api/get";
import Link from 'next/link';
import Image from 'next/image';
import { userDetails } from '../../../utils/Constant';
import { FaWhatsapp } from 'react-icons/fa';

const About = () => {
  const params = usePathname();
  const shopId = params.split("/")[2];
  const [shop, setShop] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchShop = async () => {
      if (typeof window !== undefined && window.localStorage) {
        const userInfo = JSON.parse(localStorage.getItem(userDetails));
        if (userInfo) {
          setUser(userInfo);
        }
        try {
          const shopInfo = await fetchDataId("/shops/", shopId);
          setShop(shopInfo.data);
        } catch (err) {
          console.error('Error fetching Shop' , err);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchShop();
  }, []);
  return (
    <>    
    {!loading && !shop ? 
        <h1 className='flex justify-center items-center text-pretty font-semibold'>No Shop Found.</h1>
    : (<div className='flex justify-center font-serif lg:p-0 xsm:p-4'>
      <div className="lg:w-3/4 lg:m-4" key={shop?._id}>
              <div className='flex justify-center'>
                  <Image width={120} height={100} className='rounded-full lg:w-40 sm:w-30' src={shop?.shopThumbnail} alt="" />
              </div>
            <div className='p-1 rounded-lg'>
                <div className='text-center p-1'>
                <p className='text-pretty text-xl'>{shop?.address}</p>
                </div>

                <hr className="m-auto border border-black my-4" />
                <div>
                  <div className='flex justify-evenly p-1'>
                    <h2 className=''>Shop Owner</h2>
                    <p className='text-red-500 text'>{shop?.kartaName}</p>
                  </div>
                  <div className='flex justify-evenly p-1'>
                    <h2 className=''>Contact US</h2>
                    <p className='text-red-500'>{shop?.mobile}</p>
                  </div>
                
                <hr className="m-auto border border-black my-4" />
                <div className='p-2'>
                    <h2 className='text-2xl text-red-500 text-center'>What We Do</h2>
                    <p>{shop?.desc}</p>
                </div>
                </div>
                <hr className="m-auto border border-black my-4" />
                <div className='flex justify-center p-2'>
                    <div className='text-center'>
                        <Link href={"#"} className='text-blue-500 text-center p-2'>{ shop?.socialMediaLinks.length > 0 ? "Visit Our Website" : ""}</Link>
                        <p className='p-2'>{ shop?.socialMediaLinks.length > 0 ? "OR" : ""}</p>
                        <Link href={`https://api.whatsapp.com/send?phone=91${shop?.mobile}&type=phone_number&app_absent=0`} target="_blank"><FaWhatsapp className="text-white bg-green-500 m-auto rounded-full" size={40} /></Link>
                    </div>
                </div>
            </div>
      </div>

    </div>)}
    </>
  )
}

export default About;
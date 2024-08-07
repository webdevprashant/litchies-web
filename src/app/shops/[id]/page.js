"use client"
import React, { useEffect, useState } from 'react'
import Products from "../../components/shopTabbar/Products";
import Reels from "../../components/shopTabbar/Reels";
import Offers from "../../components/shopTabbar/Offers";
import { fetchDataId } from "../../api/get";
import { GrLocation } from "react-icons/gr";
import { LuGrid } from "react-icons/lu";
import { RxVideo } from "react-icons/rx";
import { BiSolidOffer } from "react-icons/bi";
import Image from 'next/image';
import { userDetails } from '../../utils/Constant';
import { Update } from '../../api/put';
import { Delete } from '../../api/delete';
import Link from 'next/link';
import toast from 'react-hot-toast';

const RecentShop = ({ params }) => {
  const [shop, setShop] = useState([]);
  const [selectedTabBar, setSelectedTabBar] = useState(1);
  const [user, setUser] = useState(null);
  const [follow, setFollow] = useState(null);
  const renderTabBar = () => {
    switch (selectedTabBar) {
      case 1:
        return <Products shopId={params.id} />
      case 2:
        return <Reels />
      case 3:
        return <Offers />

    }
  }

  const handleFollow = async (shop) => {
    let response
    if (follow) {
      // Unfollow api
      response = await Delete(`/shops/${shop._id}/following`, { userId: user?._id });
      setFollow(false);
    } else {
      // follow api
      response = await Update(`/shops/${shop._id}/following`, { userId: user?._id });
      setFollow(true);
    }

  }
  useEffect(() => {
    const fetchShop = async () => {
      const shop = await fetchDataId("/shops/", params.id);
      setShop(shop.data);
      if (typeof window !== undefined && window.localStorage) {
        const userInfo = JSON.parse(localStorage.getItem(userDetails));
        if (userInfo) {
          setUser(userInfo);
          setFollow(userInfo.followedShops.includes(shop._id))
        }
      }
    };
    fetchShop();
  }, [params.id]);
  return (
    <div className='flex justify-center font-serif'>
      <div className="lg:w-3/4 lg:p-8 lg:m-4 sm:w-full rounded-lg relative" key={shop._id} >
        <div className="min-h-[200px] rounded-lg m-2"
          style={{ backgroundImage: `url(${shop.shopBgThumbnail})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: 'red' }}
        >

          <div className='absolute lg:top-[4rem] xsm:top-[3rem] border-4 rounded-full left-[34.33333%] md:left-[45.33333%] lg:left-[42.33333%]'>
            <Image width={120} height={100} className='rounded-full lg:w-40 sm:w-30' src={shop.shopThumbnail} alt="" />
          </div>
        </div>
        <div className='min-h-[200px] bg-white p-2 rounded-lg'>
          <div className='text-center'>
            <p className='text-red-400 text-xl font-semibold'>{shop.name}</p>
            <p>{shop?.desc}</p>
          </div>

          <div className='flex flex-col lg:w-1/2 sm:w-full lg:m-auto '>
            <div className='flex justify-between text-center py-4'>
              <div>
                <h4 className='font-serif text-gray-400'>PRODUCTS</h4>
                <p>{shop?.totalProducts}</p>
              </div>

              <div>
                <h4 className='font-serif text-gray-400'>FOLLOWERS</h4>
                <p>{shop?.usersFollowing?.length}</p>
              </div>
              <div>
                <h4 className='font-serif text-gray-400'>RATINGS</h4>
                <p>{shop?.ratings}</p>
              </div>
            </div>

            <div className='flex justify-between items-center py-4'>
              <div>
                <button type="button" onClick={() => handleFollow(shop)} className="min-w-[5.5rem] cursor-pointer bg-red-500 text-white p-2 rounded-lg">{follow ? "UnFollow" : "Follow"}</button>
              </div>
              <div>
                <Link href={`/shops/${shop._id}/about`}><button type="button" className="bg-gray-300 cursor-pointer p-2  rounded-lg">About Me</button></Link>
              </div>
              <div>
                {/* <Link href={`https://www.google.com/maps/search/?api=1&query=${(shop.location && shop.location[0])},${(shop.location && shop.location[1])}`} target='_blank'>{(shop.location && shop.location[0] && shop.location[1]) ? <GrLocation size={30} className='mr-8' /> : <GrLocation size={30} className='mr-8' onClick={() => toast.custom("Location not found.")} /> }</Link> */}
                {(shop.location && shop.location[0] && shop.location[1]) ? (
                      <Link 
                          href={`https://www.google.com/maps/search/?api=1&query=${shop.location[0]},${shop.location[1]}`} 
                          target='_blank'
                      >
                          <GrLocation size={30} className='mr-8 cursor-pointer' />
                      </Link>
                  ) : (
                      <GrLocation 
                          size={30} 
                          className='mr-8 cursor-pointer' 
                          onClick={() => toast.error("Location not found.")} 
                      />
                  )}
              </div>
            </div>


            <div className="flex justify-between items-center py-4">
              <a href="#" className={`p-4 border-transparent rounded-t-lg cursor-pointer ${selectedTabBar == 1 && `text-red-500`}`}>
                <div className='flex flex-col items-center'>
                  <LuGrid size={30} />
                  <p>PRODUCTS</p>
                </div>
              </a>
              <a href="#" className={`p-4 border-transparent rounded-t-lg cursor-pointer ${selectedTabBar == 2 && `text-red-500`}`}>
                <div className='flex flex-col items-center'>
                <RxVideo size={30} />
                <p>VIDEOS</p>
                </div>
              </a>
              <a href="#" className={`p-4 border-transparent rounded-t-lg cursor-pointer ${selectedTabBar == 3 && `text-red-500`}`}>
                <div className='flex flex-col items-center'>
                <BiSolidOffer size={30} />
                <p>OFFERS</p>
                </div>
              </a>
            </div>

          </div>

        </div>


        <div className='component-container p-4 m-auto'>
          {renderTabBar()}
        </div>
      </div>

    </div>
  )
}

export default RecentShop;
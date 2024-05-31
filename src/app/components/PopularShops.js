"use client";
import React, { useEffect, useState } from 'react'
import { BACKEND_URL } from '../utils/Constant';
import { useRouter } from 'next/navigation';
const getPopularShops = async () => {
  const popluarShopsResponse = await fetch(BACKEND_URL + "/shops/popular", {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  });
  const data = await popluarShopsResponse.json();
  return data;
}

const PopularShops = () => {
  const [popularShops, setPopularShops] = useState([]);
  const router = useRouter();
  useEffect(() => {
    const fetchPopularShops = async () => {
      const allPopularShops = await getPopularShops();
      setPopularShops(allPopularShops.data);
    }
    fetchPopularShops();
  }, []);
  return (
    <div  className='my-8'>
      <div className='flex justify-between'>
     <h3 className='font-bold inline font-serif'>Popular Stores</h3>
     <h4 className='font-extrabold text-red-900 inline font-serif hover:cursor-pointer hover:text-red-200' onClick={() => router.push("shops/recent")}>View All</h4>
    </div>

      <div
        className='overflow-x-scroll no-scroll flex'
      >
        {popularShops.map((shop) => (
          <div  
          key={shop._id} className='m-2 p-1 min-w-[120px] text-center  rounded-lg hover:bg-gray-200 flex-shrink-0 shadow-md'>
            <div className='flex justify-center category-image w-32'>
              <img className='rounded-2xl w-[100px]  min-h-[100px] bg-cover' src={shop.shopThumbnail} alt={shop.name} />
            </div>
            <div className='w-28 m-1 p-1 font-serif'>
              <p className='text-sm font-semibold'>{shop.ratings} ⭐</p>
              <p className='text-xs text-gray-500'>Ratings</p>
            </div>
            <div className='w-28 m-1'>
              <p className='truncate font-serif'>{shop.name}</p>
            </div>
          </div>
        ))}
      </div>
    
    </div>
  )
}

export default PopularShops;
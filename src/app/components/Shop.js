"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { BACKEND_URL } from '../utils/Constant';

const getShops = async () => {
  const shopsResponse = await fetch(BACKEND_URL + "/shops", {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  });
  const data = await shopsResponse.json();
  return data;
}

const Shop = () => {
  const router = useRouter();
  const [shops, setShops] = useState([]);
  useEffect(() => {
    const fetchShops = async () => {
      const allShops = await getShops();
      setShops(allShops.data);
    };
    fetchShops();
  }, []);
  return (
    <div>
      <div className='flex justify-between'>
     <h3 className='font-bold inline font-serif'>Recently Added Stores</h3>
     <h4 className='font-extrabold text-red-900 inline font-serif hover:cursor-pointer hover:text-red-200' onClick={() => router.push("/stores")}>View All</h4>
    </div>

      <div
        className='overflow-x-scroll no-scroll flex'
      >
        {shops.map((shop) => (
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

export default Shop;
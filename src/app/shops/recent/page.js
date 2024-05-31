"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { BACKEND_URL } from '../../utils/Constant';

const getShops = async () => {
  const shopsResponse = await fetch(BACKEND_URL + "/shops/recent", {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  });
  const data = await shopsResponse.json();
  return data;
}

const RecentShops = () => {
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
    <div className='flex flex-wrap justify-center'>
        {
        shops.map((shop) => (
          <div className="w-1/4 p-8 m-4 rounded-lg relative" key={shop._id}
          style={{ backgroundImage: `url(${shop.shopBgThumbnail})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: 'red' }}
          >
            <div className='shopBgImg absolute top-[-0.5rem] left-[37.33333%]'>
              <img className='w-[100px] min-h-[100px] rounded-full' src={shop.shopThumbnail} alt="" />
            </div>
      
            <div className='pt-16 min-h-[200px] bg-white p-2 rounded-lg'>
                <div className='text-center'>
                <p className='text-red-500 font-serif'>{shop.name}</p>
                <p className='font-serif'>{shop.address}</p>
                </div>
      
                <div className='flex justify-between'>
                    <div>
                      <h4 className='font-serif'>PRODUCTS</h4>
                      <p>{shop.totalProducts}</p>
                    </div>
      
                    <div>
                      <h4 className='font-serif'>FOLLOWERS</h4>
                      <p>{shop.usersFollowing.length}</p>
                    </div>
                    <div>
                      <h4 className='font-serif'>RATINGS</h4>
                      <p>{shop.ratings}</p>
                    </div>
                </div>
            </div>
      
          </div>
  
        ))
        }
      </div>
  )
}

export default RecentShops;
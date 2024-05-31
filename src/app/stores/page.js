"use client";
import React from 'react'
import { useEffect, useState } from 'react';
import { fetchData } from "../api/get";

export default function Stores() {
  const [shops, setShops] = useState([]);
    const fetchShops = async () => {
        const allShops = await fetchData("/shops");
        setShops(allShops.data);
    };

    useEffect(() => {
      fetchShops();
    }, []);
  
  return (
      <div className='flex flex-wrap justify-center'>
        {
        shops.map((shop) => (
          <div className="w-1/4 p-8 m-4 bg-pink-300 rounded-lg relative" key={shop._id}
          style={{ backgroundImage: `url(${shop.shopBgThumbnail})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
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
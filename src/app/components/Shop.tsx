import React, { useEffect, useState } from 'react'
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

const Shop = async () => {
  const allShops = await getShops();
  // console.log(allShops);
  return (
    <div className='mx-12 p-8'>
      <div className='flex justify-between'>
           <h3 className='font-bold inline font-serif'>Recently Added Stores</h3>
           <h4 className='font-extrabold text-red-900 inline font-serif'>View All</h4>
      </div>

      <div className='shops flex my-2'>
      {
        allShops.data.map((shop : any) => (
        <div className=' border-black border-8 m-1 p-2 text-center'>
          <img className='h-[100px] bg-cover rounded-2xl' src={shop.shopThumbnail} />
          <p>{shop.ratings} ⭐</p>
          <p className='font-serif'>Ratings</p>
          <p className='m-1 p-1 font-serif'>{shop.name}</p>

        </div>
        ))
      }
      </div>
    </div>
  )
}

export default Shop
"use client"
import React, { useEffect, useState } from 'react'
import { BACKEND_URL } from '../utils/Constant';

const getLikedProducts = async () => {
  const likedProductsResponse = await fetch(BACKEND_URL + "/product/liked", {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  });
  const data = await likedProductsResponse.json();
  return data;
}

const LikedProducts = () => {
    const [likedProducts, setLikedProducts] = useState([]);
    useEffect(() => {
      const fetchLikedProducts = async () => {
        const allLikedProducts = await getLikedProducts();
        setLikedProducts(allLikedProducts.data);
      }
      fetchLikedProducts();
    }, []);
    return (
        <div className='my-8'>
            <div className='flex justify-between'>
            <h3 className='font-bold inline font-serif'>Most Liked Products</h3>
            <h4 className='font-extrabold text-red-900 inline font-serif'>View All</h4>
            </div>
          <div
            className='overflow-x-scroll no-scroll flex'
          >
            {likedProducts.map((likedProduct) => (
              <div key={likedProduct._id} className='m-2 p-1 min-w-[120px] text-center rounded-lg hover:bg-gray-200 flex-shrink-0 shadow-md'>
                <div className='flex justify-center w-32'>
                  <img className='rounded-2xl w-[100px] h-[100px] bg-cover' src={likedProduct.thumbnailURL} alt={likedProduct.name} />
                </div>
                <div className='w-28 category-name m-1 p-1 font-serif'>
                  <p className='truncate'>{likedProduct.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
}

export default LikedProducts;
"use client";
import React, { useEffect, useState } from 'react'
import { BACKEND_URL } from '../utils/Constant';

const getTrendingProducts = async () => {
  const trendingProductsResponse = await fetch(BACKEND_URL + "/product/trending", {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  });
  const data = await trendingProductsResponse.json();
  return data;
}

const TrendingProducts = () => {
    const [trendingProducts, setTrendingProducts] = useState([]);
    useEffect(() => {
      const fetchTrendingProducts = async () => {
        const allTrendingProducts = await getTrendingProducts();
        setTrendingProducts(allTrendingProducts.data);
      }
      fetchTrendingProducts();
    }, []);
    return (
        <div>
            <div className='flex justify-between'>
            <h3 className='font-bold inline font-serif'>Trending Products</h3>
            <h4 className='font-extrabold text-red-900 inline font-serif'>View All</h4>
            </div>
          <div
            className='overflow-x-scroll no-scroll flex'
          >
            {trendingProducts.map((trendingProduct : any) => (
              <div key={trendingProduct._id} className='m-2 p-1 min-w-[120px] text-center rounded-lg hover:bg-gray-200 flex-shrink-0 shadow-md'>
                <div className='flex justify-center w-32'>
                  <img className='rounded-2xl w-[100px] h-[100px] bg-cover' src={trendingProduct.thumbnailURL} alt={trendingProduct.name} />
                </div>
                <div className='w-28 category-name m-1 p-1 font-serif'>
                  <p className='truncate'>{trendingProduct.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
}

export default TrendingProducts;
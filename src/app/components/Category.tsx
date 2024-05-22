'use client'; // This directive tells Next.js to treat this component as a client component

import React, { useEffect, useState } from 'react';
import { BACKEND_URL } from '../utils/Constant';

const getCategories = async () => {
  const categoriesResponse = await fetch(BACKEND_URL + "/productCategory", {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  });
  const data = await categoriesResponse.json();
  return data;
}

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const fetchCategories = async () => {
      const allCategories = await getCategories();
      setCategories(allCategories.data);
    };
    fetchCategories();
  }, []); // Empty dependency array to run the effect only once on mount

  const scrollLeft = () => {
    setScrollPosition(prevPosition => Math.max(prevPosition - 200, 0));
  };

  const scrollRight = () => {
    setScrollPosition(prevPosition => Math.max(prevPosition + 200, 0));
  };

  return (
    <div className='relative m-4 p-4'>
      <p className='text-right p-2'>
        <span className='font-serif'>
          Browse all Categories <img className='inline w-4' src='images/arrow-right.svg' alt="Arrow" />
        </span>
      </p>
      <button
        className='absolute z-10 left-0 top-1/2 transform -translate-y-1/2 bg-gray-300 p-2 rounded-full shadow-md'
        onClick={scrollLeft}
      >
        <img src='images/nav-arrow-left.svg' alt="Left Arrow" />
      </button>
      <div
        className='overflow-x-auto flex scroll-smooth'
        style={{ transform: `translateX(-${scrollPosition}px)` }}
      >
        {categories.map((category) => (
          <div key={category._id} className='category m-2 p-1 text-center bg-gray-100 rounded-lg hover:bg-gray-200 flex-shrink-0'>
            <div className='flex justify-center category-image w-32'>
              <img className='rounded-2xl max-w-[100px] bg-cover' src={category.image} alt={category.name} />
            </div>
            <div className='category-name m-1 p-1 font-serif'>
              <p>{category.name}</p>
            </div>
          </div>
        ))}
      </div>
      <button
        className='absolute z-10 right-0 top-1/2 transform -translate-y-1/2 bg-gray-300 p-2 rounded-full shadow-md'
        onClick={scrollRight}
      >
        <img src='images/nav-arrow-right.svg' alt="Right Arrow" />
      </button>
    </div>
  );
};

export default Category;

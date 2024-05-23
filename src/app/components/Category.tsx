"use client"
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

  const [maxScrollPosition, setMaxScrollPosition] = useState(0);
  const ITEM_WIDTH = 128;    // Category container width
  const VISIBLE_WIDTH = 800; // Adjust this based on your layout

  useEffect(() => {
    const fetchCategories = async () => {
      const allCategories = await getCategories();
      setCategories(allCategories.data);
      const totalWidth = allCategories.data.length * ITEM_WIDTH;
      setMaxScrollPosition(totalWidth - VISIBLE_WIDTH);
    };
    fetchCategories();
  }, []);

  const scrollLeft = () => {
    setScrollPosition(prevPosition => Math.max(prevPosition - 200, 0));
  };

  const scrollRight = () => {
    setScrollPosition(prevPosition => {
      const newPosition = prevPosition + 200;
      return Math.min(newPosition, maxScrollPosition);
    });
  };

  return (
    <div className='relative mx-12 p-8'>
      <button
        className=' absolute z-10 left-0 top-28 transform -translate-y-1/2 bg-gray-300 p-2 rounded-full shadow-md'
        onClick={scrollLeft}
      >
          <img src='/images/nav-arrow-left.svg' alt="Left Arrow" />
      </button>
      <div
        className='overflow-x-scroll no-scroll flex'
      >
        {categories.map((category : any) => (
          <div  
        style={{ transform: `translateX(-${scrollPosition}px)` }}
          key={category._id} className='category m-2 p-1 min-w-[120px] text-center rounded-lg hover:bg-gray-200 flex-shrink-0 shadow-md'>
            <div className='flex justify-center category-image w-32'>
              <img className='rounded-2xl w-[100px]  min-h-[100px] bg-cover' src={category.image} alt={category.name} />
            </div>
            <div className='w-28 category-name m-1 p-1 font-serif'>
              <p className='truncate'>{category.name}</p>
            </div>
          </div>
        ))}
      </div>
      <button
        className='absolute z-10 right-0 top-28 transform -translate-y-1/2 bg-gray-300 p-2 rounded-full shadow-md'
        onClick={scrollRight}
      >
          <img src='/images/nav-arrow-right.svg' alt="Right Arrow" />
      </button>
    </div>
  );
};

export default Category;

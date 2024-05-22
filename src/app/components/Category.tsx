"use client"
// components/Category.js
import React, { useRef, useEffect, useState } from 'react';
// import { useClient } from 'next/data-client';
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
  const ITEM_WIDTH = 128;
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

  useEffect(() => {
    const updateScrollButtons = () => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
      }
    };

    updateScrollButtons();
    if (scrollRef.current) {
      scrollRef.current.addEventListener('scroll', updateScrollButtons);
    }

    return () => {
      if (scrollRef.current) {
        scrollRef.current.removeEventListener('scroll', updateScrollButtons);
      }
    };
  }, [categories]);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  // const scrollRight = () => {
  //   setScrollPosition(prevPosition => Math.max((prevPosition + 200), 0));
  // };
  const scrollRight = () => {
    setScrollPosition(prevPosition => {
      const newPosition = prevPosition + 200;
      return Math.min(newPosition, maxScrollPosition);
    });
  };

  return (
    <div className='relative mx-12 p-8'>
      <p className='text-right p-2'>
        <span className='font-serif'>
            Browse all Categories <img className='inline w-4' src='/images/arrow-right.svg' alt="Arrow" />
        </span>
      </p>
      <button
        className=' absolute z-10 left-0 top-40 transform -translate-y-1/2 bg-gray-300 p-2 rounded-full shadow-md'
        onClick={scrollLeft}
          disabled={!canScrollLeft}
      >
          <img src='/images/nav-arrow-left.svg' alt="Left Arrow" />
      </button>
      <div
        className='overflow-hidden flex scroll-smooth'
      >
        {categories.map((category : any) => (
          <div  
        style={{ transform: `translateX(-${scrollPosition}px)` }}
          key={category._id} className='category m-2 p-1 min-w-[120px] text-center bg-gray-100 rounded-lg hover:bg-gray-200 flex-shrink-0'>
            <div className='flex justify-center category-image w-32'>
              <img className='rounded-2xl w-[100px]  min-h-[100px] bg-cover' src={category.image} alt={category.name} />
            </div>
            <div className='category-name m-1 p-1 font-serif'>
              <p>{category.name}</p>
            </div>
          </div>
        ))}
      </div>
      <button
        className='absolute z-10 right-0 top-40 transform -translate-y-1/2 bg-gray-300 p-2 rounded-full shadow-md'
        onClick={scrollRight}
          disabled={!canScrollRight}
      >
          <img src='/images/nav-arrow-right.svg' alt="Right Arrow" />
      </button>
      </div>
    </div>
  );
};

export default Category;

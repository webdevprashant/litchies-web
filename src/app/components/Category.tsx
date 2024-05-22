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
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const scrollRef = useRef(null);
  // const { data } = useClient();

  useEffect(() => {
    const fetchCategories = async () => {
      const allCategories = await getCategories();
      setCategories(allCategories.data);
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

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  return (
    <div className='flex justify-center'>
      <div className='relative mx-[24px] p-4 w-[80%]'>
      <p className='text-right p-2'>
        <span className='font-serif'>
            Browse all Categories <img className='inline w-4' src='/images/arrow-right.svg' alt="Arrow" />
        </span>
      </p>
      <button
          className={`absolute z-10 left-0 top-1/2 transform -translate-y-1/2 bg-gray-300 p-2 rounded-full shadow-md ${!canScrollLeft && 'opacity-50 cursor-not-allowed'}`}
        onClick={scrollLeft}
          disabled={!canScrollLeft}
      >
          <img src='/images/nav-arrow-left.svg' alt="Left Arrow" />
      </button>
      <div
          className='overflow-x-hidden flex scroll-smooth'
          ref={scrollRef}
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
          className={`absolute z-10 right-0 top-1/2 transform -translate-y-1/2 bg-gray-300 p-2 rounded-full shadow-md ${!canScrollRight && 'opacity-50 cursor-not-allowed'}`}
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

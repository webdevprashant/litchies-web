import React, { useRef } from 'react';
import { BACKEND_URL } from '../utils/Constant'

const getCategories = async () => {
  const categoriesResponse = await fetch(BACKEND_URL + "/productCategory" , {
      method: 'GET',
      headers: {
          'Content-Type' : 'application/json',
      }
  });
  const data = await categoriesResponse.json();
  return data;
}

const Category = async () => {
  const allCategories = await getCategories();
  const scrollRef = useRef<HTMLDivElement>(null);

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
    <div className='relative m-4 p-4'>
      <p className='text-right p-2'>
        <span className='font-serif'>
          Browse all Categories <img className='inline w-4' src='images/arrow-right.svg' />
        </span>
      </p>
      <button
        className='absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-300 p-2 rounded-full shadow-md'
        onClick={scrollLeft}
      >
        <img src='images/nav-arrow-left.svg' />
      </button>
      <div className='overflow-x-hidden flex scroll-smooth' 
      // ref={scrollRef}
      >
        {allCategories.data.map((category : any) => (
          <div ref={scrollRef} key={category._id} className='category m-2 p-1 text-center bg-gray-100 rounded-lg hover:bg-gray-200 flex-shrink-0'>
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
        className='absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-300 p-2 rounded-full shadow-md'
        onClick={scrollRight}
      >
        <img src='images/nav-arrow-right.svg' />
      </button>
    </div>
  );
};

export default Category;
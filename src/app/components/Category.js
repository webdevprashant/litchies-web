"use client"
import React, { useEffect, useState } from 'react';
import { fetchData } from '../api/get';

const Category = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      const allCategories = await fetchData("/productCategory");
      setCategories(allCategories.data);
    };
    fetchCategories();
  }, []);
  return (
    <div>
      <div
        className='overflow-x-scroll no-scroll flex'
      >
        {categories.map((category) => (
          <div  
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
    </div>
  );
};

export default Category;
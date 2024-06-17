"use client"
import React, { useEffect, useState } from 'react';
import { fetchData } from '../../api/get';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const Category = () => {
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  // const handleClick = (id) => {

  //   const dataToPass = {
  //     route: `/product/${id}/category`
  //   };
    
  //   router.push({
  //     pathname: `/product/${id}/category`,
  //     query: dataToPass
  //   });
  // };
  useEffect(() => {
    const fetchCategories = async () => {
      const allCategories = await fetchData("/productCategory");
      setCategories(allCategories.data);
    };
    fetchCategories();
  }, []);
  let src;
  return (
    <div>
      <div
        className='overflow-x-scroll no-scroll flex'
      >
        {categories.map((category) => (
          <div  
          key={category._id} onClick={() => router.push(`/product/${category._id}/category`)} className='m-2 p-1 min-w-[120px] text-center rounded-lg hover:bg-gray-200 hover:cursor-pointer flex-shrink-0 shadow-md'>
            <div className='flex justify-center category-image w-32'>
              <Image width={100} height={100} className='rounded-2xl min-h-[100px] bg-cover' src={category.image} alt={category.name} />
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

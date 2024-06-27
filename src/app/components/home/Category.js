"use client"
import React, { useEffect, useState } from 'react';
import { fetchData } from '../../api/get';
import { useRouter } from 'next/navigation';
import Shimmer from "../../utils/shimmer"
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { setHomeCateogories  } from '../../redux/slice'
const Category = () => {
  const dispatch = useDispatch();
  const category = useSelector((store) => store.user.homeCategories);
  // console.log("Home Category : " , category[0]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const fetchCategories = async () => {
      if (category.length === 0) {
        const allCategories = await fetchData("/productCategory");
        setCategories(allCategories.data);
        dispatch(setHomeCateogories(allCategories.data))
      } else {
        setCategories(category[0]);
      }
      setLoading(false);
    };
    fetchCategories();
  }, []);
  return (
    <div>
      <div className='overflow-x-scroll no-scroll flex'>
        { loading ? 
        Array(20).fill("").map((data, index) => ( <Shimmer key={index} w={130} h={130} /> )) : 
        (categories.map((category) => (
          <div  
          key={category._id} onClick={() => router.push(`/product/${category._id}/category`)} className='m-2 p-1 min-w-[120px] text-center rounded-lg hover:bg-gray-200 hover:cursor-pointer flex-shrink-0 shadow-md'>
            <div className='flex justify-center category-image w-32'>
              <Image width={100} height={100} className='rounded-2xl min-h-[100px] bg-cover' src={category.image} alt={category.name} 
              />
            </div>
            <div className='w-28 category-name m-1 p-1 font-serif'>
              <p className='truncate'>{category.name}</p>
            </div>
          </div>
        ))
        )
        }
      </div>
    </div>
  );
};

export default Category;

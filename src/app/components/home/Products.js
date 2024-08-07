"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { fetchData } from '../../api/get';
import Image from 'next/image';
import Shimmer from '../../utils/shimmer';
import { useDispatch, useSelector } from 'react-redux';
import { setHomeProducts } from '../../redux/slice';

const Products = ({title, route}) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const product = useSelector((store) => store.user.homeProducts);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const fetchProducts = async () => {
        if (product.length === 0) {
          const allProducts = await fetchData(route);
          setProducts(allProducts.data);
          dispatch(setHomeProducts(allProducts.data));
        } else {
          setProducts(product[0]);
        }
        setLoading(false);
      }
      fetchProducts();
    }, [route]);
    return (
        <div className='m-8'>
            <div className='flex justify-between'>
            <h3 className='font-bold inline font-serif'>{title}</h3>
            <h4 className='font-extrabold text-red-900 inline font-serif hover:cursor-pointer hover:text-red-200' onClick={() => router.push("/product")}>View All</h4>
            </div>
          <div
            className='overflow-x-scroll no-scroll flex'
          >
            {loading ? Array(20).fill("").map((data, index) => ( 
        <Shimmer key={index} w={100} h={120} /> 
      )) : products.map((product) => (
              <div key={product._id} onClick={() => router.push(`/product/${product._id}`)} className='m-2 p-1 min-w-[120px] text-center rounded-lg hover:bg-gray-200 hover:cursor-pointer flex-shrink-0 shadow-md'>
                <div className='flex justify-center'>
                  <Image width={100} height={0} className='rounded-2xl w-[100px] h-[120px] bg-cover' src={product.thumbnailURL} alt={product.name} />
                </div>
                <div className='w-28 category-name m-1 p-1 font-serif'>
                  <p className='truncate'>{product.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
}

export default Products;
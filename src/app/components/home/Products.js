"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { fetchData } from '../../api/get';
import Image from 'next/image';

const Products = ({title, route}) => {
    const router = useRouter();
    const [products, setProducts] = useState([]);
    useEffect(() => {
      const fetchProducts = async () => {
        const allProducts = await fetchData(route);
        setProducts(allProducts.data);
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
            {products.map((product) => (
              <div key={product._id} onClick={() => router.push(`/product/${product._id}`)} className='m-2 p-1 min-w-[120px] text-center rounded-lg hover:bg-gray-200 hover:cursor-pointer flex-shrink-0 shadow-md'>
                <div className='flex justify-center'>
                  <Image width={100} height={0} className='rounded-2xl w-[100px] h-[100px] bg-cover' src={product.thumbnailURL} alt={product.name} />
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
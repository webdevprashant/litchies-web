"use client";
import { useEffect, useState } from 'react'
import { fetchDataId } from "../../api/get";
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Products = (props) => {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchShopProducts = async () => {
      const allProducts = await fetchDataId("/product/", `${props.shopId}/shop`);
      setProducts(allProducts.data);
    };
    fetchShopProducts();
  }, [props.shopId]);
  return (
    <div className='grid grid-cols-3 gap-2 justify-between items-center'>
        {
          products.map((product) => (
            <div key={product?._id} onClick={() => router.push(`/product/${product._id}`)} className="flex items-center justify-center border border-red-400 rounded-lg hover:cursor-pointer">
                  <div className="shadow-lg rounded-md cursor-pointer">
                    <Image width={0} height={0}
                      className="rounded-md bg-cover xsm:min-w-[100px] xsm:max-h-[100px] lg:min-w-[250px] lg:max-h-[250px] sm:min-w-[150px] sm:max-h-[150px]"
                      src={product?.thumbnailURL}
                      alt='Product'
                    />
                  </div>
            </div>
          ))
        }
    </div>
  )
}

export default Products;
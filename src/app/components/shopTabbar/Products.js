"use client";
import { useEffect, useState } from 'react'
import { fetchDataId } from "../../api/get";
import Image from 'next/image';

const Products = (props) => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchShopProducts = async () => {
      const allProducts = await fetchDataId("/product/", `${props.shopId}/shop`);
      setProducts(allProducts.data);
    };
    fetchShopProducts();
  }, [props.shopId]);
  return (
    <div className='grid grid-cols-3 gap-4 justify-between items-center'>
        {
          products.map((product) => (
            <div key={product?._id} className="col-span-3 sm:col-span-1 flex items-center justify-center rounded-lg">
                  <div className="">
                    <Image width={250} height={250}
                      className="min-h[250px] rounded-2xl bg-cover"
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
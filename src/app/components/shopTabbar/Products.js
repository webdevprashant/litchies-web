"use client";
import { useEffect, useState } from 'react'
import { fetchDataId } from "../../api/get";

const Products = (props) => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchShopProducts = async () => {
      const allProducts = await fetchDataId("/product/", `${props.shopId}/shop`);
      setProducts(allProducts.data);
    };
    fetchShopProducts();
  }, []);
  return (
    <div className='grid grid-cols-3 gap-4 justify-between items-center'>
        {
          products.map((product) => (
            <div key={product?._id} className="col-span-3 sm:col-span-1 flex items-center justify-center rounded-lg">
                  <div className="">
                    <img
                      className="rounded-2xl h-[250px] w-[250px] bg-cover"
                      src={product?.thumbnailURL}
                    />
                  </div>
            </div>
          ))
        }
    </div>
  )
}

export default Products;
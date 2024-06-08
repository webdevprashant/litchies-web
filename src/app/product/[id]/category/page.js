"use client"
import { useParams, usePathname } from 'next/navigation';
import React from 'react'
import Products from "../../../components/product/All";

const ProductsCategory = () => {
  const data = usePathname();
  console.log("id" , data);
  return (
    <Products route={data} />
  )
}

export default ProductsCategory;
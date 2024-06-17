"use client"
import { usePathname } from 'next/navigation';
import React from 'react'
import Products from "../../../components/product/All";

const ProductsCategory = () => {
  const data = usePathname();
  return (
    <Products route={data} />
  )
}

export default ProductsCategory;
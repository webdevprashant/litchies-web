"use client"
import { usePathname } from 'next/navigation'
import Product from "../../../components/product/All";
import React from 'react'

const LikedProduct = () => {
  const data = usePathname();
  return (
    <Product route={data} />
  )
}

export default LikedProduct;
"use client"
import React from 'react'
import Shops from "../../../components/shops/shops"
import { usePathname } from 'next/navigation'

const FollowedShops = () => {
  const data = usePathname();
  return (
    <Shops route={data} />
  )
}

export default FollowedShops;
"use client";
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';

const Header = () => {
  const cartItems = useSelector((store) => store.user.cart);
  const [searchQuery, setSearchQuery] = useState(null);
  const handleInputChange = (e) => {
      setSearchQuery(e.target.value);
  }

  return (
    <div className="grid justify-items-center lg:grid-cols-3 items-center shadow-xl">
      <div className="xsm:my-2">
        <Link href="/"><Image width={150} height={150} className='rounded-2xl bg-cover' src="/images/litchieslogo.png" alt="Logo" /></Link>
      </div>
          <div className="flex">
            <input
              className="mx-2 p-1 pl-4 outline-none text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
              onChange={handleInputChange}
              type="text"
              placeholder="Search"
            />
            <Link href={{ pathname: `/search`, query: { query: searchQuery } }}><button type='submit' className='cursor-pointer bg-gray-500 hover:bg-gray-300 text-white py-2 px-2 rounded-lg' >Search</button></Link>
          </div>
      <Link href="/cart"><div className="flex relative cursor-pointer">
        <Image width={40} height={30} className='rounded-2xl xsm:my-2 bg-cover' src="/images/shopping-cart.svg" alt="Shopping Cart" /> <span className='absolute left-6 bg bg-red-400 px-1 m-1 rounded-2xl text-white text-[12px]'>{cartItems.length > 0 ? cartItems.length : "" }</span>
      </div></Link>
    </div>
  );
}

export default Header;
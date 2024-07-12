"use client";
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { FaSearch } from "react-icons/fa";
import { userDetails } from '../../utils/Constant';
import { useDispatch, useSelector } from 'react-redux';
import { addCartItem } from '../../redux/slice';

const Header = () => {
  const carts = useSelector((store) => store.user.cart);
  const [user, setUser] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
      if (typeof window !== undefined && window.localStorage) {
      const user = JSON.parse(window.localStorage.getItem(userDetails));
      if (user) {
        setUser(user);
        user.cart.map(cart => dispatch(addCartItem(cart)))
      }
      }
  }, [])
  const [searchQuery, setSearchQuery] = useState(null);
  const handleInputChange = (e) => {
      setSearchQuery(e.target.value);
  }

  return (
    <div className="m-2 flex lg:flex-row xsm:flex-col justify-between items-center shadow-xl xsm:pb-2">
      <div className="xsm:my-2">
        <Link href="/"><Image width={150} height={150} className='rounded-2xl bg-cover' src="/images/litchieslogo.png" alt="Logo" /></Link>
      </div>
      <div className="flex items-center relative">
        <div>
        <input
          className="mx-2 p-2 pl-4 outline-none text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
          onChange={handleInputChange}
          type="text"
          placeholder="Search"
        />
        <Link href={{ pathname: `/search`, query: { query: searchQuery } }}>
        <FaSearch size={20} className='absolute text-gray-600 right-16 top-4' />
        </Link>
        </div>
      <Link href="/cart"><div className="flex relative cursor-pointer">
        <Image width={40} height={30} className='rounded-2xl xsm:my-2 bg-cover' src="/images/shopping-cart.svg" alt="Shopping Cart" /> <span className='absolute left-6 bg bg-red-400 px-1 m-1 rounded-2xl text-white text-[12px]'>{carts?.length > 0 ? carts?.length : "" }</span>
      </div>
      </Link>
      </div>
    </div>
  );
}

export default Header;
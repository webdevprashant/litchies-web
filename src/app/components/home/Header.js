import Image from 'next/image';
import React from 'react'

const Header = () => {
  return (
    <div className="grid justify-items-center lg:grid-cols-3 items-center shadow-xl">
      <div className="xsm:my-2">
        <Image width={150} height={150} className='rounded-2xl bg-cover' src="/images/litchieslogo.png" alt="Logo" />
      </div>
      <div className="search relative px-2 sm:my-2 xsm:my-2">
        <input
          className="mx-4 p-2 lg:w-full xsm:p-2 pl-10 outline-none text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
          type="text"
          placeholder="Search"
        />
        {/* <Image width={20} height={20} className='absolute top-2 left-8 rounded-2xl bg-cover' src="/images/search.svg" alt="Search" /> */}
      </div>
      <div className="cart">
        <Image width={40} height={30} className='rounded-2xl xsm:my-2 bg-cover' src="/images/shopping-cart.svg" alt="Shopping Cart" />
      </div>
    </div>
  );
}

export default Header;
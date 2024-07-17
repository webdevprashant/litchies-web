"use client"
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react'

const Checkout = () => {
  const router = useRouter();
  return (
    <div>
      <div className="flex justify-center"><Image width={0} height={0} className="lg:w-[800px] lg:h-[300px] xsm:w-[400px] xsm:h-[200px]" src="/images/thankyou.gif" alt="Thank You For Purchasing" /></div>
      <div className="w-full lg:py-8 text-center">
        <p className="text-red-800 font-bold text-xl py-4">Thank You!</p>
        <p className="text-green-600 font-bold">Your order is being processed and we will notify you soon.</p>
        <p className="text-green-600 font-bold pb-10">Thanks for choosing us !</p>
        <button type="button" className="bg-red-600 lg:w-3/12 text-white p-3 rounded-lg" onClick={() => router.push("/")}>CONTINUE SHOPPING</button>
      </div>
    </div>
  )
}

export default Checkout;
"use client"
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react'
import { MdOutlineModeEdit } from "react-icons/md";
import { order } from '../utils/Constant';
import { formDataHandle } from "../api/post";
import toast from 'react-hot-toast';
const Order = () => {
  const router = useRouter();
  const handleInStoreOrder = async () => {
    if (typeof window !== "undefined" && window.localStorage) {
      const orderInfo = JSON.parse(localStorage.getItem(order));
      const bodyData = {
        shopId: orderInfo.shopId,
        customerId: orderInfo.customerId,
        deliveryMode: "Store",
        product: [
          {
            productId: orderInfo.productId,
            quantity: orderInfo.quantity
          }
        ]
      }
      const ordering = await formDataHandle(`/order/` , bodyData);
      if (ordering.status) {
        localStorage.removeItem(order);
        router.push("/order/checkout");
      } else {
        toast.error("Something went wrong during order, Try again later....");
      }
    }
  }
  return (
    <div className=''>
        <ul className="flex gap-x-2 bg-red-500 mt-10 p-10">
          <li className="flex items-center gap-x-2 shrink basis-0 flex-1 group">
            <div className="flex flex-col justify-center items-center">
              <span className="size-7 flex justify-center items-center flex-shrink-0 bg-gray-100 font-medium text-gray-800 rounded-full dark:bg-neutral-700 dark:text-white">
                <MdOutlineModeEdit size={20} />
              </span>
              <span className="ms-2 block font-medium text-gray-800 dark:text-white">
                Delivery
              </span>
            </div>
            <div className="w-full h-px flex-1 bg-gray-200 group-last:hidden dark:bg-neutral-700"></div>
          </li>

          <li className="flex items-center gap-x-2 shrink basis-0 flex-1 group">
            <div className="flex flex-col justify-center items-center">
              <span className="size-7 flex justify-center items-center flex-shrink-0 bg-gray-100 font-medium text-gray-800 rounded-full dark:bg-neutral-700 dark:text-white">
                <MdOutlineModeEdit size={20} />
              </span>
              <span className="ms-2 block font-medium text-gray-800 dark:text-white">
                Address
              </span>
            </div>
            <div className="w-full h-px flex-1 bg-gray-200 group-last:hidden dark:bg-neutral-700"></div>
          </li>

          <li className="flex items-center gap-x-2 shrink basis-0 group">
            <div className="flex flex-col justify-center items-center">
              <span className="size-7 flex justify-center items-center flex-shrink-0 bg-gray-100 font-medium text-gray-800 rounded-full dark:bg-neutral-700 dark:text-white">
                  <MdOutlineModeEdit size={20} />
              </span>
              <span className="ms-2 block font-medium text-gray-800 dark:text-white">
                Confirm
              </span>
            </div>
            <div className="w-full h-px flex-1 bg-gray-200 group-last:hidden dark:bg-neutral-700"></div>
          </li>
        </ul>
      <div className='flex gap-4 justify-center p-4'>
        <div className='cursor-pointer'  onClick={() => handleInStoreOrder()}>
          <Image className='rounded-2xl shadow-2xl border border-gray-400 lg:w-[400px] lg:h-[328px] xsm:w-[250px] xsm:h-[130px] my-4' width={0} height={0} src="/images/store.gif" />
          <p className='text-center font-semibold'>IN STORE PICKUP</p>
        </div>

        <div className='cursor-pointer'>
        <Image className='rounded-2xl shadow-2xl border border-gray-400 lg:w-[400px] xsm:w-[250px] lg:h-[328px] xsm:h-[130px] my-4' width={0} height={0} src="/images/delivery.gif" />
        <p className='text-center font-semibold'>DELIVERY</p>
        </div>
      </div>
    </div>
  )
}

export default Order;
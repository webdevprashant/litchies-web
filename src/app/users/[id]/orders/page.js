"use client"
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { fetchDataId } from '../../../api/get';
import Image from 'next/image';
import { MdKeyboardArrowRight } from "react-icons/md";
import { orderStatus } from '../../../utils/Constant';
import Link from 'next/link';

const Myorders = () => {
  const params = usePathname();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const userId = params.split("/")[2];
  useEffect(() => {
    setLoading(true)
    const fetchOrders = async () => {
      if (userId) {
        try {
          const response = await fetchDataId(`/order/`, `${userId}/user`);
          console.log("response.data", response.data);
          setOrders(response.data);
        } catch (err) {
          console.error('Error fetching user Orders.');
        } finally {
          setLoading(false);
        }
      }
    }
    fetchOrders();
  }, []);
  return (
    <div className='lg:w-3/4 m-auto lg:pt-10 xsm:pt-4'>
      {!loading && orders.length === 0 ?
        <h1 className='h-[50vh] flex justify-center items-center text-pretty font-semibold'>No Orders found.</h1>
        : (orders.map((order) => (
          <div key={order._id} className='lg:p-0 lg:m-0 xsm:pt-8 xsm:px-2'>
            <Link href={{ pathname: `/users/${userId}/orders/detail`, query: { orderId: order._id } }} >
            <div className='flex justify-evenly items-center cursor-pointer'>
              <div className='min-w-32'>
                <Image width={150} height={100} src={order?.shopId?.shopThumbnail} />
              </div>
              <div className='pl-2 max-w-80'>
                <h1 className='text-xl text-red-500 font-bold'>{order?.shopId?.name}</h1>
                <h1 className='font-semibold text-orange-400'>{orderStatus[order?.status]}</h1>
                <h1 className='font-bold'>Total Products: {order?.product.length} </h1>
                <p className='text-gray-500 text-xs break-before-auto'>{order?.shopId?.address}</p>
                {/* Shop name, order statusm Total Products, address */}
              </div>

              <div>
                <MdKeyboardArrowRight size={30} />
              </div>
            </div>
            </Link>
            <hr className="border border-black my-4" />
          </div>
        ))
        )
      }
    </div>
  )
}

export default Myorders;
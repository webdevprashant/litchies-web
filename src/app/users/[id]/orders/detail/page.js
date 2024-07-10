"use client"
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { MillisecondsToTime } from "../../../../utils/utils";
import { fetchDataId } from '../../../../api/get';
import Image from 'next/image';
import { orderStatus } from '../../../../utils/Constant';

const Order = () => {
  const router = useSearchParams();
  let orderId = router.get('orderId');
  const [loading, setLoading] = useState(false);
  const [orderTime, setOrderTime] = useState();
  const [order, setOrder] = useState({});
  useEffect(() => {
    setLoading(true)
    const fetchOrder = async () => {
        if (orderId) {
          try {
            const response = await fetchDataId(`/order/`, orderId);
            setOrder(response.data);
            const time = MillisecondsToTime(response?.data?.createdAt)
            setOrderTime(time);
          } catch (err) {
            console.error('Error fetching user Orders.');
          } finally {
            setLoading(false);
          }
        } 
    }
    fetchOrder();
  }, []);
  return (
    <div className='flex justify-center'>
      <div className='lg:w-3/12 p-4'>
        <h1 className='font-bold py-4'>View Order Details</h1>
        <div className='border border-black rounded-xl grid grid-cols-5 gap-2 p-1'>
            <div className='col-span-2'>
                Order Date<br/>
                Order Id<br/>
                Order Total
            </div>
            <div className='col-span-3'>
                {orderTime && `${orderTime[0]}/${orderTime[1]}/${orderTime[2]}`}<br/>
                {order?.orderUUId}<br/>
                Rs. {order?.product && order?.product[0]?.productId.mrp}
            </div>
        </div>

        <h1 className='font-bold py-4'>Order Items</h1>
        <div className='border border-black rounded-xl'>
                  <div className='p-2'>Delivery Mode : <span className='font-bold'>{ order?.deliveryMode }</span> </div>
                  <hr className="border border-black" />
                  <div className='flex items-center justify-evenly p-2'>
                    <Image width={80} height={80} src={order?.product && order?.product[0].productId?.imageURLs[0]} />
                    <div className='px-2'>
                      <p className='font-semibold'>{order?.product && order?.product[0].productId?.name}</p>
                      <div className='text-xs'>
                        <p>Total Price : Rs. {order?.product && order?.product[0]?.productId.mrp} </p>
                        <p>Quantity : {order?.product && order?.product.length}</p>
                      </div>
                    </div>
                  </div>
        </div>

        <div className='flex justify-between py-4'><h1 className='font-bold'>Order Status</h1> <p className='text-orange-500 font-semibold'>{orderStatus[order?.status]}</p></div>
        <div className='font-semibold text-center border border-black rounded-lg p-2'>Total Amount: {order?.product && order?.product[0]?.productId.mrp}</div>
      </div>
    </div>
  )
}

export default Order
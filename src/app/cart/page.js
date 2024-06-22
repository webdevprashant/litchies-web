"use client"
import Image from 'next/image';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RiDeleteBinLine } from "react-icons/ri";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import { removeCartItem } from '../redux/slice';
import toast from 'react-hot-toast';

const Cart = () => {
  const cartItems = useSelector((store) => store.user.cart);
  const dispatch = useDispatch();
  const [expandedItems, setExpandedItems] = useState(cartItems.map(() => false));
  const [quantity, setQuantity] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  const handleRemoveFromCart = (item) => {
    toast.success('Remove from Cart Successfully.')
    dispatch(removeCartItem(item));
  }

  const handleToggle = (index) => {
    setExpandedItems(prevIndex => (prevIndex === index ? null : index));
    setIsOpen(!isOpen);
  }

  const incrementCounter = () => {
    setQuantity(quantity + 1);
  }
  const decrementCounter = () => {
    if (quantity !== 1) {
      setQuantity(quantity - 1);
    }
  }

  return (
    <div className='lg:w-7/12 sm:w-full lg:m-auto grid grid-cols-1 lg:gap-4 mt-10 lg:p-4'>
      {cartItems.length == 0 ? (
        <h1 className='h-[50vh] flex justify-center items-center'>Cart is Empty, Please add some items to the cart.</h1>
      ) : (
        cartItems.map((product, index) => (
          <div key={product._id} className='shadow-xl m-2 p-2'>
            <div className='flex justify-between'>
              <div className="flex items-center">
                <Image
                  width={80}
                  height={80}
                  className="rounded-2xl"
                  src={product?.shopId?.shopBgThumbnail}
                  alt="Product Square Image"
                />
                <div className='mx-4'>
                  <p className='text-red-400 font-semibold lg:text-xl sm:text-xs'>{product?.name}</p>
                  <p>Total Order Price RS. <span className='text-red-400'>{product.price}</span></p>
                </div>
              </div>
              <button onClick={() => handleToggle(index)}>
                {isOpen && expandedItems === index ? <MdKeyboardArrowUp size={30} /> : <MdKeyboardArrowDown size={30} />}
              </button>
            </div>
            {expandedItems === index && (
              <ul className='w-full mt-4'>
                <li>
                  <div className='flex justify-between'>
                    <div className="flex items-center">
                      <Image
                        width={80}
                        height={80}
                        className="rounded-2xl"
                        src={product?.thumbnailURL}
                        alt="Product Square Image"
                      />
                      <div className='mx-4'>
                        <p className='text-red-400 font-semibold lg:text-xl sm:text-xs'>{product?.name}</p>
                        <p><span className='text-red-400'>Rs. {product.price}</span></p>
                        <p className='text-sm text-gray-500 flex items-center gap-2'>
                          Remove Item from list
                          <RiDeleteBinLine size={20}
                            onClick={() => handleRemoveFromCart(product)}
                            className='text-red-500 cursor-pointer'
                          />
                        </p>
                      </div>
                    </div>
                    <div className='text-xl flex items-center gap-2'>
                      <button className='border border-gray-300 p-2 rounded-lg' onClick={incrementCounter}>+</button>
                      <p>{quantity}</p>
                      <button className='border border-gray-300 p-2 rounded-lg' onClick={decrementCounter}>-</button>
                    </div>
                  </div>
                </li>
                <button className="w-full cursor-pointer bg-red-600 text-white m-2 py-2 lg:px-12 xsm:px-8 rounded-lg" type='button'>Checkout</button>
              </ul>
            )}
          </div>
        ))
      )}
    </div>
  );
};


export default Cart;
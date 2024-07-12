"use client"
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { RiDeleteBinLine } from "react-icons/ri";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import toast from 'react-hot-toast';
import { fetchDataId } from '../api/get';
import { userDetails } from '../utils/Constant';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { addCartItem, removeCartItems, removeCartItem } from '../redux/slice';
import { Update } from '../api/put';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]); 
  const [loading, setLoading] = useState(false);
  const carts = useSelector((store) => store.user.cart); 
  const dispatch = useDispatch();
  const router = useRouter();
  let user = null;
  useEffect(() => {
    const fetchCartItems = async () => {
      setLoading(true);
      if (typeof window !== undefined && window.localStorage) {
        const userInfo = JSON.parse(window.localStorage.getItem(userDetails));
        user = userInfo;
      }
      if (user) {
        try {
          const response = await fetchDataId(`/users/type?userId=` , `${user._id}&type=cart`);
          setCartItems(response.data);
          dispatch(removeCartItems());
          response.data.map(cart => dispatch(addCartItem(cart)))
        } catch(err) {
          console.error('Error fetching Carts :', err);
        } finally {
          setLoading(false);
        }
      } else {
        router.push("/profile/login");
      }
    }
    fetchCartItems();
  }, []);

  const [expandedItems, setExpandedItems] = useState(
    // cartItems.map(() => false)
  );
  const [quantity, setQuantity] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  const handleRemoveFromCart = async (product) => {
    if (typeof window !== undefined && window.localStorage) {
      const userInfo = JSON.parse(window.localStorage.getItem(userDetails));
      user = userInfo;
    }
    if (user) {
      const response = await Update(`/product/${product._id}/uncart`, { userId: user._id });
      if (response.status) {
        dispatch(removeCartItem(product._id));
        localStorage.setItem(userDetails, JSON.stringify(response.data));             // Save changes token in local
        const updatedCarts = cartItems.filter(cart => cart._id !== product._id);
        setCartItems(updatedCarts);
        toast.success("Product removed from cart.");
      } else {
        toast.error("Something went wrong, Try again later.");
      }
    }

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
      <div>
      {/* {cartItems.length == 0 ? ( */}
      { !loading && cartItems.length == 0 ? (
        <h1 className='h-[50vh] flex justify-center items-center text-pretty font-semibold'>Cart is Empty, Please add some items.</h1>
      ) : (
        cartItems.map((product, index) => (
          <div key={product._id} className='shadow-xl p-2 w-full'>
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
                  <p>Total Order Price RS. <span className='text-red-400'>{product?.price}</span></p>
                </div>
              </div>
              <button className='text-gray-500' onClick={() => handleToggle(index)}>
                {isOpen && expandedItems === index ? <MdKeyboardArrowUp size={30} /> : <MdKeyboardArrowDown size={30} />}
              </button>
            </div>
            {expandedItems === index && (
              <ul className='w-full mt-8 ml-2'>
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
    </div>
  );
};


export default Cart;
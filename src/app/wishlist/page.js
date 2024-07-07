"use client"
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { RiDeleteBinLine } from "react-icons/ri";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import toast from 'react-hot-toast';
import { fetchDataId } from '../api/get';
import { userDetails } from '../utils/Constant';
import { useRouter } from 'next/navigation';
import { Update } from '../api/put';
import { useDispatch } from 'react-redux';
import { addCartItem } from '../redux/slice';

const WishList = () => {
  const [wishListItems, setWishListItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const dispatch = useDispatch();
  let user = null;
  useEffect(() => {
    setLoading(true);
    const fetchWishListItems = async () => {
      if (typeof window !== undefined && window.localStorage) {
        const userInfo = JSON.parse(window.localStorage.getItem(userDetails));
        user = userInfo;
      }
      if (user) {
        try {
          const response = await fetchDataId(`/users/type?userId=` , `${user._id}&type=wishList`);
          setWishListItems(response.data);
        } catch (err) {
          console.error('Error fetching WishLists :', err);
        } finally {
          setLoading(false);
        }
      } else {
        router.push("/profile/login");
      }
    }
    fetchWishListItems();
  }, []);

  const [expandedItems, setExpandedItems] = useState(
    // WishListItems.map(() => false)
  );
  const [isOpen, setIsOpen] = useState(false);

  const handleRemoveFromWishList = async (product) => {
    if (typeof window !== undefined && window.localStorage) {
      const userInfo = JSON.parse(window.localStorage.getItem(userDetails));
      user = userInfo;
    }
    if (user) {
      const response = await Update(`/product/${product._id}/unwishlist`, { userId: user._id });
      if (response.status) {
        localStorage.setItem(userDetails, JSON.stringify(response.data));             // Save changes token in local
        const updatedWishLists = wishListItems.filter(wishList => wishList._id !== product._id);
        setWishListItems(updatedWishLists);
        toast.success("Product removed from WishList.");
      } else {
        toast.error("Something went wrong, Try again later.");
      }
    }

  }

  const handleAddToCart = async (product) => {
    user = JSON.parse(localStorage.getItem(userDetails));
    if (user) {
      // Add to Cart API
      let response
      response = await Update(`/product/${product._id}/cart`, { userId: user._id });
      if (response.status) {
        dispatch(addCartItem(product._id));
        localStorage.setItem(userDetails, JSON.stringify(response.data));             // Save changes token in local
        toast.success("Product added to cart");
      } else {
        toast.error("Something went wrong, Try again later.");
      }
    } else {
      // Login First before add to cart
      router.push("/profile/login")
    } 
  }

  const handleToggle = (index) => {
    setExpandedItems(prevIndex => (prevIndex === index ? null : index));
    setIsOpen(!isOpen);
  }

  return (
    <div className='lg:w-7/12 sm:w-full lg:m-auto grid grid-cols-1 lg:gap-4 mt-10 lg:p-4'>
      <div>
      { !loading && wishListItems.length == 0 ? (
        <h1 className='h-[50vh] flex justify-center items-center text-pretty font-semibold'>No WishList Found.</h1>
      ) : (
        wishListItems.map((product, index) => (
          <div key={product._id} className='shadow-xl m-2 p-2 w-full'>
            <div className='flex justify-between'>
              <div className="flex items-center">
                <Image
                  width={80}
                  height={80}
                  className="rounded-2xl"
                  src={product?.shopId?.shopBgThumbnail}
                  alt="Product Square Image"
                />
                <div className='mx-4 py-4'>
                  <p className='text-red-400 font-semibold lg:text-xl sm:text-xs'>{product?.name}</p>
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
                        <p><span className='text-red-400'>{product.price > 0 ? `RS. ${product.price}` : ""}</span></p>
                        <p className='text-sm text-gray-500 flex items-center gap-2 py-2 cursor-pointer'
                          onClick={() => handleRemoveFromWishList(product)} >
                          <RiDeleteBinLine size={20}
                            className='text-red-500 cursor-pointer'
                            />
                            Remove
                        </p>
                      </div>
                    </div>
                    <div className='text-xl flex items-center gap-2'>
                      <span className='flex items-center cursor-pointer' onClick={() => handleAddToCart(product)}>
                        <Image width={50} height={50} className='rounded-2xl bg-cover' src="/images/wishlist-logo.png" alt="Logo" />
                        <p className='text-sm'>ADD TO CART</p>
                      </span>
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


export default WishList;
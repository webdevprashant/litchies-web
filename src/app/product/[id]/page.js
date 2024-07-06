"use client";
import { useState, useEffect } from "react";
import { fetchDataId } from "../../api/get";
import { BiLike } from "react-icons/bi";
import { CiHeart } from "react-icons/ci";
import { FaWhatsapp } from "react-icons/fa";
import { RiShareForward2Fill } from "react-icons/ri";
import Image from "next/image";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { userDetails } from "../../utils/Constant";
import { Update } from "../../api/put";
import { useDispatch } from "react-redux";
import { addCartItem } from "../../redux/slice";
const Product = ({params}) => {
  const [user, setUser] = useState(null);
  const [wishList, setWishList] = useState(false);
  const [addToCart, setAddToCart] = useState(false);
  const dispatch = useDispatch();
  const [product, setProduct] = useState([]);
  const router = useRouter();
  useEffect(() => {
    const fetchProduct = async () => {
      if (typeof window !== undefined && window.localStorage) {
        const user = JSON.parse(localStorage.getItem(userDetails));
        if (user) {
          const userData = await fetchDataId("/users/" , user._id);
          setUser(userData.data);
        } else {
          router.push("/profile/login");
        }
      }
      const product = await fetchDataId(`/product/`, params.id);
      setProduct(product.data);
      setWishList(user?.wishList.includes(product?.data?._id));
    };
    fetchProduct();
  }, []);

  const likeProduct = async (product) => {
      if (user) {
        let productLike;
        if (product.usersLiking.includes(user._id)) {
          // call remove cart api
          productLike = await Update(`/product/${product._id}/unliking` , { userId: user._id });
          toast.success("Product unLiked.");
        } else {
          // call add cart api
          productLike = await Update(`/product/${product._id}/liking` , { userId: user._id });
          toast.success("Product Liked.");
        }
        if (productLike.status) {
          setProduct(productLike.data);
        } else {
          toast.error("Something went wrong, Try again later.......");
        }
      } else {
        // User not login
        router.push("/profile/login");
      }
  } 
  const wishListProduct = async (product) => {
      const response = JSON.parse(localStorage.getItem(userDetails));
      setUser(response);
      if (user) {
        let productWishList = null, productUnwishlist = null;
        if (wishList) {
          // call remove wishlist api
          console.log("User unwishlist API : ");
          productUnwishlist = await Update(`/product/${product._id}/unwishlist` , { userId: user._id });
          if (productUnwishlist.status) {
            setWishList(false);
            toast.success("Product removed from Wishlist.");
           } else {
              toast.error("Something went wrong, Try again later.......");
          }
        } else {
          // call add to wishlist api
          console.log("User wishlist API : ");
          productWishList = await Update(`/product/${product._id}/wishlist` , { userId: user._id });
          if (productWishList.status) {
            setWishList(true);
            toast.success("Product added to Wishlist.");
          } else {
              toast.error("Something went wrong, Try again later.......");
          }
        }
      } else {
        // User not login
        router.push("/profile/login");
      }
  } 

  const handleAddToCart = async (product) => {
    if (user) {
      // Add to Cart API
      let response
      if (!addToCart) {
        response = await Update(`/product/${product._id}/cart`, { userId: user._id });
        if (response.status) {
          dispatch(addCartItem(product._id));
          localStorage.setItem(userDetails, JSON.stringify(response.data));             // Save changes token in local
          toast.success("Product added to cart");
          setAddToCart(true);
        } else {
          toast.error("Something went wrong, Try again later.");
        }
      } else {
        toast.success("Product already added to cart");
      }
    } else {
      // Login First before add to cart
      router.push("/profile/login")
    } 
  }
    return (
        <div className="">
            <div
              className="flex w-11/12 lg:flex-row sm: flex-col min-h-fit m-auto py-8 rounded-lg font-serif"
              key={product._id}
            >
              {/* Row 1 (Product square image, iccons*/}
              <div className="flex flex-col lg:w-2/5 sm: w-full">
                <div className="">
                  <Image width={400} height={300}
                    className="rounded-2xl sm:w-full aspect-square bg-cover"
                    src={product.thumbnailURL}
                    alt="Product Square Image"
                  />
                </div>

                <div className="flex justify-evenly items-center my-4">
                <span className="flex items-center cursor-pointer"><BiLike onClick={() => likeProduct(product)} className={ product?.usersLiking?.length > 0 ? "text-red-500" : "text-gray-500"} size={20} /> {product?.usersLiking?.length > 0 ? product?.usersLiking?.length : ""  } </span>
                <span className="flex items-center cursor-pointer"><CiHeart onClick={() => wishListProduct(product)} className={ wishList ? "text-red-500" : "text-gray-500" } size={20} /></span>
                <FaWhatsapp className="text-white bg-green-500 rounded-full" size={20} />
                <RiShareForward2Fill className="text-gray-500" size={20} />
                </div>
              </div>

              {/* Row 2 */}
              <div className="w-full sm:m-4">
                <div>
                    <div className="flex lg:flex-row justify-between sm: flex-col">
                        <p className="font-bold text-2xl text-red-700">{product?.name}</p>
                        <p>Rs. {product?.price}</p>
                    </div>

                    <div>
                      <p dangerouslySetInnerHTML={{__html: product?.desc }}></p>
                    </div>
                </div>

                <div>
                    <div className="my-4">
                        <p className="font-bold text-lg text-black">Return Policy</p>
                        <p className="text-green-400 mb-4">{ product?.returnDays !== 0 ? `You may return items within ${product?.returnDays} days of delivery.` : `No Return Policy.` }</p>
                        <p>{product.returnPolicy}</p>
                    </div>
                </div>


                  <div className="flex lg:justify-start xsm:justify-evenly sm:text-sm">
                    <button type="button" className="lg:w-3/12 sm:w-full cursor-pointer bg-red-600 text-white m-2 py-2 lg:px-12 xsm:px-8 rounded-lg">Book Now</button>
                    <button type="button" onClick={() => handleAddToCart(product)} className="lg:w-3/12 sm:w-full cursor-pointer bg-black text-white m-2 py-2 lg:px-12 xsm:px-8 rounded-lg">Add to Cart</button>
                  </div>
                  
                    <hr className="border border-dotted border-red-900 my-2" />

                  <div className="flex justify-between">
                        <div className="flex m-4 justify-between items-center">
                            <div className="bg-gray-300 text-center p-2 m-4 rounded-lg">
                              <p className="text-[12px]">RATINGS</p>
                              <p >{product?.shopId?.ratings} ⭐</p>
                            </div>
                          <div className="flex justify-center bg-cover">
                            <Image 
                              src={product?.shopId?.shopBgThumbnail}
                              width={80} height={80}
                              className="rounded-full bg-contain"
                              alt="Shop Background Image"
                            />
                          </div>

                          {/* <div className="w-8/12 mx-4"> */}
                          <div className="mx-4">
                            <p className="font-bold text-sm text-red-600">{product?.shopId?.name}</p>
                            <p className="italic">
                              {product?.shopId?.address}
                            </p>
                          </div>
                        </div>
                  </div>
              </div>


            </div>            
        </div>
  );
}

export default Product;
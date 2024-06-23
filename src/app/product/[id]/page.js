"use client";
import { useState, useEffect } from "react";
import { fetchDataId } from "../../api/get";
import { BiLike } from "react-icons/bi";
import { CiHeart } from "react-icons/ci";
import { FaWhatsapp } from "react-icons/fa";
import { RiShareForward2Fill } from "react-icons/ri";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { addCartItem } from "../../redux/slice";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { formDataHandle } from "../../api/post"
const Product = ({params}) => {
  const dispatch = useDispatch();
  const userStore = useSelector((store) => store.user);
  const router = useRouter();
  const handleAddToCart = async (item) => {
    if (userStore.cart.includes(item)) {
      toast.custom("Item already added in Cart.");
      return
    }
    if (userStore.userId) {
      // Add to Cart API
      const response = await formDataHandle(`/users/type?userId=${userStore.userId}&type=cart`, {});
      console.log(response);
      toast.success(response.message);
      dispatch(addCartItem(item));
    } else {
      // Login First before add to cart
      router.push("/profile/login")
    } 
  }
  const [product, setProduct] = useState([]);
  useEffect(() => {
    const fetchProduct = async () => {
      const product = await fetchDataId(`/product/`, params.id);
      setProduct(product.data);
    };
    fetchProduct();
  }, [params.id]);
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

                <div className="flex  justify-around my-4">
                <BiLike className="text-gray-500" size={30} />
                <CiHeart className="text-gray-500" size={30} />
                <FaWhatsapp className="text-white bg-green-500 rounded-full" size={30} />
                <RiShareForward2Fill className="text-gray-500" size={30} />
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
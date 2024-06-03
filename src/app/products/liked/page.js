"use client";
import { useState, useEffect } from "react";
import { fetchData } from "../../api/get";
import { BiLike } from "react-icons/bi";
import { CiHeart } from "react-icons/ci";
import { FaWhatsapp } from "react-icons/fa";
import { RiShareForward2Fill } from "react-icons/ri";

const Liked = () => {
  const [likedProducts, setLikedProducts] = useState([]);
  useEffect(() => {
    const fetchLikedProducts = async () => {
      const allLikedProduct = await fetchData("/product/liked")
      setLikedProducts(allLikedProduct.data);
    };
    fetchLikedProducts();
  }, []);
  console.log(likedProducts)
  return (
    <div className="flex flex-wrap m-2 p-4 font-serif">
        {
          likedProducts.map((likedProduct) => (
            <div className="w-3/12 min-h-fit border-2 border-black"
            key={likedProduct._id}
            >

                  {/* Row 1 */}
                  <div className="flex m-4 justify-around">
                        {/* Shop Bg Img */}
                        <div className="flex justify-center bg-cover max-w-[100px] max-h-[100px]">
                            <img className="rounded-full" src={likedProduct.shopId.shopBgThumbnail} alt="Shop Background Image" />
                        </div>

                        {/* Shop name, description */}
                        <div className="truncate mx-2">
                            <p>{likedProduct?.shopId?.name}</p>
                            <p>{likedProduct?.shopId?.desc}</p>
                        </div>

                        {/* shop ratings */}
                        <div className="">
                            <p>RATINGS</p>
                            <p>{likedProduct?.shopId?.ratings} ⭐</p>
                        </div>


                  </div>

                  {/* Row 2 (Product square image, iccons*/ }
                  <div className="flex justify-between m-4">
                          <div className="bg-cover w-3/5 max-h-[200px]">
                            <img className="rounded-2xl bg-cover" src={likedProduct.thumbnailURL} />
                          </div>

                          <div className="flex flex-col justify-around">
                          <BiLike size={30} />
                          <CiHeart size={30} />
                          <FaWhatsapp size={30} />
                          <RiShareForward2Fill size={30} />
                          </div>
                  </div>

                  {/* Row 3 */}
                  <div className="flex justify-between m-4">
                        <h4>{likedProduct?.name}</h4>
                        <p>Rs. {likedProduct?.price}</p>
                  </div>
            </div>
          ))
        }

    
    </div>
  )
}

export default Liked;
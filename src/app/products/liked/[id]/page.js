"use client";
import { useState, useEffect } from "react";
import { fetchDataId } from "../../../api/get";
import { BiLike } from "react-icons/bi";
import { CiHeart } from "react-icons/ci";
import { FaWhatsapp } from "react-icons/fa";
import { RiShareForward2Fill } from "react-icons/ri";

const likedProduct = ({params}) => {
  const [likedProduct, setLikedProduct] = useState([]);
  useEffect(() => {
    const fetchLikedProduct = async () => {
      const product = await fetchDataId(`/product/`, params.id);
      setLikedProduct(product.data);
    };
    fetchLikedProduct();
  }, []);
    return (
        <div className="flex flex-col">
            <div
              className="flex w-10/12 min-h-fit m-auto p-2 rounded-lg m-2 p-6 font-serif"
              key={likedProduct._id}
            >
              {/* Row 1 (Product square image, iccons*/}
              <div className="flex flex-col m-4">
                <div className="">
                  <img
                    className="rounded-2xl h-[250px] w-[450px] bg-cover"
                    src={likedProduct.thumbnailURL}
                  />
                </div>

                <div className="flex  justify-around my-4">
                  <BiLike size={30} />
                  <CiHeart size={30} />
                  <FaWhatsapp size={30} />
                  <RiShareForward2Fill size={30} />
                </div>
              </div>

              {/* Row 2 */}
              <div className="w-full m-4">
                <div>
                    <div className="flex justify-between">
                        <p className="font-bold text-2xl text-red-700">{likedProduct?.name}</p>
                        <p>Rs. {likedProduct?.price}</p>
                    </div>

                    <div>
                      <p dangerouslySetInnerHTML={{__html: likedProduct?.desc }}></p>
                    </div>
                </div>

                <div>
                    <div className="my-4">
                        <p className="font-bold text-lg text-black">Return Policy</p>
                        <p className="text-green-400 mb-4">You may return items within {likedProduct?.returnDays} days of delivery.</p>
                        <p>{likedProduct.returnPolicy}</p>
                    </div>
                </div>


                  <div className="flex">
                    <button type="button" className="w-3/12 cursor-pointer bg-red-600 text-white m-2 py-2 px-12 rounded-lg">Book Now</button>
                    <button type="button" className="w-3/12 cursor-pointer bg-black text-white m-2 py-2 px-12 rounded-lg">Add to Cart</button>
                  </div>
              </div>
            </div>

            <div className="flex justify-center">
                  <div className="flex m-4 justify-between items-center">
                      <div className="w-[100px]">
                        <p className="text-[12px]">RATINGS</p>
                        <p >{likedProduct?.shopId?.ratings} ⭐</p>
                      </div>
                    <div className="flex justify-center bg-cover">
                      <img
                        className="rounded-full w-[250px] h-[100px] bg-contain"
                        src={likedProduct?.shopId?.shopBgThumbnail}
                        alt="Shop Background Image"
                      />
                    </div>

                    <div className="w-8/12 mx-4">
                      <p className="font-bold text-sm text-red-600">{likedProduct?.shopId?.name}</p>
                      <p className="italic">
                        {likedProduct?.shopId?.address}
                      </p>
                    </div>
                  </div>
            </div>
            
        </div>
  );
}

export default likedProduct;
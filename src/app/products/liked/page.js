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
    <div className="flex flex-wrap justify-center m-2 p-6 font-serif">
      {likedProducts.map((likedProduct) => (
        <div
          className="w-[400px] min-h-fit border marginLeft-2 m-2 p-2 rounded-lg shadow-md hover:shadow-lg "
          key={likedProduct._id}
        >
          {/* Row 1 */}
          <div className="flex m-4 justify-between items-center">
            {/* Shop Bg Img */}
            <div className="flex justify-center bg-cover">
              <img
                className="rounded-full w-[50px] h-[50px] bg-contain"
                src={likedProduct.shopId.shopBgThumbnail}
                alt="Shop Background Image"
              />
            </div>

            {/* Shop name, description */}
            <div className="w-8/12 mx-2">
              <p>{likedProduct?.shopId?.name}</p>
              <p
                className=" h-10 overflow-hidden"
                style={{ fontWeight: 50, fontSize: "smaller" }}
              >
                {likedProduct?.shopId?.address}
              </p>
            </div>

            {/* shop ratings */}
            <div className="w-[50px]">
              <p>RATINGS</p>
              <p>{likedProduct?.shopId?.ratings} ⭐</p>
            </div>
          </div>

          {/* Row 2 (Product square image, iccons*/}
          <div className="flex justify-between m-4">
            <div className="">
              <img
                className="rounded-2xl bg-contain h-[250px] w-[250px] bg-cover"
                src={likedProduct.thumbnailURL}
              />
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
      ))}
    </div>
  );
}

export default Liked;
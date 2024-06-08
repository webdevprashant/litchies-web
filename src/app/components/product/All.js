"use client";
import { useState, useEffect } from "react";
import NodDataFound from "../NoDataFound";
import { fetchData } from "../../api/get";
import { BiLike } from "react-icons/bi";
import { CiHeart } from "react-icons/ci";
import { FaWhatsapp } from "react-icons/fa";
import { RiShareForward2Fill } from "react-icons/ri";
import { useRouter } from "next/navigation";

const AllProducts = ({route}) => {
  const [products, setProducts] = useState([]);
  const router = useRouter();
  useEffect(() => {
    const fetchProducts = async () => {
      const allProduct = await fetchData(route);
      setProducts(allProduct.data);
    };
    fetchProducts();
  }, []);
  console.log("Products : " , products);
  return (
    <div className="flex flex-wrap justify-center m-2 p-6 font-serif">
      { products.length == 0 ? <NodDataFound /> : products.map((product) => (
        <div
          className="w-[400px] min-h-fit border marginLeft-2 m-2 p-2 rounded-lg shadow-md hover:shadow-xl cursor-pointer"
          key={product._id} onClick={() => router.push(`/product/${product._id}`)}
        >
          {/* Row 1 */}
          <div className="flex m-4 justify-between items-center">
            {/* Shop Bg Img */}
            <div className="flex justify-center bg-cover">
              <img
                className="rounded-full w-[50px] h-[50px] bg-contain"
                src={product.shopId.shopBgThumbnail}
                alt="Shop Background Image"
              />
            </div>

            {/* Shop name, description */}
            <div className="w-8/12 mx-2">
              <p>{product?.shopId?.name}</p>
              <p
                className=" h-10 overflow-hidden"
                style={{ fontWeight: 50, fontSize: "smaller" }}
              >
                {product?.shopId?.address}
              </p>
            </div>

            {/* shop ratings */}
            <div className="w-[50px]">
              <p>RATINGS</p>
              <p>{product?.shopId?.ratings} ⭐</p>
            </div>
          </div>

          {/* Row 2 (Product square image, iccons*/}
          <div className="flex justify-between m-4">
            <div className="">
              <img
                className="rounded-2xl bg-contain h-[250px] w-[250px] bg-cover"
                src={product.thumbnailURL}
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
            <h4>{product?.name}</h4>
            <p>Rs. {product?.price}</p>
          </div>
        </div>
      )) }
    </div>
  );
}

export default AllProducts;
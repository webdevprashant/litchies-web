"use client";
import { useState, useEffect } from "react";
import { fetchData, fetchDataQuery } from "../../api/get";
import { BiLike } from "react-icons/bi";
import { CiHeart } from "react-icons/ci";
import { FaWhatsapp } from "react-icons/fa";
import { RiShareForward2Fill } from "react-icons/ri";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { setQueryResult } from "../../redux/slice";

const AllProducts = ({route, query}) => {
  const [products, setProducts] = useState([]);
  const router = useRouter();
  const dispatch = useDispatch();
  const searchedProducts = useSelector((store) => store.user.products);
  useEffect(() => {
    const fetchProducts = async () => {
      let allProduct;
      if (query) {
        allProduct = await fetchDataQuery(route);
      }  else {
        allProduct = await fetchData(route);
      }
      setProducts(allProduct.data);
      dispatch(setQueryResult(products));
    };
    fetchProducts();
  }, [route]);
  return (
    <div className="grid lg:grid-cols-3 sm:grid-cols-1 justify-center lg:m-2 lg:p-2 font-serif">
      {products.map((product) => (
        <div
          className="col-span-1 min-h-fit border marginLeft-2 m-3 p-2 rounded-lg shadow-md hover:shadow-xl cursor-pointer"
          key={product._id}
          onClick={() => router.push(`/product/${product._id}`)}
        >
          {/* Row 1 */}
          <div className="flex m-4 justify-between items-center">
            {/* Shop Bg Img */}
            <div className="flex justify-center bg-cover">
              <Image width={50} height={50} className="rounded-full bg-contain"
                src={product.shopId.shopBgThumbnail} alt="Shop Background Image" />
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
              <Image width={500} height={0}
                className="rounded-2xl bg-cover"
                src={product.thumbnailURL}
                style={{ height: '350px' }}
                alt="Product Square Image"
              />
            </div>

            <div className="flex flex-col justify-around px-4">
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
      ))}
    </div>
  );
}

export default AllProducts;
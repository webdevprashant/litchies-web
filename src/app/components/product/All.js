"use client";
import { useState, useEffect } from "react";
import { fetchData, fetchDataQuery } from "../../api/get";
import { Update } from "../../api/put";
import { BiLike } from "react-icons/bi";
import { CiHeart } from "react-icons/ci";
import { FaWhatsapp } from "react-icons/fa";
import { RiShareForward2Fill } from "react-icons/ri";
import { FaStar } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { setQueryResult } from "../../redux/slice";
import { COUNT, PAGE, userDetails } from "../../utils/Constant";
import Loader from "../home/loading";
import toast from "react-hot-toast";

const AllProducts = ({route, query}) => {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(PAGE);
  const dispatch = useDispatch();

  const fetchProducts = async () => {
    setLoading(true);
    let allProduct;
    try {
      if (query) {
        allProduct = await fetchDataQuery(route);
        setProducts(allProduct.data);
        dispatch(setQueryResult(products));
      }  else {
        allProduct = await fetchData(route + `?page=${page}&count=${COUNT}`);
        allProduct.data.length > 0 ? setHasMore(true) : setHasMore(false);
        setProducts(prevProducts => [...prevProducts, ...allProduct.data]);
      }
    } catch (err) {
      console.error('Error fetching Products :', err);
    } finally{
      setLoading(false);
    }
  };
  useEffect(() => {
    console.log("Hi fetchProducts");
    if (typeof window !== undefined && window.localStorage) {
      const response = JSON.parse(localStorage.getItem(userDetails));
      setUser(response);
    }
    fetchProducts();
  }, [page]);

  const handleScroll = () => {
      if (hasMore && Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.offsetHeight) {
          setPage(prevPage => prevPage + 1);
      }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll' , handleScroll);
    }
  }, []);

  const likeProduct = async (product) => {
    if (user) {
      let productLike, productUnLike, updateUserLiking;
      if (product.usersLiking.includes(user._id)) {
        // call remove cart api
        productUnLike = await Update(`/product/${product._id}/unliking` , { userId: user._id });
        if (productUnLike.status) {
          // Remove user from usersLiking array
          updateUserLiking = product.usersLiking.filter(uid => uid !== user._id);
          toast.success("Product unLiked.");
        } else {
          toast.error("Something went wrong, Try again later.......");
        }
      } else {
        // call add cart api
        productLike = await Update(`/product/${product._id}/liking` , { userId: user._id });
        if (productLike.status) {
          console.log("Product userLiking " , product);
          // Add user to usersLiking array
          updateUserLiking = [...product.usersLiking, user._id];
          toast.success("Product Liked.");
        } else {
          toast.error("Something went wrong, Try again later.......");
        }
      }

      if (productLike?.status || productUnLike?.status) {
        setProducts((prevProducts) => prevProducts.map((p) => p._id === product._id ? { ...p, usersLiking: updateUserLiking } : p))
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
      let productWishList = null, productUnwishlist = null; let updatedWishListStatus;
      if (product.wishList) {
        // call remove wishlist api
        productUnwishlist = await Update(`/product/${product._id}/unwishlist` , { userId: user._id });
        if (productUnwishlist.status) {
          updatedWishListStatus = false;
          toast.success("Product removed from Wishlist.");
         } else {
            toast.error("Something went wrong, Try again later.......");
        }
      } else {
        // call add to wishlist api
        productWishList = await Update(`/product/${product._id}/wishlist` , { userId: user._id });
        if (productWishList.status) {
          updatedWishListStatus = true;
          toast.success("Product added to Wishlist.");
        } else {
            toast.error("Something went wrong, Try again later.......");
        }
      }

      // Update the products state
      setProducts((prevProducts) => prevProducts.map((p) => p._id === product._id ? {...p, wishList: updatedWishListStatus } : p) )
    } else {
      // User not login
      router.push("/profile/login");
    }
  } 

  return (
    <div className="grid lg:grid-cols-3 sm:grid-cols-1 justify-center lg:m-2 lg:p-2 font-serif">
      {products.map((product) => (
        <div
          className="col-span-1 min-h-fit border marginLeft-2 m-3 p-2 rounded-lg shadow-md hover:shadow-xl cursor-pointer"
          key={product._id}
        >
          {/* Row 1 */}
          <div className="flex m-4 justify-between items-center"
          onClick={() => router.push(`/product/${product._id}`)}
          >
            {/* Shop Bg Img */}
            <div className="flex justify-center bg-cover">
              <Image src={product.shopId.shopBgThumbnail} width={50} height={50} className="rounded-full bg-contain" alt="Shop Background Image" />
            </div>

            {/* Shop name, description */}
            <div className="w-8/12 mx-2">
              <p className="text-red-500">{product?.shopId?.name}</p>
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
              <p className="flex items-center text-xl">{product?.shopId?.ratings} <span><FaStar className="text-red-500" size={20} /></span></p>
            </div>
          </div>

          {/* Row 2 (Product square image, iccons*/}
          <div className="flex justify-between m-4">
            <div className="">
              <Image width={350} height={0}
                onClick={() => router.push(`/product/${product._id}`)}
                className="rounded-2xl bg-cover"
                src={product.thumbnailURL}
                style={{ height: '350px' }}
                alt="Product Square Image"
              />
            </div>

            <div className="flex flex-col justify-around pl-4">
              <span className="flex items-center"> {product?.usersLiking?.length > 0 ? product?.usersLiking?.length : "" } <BiLike onClick={() => likeProduct(product)} values="2" className={ product?.usersLiking.includes(user._id) ? "text-red-500 cursor-pointer"  :  "text-gray-500 cursor-pointer"} size={20} /></span>
              <span className="flex items-center cursor-pointer"><CiHeart onClick={() => wishListProduct(product)} className={ product.wishList ? "text-red-500" : "text-gray-500" } size={20} /></span>
              <FaWhatsapp className="text-white bg-green-500 rounded-full cursor-pointer" size={20} />
              <RiShareForward2Fill className="text-gray-500 cursor-pointer" size={20} />
            </div>
          </div>

          {/* Row 3 */}
          <div className="flex justify-between m-4" 
          onClick={() => router.push(`/product/${product._id}`)}
          >
            <h4 className="text-red-500">{product?.name}</h4>
            <p>Rs. {product?.price}</p>
          </div>
        </div>
      ))}
      <div>{hasMore && loading && <Loader />}</div>
    </div>
  );
}

export default AllProducts;
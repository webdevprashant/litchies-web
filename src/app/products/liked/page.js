"use client";
import { fetchData } from "../../api/get";
import { useState, useEffect } from "react";

export default function Liked() {
  const [likedProduct, setLikedProduct] = useState([]);
  useEffect(() => {
    const fetchLikedProducts = async () => {
      const allLikedProduct = await fetchData("/product/liked")
      setLikedProduct(allLikedProduct.data);
    };
    fetchLikedProducts();
  }, []);
  return (
    <div>
      LW
    </div>
    // <div className="">
    //     {/* Row 1 */}
    //     <div>
    //           {/* Product Img */}
    //           <div>
    //               <img src={"/"} alt="Shop Background Image" />
    //           </div>

    //           {/* Shop name, description */}
    //           <div>

    //           </div>

    //           {/* shop ratings */}
    //           <div>

    //           </div>


    //     </div>

    //     {/* Row 2 */}
    //     <div>

    //     </div>

    //     {/* Row 3 */}
    //     <div>

    //     </div>

    // </div>
  )
}
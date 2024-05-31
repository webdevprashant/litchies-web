import React from "react";
import { BACKEND_URL } from "../../utils/Constant";

const getLikedProducts = async () => {
  const likedProductsResponse = await fetch(BACKEND_URL + "/product/liked", {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  });
  const data = await likedProductsResponse.json();
  return data;
}

const Liked = () => {
  return (
    <div>Liked Products</div>
  )
}

export default Liked;
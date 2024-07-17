"use client"
import { useEffect, useState } from "react";
import { fetchData } from "../api/get";

const Reels = () => {
  const [videos,setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
    useEffect(() => {
      setLoading(true);
      const fetchReels = async () => {
          const allProducts = await fetchData("/reels");
          // setProducts(allProducts.data);
        setLoading(false);
      }
      fetchProducts();
    }, []);

  return (
    <video width={320} height={240} controls preload="none">
        <source src="" type="video/mp4" />
    </video>
  )
}

export default Reels;
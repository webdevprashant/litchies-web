"use client"; // Add this directive at the top
import React, { useState, useEffect } from 'react';
import { fetchData } from '../../api/get';
import { useRouter } from 'next/navigation';
import Shimmer from '../../utils/shimmer';
import Image from 'next/image';

const ShopBanner = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  
  useEffect(() => {
    const fetchBanners = async () => {
    const apiData = await fetchData("/shopBanner");
    setBanners(apiData.data);
    setLoading(false);
    }
    fetchBanners();
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === banners.length - 1 ? 0 : prevSlide + 1
    );
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [banners.length]);

  return (
<div className="slider-container flex gap-4 py-4 px-2 h-fit overflow-hidden relative min-w-full">
  <div
    className="slider-track flex gap-4 transition-transform duration-500"
    style={{ transform: `translateX(-${currentSlide * 100}%)`, 
    // width: `${banners.length * 100}%` 
  }}
  >
    {loading ? 
      Array(20).fill("").map((data, index) => ( 
        <Shimmer key={index} w={1000} h={400} /> 
      )) : 
      banners.map((banner) => (
        <Image 
          key={banner._id} 
          onClick={() => router.push(`/shops/${banner.shopId}`)}
          src={banner.thumbnail}
          alt="Banner"
          className='min-w-full'
          width={1400} // Add appropriate width
          height={800} // Add appropriate height
          style={{ cursor: 'pointer' }}
        />
      ))
    }
  </div>
</div>

  );
};

export default ShopBanner;
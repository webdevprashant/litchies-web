"use client"; // Add this directive at the top
import React, { useState, useEffect } from 'react';
import { fetchData } from '../../api/get';
import { useRouter } from 'next/navigation';

const ShopBanner = () => {
  const [banners, setBanners] = useState([]);
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  
  useEffect(() => {
    const fetchBanners = async () => {
    const apiData = await fetchData("/shopBanner");
    setBanners(apiData.data);
    }
    fetchBanners();
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === banners.length - 1 ? 0 : prevSlide + 1
    );
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [banners.length]);

  return (
    <div className="slider-container m-4 py-4 px-2 h-fit overflow-hidden relative">
      <div
        className="slider-track flex transition-transform duration-500"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {banners.map((banner) => (
          <img onClick={() => router.push(`/shops/${banner.shopId}`)}
            key={banner._id}
            className="w-10/12 flex-shrink-0 hover:cursor-pointer"
            src={banner.thumbnail}
            alt="Banner"
          />
        ))}
      </div>
    </div>
  );
};

export default ShopBanner;
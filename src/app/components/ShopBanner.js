"use client"; // Add this directive at the top
import React, { useState, useEffect } from 'react';
import { fetchData } from '../api/get';

const ShopBanner = () => {
  const [banners, setBanners] = useState([]);
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
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [banners.length]);

  return (
    <div className="slider-container m-4 py-4 px-2 h-fit overflow-hidden relative">
      <div
        className="slider-track flex transition-transform duration-500"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {banners.map((banner) => (
          <img
            key={banner._id}
            className="w-full flex-shrink-0"
            src={banner.thumbnail}
            alt="Banner"
          />
        ))}
      </div>
    </div>
  );
};

export default ShopBanner;
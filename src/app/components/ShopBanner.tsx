"use client"; // Add this directive at the top
import React, { useState, useEffect } from 'react';
import { BACKEND_URL } from '../utils/Constant';

const ShopBanner = () => {
  const [banners, setBanners] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const getShopBanners = async () => {
    const allShopBanners = await fetch(BACKEND_URL + "/shopBanner" , {
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json',
        }
    });
    const data = await allShopBanners.json();
    setBanners(data.data);
    return data;
  }
  

  useEffect(() => {
    getShopBanners();
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
        {banners.map((banner : any) => (
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
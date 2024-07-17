"use client"; // Add this directive at the top
import React, { useState, useEffect } from 'react';
import { fetchData } from '../../api/get';
import { useRouter } from 'next/navigation';
import Shimmer from '../../utils/shimmer';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { setHomeBanners } from '../../redux/slice';

const ShopBanner = () => {
  const dispatch = useDispatch();
  const banner = useSelector((store) => store.user.homeBanners);
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchBanners = async () => {
      if (banner.length === 0) {
        const apiData = await fetchData("/shopBanner");
        setBanners(apiData.data);
        dispatch(setHomeBanners(apiData.data));
      } else {
        setBanners(banner[0]);
      }
      setLoading(false);
    }
    fetchBanners();
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === banners.length - 1 ? 0 : prevSlide + 1
      );
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [banners]);

  return (
    <div className="overflow-hidden relative">
      <div
        className="flex transition-transform duration-500"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
        }}
      >
        {loading ?
          Array(20).fill("").map((data, index) => (
            <Shimmer key={index} w={1000} h={300} />
          )) :
          banners.map((banner) => (
            <div key={banner._id} className="flex-shrink-0 p-2" style={{ width: "100%" }}>
                <Image
                  onClick={() => router.push(`/shops/${banner.shopId}`)}
                  src={banner.thumbnail}
                  alt="Banner"
                  width={0} // Add appropriate width
                  height={0} // Add appropriate height
                  style={{ cursor: "pointer", width: '100%', height: 'auto' }}
                />
              </div>
          ))
        }
      </div>
      <div className='flex justify-center gap-4'>
      { banners.map((banner) => (
            <div key={banner._id} className='w-3 h-3 rounded-xl bg-black cursor-pointer' ></div>
          )) }
      </div>
    </div>
  );
};

export default ShopBanner;
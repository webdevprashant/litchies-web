"use client"
import React, { useEffect, useState } from 'react'
import { fetchData } from "../api/get";
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { PAGE, COUNT } from '../utils/Constant';
import Loader from '../components/home/loading';
const RecentShops = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(PAGE);
  const fetchShops = async () => {
    setLoading(true);
    try {
      const allShops = await fetchData(`/shops/recent` + `?page=${page}&count=${COUNT}`);
      // Ensure no repeated data by filtering out duplicates (if necessary)
      const newShops = allShops.data.filter(
        newShop => !shops.find(existingShop => existingShop._id === newShop._id)
      );
      newShops.length > 0 ? setHasMore(true) : setHasMore(false);
      setShops(prevShops => [...prevShops, ...newShops]);
    } catch (err) {
      console.error('Error fetching Shops :', err);
    } finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Hi fetchShops");
    fetchShops();
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

  return (
    <div className="grid lg:grid-cols-3 sm:grid-cols-1 justify-center">
      {shops.map((shop) => (
        <div
          className=" p-8 m-4 rounded-lg relative col-span-auto cursor-pointer"
          key={shop._id}
          onClick={() => router.push(`/shops/${shop?._id}`)}
          style={{
            backgroundImage: `url(${shop.shopBgThumbnail})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundColor: "red"
          }}
        >
          <div className="shopBgImg absolute top-[-0.5rem] left-[37.33333%]">
            <Image width={100} height={100}
              className="rounded-full"
              src={shop.shopThumbnail}
              alt=""
            />
          </div>

          <div className="pt-16 min-h-[200px] bg-white p-2 rounded-lg">
            <div className="text-center">
              <p className="text-red-500 font-serif">{shop.name}</p>
              <p className="font-serif">{shop.address}</p>
            </div>

            <div className="flex justify-between">
              <div>
                <h4 className="font-serif">PRODUCTS</h4>
                <p>{shop.totalProducts}</p>
              </div>

              <div>
                <h4 className="font-serif">FOLLOWERS</h4>
                <p>{shop.usersFollowing.length}</p>
              </div>
              <div>
                <h4 className="font-serif">RATINGS</h4>
                <p>{shop.ratings}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div>{hasMore && loading && <Loader />}</div>
    </div>
  );
}

export default RecentShops;
"use client"
import React, { useEffect, useState } from 'react'
import Products from "../../components/shopTabbar/Products";
import Reels from "../../components/shopTabbar/Reels";
import Offers from "../../components/shopTabbar/Offers";
import { fetchDataId } from "../../api/get";
import { GrLocation } from "react-icons/gr";
import { LuGrid } from "react-icons/lu";
import { RxVideo } from "react-icons/rx";
import { BiSolidOffer } from "react-icons/bi";

const RecentShop = ({params}) => {
  const [shop, setShop] = useState([]);
  const [selectedTabBar, setSelectedTabBar] = useState(1);

  const renderTabBar = () => {
    switch (selectedTabBar) {
      case 1:
        return <Products shopId={params.id} />
      case 2:
        return <Reels />
      case 3:
        return <Offers />
      
    }
  }
  useEffect(() => {
    const fetchShop = async () => {
      const shop = await fetchDataId("/shops/", params.id);
      setShop(shop.data);
    };
    fetchShop();
  }, []);
  return (
    <div className='flex justify-center font-serif'>
      <div className="w-3/4 p-8 m-4 rounded-lg relative" key={shop._id}
      >
            <div className="min-h-[100px] p-8 m-4 rounded-lg"
            style={{ backgroundImage: `url(${shop.shopBgThumbnail})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: 'red' }}
            >
            </div>
            <div className='absolute top-[-0.5rem] left-[42.33333%]'>
              <img className='w-[150px] min-h-[150px] rounded-full' src={shop.shopThumbnail} alt="" />
            </div>
      
            <div className='min-h-[200px] bg-white p-2 rounded-lg'>
                <div className='text-center'>
                <p className='text-red-400 text-xl font-semibold'>{shop.name}</p>
                <p>{shop?.desc}</p>
                </div>
      
                <div className='flex flex-col'>
                    <div className='flex justify-between m-4'>
                        <div>
                          <h4 className='font-serif text-gray-400'>PRODUCTS</h4>
                          <p>{shop?.totalProducts}</p>
                        </div>
          
                        <div>
                          <h4 className='font-serif text-gray-400'>FOLLOWERS</h4>
                          <p>{shop?.usersFollowing?.length}</p>
                        </div>
                        <div>
                          <h4 className='font-serif text-gray-400'>RATINGS</h4>
                          <p>{shop?.ratings}</p>
                        </div>
                    </div>

                    <div className='flex justify-between m-4'>
                        <div>
                          <button type="button" className=" cursor-pointer bg-red-500 text-white m-2 p-2 rounded-lg">Follow</button>
                        </div>
                        <div>
                          <button type="button" className="bg-gray-300 cursor-pointer m-2 p-2  rounded-lg">About Me</button>
                        </div>
                        <div>
                          <GrLocation size={30} />
                        </div>
                    </div>


                    <div>                    
                        <div className="">
                            <ul className="flex justify-between items-center text-gray-500">
                              
                                <li className="" onClick={() => setSelectedTabBar(1)}>
                                    <a href="#" className={`p-4 border-transparent rounded-t-lg cursor-pointer ${selectedTabBar == 1 && `text-red-500` }`}>
                                        <LuGrid size={30} /> 
                                        <p>PRODUCTS</p>
                                    </a>
                                </li>

                                <li className="" onClick={() => setSelectedTabBar(2)}>
                                    <a href="#" className={`p-4 border-transparent rounded-t-lg cursor-pointer ${selectedTabBar == 2 && `text-red-500` }`}>
                                        <RxVideo size={30} />
                                        <p>VIDEOS</p>
                                    </a>
                                </li>

                                <li className="" onClick={() => setSelectedTabBar(3)}>
                                    <a href="#" className={`p-4 border-transparent rounded-t-lg cursor-pointer ${selectedTabBar == 3 && `text-red-500` }`}>
                                        <BiSolidOffer size={30} />
                                        <p>OFFERS</p>
                                    </a>
                                </li>

                            </ul>
                        </div>

                    </div>

                </div>

            </div>

  
            <div className='component-container'>
                {renderTabBar()}
            </div>
      </div>

    </div>
  )
}

export default RecentShop;
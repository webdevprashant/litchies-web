"use client"
import React, { useEffect, useState } from 'react'
import { fetchDataId } from "../../../api/get";
import { useRouter } from 'next/navigation';
import { GrLocation } from "react-icons/gr";
import { LuGrid } from "react-icons/lu";
import { RxVideo } from "react-icons/rx";
import { BiSolidOffer } from "react-icons/bi";

const RecentShop = ({params}) => {
  const router = useRouter();
  const [shop, setShop] = useState([]);
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
                              
                                <li className="">
                                    <a href="#" className="p-4 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300">
                                        <LuGrid size={30} /> 
                                        <p>PRODUCTS</p>
                                    </a>
                                </li>

                                <li className="">
                                    <a href="#" class="p-4 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300" aria-current="page">
                                        <RxVideo size={30} />
                                        <p>VIDEOS</p>
                                    </a>
                                </li>

                                <li className="">
                                    <a href="#" class="p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group">
                                        <BiSolidOffer size={30} />
                                        <p>OFFERS</p>
                                    </a>
                                </li>

                            </ul>
                        </div>

                    </div>

                </div>

            </div>

  
      </div>

    </div>
  )
}

export default RecentShop;
"use client"
import React, { useState } from 'react'
import { MdOutlineVideoLibrary } from "react-icons/md";
import { IoIosNotifications } from "react-icons/io";
import { IoMdHome } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";

const Footer = () => {
  const [selectedIcon, setSelectedIcon] = useState(3);

  const icons = [
    { id: 1, component: <MdOutlineVideoLibrary size={30} /> },
    { id: 2, component: <IoIosNotifications size={30} /> },
    { id: 3, component: <IoMdHome size={30} /> },
    { id: 4, component: <FaHeart size={30} /> },
    { id: 5, component: <FaRegUser size={30} /> },
  ];

  const handleIconClick = (id : any) => {
    setSelectedIcon(id);
  };

  return (
    <div className='flex justify-between m-2 p-2 sticky bottom-0 bg-white'>
            {
              icons.map(icon => (
                <div
                  key={icon.id}
                  onClick={() => handleIconClick(icon.id)}
                  className={`cursor-pointer ${selectedIcon === icon.id ? `text-red-500` : `text-gray-600` }`}
                  >   {icon.component}
                </div>
              ))
            }
    </div>
  )
}

export default Footer;
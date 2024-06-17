"use client"
import React, { useState } from 'react'
import { MdOutlineVideoLibrary } from "react-icons/md";
import { IoIosNotifications } from "react-icons/io";
import { IoMdHome } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import Link from 'next/link';


const Footer = () => {
  const [selectedIcon, setSelectedIcon] = useState(3);
  const icons = [
    { id: 1, component: <MdOutlineVideoLibrary size={30} /> },
    { id: 2, component: <IoIosNotifications size={30} /> },
    { id: 3, component: <Link href="/"><IoMdHome size={30} /></Link> },
    { id: 4, component: <FaHeart size={30} /> },
    { id: 5, component: <Link href="/profile"><FaRegUser size={30} /></Link> },
  ];

  const handleIconClick = (id) => {
    setSelectedIcon(id);
  };

  return (
    <div className='w-full fixed bottom-0 flex justify-between p-4 bg-white'>
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
"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

const Loader = () => {
  const pathName = usePathname();
   useEffect(() => {
     const loader = document.getElementById("loader");
     loader.style.display = "block";
     //  2 second delay
    //  console.log("loader block " , Date.now());
     if (typeof window !== "undefined") {
       if (loader) {
        // console.log("loader none " , Date.now());
        loader.style.display = "none";
       }
     }
   }, [pathName]);

   return (
     <div className="loader" id="loader">
       <div className="spinner">
         <Image
           width={500}
           height={500}
           src="/images/loader.gif"
           alt="Loader Image"
           priority={true}
         />
       </div>
     </div>
   );
 };
 export default Loader;
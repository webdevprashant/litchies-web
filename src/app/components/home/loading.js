"use client";
import Image from "next/image";
import React, { useEffect } from "react";

const Loader = () => {
   useEffect(() => {
     if (typeof window !== "undefined") {
       const loader = document.getElementById("loader");
       if (loader) loader.remove();
     }
   }, []);

   return (
     <div className="loader" id="loader">
       <div className="spinner">
         <Image
           width={500}
           height={500}
           src="/images/loader.gif"
           alt="Loader Image"
         />
       </div>
     </div>
   );
 };
 export default Loader;
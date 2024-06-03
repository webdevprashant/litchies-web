"use client";
import Image from "next/image";
import { useEffect } from "react";

const Loader = () => {
  useEffect(() => {
    const hideLoader = () => {
      const loader = document.getElementById("loader");
      if (loader) loader.style.display("hidden");
    };

    const showLoader = () => {
      const loader = document.getElementById("loader");
      if (loader) loader.style.display("block");
    };

    // Event listener for page load
    window.addEventListener("load", hideLoader);

    // Event listener for URL change (popstate)
    window.addEventListener("popstate", showLoader);

    // Cleanup function to remove event listeners
    return () => {
      window.removeEventListener("load", hideLoader);
      window.removeEventListener("popstate", showLoader);
    };
  }, []);

  return (
    <div className="loader hidden" id="loader">
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

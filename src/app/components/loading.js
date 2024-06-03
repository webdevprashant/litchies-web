"use client"
import Image from "next/image";
import React, { useEffect } from "react";

const Loader = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const loader = document.getElementById('loader');
      if (loader)
        loader.remove();
    }
  }, []);

  return (
      <div className="loader" id="loader">
        <div className="spinner">
          <Image width={500} height={500} src="/images/loader.gif" alt="Loader Image" />
        </div>
      </div>
  )
}

// export default function Loader() {
//   const router = useRouter();

//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//       const handleStart = (url) =>  setLoading(true);
//       const handleComplete = (url) => setLoading(false);

//       router.events.on('routeChangeStart', handleStart)
//       router.events.on('routeChangeComplete', handleComplete)
//       router.events.on('routeChangeError', handleComplete)

//       return () => {
//           router.events.off('routeChangeStart', handleStart)
//           router.events.off('routeChangeComplete', handleComplete)
//           router.events.off('routeChangeError', handleComplete)
//       }
//   })
  
//   return loading ? (
//     <div className="loader" id="loader">
//         <div className="spinner">
//           <Image width={500} height={500} src="/images/loader.gif" alt="Loading..........." />
//         </div>      
//     </div>
//     ) : null;
// }

export default Loader;
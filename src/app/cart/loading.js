import Image from "next/image";

const Loader = () => {
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
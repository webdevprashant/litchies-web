import Category from "./components/home/Category";
import ShopBanners from "./components/home/ShopBanner";
import Shops from "./components/home/Shops";
import Products from "./components/home/Products";
import Link from "next/link";

export default function Home() {
  return (
    <>
    <div className="">
      <Category />
      <ShopBanners />
      <Shops title="Recently Added Shops" route="/shops/recent" />
      <Products title="Most Liked Products" route="/product/liked" />
      <Shops title="Popular Shops" route="/shops/popular" />
      <Products title="Trending Products" route="/product/trending" />
      <Link href="/product"><button className="rounded-md w-[100%] px-14 py-2 bg-red-600 font-semibold text-white font-serif cursor-pointer">Explore More Products</button></Link>
    </div>

    </>
  );
}
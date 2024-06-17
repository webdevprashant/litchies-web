import Category from "./components/home/Category";
import ShopBanners from "./components/home/ShopBanner";
import Shops from "./components/home/Shops";
import Products from "./components/home/Products";

export default function Home() {
  return (
    <>
    <div className="lg:p-4">
      <Category />
      <ShopBanners />
      <Shops title="Recently Added Shops" route="/shops/recent" />
      <Products title="Most Liked Products" route="/product/liked" />
      <Shops title="Popular Shops" route="/shops/recent" />
      <Products title="Trending Products" route="/product/trending" />
    </div>
      <div className="m-2 text-center">
        <button className="rounded-md w-[100%] h-10 px-14 bg-red-600 font-semibold text-white font-serif">Explore More Products</button>
      </div>
    </>
  );
}
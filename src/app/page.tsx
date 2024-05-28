import Category from "./components/Category";
import LikedProducts from "./components/LikedProducts";
import PopularShops from "./components/PopularShops";
import Shop from "./components/Shop";
import ShopBanners from "./components/ShopBanner";
import TrendingProducts from "./components/TrendingProducts";

export default function Home() {
  return (
    <>
    <div className="mx-2 p-8">
      <Category />
      <ShopBanners />
      <Shop />
      <LikedProducts />
      <PopularShops />
      <TrendingProducts />
    </div>
      <div className="m-2 text-center">
        <button className="rounded-md w-[100%] h-10 px-14 bg-red-600 font-semibold text-white font-serif">Explore More Products</button>
      </div>
    </>
  );
}

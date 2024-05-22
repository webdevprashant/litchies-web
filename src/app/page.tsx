import Category from "./components/Category";
import Header from "./components/Header";
import ShopBanners from "./components/ShopBanner";

export default function Home() {
  return (
    <div>
      <Header />
      <Category />
      <ShopBanners />
    </div>
  );
}

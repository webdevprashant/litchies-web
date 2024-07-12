"use client";
import { Provider } from "react-redux";
import appStore from "./redux/store";
import Header from "./components/home/Header";
import Footer from "./components/home/Footer";

export default function ClientProvider({children})  {
  return (
    <Provider store={appStore}>
        <div className="min-h-screen">
          <Header />
          {children}
          <Footer />
        </div>
    </Provider>
  );
}
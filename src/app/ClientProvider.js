"use client";
import { Provider } from "react-redux";
import appStore from "./redux/store";
import Header from "./components/home/Header";
import Footer from "./components/home/Footer";
// import Loader from "./components/home/loading";


export default function ClientProvider({children})  {
  return (
    <Provider store={appStore}>
        <div>
          {/* <Loader /> */}
          <Header />
          {children}
          <Footer />
        </div>
    </Provider>
  );
}
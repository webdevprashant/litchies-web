import { configureStore } from "@reduxjs/toolkit";
import OTPReducer from "./slice";

// Create Redux store - Step 1
const appStore = configureStore({
  reducer : {
    storeOTP: OTPReducer
  }
});

export default appStore;
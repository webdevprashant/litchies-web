import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./slice";

// Create Redux store - Step 1
const appStore = configureStore({
  reducer : {
    user: UserReducer,
  }
});

export default appStore;
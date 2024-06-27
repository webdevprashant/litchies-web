import { createSlice } from "@reduxjs/toolkit";

// Redux store contains multiple slices - Step 2
const userSlice = createSlice({
  name: 'userSlice',
  initialState: {
    otp : null,                        // Initially otp is empty
    mobile : null,                     // Initially mobile is empty
    isUserRegistered : false,          // Initially isUserRegistered is empty
    userId : null,                       // Initially userId is empty
    products: [],
    cart: [],
    homeCategories: [],
    homeBanners: [],
    homeShops: [],
    homeProducts: [],
  },
  reducers: {
    // Action to set the OTP value
    setOTP: (state, action) => {    // This function is a reducer function, modify state based on actions
      // mutating the state here
      state.otp = action.payload;
    },
    setUserMobile: (state, action) => {    // This function is a reducer function, modify state based on actions
      // mutating the state here
      state.mobile = action.payload;
    },
    setUserRegistered: (state, action) => {    // This function is a reducer function, modify state based on actions
      // mutating the state here
      state.isUserRegistered = action.payload;
    },

    setUserId: (state, action) => {    // This function is a reducer function, modify state based on actions
      // mutating the state here
      state.userId = action.payload;
    },

    addCartItem: (state, action) => {       // Add Items to Cart
      state.cart.push(action.payload);
    },
    removeCartItem: (state, action) => {       // remove Items to Cart
      state.cart.pop();
    },
    // Action to remove the OTP value
    removeOTP: (state, action) => {
        state.otp = null;
    },

    // Action to remove mobile
    removeMobile: (state, action) => {
        state.mobile = null;
    },

    // Action to remove isUserRegistered
    removeIsUserRegistered: (state, action) => {
        state.isUserRegistered = null;
    },
    removeUserId: (state, action) => {
        state.userId = null;
    },
    // Action to set Query Result
    setQueryResult: (state , action ) => {
      state.products.push(action.payload);
    },
    // Action to unset Query Result
    removeQueryResult: (state , action ) => {
      state.products.length = 0;
    },

    setHomeCateogories: (state, action) => {
      state.homeCategories.push(action.payload);
    },
    setHomeBanners: (state, action) => {
      state.homeBanners.push(action.payload);
    },
    setHomeShops: (state, action) => {
      state.homeShops.push(action.payload);
    },
    setHomeProducts: (state, action) => {
      state.homeProducts.push(action.payload);
    },
  }
});

export const { setOTP, removeOTP, setUserMobile, removeMobile, setUserRegistered, 
  removeIsUserRegistered, setUserId, removeUserId, setQueryResult, removeQueryResult, addCartItem, removeCartItem,
  setHomeCateogories, setHomeBanners, setHomeShops, setHomeProducts,
} = userSlice.actions;
export default userSlice.reducer;
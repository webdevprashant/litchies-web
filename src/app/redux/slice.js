import { createSlice } from "@reduxjs/toolkit";

// Redux store contains multiple slices - Step 2
const userSlice = createSlice({
  name: 'userSlice',
  initialState: {
    products: [],
    cart: [],
    homeCategories: [],
    homeBanners: [],
    homeShops: [],
    homeProducts: [],
  },
  reducers: {
    addCartItem: (state, action) => {       // Add Items to Cart
      state.cart.push(action.payload);
    },
    removeCartItem: (state, action) => {
      state.cart.splice(state.cart.indexOf(action.payload) , 1);
    },
    removeCartItems: (state, action) => {
      state.cart.length = 0;
    },
    // Action to set Query Result
    setQueryResult: (state , action ) => {
      state.products.push(action.payload);
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

export const { setQueryResult, addCartItem, removeCartItems, removeCartItem, 
  setHomeCateogories, setHomeBanners, setHomeShops, setHomeProducts,
} = userSlice.actions;
export default userSlice.reducer;
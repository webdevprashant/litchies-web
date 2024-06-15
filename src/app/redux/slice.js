import { createSlice } from "@reduxjs/toolkit";

// Redux store contains multiple slices - Step 2
const slice = createSlice({
  name: 'otpslice1',
  initialState: {
    otp : null,                        // Initially otp is empty
    mobile : null,                     // Initially mobile is empty
    isUserRegistered : false,          // Initially isUserRegistered is empty
    userId : ""                        // Initially userId is empty
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

  }
});

export const { setOTP, removeOTP, setUserMobile, removeMobile, setUserRegistered, removeIsUserRegistered, setUserId, removeUserId } = slice.actions;
export default slice.reducer;
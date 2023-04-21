import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/users/userSlice";
import siteUserReducer from "./features/siteUser/siteUserslice";

const store = configureStore({
  reducer: {
    user: userReducer,
    siteUser: siteUserReducer,
  },
});

export default store;

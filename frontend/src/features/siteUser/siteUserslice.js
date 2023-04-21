import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  firstName: "",
  lastName: "",
  email: "",
  userName: "",
  createdAt: "",
  publishedProfile: "",
  user_uuid: "",
  user_auth0_sub: "",
};

export const siteUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    addSiteUser: (state, action) => {
      state.firstName = action.payload.first_name;
      state.lastName = action.payload.last_name;
      state.email = action.payload.email;
      state.userName = action.payload.user_name;
      state.createdAt = action.payload.created_at;
      state.publishedProfile = action.payload.published_profile;
      state.user_uuid = action.payload.user_uuid;
      state.user_auth0_sub = action.payload.user_auth0_sub;
    },
    removeSiteUser: (state) => {
      state.firstName = "";
      state.lastName = "";
      state.email = "";
      state.userName = "";
      state.createdAt = "";
      state.publishedProfile = "";
      state.user_uuid = "";
      state.user_auth0_sub = "";
    },
  },
});

export const { addSiteUser, removeSiteUser } = siteUserSlice.actions;

export default siteUserSlice.reducer;

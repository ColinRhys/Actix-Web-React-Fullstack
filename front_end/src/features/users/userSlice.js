import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.users = [];
      state.users.push(action.payload);
    },
    findUnpublishedUserAccounts: (state, action) => {
      state.users = action.payload;
    },
    publishUserProfile: (state, action) => {
      const publishedUserId = action.payload;
      state.users = state.users.filter(function (item) {
        return item.id !== publishedUserId;
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const { addUser, findUnpublishedUserAccounts, publishUserProfile } =
  userSlice.actions;

export default userSlice.reducer;

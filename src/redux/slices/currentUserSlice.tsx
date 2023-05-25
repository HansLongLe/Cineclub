import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: { token: undefined, username: undefined, userId: undefined }
};

export const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    }
  }
});

export const { setCurrentUser } = currentUserSlice.actions;
export default currentUserSlice.reducer;

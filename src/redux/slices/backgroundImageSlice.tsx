import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  backgroundImage: undefined
};

export const backgroundImageSlice = createSlice({
  name: "backgroundImage",
  initialState,
  reducers: {
    setBackgroundImage: (state, action) => {
      state.backgroundImage = action.payload;
    }
  }
});

export const { setBackgroundImage } = backgroundImageSlice.actions;
export default backgroundImageSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

export const groupSlice = createSlice({
  name: "group",
  initialState: {
    groupList: [],
  },
  reducers: {
    setGroupList: (state, action) => {
      state.groupList = action.payload;
    },
  },
});

export const { setGroupList } = groupSlice.actions;

export default groupSlice.reducer;

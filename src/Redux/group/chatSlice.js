import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chatList: [],
    participantsList: [],
    groupInfo: {},
  },
  reducers: {
    setChatList: (state, action) => {
      state.chatList = action.payload;
    },
    addChat: (state, action) => {
      state.chatList.push(action.payload);
    },
    addParticipants: (state, action) => {
      if (
        state.participantsList.find(
          (p) => p.user._id === action.payload.user._id
        )
      )
        return;
      state.participantsList.push(action.payload);
    },
    removeParticipants: (state, action) => {
        console.log("action", action.payload);
        let remainingParticipants = state.participantsList.filter(
            (p) => p._id !== action.payload._id
        );
        console.log("remaining participants", remainingParticipants);
        state.participantsList = remainingParticipants;
    },
    setParticipantsList: (state, action) => {
      state.participantsList = action.payload;
    },
    setGroupInfo: (state, action) => {
      state.groupInfo = action.payload;
    },
  },
});

export const {
  setChatList,
  setParticipantsList,
  setGroupInfo,
  addChat,
  addParticipants,
  removeParticipants
} = chatSlice.actions;

export default chatSlice.reducer;

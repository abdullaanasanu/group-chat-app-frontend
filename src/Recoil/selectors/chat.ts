// chatSelectors.js
import { selector } from "recoil";
import {
  chatListPageState,
  chatListState,
  participantListState,
} from "../atoms/chat";
import exp from "constants";

export const addChatMessage = selector({
  key: "addChatMessage",
  get: ({ get }) => {
    const chatList = get(chatListState);
    return chatList;
  },
  set: ({ set, get }, newChatMessage: any) => {
    const currentChatList = get(chatListState);

    const newChatList: any = [...currentChatList, newChatMessage];

    set(chatListState, newChatList);
  },
});

export const addParticipant = selector({
  key: "addParticipant",
  get: ({ get }) => {
    const participantList = get(participantListState);
    return participantList;
  },
  set: ({ set, get }, newParticipant: any) => {
    const currentParticipantList: any = get(participantListState);

    if (
      currentParticipantList.find(
        (p: any) => p.user._id === newParticipant.user._id
      )
    )
      return;

    const newParticipantList: any = [...currentParticipantList, newParticipant];

    set(participantListState, newParticipantList);
  },
});

export const removeParticipant = selector({
  key: "removeParticipant",
  get: ({ get }) => {
    const participantList = get(participantListState);
    return participantList;
  },
  set: ({ set, get }, participant: any) => {
    const currentParticipantList: any = get(participantListState);

    const newParticipantList: any = currentParticipantList.filter(
      (p: any) => p.user._id !== participant.user._id
    );

    set(participantListState, newParticipantList);
  },
});

// append old chat list
export const appendOldChatList = selector({
  key: "appendOldChatList",
  get: ({ get }) => {
    const chatList = get(chatListState);
    return chatList;
  },
  set: ({ set, get }, oldChatList: any) => {
    const currentChatList = get(chatListState);

    const newChatList: any = [...oldChatList, ...currentChatList];

    set(chatListState, newChatList);
  },
});

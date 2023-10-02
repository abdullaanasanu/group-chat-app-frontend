import { atom } from "recoil";

const chatListState = atom({
  key: "chatListState",
  default: [],
});

const chatListPageState = atom({
  key: "chatListPageState",
  default: 1,
});

const chatListEndState = atom({
  key: "chatListEndState",
  default: false,
});

const groupInfoState = atom({
  key: "groupInfoState",
  default: null,
});

const participantListState = atom({
  key: "participantListState",
  default: [],
});

export {
  chatListState,
  groupInfoState,
  participantListState,
  chatListPageState,
  chatListEndState,
};

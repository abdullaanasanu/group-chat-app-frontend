import { atom } from "recoil";

const groupListState = atom({
  key: "groupListState",
  default: [],
});

const totalGroupState = atom({
  key: "totalGroupState",
  default: 0,
});

export {
    groupListState,
    totalGroupState,
}
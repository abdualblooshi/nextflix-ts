import { atom } from "recoil";

export const isVisibleState = atom({
  key: "isVisible",
  default: false,
});

export const isLoadingState = atom({
  key: "isLoading",
  default: false,
});

export const messageState = atom({
  key: "message",
  default: "",
});

export const statusState = atom({
  key: "status",
  default: "success",
});

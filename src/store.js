import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slice/userSlice";
import activeChatSlice from "./slice/activeChatSlice";

export const store = configureStore({
  reducer: {
    userLogInfo: userSlice,
    activeChat: activeChatSlice,
  },
});

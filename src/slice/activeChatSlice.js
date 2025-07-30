
import { createSlice } from "@reduxjs/toolkit";

export const activeChatSlice = createSlice({
  name: "activeChat",
  initialState: {
    value: null,
  },
  reducers: {
    setActiveChat: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setActiveChat } = activeChatSlice.actions;

export default activeChatSlice.reducer;

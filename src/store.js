import { configureStore } from '@reduxjs/toolkit'
import { userSlice } from './slice/UserSlice';


export const store = configureStore({
  reducer: {
    userLoginInfo: userSlice,
  },
})

export default store;